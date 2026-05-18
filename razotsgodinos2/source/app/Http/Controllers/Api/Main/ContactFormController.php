<?php

namespace App\Http\Controllers\Api\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;

use Mail;

class ContactFormController extends Controller
{
    /**
    * Constructor
    *
    * @return void
    */
    public function __construct()
    {


    }
    
    /**
    * Method name
    *
    * @access public          
    * @param  int $id - item id    
    * @return string json
    {
        "msg"=>"Method response",        
    }
    */
    public function send(Request $request)
{
        
    $rules = [
        'nickname' => 'required|string|max:255',
        'phone' => 'required|string|max:50',
        'email' => 'required|email|max:255',
        'message' => 'required|string',
        'privacy' => 'required|boolean',
    ];

    $validate = Response::validate($request->all(), $rules);
    if ($validate) return $validate;

    $id = \DB::connection('main')->table('contact_form')->insertGetId([ 'nickname' => $request->nickname,
        'phone' => $request->phone,
        'email' => $request->email,
        'message' => $request->message,
        'privacy' => (int)$request->privacy,
    ]);
    
    return Response::success([
        'id' => $id,
        'msg' => 'OK',
    ]);
}
    
    public function final_send(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="final_send">
        $auth_user = auth()->user();  

        //validation
        $rules = [
//            'name' => 'required|string',
//            'email' => 'required|email',
//            'phone' => 'required|string',
//            'message' => 'required|string',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
        \App\Logic\Main\Expenses\ExpensesItems::sendOffer($request->expenses, $request->email, $request->full_name, $request->phone);
        
        $response = [
            'msg' => 'Your message is sent!',              
        ];

        return Response::success($response);          
    //</editor-fold>
    }
    
    public function contact_form(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="final_send">
        $auth_user = auth()->user();  

        //validation
        $rules = [
//            'name' => 'required|string',
//            'email' => 'required|email',
//            'phone' => 'required|string',
//            'message' => 'required|string',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
        $response = [
            'msg' => 'Your message is sent!',              
        ];

        return Response::success($response);          
    //</editor-fold>
    }

}//s