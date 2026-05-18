<?php

namespace App\Http\Controllers\Api\Administration\Calculator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Main\CalculatorOption;
use App\Models\Main\CalculatorWorkType;

use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

class CalculatorOptionsController extends Controller
{
    public function search(Request $request)
    {
        $query = DB::connection('main')->table('calculator_options as o')
            ->leftJoin('calculator_work_types as w', 'w.id', '=', 'o.work_type_id');

        $columns = [
            'o.id' => 'id',
            'o.work_type_id' => 'work_type_id',
            'o.code' => 'code',
            'o.sort' => 'sort',
        ];

        $langs = Langs::getAll();
        foreach ($langs as $lang) {
            $columns[$lang . '.title'] = $lang . '_title';
        }

        ContentTranslations::leftJoin(
            $query,
            $langs,
            'o.id',
            ContentTranslationsTypes::calculator_option->value
        );

        $filters = [];
        $filters['id'] = fn($q, $v) => $q->where('o.id', (int)$v);
        $filters['work_type_id'] = fn($q, $v) => $q->where('o.work_type_id', (int)$v);
        $filters['code'] = fn($q, $v) => $q->where('o.code', 'like', '%' . trim((string)$v) . '%');

        $options = [
            'results_per_page' => 10,
            'order' => [
                'w.sort' => 'asc',
                'o.sort' => 'asc',
                'o.id'   => 'asc',
            ],
        ];

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, [], $options);

        return Response::success($response);
    }

    public function actions(Request $request)
    {
        if (!$request->filled('action')) {
            $request->merge(['action' => 'form_data']);
        }

        $getDefaultWorkTypeId = function (): int {
            $wt = CalculatorWorkType::query()
                ->orderBy('sort', 'asc')
                ->orderBy('id', 'asc')
                ->first();
            return $wt ? (int)$wt->id : 0;
        };

        $actions = [

            'form_data' => [
                'rules' => [],
                'action' => function () {
                    return Response::success([]);
                },
            ],

            'get_options' => [
                'rules' => [
                    'lang' => 'nullable|string|max:5',
                ],
                'action' => function ($request) {
                    $lang = $request->get('lang', 'lv');
                    return Response::success([
                        'options' => CalculatorOption::getOptions($lang, null),
                    ]);
                },
            ],

            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) {
                    $item = CalculatorOption::find((int)$request->id);
                    if (empty($item)) {
                        return Response::error("Option with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_option->value,
                        (int)$item->id
                    );

                    return Response::success([
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                },
            ],

            'create' => [
                'rules' => [
                    'work_type_id' => 'nullable|integer',
                    'code' => 'required|string|max:100',
                    'sort' => 'nullable|integer|min:0',
                ],
                'action' => function ($request) use ($getDefaultWorkTypeId) {
                    $workTypeId = (int)($request->work_type_id ?? 0);
                    if ($workTypeId <= 0) {
                        $workTypeId = $getDefaultWorkTypeId();
                    }
                    if ($workTypeId <= 0 || !CalculatorWorkType::where('id', $workTypeId)->exists()) {
                        return Response::error("Work type doesn't exist!");
                    }

                    $code = trim((string)$request->code);

                    if (CalculatorOption::where('work_type_id', $workTypeId)->where('code', $code)->exists()) {
                        return Response::error(['msg' => "Code already exists!", 'field' => 'code']);
                    }

                    $tmp = CalculatorOption::where('work_type_id', $workTypeId)->orderBy('sort', 'desc')->first();
                    $sort = isset($request->sort)
                        ? (int)$request->sort
                        : (empty($tmp) ? 0 : ((int)$tmp->sort + 1));

                    $item = new CalculatorOption();
                    $item->work_type_id = $workTypeId;
                    $item->code = $code;
                    $item->sort = $sort;
                    $item->save();

                    $langs = Langs::getAll();
                    foreach ($langs as $lang) {
                        $ct = ContentTranslations::getContainer(
                            ContentTranslationsTypes::calculator_option->value,
                            (int)$item->id,
                            $lang
                        );
                        $ct->title = $request[$lang . '_title'] ?? '';
                        $ct->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_option->value,
                        (int)$item->id
                    );

                    return Response::success([
                        'msg' => 'Jauns ieraksts ir pievienots!',
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                },
            ],

            'update' => [
                'rules' => [
                    'id' => 'required|integer',
                    'work_type_id' => 'nullable|integer',
                    'code' => 'required|string|max:100',
                    'sort' => 'nullable|integer|min:0',
                ],
                'action' => function ($request) use ($getDefaultWorkTypeId) {
                    $item = CalculatorOption::find((int)$request->id);
                    if (empty($item)) {
                        return Response::error("Option with id {$request->id} doesn't exist!");
                    }

                    $workTypeId = $request->filled('work_type_id')
                        ? (int)$request->work_type_id
                        : (int)$item->work_type_id;

                    if ($workTypeId <= 0) $workTypeId = $getDefaultWorkTypeId();

                    if ($workTypeId <= 0 || !CalculatorWorkType::where('id', $workTypeId)->exists()) {
                        return Response::error("Work type doesn't exist!");
                    }

                    $code = trim((string)$request->code);
                    $sort = isset($request->sort) ? (int)$request->sort : (int)$item->sort;

                    $dup = CalculatorOption::where('id', '!=', (int)$item->id)
                        ->where('work_type_id', $workTypeId)
                        ->where('code', $code)
                        ->exists();

                    if ($dup) {
                        return Response::error(['msg' => "Code already exists!", 'field' => 'code']);
                    }

                    $item->work_type_id = $workTypeId;
                    $item->code = $code;
                    $item->sort = $sort;
                    $item->save();

                    $langs = Langs::getAll();
                    foreach ($langs as $lang) {
                        $ct = ContentTranslations::getContainer(
                            ContentTranslationsTypes::calculator_option->value,
                            (int)$item->id,
                            $lang
                        );
                        $ct->title = $request[$lang . '_title'] ?? '';
                        $ct->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_option->value,
                        (int)$item->id
                    );

                    return Response::success([
                        'msg' => 'Izmaiņas ir saglabātas!',
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                },
            ],

            'delete' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) {
                    $item = CalculatorOption::find((int)$request->id);
                    if (empty($item)) {
                        return Response::error("Option with id {$request->id} doesn't exist!");
                    }

                    $hasPrices = DB::connection('main')->table('calculator_prices')
                        ->where('option_id', '=', (int)$item->id)
                        ->exists();

                    if ($hasPrices) {
                        return Response::error('Nevar izdzēst: ir piesaistītas cenas!');
                    }

                    ContentTranslations::delete(
                        ContentTranslationsTypes::calculator_option->value,
                        (int)$item->id
                    );

                    CalculatorOption::where('work_type_id', '=', (int)$item->work_type_id)
                        ->where('sort', '>', (int)$item->sort)
                        ->decrement('sort');

                    $item->delete();

                    return Response::success(['msg' => 'Item is deleted!']);
                },
            ],
        ];

        return Response::parse($request, $actions);
    }
}