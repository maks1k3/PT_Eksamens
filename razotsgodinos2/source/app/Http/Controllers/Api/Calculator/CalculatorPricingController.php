<?php

namespace App\Http\Controllers\Api\Calculator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Logic\Core\Response;
use App\Logic\Core\ContentTranslations;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

class CalculatorPricingController extends Controller
{
    private function getTitle(string $containerName, int $id, string $lang, string $fallback = ''): string
    {
        if ($id <= 0) return $fallback;

        $translations = ContentTranslations::get([$lang], $containerName, $id);

        if (!$translations || !isset($translations[$lang])) {
            return $fallback;
        }

        $t = trim((string)($translations[$lang]->title ?? ''));
        return $t !== '' ? $t : $fallback;
    }

    private function bucketSuffix(string $workTypeCode, string $unit): string
    {
        $workTypeCode = trim($workTypeCode);

        if ($workTypeCode === 'vizualizacija') return 'Flat';

        $u = mb_strtolower(trim((string)$unit));
        if (str_contains($u, 'flat')) return 'Flat';
        if (str_contains($u, 'm2') || str_contains($u, 'm²')) return 'PerM2';

        return 'PerM2';
    }

    public function index(Request $request)
    {
        $lang = (string)$request->get('lang', 'lv');

        $rows = DB::connection('main')->table('calculator_prices as p')
            ->leftJoin('calculator_categories as c', 'c.id', '=', 'p.category_id')
            ->leftJoin('calculator_work_types as w', 'w.id', '=', 'p.work_type_id')
            ->leftJoin('calculator_options as o', 'o.id', '=', 'p.option_id')
            ->select([
                'p.price',

                'c.id as category_id',
                'c.code as category_code',
                'c.sort as category_sort',

                'w.id as work_type_id',
                'w.code as work_type_code',
                'w.unit as work_type_unit',
                'w.sort as work_type_sort',

                'o.id as option_id',
                'o.code as option_code',
                'o.sort as option_sort',
            ])
            ->orderBy('c.sort', 'asc')
            ->orderBy('w.sort', 'asc')
            ->orderBy('o.sort', 'asc')
            ->orderBy('p.id', 'asc')
            ->get();

        $labels = [
            'category'  => [],
            'work_type' => [],
            'option'    => [], 
        ];

        $pricing = [];

        $pricingTitles = [];

        foreach ($rows as $r) {
            if (!$r->category_id || !$r->work_type_id || !$r->option_id) continue;

            $categoryCode = (string)$r->category_code;
            $workTypeCode = (string)$r->work_type_code;
            $optionCode   = (string)$r->option_code;

            if ($categoryCode === '' || $workTypeCode === '' || $optionCode === '') continue;

            $categoryTitle = $this->getTitle(
                ContentTranslationsTypes::calculator_category->value,
                (int)$r->category_id,
                $lang,
                $categoryCode
            );

            $workTypeTitle = $this->getTitle(
                ContentTranslationsTypes::calculator_work_type->value,
                (int)$r->work_type_id,
                $lang,
                $workTypeCode
            );

            $optionTitle = $this->getTitle(
                ContentTranslationsTypes::calculator_option->value,
                (int)$r->option_id,
                $lang,
                $optionCode
            );

            $labels['category'][$categoryCode] = $categoryTitle;
            $labels['work_type'][$workTypeCode] = $workTypeTitle;
            if (!isset($labels['option'][$workTypeCode])) $labels['option'][$workTypeCode] = [];
            $labels['option'][$workTypeCode][$optionCode] = $optionTitle;

            $suffix = $this->bucketSuffix($workTypeCode, (string)$r->work_type_unit);
            $bucket = $workTypeCode . $suffix;

            if (!isset($pricing[$categoryCode])) $pricing[$categoryCode] = [];
            if (!isset($pricing[$categoryCode][$bucket])) $pricing[$categoryCode][$bucket] = [];
            $pricing[$categoryCode][$bucket][$optionCode] = (float)$r->price;

            if (!isset($pricingTitles[$categoryTitle])) $pricingTitles[$categoryTitle] = [];
            if (!isset($pricingTitles[$categoryTitle][$workTypeTitle])) $pricingTitles[$categoryTitle][$workTypeTitle] = [];
            $pricingTitles[$categoryTitle][$workTypeTitle][$optionTitle] = (float)$r->price;
        }

        return Response::success([
          
            'pricing' => $pricing,

            'pricing_titles' => $pricingTitles,

            'labels' => $labels,
        ]);
    }
}