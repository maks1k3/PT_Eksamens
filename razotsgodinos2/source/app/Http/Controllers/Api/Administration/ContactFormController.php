<?php

namespace App\Http\Controllers\Api\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;

class ContactFormController extends Controller
{
    public function search(Request $request)
    {
        $query = DB::connection('main')->table('contact_form as c');

        $columns = [
            'c.id'       => 'id',
            'c.email'    => 'email',
            'c.nickname' => 'nickname',
            'c.phone'    => 'phone',
            'c.privacy'  => 'privacy',
            'c.message'  => 'message',
        ];

        $filters = [];
        $filters['id']       = fn($q, $v) => $q->where('c.id', (int)$v);
        $filters['email']    = fn($q, $v) => $q->where('c.email', 'like', '%' . trim((string)$v) . '%');
        $filters['nickname'] = fn($q, $v) => $q->where('c.nickname', 'like', '%' . trim((string)$v) . '%');
        $filters['phone']    = fn($q, $v) => $q->where('c.phone', 'like', '%' . trim((string)$v) . '%');
        $filters['privacy']  = fn($q, $v) => $q->where('c.privacy', (int)$v);
        $filters['message']  = fn($q, $v) => $q->where('c.message', 'like', '%' . trim((string)$v) . '%');

        $options = [
            'results_per_page' => 10,
            'order' => [
                'c.id' => 'desc',
            ],
        ];

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, [], $options);

        return Response::success($response);
    }

    public function actions(Request $request)
    {
        $actions = [

            'get' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($r) {
                    $item = DB::connection('main')
                        ->table('contact_form')
                        ->where('id', (int)$r->id)
                        ->first();

                    if (!$item) return Response::error('Row not found');

                    return Response::success(['item' => $item]);
                },
            ],

            'delete' => [
                'rules' => ['id' => 'required|integer'],
                'action' => function ($r) {
                    DB::connection('main')
                        ->table('contact_form')
                        ->where('id', (int)$r->id)
                        ->delete();

                    return Response::success(['msg' => 'Deleted']);
                },
            ],

            'form_data' => [
                'rules' => [],
                'action' => fn() => Response::success([]),
            ],
        ];

        if (!$request->filled('action')) $request->merge(['action' => 'form_data']);

        return Response::parse($request, $actions);
    }
}