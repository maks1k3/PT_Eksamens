<?php

namespace App\Http\Controllers\Api\Administration\Calculator;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Core\Langs;
use App\Logic\Core\ContentTranslations;
use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

use App\Models\Main\CalculatorCategory;

class CalculatorCategoriesController extends Controller
{
    public function search(Request $request)
    {
        $query = DB::connection('main')->table('calculator_categories as c');

        $columns = [
            'c.id'   => 'id',
            'c.code' => 'code',
            'c.sort' => 'sort',
        ];

        $langs = Langs::getAll();
        foreach ($langs as $lang) {
            $columns[$lang . '.title'] = $lang . '_title';
        }

        ContentTranslations::leftJoin(
            $query,
            $langs,
            'c.id',
            ContentTranslationsTypes::calculator_category->value
        );

        $filters = [];
        $filters['id'] = fn($q, $v) => $q->where('c.id', '=', (int)$v);
        $filters['code'] = fn($q, $v) => $q->where('c.code', 'like', '%' . trim((string)$v) . '%');

        $filters['title'] = function ($q, $v) use ($langs) {
            $value = trim((string)$v);
            $q->where(function ($qq) use ($langs, $value) {
                foreach ($langs as $lang) {
                    $qq->orWhere($lang . '.title', 'like', '%' . $value . '%');
                }
            });
        };

        $options = [
            'results_per_page' => 25,
            'order' => [
                'c.sort' => 'asc',
                'c.id'   => 'asc',
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

        $action = (string)$request->get('action', 'form_data');

        if ($action === 'update' && !$request->filled('id')) {
            $request->merge(['action' => 'create']);
            $action = 'create';
        }

        if (in_array($action, ['get', 'delete'], true) && !$request->filled('id')) {
            $request->merge(['action' => 'form_data']);
            $action = 'form_data';
        }

        $normalizeCode = function ($s) {
            $s = trim((string)$s);
            $s = mb_strtolower($s, 'UTF-8');
            $s = preg_replace('/\s+/u', '_', $s);
            $s = preg_replace('/[^a-z0-9_]/', '', $s);
            return $s;
        };

        $getItem = function (int $id) {
            return DB::connection('main')
                ->table('calculator_categories')
                ->where('id', '=', $id)
                ->first();
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
                        'options' => CalculatorCategory::getOptions($lang),
                    ]);
                },
            ],

            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) use ($getItem) {
                    $item = $getItem((int)$request->id);
                    if (empty($item)) return Response::error("No category with id {$request->id}!");

                    $langs = Langs::getAll();
                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_category->value,
                        (int)$request->id
                    );

                    return Response::success([
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                },
            ],

            'create' => [
                'rules' => [
                    'code' => 'required|string|max:100',
                    'sort' => 'nullable|integer|min:0',
                ],
                'action' => function ($request) use ($normalizeCode, $getItem) {
                    $code = $normalizeCode($request->code);
                    $sort = isset($request->sort) ? (int)$request->sort : 0;

                    $exists = DB::connection('main')
                        ->table('calculator_categories')
                        ->where('code', '=', $code)
                        ->exists();

                    if ($exists) {
                        return Response::error(['msg' => 'Šāds code jau eksistē!', 'field' => 'code']);
                    }

                    $id = DB::connection('main')->table('calculator_categories')->insertGetId([
                        'code' => $code,
                        'sort' => $sort,
                    ]);

                    $langs = Langs::getAll();
                    foreach ($langs as $lang) {
                        $ct = ContentTranslations::getContainer(
                            ContentTranslationsTypes::calculator_category->value,
                            (int)$id,
                            $lang
                        );
                        $ct->title = trim((string)($request[$lang . '_title'] ?? ''));
                        $ct->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_category->value,
                        (int)$id
                    );

                    return Response::success([
                        'msg' => 'Kategorija izveidota!',
                        'item' => $getItem((int)$id),
                        'translations' => $translations,
                    ]);
                },
            ],

            'update' => [
                'rules' => [
                    'id'   => 'required|integer',
                    'code' => 'required|string|max:100',
                    'sort' => 'nullable|integer|min:0',
                ],
                'action' => function ($request) use ($normalizeCode, $getItem) {
                    $item = $getItem((int)$request->id);
                    if (empty($item)) return Response::error("No category with id {$request->id}!");

                    $code = $normalizeCode($request->code);
                    $sort = isset($request->sort) ? (int)$request->sort : (int)$item->sort;

                    $dup = DB::connection('main')
                        ->table('calculator_categories')
                        ->where('id', '!=', (int)$request->id)
                        ->where('code', '=', $code)
                        ->exists();

                    if ($dup) {
                        return Response::error(['msg' => 'Šāds code jau eksistē!', 'field' => 'code']);
                    }

                    DB::connection('main')->table('calculator_categories')
                        ->where('id', '=', (int)$request->id)
                        ->update([
                            'code' => $code,
                            'sort' => $sort,
                        ]);

                    $langs = Langs::getAll();
                    foreach ($langs as $lang) {
                        $ct = ContentTranslations::getContainer(
                            ContentTranslationsTypes::calculator_category->value,
                            (int)$request->id,
                            $lang
                        );
                        $ct->title = trim((string)($request[$lang . '_title'] ?? ''));
                        $ct->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::calculator_category->value,
                        (int)$request->id
                    );

                    return Response::success([
                        'msg' => 'Saglabāts!',
                        'item' => $getItem((int)$request->id),
                        'translations' => $translations,
                    ]);
                },
            ],

            'delete' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($request) use ($getItem) {
                    $item = $getItem((int)$request->id);
                    if (empty($item)) return Response::error("No category with id {$request->id}!");

                    $hasPrices = DB::connection('main')
                        ->table('calculator_prices')
                        ->where('category_id', '=', (int)$request->id)
                        ->exists();

                    if ($hasPrices) return Response::error('Nevar izdzēst: ir piesaistītas cenas!');

                    DB::connection('main')->table('calculator_categories')
                        ->where('id', '=', (int)$request->id)
                        ->delete();

                    ContentTranslations::delete(
                        ContentTranslationsTypes::calculator_category->value,
                        (int)$request->id
                    );

                    return Response::success(['msg' => 'Izdzēsts!']);
                },
            ],
        ];

        return Response::parse($request, $actions);
    }
}