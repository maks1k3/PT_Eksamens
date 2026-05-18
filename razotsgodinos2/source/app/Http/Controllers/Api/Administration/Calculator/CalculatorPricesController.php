<?php

namespace App\Http\Controllers\Api\Administration\Calculator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;

use App\Models\Main\CalculatorCategory;
use App\Models\Main\CalculatorWorkType;
use App\Models\Main\CalculatorOption;
use App\Models\Main\CalculatorPrice;
use App\Logic\Core\ContentTranslations;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;
class CalculatorPricesController extends Controller
{
    public function search(Request $request)
{
    $query = DB::connection('main')->table('calculator_prices as p')
        ->leftJoin('calculator_categories as c', 'c.id', '=', 'p.category_id')
        ->leftJoin('calculator_work_types as w', 'w.id', '=', 'p.work_type_id')
        ->leftJoin('calculator_options as o', 'o.id', '=', 'p.option_id');

    $columns = [
        'p.id' => 'id',

        'p.category_id' => 'category_id',
        'c.code' => 'category',

        'p.work_type_id' => 'work_type_id',
        'w.code' => 'work_type',

        'p.option_id' => 'option_id',
        'o.code' => 'option_code',

        'p.price' => 'price',
    ];

    $formatters = [];

    $formatters['price'] = fn($v) => (float)$v;

    $formatters['category'] = function ($v, $row) {
        if (!$row->category_id) return $v;

        $ct = \App\Logic\Core\ContentTranslations::getContainer(
            \App\Types\Main\ContentTranslations::calculator_category->value,
            (int)$row->category_id,
            'lv'
        );

        return $ct && $ct->title ? $ct->title : $v;
    };

    $formatters['work_type'] = function ($v, $row) {
        if (!$row->work_type_id) return $v;

        $ct = \App\Logic\Core\ContentTranslations::getContainer(
            \App\Types\Main\ContentTranslations::calculator_work_type->value,
            (int)$row->work_type_id,
            'lv'
        );

        return $ct && $ct->title ? $ct->title : $v;
    };

    $formatters['option_code'] = function ($v, $row) {
        if (!$row->option_id) return $v;

        $ct = \App\Logic\Core\ContentTranslations::getContainer(
            \App\Types\Main\ContentTranslations::calculator_option->value,
            (int)$row->option_id,
            'lv'
        );

        return $ct && $ct->title ? $ct->title : $v;
    };

    $filters = [];
    $filters['id'] = fn($q, $v) => $q->where('p.id', (int)$v);

    $filters['category'] = fn($q, $v) => $q->where('c.code', 'like', '%' . trim((string)$v) . '%');
    $filters['work_type'] = fn($q, $v) => $q->where('w.code', 'like', '%' . trim((string)$v) . '%');
    $filters['option_code'] = fn($q, $v) => $q->where('o.code', 'like', '%' . trim((string)$v) . '%');

    $options = [
        'results_per_page' => 25,
        'order' => [
            'c.sort' => 'asc',
            'w.sort' => 'asc',
            'o.sort' => 'asc',
            'p.id' => 'asc',
        ],
    ];

    $params = DataSource::parseRequest($request);
    $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

    return Response::success($response);
}

