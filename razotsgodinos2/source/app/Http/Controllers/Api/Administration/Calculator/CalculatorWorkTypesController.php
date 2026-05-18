<?php

namespace App\Http\Controllers\Api\Administration\Calculator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Models\Main\CalculatorWorkType;

use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

class CalculatorWorkTypesController extends Controller
{
    public function search(Request $request)
    {
        $query = DB::connection('main')->table('calculator_work_types as w');

        $columns = [
            'w.id'   => 'id',
            'w.code' => 'code',
            'w.unit' => 'unit',
            'w.sort' => 'sort',
        ];

        $langs = Langs::getAll();
        foreach ($langs as $lang) {
            $columns[$lang . '.title'] = $lang . '_title';
        }

        ContentTranslations::leftJoin(
            $query,
            $langs,
            'w.id',
            ContentTranslationsTypes::calculator_work_type->value
        );

        $filters = [];
        $filters['id'] = fn($q, $v) => $q->where('w.id', (int)$v);
        $filters['code'] = fn($q, $v) => $q->where('w.code', 'like', '%' . trim((string)$v) . '%');

        $options = [
            'results_per_page' => 10,
            'order' => [
                'w.sort' => 'asc',
                'w.id'   => 'asc',
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
                        'options' => CalculatorWorkType::getOptions($lang),
                    ]);
                },
            ],

            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) {
                    $item = CalculatorWorkType::find((int)$request->id);
                    if (empty($item)) {
                        return Response::error("Work type with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_work_type->value,
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
                    'code' => 'required|string|max:50',
                    'unit' => 'required|string|max:10',
                    'sort' => 'nullable|integer|min:0',
                ],
                'action' => function ($request) {
                    $code = trim((string)$request->code);
                    $unit = trim((string)$request->unit);

                    if (CalculatorWorkType::where('code', $code)->exists()) {
                        return Response::error(['msg' => 'Code already exists!', 'field' => 'code']);
                    }

                    $tmp = CalculatorWorkType::orderBy('sort', 'desc')->first();
                    $sort = isset($request->sort)
                        ? (int)$request->sort
                        : (empty($tmp) ? 0 : ((int)$tmp->sort + 1));

                    $item = new CalculatorWorkType();
                    $item->code = $code;
                    $item->unit = $unit;
                    $item->sort = $sort;
                    $item->save();

                    $langs = Langs::getAll();
                    foreach ($langs as $lang) {
                        $ct = ContentTranslations::getContainer(
                            ContentTranslationsTypes::calculator_work_type->value,
                            (int)$item->id,
                            $lang
                        );
                        $ct->title = $request[$lang . '_title'] ?? '';
                        $ct->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_work_type->value,
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
                    'id'   => 'required|integer',
                    'code' => 'required|string|max:50',
                    'unit' => 'required|string|max:10',
                    'sort' => 'nullable|integer|min:0',
                ],
                'action' => function ($request) {
                    $item = CalculatorWorkType::find((int)$request->id);
                    if (empty($item)) {
                        return Response::error("Work type with id {$request->id} doesn't exist!");
                    }

                    $code = trim((string)$request->code);
                    $unit = trim((string)$request->unit);
                    $sort = isset($request->sort) ? (int)$request->sort : (int)$item->sort;

                    if (CalculatorWorkType::where('id', '!=', (int)$item->id)->where('code', $code)->exists()) {
                        return Response::error(['msg' => 'Code already exists!', 'field' => 'code']);
                    }

                    $item->code = $code;
                    $item->unit = $unit;
                    $item->sort = $sort;
                    $item->save();

                    $langs = Langs::getAll();
                    foreach ($langs as $lang) {
                        $ct = ContentTranslations::getContainer(
                            ContentTranslationsTypes::calculator_work_type->value,
                            (int)$item->id,
                            $lang
                        );
                        $ct->title = $request[$lang . '_title'] ?? '';
                        $ct->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_work_type->value,
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
                    $item = CalculatorWorkType::find((int)$request->id);
                    if (empty($item)) {
                        return Response::error("Work type with id {$request->id} doesn't exist!");
                    }

                    $hasOptions = DB::connection('main')->table('calculator_options')
                        ->where('work_type_id', (int)$item->id)
                        ->exists();
                    if ($hasOptions) {
                        return Response::error('Nevar izdzēst: ir piesaistītas options!');
                    }

                    $hasPrices = DB::connection('main')->table('calculator_prices')
                        ->where('work_type_id', (int)$item->id)
                        ->exists();
                    if ($hasPrices) {
                        return Response::error('Nevar izdzēst: ir piesaistītas cenas!');
                    }

                    ContentTranslations::delete(
                        ContentTranslationsTypes::calculator_work_type->value,
                        (int)$item->id
                    );

                    CalculatorWorkType::where('sort', '>', (int)$item->sort)->decrement('sort');
                    $item->delete();

                    return Response::success(['msg' => 'Item is deleted!']);
                },
            ],
        ];

        return Response::parse($request, $actions);
    }
}