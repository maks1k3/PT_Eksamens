<?php

namespace App\Http\Controllers\Api\Main;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Models\Core\User;
use App\Logic\Core\Translations;
use App\Logic\Main\Users;
use App\Logic\Core\Authorization;
use App\Logic\Core\ReCaptcha;

class RegistrationController extends Controller
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
    * Actions
    *
    * @access public
    * @return json 
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions">
        $auth_user = auth()->user(); 

        $actions = [

            'register_with_email' => [        
                'rules' => [
                    'email' => 'required|email',
                    'email_confirmation' => 'required|email',
                    'password' => 'required|min:6|',                                       
                    'password_confirmation' => 'required|min:6',
                    'captcha' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="register_with_email"> 
                    $check = User::where('email', $request->email)
                        //->where('can_login_with_email', 1)                                             
                        ->first();
                    
                    if (!empty($check)) {
                        return Response::error([
                            'msg' => Translations::get('email_address_is_already_in_use'),
                            'field' => 'email',                         
                        ]);                    
                    }
                    
                    if (!ReCaptcha::isValid($request->captcha)){
                        return Response::error("Captcha is incorrect!");
                    }
                    
                    $user = Users::create($request->email, []);
                    $user->password = bcrypt($request->password);
                    $user->can_login_with_email = true;
                    $user->email_confirmed = false;
                    $user->save();
                    
                    $config = Authorization::getConfig();
                    
                    if (Arr::get($config, 'email.emailConfirmation')) {
                        Authorization::sendEmailConfirmation($user);
                    }
                    
                    Authorization::triggerUserRegisteredEvent($user);

                    return Response::success([
                        'msg' => Translations::get('your_registration_is_successful_please_check_your_email_to_activate_your_account'),
                    ]);
                //</editor-fold>     
                },
            ],                      

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }    

}