    public function actions(Request $request)
    {
        $getItemById = function (int $id) {
            return DB::connection('main')->table('calculator_prices as p')
                ->leftJoin('calculator_categories as c', 'c.id', '=', 'p.category_id')
                ->leftJoin('calculator_work_types as w', 'w.id', '=', 'p.work_type_id')
                ->leftJoin('calculator_options as o', 'o.id', '=', 'p.option_id')
                ->select([
                    'p.id',
                    'p.category_id',
                    'p.work_type_id',
                    'p.option_id',
                    'c.code as category',
                    'w.code as work_type',
                    'o.code as option_code',
                    'p.price',
                ])
                ->where('p.id', '=', $id)
                ->first();
        };

        $actions = [

           
            'form_data' => [
                'rules' => [],
                'action' => function () {
                    return Response::success([]);
                },
            ],

           
            'get_categories' => [
                'rules' => [
                    'lang' => 'nullable|string|max:5',
                ],
                'action' => function ($request) {
                    $lang = $request->get('lang', 'lv');
                    return Response::success([
                        'options' => CalculatorCategory::getOptions($lang),
                    ]);
                },
            ],

            
            'get_work_types' => [
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

            
            'get_options' => [
                'rules' => [
                    'lang' => 'nullable|string|max:5',
                    'work_type_id' => 'nullable|integer',
                ],
                'action' => function ($request) {
                    $lang = $request->get('lang', 'lv');
                    $workTypeId = $request->get('work_type_id', null);
                    $workTypeId = $workTypeId ? (int)$workTypeId : null;

                    return Response::success([
                        'options' => CalculatorOption::getOptions($lang, $workTypeId),
                    ]);
                },
            ],

            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) use ($getItemById) {
                    $item = $getItemById((int)$request->id);
                    if (!$item) return Response::error("Row with id {$request->id} doesn't exist!");

                    return Response::success([
                        'item' => $item,
                    ]);
                },
            ],

            'create' => [
                'rules' => [
                    'category_id'  => 'required|integer',
                    'work_type_id' => 'required|integer',
                    'option_id'    => 'required|integer',
                    'price'        => 'required|numeric|min:0',
                ],
                'action' => function ($request) use ($getItemById) {
                    $categoryId = (int)$request->category_id;
                    $workTypeId = (int)$request->work_type_id;
                    $optionId   = (int)$request->option_id;

                    if (!CalculatorCategory::where('id', $categoryId)->exists()) return Response::error('Category not found');
                    if (!CalculatorWorkType::where('id', $workTypeId)->exists()) return Response::error('Work type not found');
                    if (!CalculatorOption::where('id', $optionId)->exists()) return Response::error('Option not found');

                    $exists = CalculatorPrice::where('category_id', $categoryId)
                        ->where('work_type_id', $workTypeId)
                        ->where('option_id', $optionId)
                        ->exists();

                    if ($exists) return Response::error('Šī kombinācija jau eksistē!');

                    $id = CalculatorPrice::insertGetId([
                        'category_id'  => $categoryId,
                        'work_type_id' => $workTypeId,
                        'option_id'    => $optionId,
                        'price'        => $request->price,
                    ]);

                    return Response::success([
                        'id' => (int)$id,
                        'item' => $getItemById((int)$id),
                        'msg' => 'Ieraksts izveidots!',
                    ]);
                },
            ],

            'update' => [
                'rules' => [
                    'id'           => 'required|integer',
                    'category_id'  => 'required|integer',
                    'work_type_id' => 'required|integer',
                    'option_id'    => 'required|integer',
                    'price'        => 'required|numeric|min:0',
                ],
                'action' => function ($request) use ($getItemById) {
                    $id         = (int)$request->id;
                    $categoryId = (int)$request->category_id;
                    $workTypeId = (int)$request->work_type_id;
                    $optionId   = (int)$request->option_id;

                    $row = CalculatorPrice::where('id', $id)->first();
                    if (!$row) return Response::error("Row with id {$request->id} doesn't exist!");

                    $dup = CalculatorPrice::where('id', '!=', $id)
                        ->where('category_id', $categoryId)
                        ->where('work_type_id', $workTypeId)
                        ->where('option_id', $optionId)
                        ->exists();

                    if ($dup) return Response::error('Šī kombinācija jau eksistē!');

                    CalculatorPrice::where('id', $id)->update([
                        'category_id'  => $categoryId,
                        'work_type_id' => $workTypeId,
                        'option_id'    => $optionId,
                        'price'        => $request->price,
                    ]);

                    return Response::success([
                        'item' => $getItemById($id),
                        'msg' => 'Saglabāts!',
                    ]);
                },
            ],

            'delete' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) {
                    CalculatorPrice::where('id', (int)$request->id)->delete();
                    return Response::success(['msg' => 'Izdzēsts!']);
                },
            ],
        ];

        return Response::parse($request, $actions);
    }
}