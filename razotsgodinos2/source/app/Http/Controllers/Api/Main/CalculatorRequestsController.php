<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Logic\Core\Response;

class CalculatorRequestsController extends Controller
{
   
    private function translateCalc($calc): array
    {
        $order = [
            'area',
            'pamati',
            'grida',
            'sienas',
            'krasots',
            'jumts',
            'vizualizacija',
        ];

        $keyMap = [
            'area'          => 'Platība (m²)',
            'pamati'        => 'Pamati',
            'grida'         => 'Grīda',
            'sienas'        => 'Sienas',
            'krasots'       => 'Krāsots',
            'jumts'         => 'Jumts',
            'vizualizacija' => 'Vizualizācija',
        ];

        $valueMap = [
            'yes'      => 'Jā',
            'no'       => 'Nē',
            'bloku'    => 'Bloku',
            'betoneti' => 'Betonēti',
            'skruvpali'=> 'Skrūvpāļi',
            'sindelis' => 'Šindelis',
            'metala'   => 'Metāla',
        ];

        if (is_object($calc)) {
            $calc = (array)$calc;
        }
        if (!is_array($calc)) {
            return [];
        }

        $translated = [];

        foreach ($order as $k) {
            if (!array_key_exists($k, $calc)) continue;

            $label = $keyMap[$k] ?? $k;
            $val = $calc[$k];

            if (is_string($val) && isset($valueMap[$val])) {
                $val = $valueMap[$val];
            }

            $translated[$label] = $val;
            unset($calc[$k]);
        }

        foreach ($calc as $k => $val) {
            $label = $keyMap[$k] ?? $k;

            if (is_string($val) && isset($valueMap[$val])) {
                $val = $valueMap[$val];
            }

            $translated[$label] = $val;
        }

        return $translated;
    }

    public function send(Request $request)
    {
        $data = $request->validate([
            'category_code' => 'required|string|max:100',
            'calc'          => 'required',          
            'total'         => 'required|numeric',
            'nickname'      => 'required|string|max:255',
            'phone'         => 'required|string|max:50',
            'email'         => 'required|email|max:255',
            'message'       => 'nullable|string',
            'privacy'       => 'required|boolean',
        ]);

        $calc = $data['calc'];

        if (!is_array($calc) && !is_object($calc)) {
            $decoded = json_decode((string)$calc, true);
            $calc = $decoded ?? [];
        }

        $calcLv = $this->translateCalc($calc);

        $id = DB::connection('main')->table('calculator_requests')->insertGetId([
            'category_code' => $data['category_code'],
            'calc'          => json_encode($calcLv, JSON_UNESCAPED_UNICODE),
            'total'         => (float)$data['total'],
            'nickname'      => $data['nickname'],
            'phone'         => $data['phone'],
            'email'         => $data['email'],
            'message'       => $data['message'] ?? null,
            'privacy'       => (int)$data['privacy'],
        ]);

        return Response::success(['id' => $id]);
    }
}