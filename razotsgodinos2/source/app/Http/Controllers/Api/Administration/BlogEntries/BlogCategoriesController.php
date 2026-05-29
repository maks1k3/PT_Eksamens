<?php

namespace App\Http\Controllers\Api\Administration\BlogEntries;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Main\BlogCategory;
use App\Models\Main\BlogEntry;

use App\Logic\Core\ContentTranslations;
use App\Logic\Core\Langs;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use App\Logic\Main\Blog\BlogCategories;

use App\Types\Main\ContentTranslations as ContentTranslationsTypes;

use DB;

class BlogCategoriesController extends Controller
{
    public function __construct()
    {
    }

    public function search(Request $request)
    {
        $query = DB::connection('main')->table('blog_categories as b');

        $columns = [
            'b.id' => 'id',
            'b.created_at' => 'created_at',
            'b.updated_at' => 'updated_at',
            'b.position' => 'position',
        ];

        $langs = Langs::getAll();

        foreach ($langs as $lang) {
            $columns[$lang . '.title'] = $lang . '_title';
        }

        ContentTranslations::leftJoin(
            $query,
            $langs,
            'b.id',
            ContentTranslationsTypes::blog_category->value
        );

        $formatters = [];

        $filters = [];

        $filters['id'] = function ($query, $value) {
            $query->where('b.id', '=', $value);
        };

        $options = [
            'results_per_page' => 10,
            'order' => [
                'b.id' => 'desc',
            ],
        ];

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        return Response::success($response);
    }

    public function actions(Request $request)
    {
        $actions = [
            'get' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function ($request) {
                    $item = BlogCategory::find($request->id);

                    if (empty($item)) {
                        return Response::error("Blog Category with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::blog_category,
                        $item->id
                    );

                    return Response::success([
                        'item' => $item,
                        'translations' => $translations,
                    ]);
                },
            ],

            'create' => [
                'rules' => [],
                'action' => function ($request) {
                    $item = new BlogCategory;

                    $tmp = BlogCategory::orderBy('position', 'desc')->first();

                    if (empty($tmp)) {
                        $position = 0;
                    } else {
                        $position = $tmp->position + 1;
                    }

                    $item->position = $position;
                    $item->save();

                    $langs = Langs::getAll();

                    foreach ($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(
                            ContentTranslationsTypes::blog_category,
                            $item->id,
                            $lang
                        );

                        $content_translation->title = $request[$lang . '_title'];
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::blog_category,
                        $item->id
                    );

                    return Response::success([
                        'msg' => 'Jauns ieraksts ir pievienots!',
                        'item' => $item,
                        'translations' => $translations,
                        'blogCategories' => BlogCategories::get('lv'),
                    ]);
                },
            ],

            'update' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function ($request) {
                    $item = BlogCategory::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    $langs = Langs::getAll();

                    foreach ($langs as $lang) {
                        $content_translation = ContentTranslations::getContainer(
                            ContentTranslationsTypes::blog_category,
                            $item->id,
                            $lang
                        );

                        $content_translation->title = $request[$lang . '_title'];
                        $content_translation->save();
                    }

                    $translations = ContentTranslations::get(
                        $langs,
                        ContentTranslationsTypes::blog_category,
                        $item->id
                    );

                    return Response::success([
                        'msg' => 'Izmaiņas ir saglabātas!',
                        'item' => BlogCategory::find($item->id),
                        'translations' => $translations,
                        'blogCategories' => BlogCategories::get('lv'),
                    ]);
                },
            ],

            'delete' => [
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function ($request) {
                    $item = BlogCategory::find($request->id);

                    if (empty($item)) {
                        return Response::error("Item with id {$request->id} doesn't exist!");
                    }

                    if (BlogEntry::where('categories', 'like', "%[{$item->id}]%")->exists()) {
                        return Response::error("Ieraksts tiek izmantots!");
                    }

                    ContentTranslations::delete(
                        ContentTranslationsTypes::blog_category,
                        $item->id
                    );

                    BlogCategory::where('position', '>', $item->position)->decrement('position');

                    $item->delete();

                    return Response::success([
                        'msg' => 'Item is deleted!',
                        'blogCategories' => BlogCategories::get('lv'),
                    ]);
                },
            ],

            'reorder' => [
                'rules' => [
                    'ids' => 'required|string',
                ],
                'action' => function ($request) {
                    reorder($request->ids, BlogCategory::class);

                    return Response::success([
                        'msg' => 'Jaunās pozīcijas samainītas veiksmīgi',
                        'blogCategories' => BlogCategories::get('lv'),
                    ]);
                },
            ],

            'get_options' => [
                'rules' => [],
                'action' => function ($request) {
                    return Response::success([
                        'options' => BlogCategories::get('lv'),
                    ]);
                },
            ],
        ];

        return Response::parse($request, $actions);
    }
}