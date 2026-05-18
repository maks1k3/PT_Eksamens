<?php

namespace App\Http\Controllers\Api\Core;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use Auth;
use App\Logic\Core\Response;
use App\Logic\Core\Authorization;
use Password;
use App\Models\Core\User;
use App\Logic\Core\Log;
use Socialite;
use App\Events\UserLoggedInEvent;
use App\Events\UserBeforeLoginEvent;

class AuthorizationController extends Controller
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
    * Log user in with email/password
    *
    * @access public  
    * @param  string $login - users' email    
    * @param  string $password - users' password    
    * @return string json
    */
    public function loginWithEmail(Request $request){ 
    //<editor-fold defaultstate="collapsed" desc="loginWithEmail">  
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'email.enabled')) {
            abort(404);
        }
        
        //validation
        $rules = [            
            'email' => 'required|email',
            'password' => 'required|min:6',
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;        
                
        $user = Authorization::attempt($request->email, $request->password);
        
        if (empty($user)) {            
            return Response::error(trans('auth.login_failed'));              
        }               
        
        event(new UserBeforeLoginEvent($user));
                
        if ($request->remember_me !== null && $request->remember_me === '1') {
            Auth::login($user, true);
        }
        else {
            Auth::login($user);
        }
        
        event(new UserLoggedInEvent($user));
        
        $redirect = Authorization::getRedirect($user);
                
        $response = [
            'redirect' => $redirect,
            'msg' => trans('auth.login_success')
        ];
        
        return Response::success($response);        
    //</editor-fold>  
    }    
    
    /**
    * Log user with google
    *
    * @access public    
    * @return string json
    */
    public function loginWithGoogle(Request $request){ 
    //<editor-fold defaultstate="collapsed" desc="loginWithGoogle"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'social.google')) {
            abort(404);
        }
        
        $google_user = null;
        
        try {
            
            $google_user = Socialite::driver('google')->user();
            
        } catch (\Exception $ex) {
            Log::error('loginWithGoogle_failed',[
                'request' => $request, 
                'error' => $ex,
                'google_user' => $google_user
            ]);
            abort(500);
        }       
        
        $user_data = Authorization::getGoogleUser((array)$google_user);  
        
        $redirect = Authorization::checkMerge('google', $user_data);
        
        if ($redirect !== false) {
            return redirect($redirect);
        }
        
        $user = Authorization::socialLogin('google', $user_data);
        
        event(new UserBeforeLoginEvent($user));
        
        Auth::login($user, true);
        
        event(new UserLoggedInEvent($user));
        
        $redirect = Authorization::getRedirect($user);
        
        return redirect($redirect);
    //</editor-fold>  
    }   
    
    /**
    * Log user with facebook
    *
    * @access public    
    * @return string json
    */
    public function loginWithFacebook(Request $request){ 
    //<editor-fold defaultstate="collapsed" desc="loginWithFacebook"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'social.facebook')) {
            abort(404);
        }
        
        $facebook_user = null;
        
        try {
            
            $facebook_user = Socialite::driver('facebook')->user();
            
        } catch (\Exception $ex) {
            
            Log::error('loginWithFacebook_failed',[
                'request' => $request, 
                'error' => $ex,
                'facebook_user' => $facebook_user
            ]);
            abort(500);
        }
                
        $user_data = Authorization::getFacebookUser((array)$facebook_user);
        
        $redirect = Authorization::checkMerge('facebook', $user_data);
        
        if ($redirect !== false) {
            return redirect($redirect);
        }
        
        $user = Authorization::socialLogin('facebook', $user_data);
        
        event(new UserBeforeLoginEvent($user));
        
        Auth::login($user, true);
        
        event(new UserLoggedInEvent($user));
        
        $redirect = Authorization::getRedirect($user);
        
        return redirect($redirect);
    //</editor-fold>  
    }      
    
    /**
    * Log user with linkedin
    *
    * @access public    
    * @return string json
    */
    public function loginWithLinkedin(Request $request){ 
    //<editor-fold defaultstate="collapsed" desc="loginWithLinkedin"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'social.linkedin')) {
            abort(404);
        }
        
        $linkedin_user = null;
        
        try {
            
            $linkedin_user = Socialite::driver('linkedin')->user();
            
        } catch (\Exception $ex) {
            
            Log::error('loginWithLinkedin_failed',[
                'request' => $request, 
                'error' => $ex,
                'facebook_user' => $linkedin_user
            ]);
            abort(500);
        }
                
        $user_data = Authorization::getLinkedinUser((array)$linkedin_user);
        
        $redirect = Authorization::checkMerge('linkedin', $user_data);
        
        if ($redirect !== false) {
            return redirect($redirect);
        }
        
        $user = Authorization::socialLogin('linkedin', $user_data);
        
        event(new UserBeforeLoginEvent($user));
        
        Auth::login($user, true);
        
        event(new UserLoggedInEvent($user));
        
        $redirect = Authorization::getRedirect($user);
        
        return redirect($redirect);
    //</editor-fold>  
    }      
    
    /**
    * Authorization actions
    *
    * @access public
    * @return json 
    */
    public function actions(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="actions">
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'email.enabled')) {
            abort(404);
        }
        
        
        $actions = [
            
            //confirm_email
            'confirm_email' => [        
                'rules' => [
                    'code' => 'required',
                ],
                'action' => function($request) use ($config) {
                //<editor-fold defaultstate="collapsed" desc="confirm_email"> 
                    if (!Arr::get($config, 'email.emailConfirmation')) {
                        abort(404);
                    }
            
                    $user = User::where('email_confirmation_code', $request->code)
                                ->where('can_login_with_email', 1)
                                ->where('email_confirmed', 0)
                                ->where('active', 1)
                                ->first();
                    
                    if (empty($user)) {
                        return Response::error(trans('auth.confirm_email_failed'));                        
                    }                    
                    
                    $user->email_confirmed = true;
                    $user->email_confirmation_code = null;
                    $user->save();
                    
                    return Response::success([
                        'msg' => trans('auth.confirm_email_success'),
                    ]);
                //</editor-fold>     
                },
            ],                

            //resend_email_confirmation
            'resend_email_confirmation' => [        
                'rules' => [
                    'email' => 'required|email',
                ],
                'action' => function($request) use ($config) {
                //<editor-fold defaultstate="collapsed" desc="resend_email_confirmation"> 
                    if (!Arr::get($config, 'email.resendEmailConfirmation')) {
                        abort(404);
                    }
            
                    $user = User::where('email', $request->email)
                                ->where('can_login_with_email', 1)
                                ->where('email_confirmed', 0)
                                ->where('active', 1)
                                ->first();                    
                    
                    if (empty($user)) {
                        return Response::error(trans('auth.resend_email_confirmation_failed', ['email' => $request->email]));                        
                    }
                    
                    Authorization::sendEmailConfirmation($user);
                    
                    return Response::success([
                        'msg' => trans('auth.resend_email_confirmation_success'),
                    ]);
                //</editor-fold>     
                },
            ],    
                        
            //send_reset_password_email
            'send_reset_password_email' => [        
                'rules' => [
                    'email' => 'required|email',
                ],
                'action' => function($request) use ($config) {
                //<editor-fold defaultstate="collapsed" desc="send_reset_password_email"> 
                    if (!Arr::get($config, 'email.resetPassword')) {
                        abort(404);
                    }
                    
                    $user = User::where('email', $request->email)
                                ->where('can_login_with_email', 1)
                                ->where('email_confirmed', 1)
                                ->where('active', 1)
                                ->first();                    
                    
                    if (empty($user)) {
                        return Response::error(trans('auth.send_reset_password_email_failed', ['email' => $request->email]));                        
                    }
                    
                    Authorization::sendResetPassword($user);
                    
                    return Response::success([
                        'msg' => trans('auth.send_reset_password_email_success'),
                    ]);
                //</editor-fold>     
                },
            ],       
                        
            //reset_password
            'reset_password' => [        
                'rules' => [
                    'email' => 'required|email',
                    'password' => 'required|min:6',                                       
                    'password_confirmation' => 'required|min:6',
                    'token' => 'required',
                ],
                'action' => function($request) use ($config) {
                //<editor-fold defaultstate="collapsed" desc="reset_password"> 
                    if (!Arr::get($config, 'email.resetPassword')) {
                        abort(404);
                    }
                    
                    $result = Authorization::resetPassword(
                            $request->email, 
                            $request->password, 
                            $request->password_confirmation, 
                            $request->token
                    );
                    
                    if ($result === Password::PASSWORD_RESET) {
                        
                        $redirect = Authorization::getRedirect(auth()->user());
                        
                        return Response::success([                            
                            'redirect' => $redirect,
                            'msg' => trans($result)
                        ]);                          
                    }
                    else {
                        return Response::error([
                            'msg' => trans($result)
                        ]);                       
                    }  
                //</editor-fold>     
                },
            ],   
                        
            //merge_account_with_password
            'merge_account_with_password' => [        
                'rules' => [                    
                    'password' => 'required|min:6', 
                ],
                'action' => function($request) use ($config) {
                //<editor-fold defaultstate="collapsed" desc="merge_account_with_password"> 
                    $account_merge = session()->pull('account_merge');
                    if (empty($account_merge) || Arr::get($account_merge, 'type') !== 'password') {
                        abort(404);
                    }
                    
                    $email = User::find($account_merge['user_id'])->email;
                                        
                    $user = Authorization::attempt($email, $request->password);
        
                    if (empty($user)) {            
                        return Response::error(trans('auth.login_failed'));              
                    }       
                    
                    Authorization::mergeCompleted($user, $account_merge['provider'], $account_merge['user_data']);
                    
                    Auth::login($user, true);
                    $redirect = Authorization::getRedirect($user);
                        
                    return Response::success([                            
                        'redirect' => $redirect,
                        'msg' => trans('auth.login_success')
                    ]);   
                //</editor-fold>     
                },
            ],                 
                        

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}