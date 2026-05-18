<?php
namespace App\Http\Controllers\Main;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Authorization;
use App\Logic\Core\Store;
use App\Helpers\Core\MetaHelper;
use App\Models\Core\User;

class AuthPagesController extends Controller
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
    * Login page
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function login($lang) {
    //<editor-fold defaultstate="collapsed" desc="login">  
        $state = [];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'login';
        
        MetaHelper::setTitle('Login');
        MetaHelper::setDescription('Description');
        
        
        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>    
    }
    
    /**
    * Registration page
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function registration($lang) {
    //<editor-fold defaultstate="collapsed" desc="registration">  
        $state = [];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'registration';
        
        MetaHelper::setTitle('Registration');
        MetaHelper::setDescription('Description');
        
        
        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>    
    }
    
    /**
    * Email confirmation
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function emailConfirmation($lang, $code) {
    //<editor-fold defaultstate="collapsed" desc="emailConfirmation">  
        $config = Authorization::getConfig();
        if (!Arr::get($config, 'email.emailConfirmation')) {
            abort(404);
        }
                
        $result = [
            'status' => false,
            'msg' => ''
        ];
        
        $user = User::where('email_confirmation_code', $code)
                    ->where('can_login_with_email', 1)
                    ->where('email_confirmed', 0)
                    ->where('active', 1)
                    ->first();

        if (empty($user)) {
            $result['msg'] = trans('auth.confirm_email_failed');                       
        }    
        else {
            $user->email_confirmed = true;
            $user->email_confirmation_code = null;
            $user->save(); 
            
            $result = [
                'status' => true,
                'msg' => trans('auth.confirm_email_success')
            ];
        }

       
        $state = [];

        $state['Page'] = [];        
        $state['Page']['current'] = 'email_confirmation';
        
        $state['EmailConfirmationPage'] = [
            'result' => $result
        ];

        MetaHelper::setTitle('Email confirmation');
        MetaHelper::setDescription('Description');

        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>    
    }
    
    /**
    * Resend email confirmation
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function resendEmailConfirmation($lang) {
    //<editor-fold defaultstate="collapsed" desc="resendEmailConfirmation">    
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'email.resendEmailConfirmation')) {
            abort(404);
        }
        
        $state = [];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'resend_email_confirmation';
        
        MetaHelper::setTitle('Resend email confirmation');
        MetaHelper::setDescription('Description');
        
        
        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>    
    }
    
    /**
    * Forgot password
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function forgotPassword($lang) {
    //<editor-fold defaultstate="collapsed" desc="forgotPassword"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'email.resetPassword')) {
            abort(404);
        }
        
        $state = [];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'forgot_password';
        
        MetaHelper::setTitle('Forgot password');
        MetaHelper::setDescription('Description');
        
        
        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>  
        
    }
    /**
    * Password reset
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function passwordReset($lang, $token) {
    //<editor-fold defaultstate="collapsed" desc="passwordReset"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'email.resetPassword')) {
            abort(404);
        }
                
        $state = [];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'password_reset';
        
        $state['PasswordResetPage'] = [
            'token' => $token
        ];
        
        MetaHelper::setTitle('Password reset');
        MetaHelper::setDescription('Description');
        
        
        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>    
    }
    
    /**
    * Account merge
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function accountMerge($lang) {
    //<editor-fold defaultstate="collapsed" desc="accountMerge"> 
                        
        $account_merge = session()->get('account_merge');
        
        if (empty($account_merge) || Arr::get($account_merge, 'type') !== 'password') {
            abort(404);
        }
        
        $state = [];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'account_merge';
        
        $state['AccountMergePage'] = [
            'email' => $account_merge['email']
        ];
        
        MetaHelper::setTitle('Account merge');
        MetaHelper::setDescription('Description');
        
        
        $state = Store::setState($lang, $state);

        return view('public.auth_pages', ['state' => $state]);
    //</editor-fold>    
    }
   
   
}
