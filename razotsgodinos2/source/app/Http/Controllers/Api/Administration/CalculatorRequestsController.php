<?php

namespace App\Http\Controllers\Api\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use Illuminate\Support\Facades\DB;

class CalculatorRequestsController extends Controller
{
    public function search(Request $request)
    {
        $query = DB::connection('main')->table('calculator_requests as c');

        $columns = [
            'c.id'            => 'id',
            'c.category_code' => 'category_code',
            'c.calc'          => 'calc',
            'c.total'         => 'total',
            'c.nickname'      => 'nickname',
            'c.phone'         => 'phone',
            'c.email'         => 'email',
            'c.message'       => 'message',
            'c.privacy'       => 'privacy',
        ];

        $filters = [];

        $filters['id'] = fn($q,$v) => $q->where('c.id', (int)$v);
        $filters['email'] = fn($q,$v) => $q->where('c.email','like',"%$v%");
        $filters['phone'] = fn($q,$v) => $q->where('c.phone','like',"%$v%");
        $filters['nickname'] = fn($q,$v) => $q->where('c.nickname','like',"%$v%");
        $filters['category_code'] = fn($q,$v) => $q->where('c.category_code','like',"%$v%");
        $filters['privacy'] = fn($q,$v) => $q->where('c.privacy', (int)$v);

        $options = [
            'results_per_page' => 10,
            'order' => ['c.id' => 'desc']
        ];

        $params = DataSource::parseRequest($request);

        return Response::success(
            DataSource::get($params, $query, $columns, $filters, [], $options)
        );
    }

    public function actions(Request $request)
    {
        $actions = [

            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($r) {
                    $item = DB::connection('main')
                        ->table('calculator_requests')
                        ->where('id', (int)$r->id)
                        ->first();

                    if (!$item)
                        return Response::error("Row not found");

                    return Response::success(['item' => (array)$item]);
                },
            ],

            'delete' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($r) {
                    DB::connection('main')
                        ->table('calculator_requests')
                        ->where('id', (int)$r->id)
                        ->delete();

                    return Response::success(['msg' => 'Deleted']);
                },
            ],

        ];

        return Response::parse($request, $actions);
    }
}