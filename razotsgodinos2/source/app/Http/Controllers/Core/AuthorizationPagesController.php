<?php

namespace App\Http\Controllers\Core;

use Illuminate\Support\Arr;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Helpers\Core\MetaHelper;

use Auth;
use App\Logic\Core\Response;
use Socialite;
use App\Logic\Core\Authorization;
use App\Events\UserBeforeLogoutEvent;
use App\Events\UserLoggedOutEvent;

class AuthorizationPagesController extends Controller
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
    * @return view
    */
    public function login(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="login"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'email.enabled')) {
            abort(404);
        }
        
        MetaHelper::setTitle('Login');   
        
        $view_data = [
            
        ];        
        
        return view('public.login', $view_data);       
    //</editor-fold>
    }        
            
    /**
    * Redirect to admin panel
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function admin(Request $request){
    //<editor-fold defaultstate="collapsed" desc="admin">     
        $auth_user = auth()->user();
        
        if (empty($auth_user)) {
            return redirect('/login');
        }
        
        return redirect('/'); 
    //</editor-fold>    
    }
        
    /**
    * Redirect to user login
    *
    * @access public             
    * @return view
    */
    public function userLogin(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="userLogin">  
       return redirect(app()->getLocale().'/login');   
    //</editor-fold>
    }        
        
    /**
    * Log user out
    *
    * @access public       
    * @return void 
    */
    public function logout(){ 
    //<editor-fold defaultstate="collapsed" desc="logout">  
        $user = auth()->user();
        
        if (!empty($user)) {
            event(new UserBeforeLogoutEvent($user));
        }
        
        Auth::logout();
        
        if (!empty($user)) {
            event(new UserLoggedOutEvent($user));
        }
                
        $response = [
            'redirect' => '/',
            'msg' => 'Logged out! Redirecting...'
        ];
        
        return Response::success($response);        
    //</editor-fold>    
    }
    
    /**
    * Login with google
    *
    * @access public             
    * @return view
    */
    public function loginWithGoogle(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="loginWithGoogle">
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'social.google')) {
            abort(404);
        }
        
        return Socialite::driver('google')->redirect();              
    //</editor-fold>
    }    
    
    /**
    * Login with facebook
    *
    * @access public             
    * @return view
    */
    public function loginWithFacebook(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="loginWithFacebook"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'social.facebook')) {
            abort(404);
        }
        
        return Socialite::driver('facebook')->redirect(); 
    //</editor-fold>
    }    
        
    /**
    * Login with linkedin
    *
    * @access public             
    * @return view
    */
    public function loginWithLinkedin(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="loginWithLinkedin"> 
        $config = Authorization::getConfig();
        
        if (!Arr::get($config, 'social.linkedin')) {
            abort(404);
        }
        
        return Socialite::driver('linkedin')->scopes(['r_liteprofile', 'r_emailaddress'])->redirect(); 
    //</editor-fold>
    }    

}