<?php
namespace App\Logic\Core;

use Illuminate\Support\Arr;
use App\Config\Authorization as Config;
use Hash;
use Password;
use Auth;
use Illuminate\Support\Str;

use App\Models\Core\User;
use App\Models\Core\SocialLoginProvider;

use App\Logic\Core\Log;
use App\Helpers\Core\DateHelper;
use App\Logic\Main\Users;
use App\Events\UserRegisteredEvent;



class Authorization
{
    /**
     * Get config
     *
     * @access public     
     * @return array
    */
    public static function getConfig() {
    //<editor-fold defaultstate="collapsed" desc="getConfig">
               
        $defaults = [
            'email' => [
                'enabled' => true,
                'emailConfirmation' => false,
                'resendEmailConfirmation' => false,
                'resetPassword' => false,  
                'maxAttempts' => 10,
                'blockTime' => '1 hour',
                
                'loginPage' => 'Main\AuthPagesController@login',
                'accountMergePage' => 'Main\AuthPagesController@accountMerge',
                'emailConfirmationAction' => 'Main\AuthPagesController@emailConfirmation',
                'passwordResetAction' => 'Main\AuthPagesController@passwordReset',
            ],
            'social' => [
                'google' => false,
                'facebook' => false,
                'linkedin' => false,
                'merge' => false,
            ],
            
        ];  
        
        $config = Config::get();        
        
        $merged = collect($defaults)->merge($config)->all();
        
        return $merged;        
    //</editor-fold>
    }  
    
    /**
     * Get redirect url user after login
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user
     * @return string
     */
    public static function getRedirect($user) {
    //<editor-fold defaultstate="collapsed" desc="getRedirect">
        return Users::getRedirectAfterLogin($user);
    //</editor-fold>  
    }

    # ========================================================================#
    #
    #                           Email
    #    
    # ========================================================================#    
 
    /**
     * Attempt login with email and password
     *
     * @access public           
     * @param  string $param - param name 
     * @return null or \App\Models\Core\User
    */
    public static function attempt($email, $password) {
    //<editor-fold defaultstate="collapsed" desc="attempt">
        $config = self::getConfig();
        
        $maxAttempts = Arr::get($config, 'email.maxAttempts');
        $blockTime = Arr::get($config, 'email.blockTime');
        
        $user = User::where('email', $email)
                ->where('can_login_with_email', 1)
                ->where('email_confirmed', 1)
                ->where('active', 1)
                ->first();
        
        
        if (empty($user)) {
            return null;
        }
        
        //check if user is blocked
        if ($user->blocked) {
            if (strtotime($user->block_end_time) <= time()) {
                //unblock
                $user->blocked = false;
                $user->failed_attempts = 0;
                $user->block_end_time = null;                
                $user->save();
                
                $log_description = [
                    'user_id' => $user->id,
                    'user_name' => $user->email, 
                ];
                
                Log::security('user_is_unblocked', $log_description);                                  
            }
            else{
                //user is still blocked
                return null;
            }
        }
                        
        if (!Hash::check($password, $user->password)) { 
            
            //increase failed login attempts            
            if ($user->failed_attempts >= $maxAttempts) {
                //block 
                $user->failed_attempts = $user->failed_attempts + 1;
                $user->blocked = 1;
                $user->block_end_time = date("Y-m-d H:i:s",  strtotime("+ {$blockTime}"));
                
                $user->save();

                $log_description = [ 
                    'user_id' => $user->id,
                    'user_name' => $user->email,
                ];
                Log::security('user_is_blocked', $log_description);   
            }
            else {                
                $user->increment('failed_attempts');
                                
                $log_description = [ 
                    'user_id' => $user->id,
                    'user_name' => $user->email,
                ];
                Log::security('failed_login_attempt', $log_description);
            }   
            
            return null;
        }
        
        $user->last_login = DateHelper::getDateTime();
        $user->failed_attempts = 0;            
        $user->save();
        
        return $user;
    //</editor-fold>
    }  
    
    /**
     * Send email confirmation email
     *
     * @access public           
     * @param  \App\Models\Core\User - $user
     * @param  string $lang - language
     * @return void
     */
    public static function sendEmailConfirmation($user, $lang = null) {
    //<editor-fold defaultstate="collapsed" desc="sendEmailConfirmation">    
        if ($lang !== null) {
            $current_locale = app()->getLocale();
            app()->setLocale($lang);
        }     
                
        $confirmationCode = Str::random(30);
                
        $user->email_confirmation_code = $confirmationCode;
        $user->save();
        
        $user->sendConfirmEmailNotification($confirmationCode);  
        
        if ($lang !== null) {
            app()->setLocale($current_locale);
        }        
    //</editor-fold>      
    }
        
    /**
     * Send reset password email
     *
     * @access public           
     * @param  \App\Models\Core\User - $user
     * @param  string $lang - language
     * @return string
     */
    public static function sendResetPassword($user, $lang = null) {
    //<editor-fold defaultstate="collapsed" desc="sendResetPassword">    
        if ($lang !== null) {
            $current_locale = app()->getLocale();
            app()->setLocale($lang);
        }     
                
        $result = Password::broker()->sendResetLink(['email' => $user->email]);  
        
        if ($lang !== null) {
            app()->setLocale($current_locale);
        }       
        
        return $result;
    //</editor-fold>      
    }
    
    /**
     * Reset password
     *
     * @access public           
     * @param  string $email - email 
     * @param  string $password - password
     * @param  string $password_confirmation - password_confirmation
     * @param  string $token - token 
     * @return string
     */
    public static function resetPassword($email, $password, $password_confirmation, $token) {
    //<editor-fold defaultstate="collapsed" desc="resetPassword">
        return Password::broker()->reset([
                'email' => $email,
                'password' => $password,
                'password_confirmation' => $password_confirmation,
                'token' => $token,
            ], function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                    'remember_token' => null,
                ])->save();
                Auth::login($user, true);
            }
        );
    //</editor-fold>  
    }
    
    
    /**
     * Trigger user registered event
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user 
     * @return void
     */
    public static function triggerUserRegisteredEvent($user) {
    //<editor-fold defaultstate="collapsed" desc="triggerUserRegisteredEvent">
        event(new UserRegisteredEvent($user));
    //</editor-fold>  
    }    
    
    # ========================================================================#
    #
    #                           Social
    #    
    # ========================================================================#    
    
    /**
     * Social login
     *
     * @access public           
     * @param  string $provider - social provider
     * @param  array $user_data - user data
     * @return \App\Models\Core\User
     */
    public static function socialLogin($provider, $user_data) {
    //<editor-fold defaultstate="collapsed" desc="loginWithGoogle">
        $check = SocialLoginProvider::whereProviderAndSocialId($provider, $user_data['id'])->first();
        
        if (empty($check)) {
            return self::socialRegistration($provider, $user_data);
        }
        else {
            $user = $check->user;
            
            if (!$user->active) {
                //user is banned;
                abort(500);
            }
            
            $user->last_login = DateHelper::getDateTime();
            $user->save();
            
            return $user;
        }        
    //</editor-fold>  
    }
    
    /**
     * Social registration
     *
     * @access public           
     * @param  string $provider - social provider
     * @param  array $user_data - user data
     * @return \App\Models\Core\User
     */
    public static function socialRegistration($provider, $user_data) {
    //<editor-fold defaultstate="collapsed" desc="socialRegistration">
        $user = Users::create($user_data['email'], $user_data);
        
        $social_provider = new SocialLoginProvider;
        $social_provider->provider = $provider;
        $social_provider->user_id = $user->id;
        $social_provider->social_id = $user_data['id'];
        $social_provider->extra_data = $user_data['original'];
        $social_provider->save();        
        
        Authorization::triggerUserRegisteredEvent($user);
        
        return $user;
    //</editor-fold>  
    }
    
    /**
     * Get google user
     *
     * @access public           
     * @param  array $google_user - user 
     * @return array
     */
    public static function getGoogleUser($google_user) {
    //<editor-fold defaultstate="collapsed" desc="getGoogleUser">
        $user_data = [];
        
        $id = Arr::get($google_user, 'id');
        
        if (empty($id)) {
            
            Log::error('getGoogleUser_no_id',[                
                'google_user' => $google_user
            ]);
            abort(500);
        }
        
        $user_data['id'] = $id;
        $user_data['email'] = Arr::get($google_user, 'email');
        
        if (empty($user_data['email'])) {
            $user_data['email'] = "google_{$id}@mail.com";
            $user_data['no_email'] = true;
        }  
        
        $user_data['avatar'] = Arr::get($google_user, 'avatar_original');
        $user_data['gender'] = Arr::get($google_user, 'user.gender');
        
        $tmp = explode(" ", Arr::get($google_user, 'name', ''));
        $user_data['name'] = isset($tmp[0]) ? $tmp[0] : '';
        $user_data['surname'] = isset($tmp[1]) ? $tmp[1] : '';
                        
        $user_data['original'] = $google_user;
        
        return $user_data;
    //</editor-fold>  
    }    

    /**
     * Get facebook user
     *
     * @access public           
     * @param  array $facebook_user - user 
     * @return array
     */
    public static function getFacebookUser($facebook_user) {
    //<editor-fold defaultstate="collapsed" desc="getFacebookUser">
        $user_data = [];
        
        $id = Arr::get($facebook_user, 'id');
        
        if (empty($id)) {
            
            Log::error('getFacebookUser_no_id',[                
                'facebook_user' => $facebook_user
            ]);
            abort(500);
        }
        
        $user_data['id'] = $id;
        $user_data['email'] = Arr::get($facebook_user, 'email');
        
        if (empty($user_data['email'])) {
            $user_data['email'] = "facebook_{$id}@mail.com";
            $user_data['no_email'] = true;
        }        
        
        $user_data['avatar'] = Arr::get($facebook_user, 'avatar_original');
        $user_data['gender'] = Arr::get($facebook_user, 'user.gender');
        
        $tmp = explode(" ", Arr::get($facebook_user, 'name', ''));
        $user_data['name'] = isset($tmp[0]) ? $tmp[0] : '';
        $user_data['surname'] = isset($tmp[1]) ? $tmp[1] : '';
                        
        $user_data['original'] = $facebook_user;
        
        return $user_data;
    //</editor-fold>  
    }
    
    /**
     * Get linkedin user
     *
     * @access public           
     * @param  array $linkedin_user - user 
     * @return array
     */
    public static function getLinkedinUser($linkedin_user) {
    //<editor-fold defaultstate="collapsed" desc="getLinkedinUser">        
        $user_data = [];
        
        $id = Arr::get($linkedin_user, 'id');
        
        if (empty($id)) {
            
            Log::error('getLinkedinUser_no_id',[                
                'linkedin_user' => $linkedin_user
            ]);
            abort(500);
        }
        
        $user_data['id'] = $id;
        $user_data['email'] = Arr::get($linkedin_user, 'email');
        
        if (empty($user_data['email'])) {
            $user_data['email'] = "linkedin_{$id}@mail.com";
            $user_data['no_email'] = true;
        }        
        
        $user_data['avatar'] = Arr::get($linkedin_user, 'avatar_original');
        $user_data['gender'] = Arr::get($linkedin_user, 'user.gender');
        
        $tmp = explode(" ", Arr::get($linkedin_user, 'name', ''));
        $user_data['name'] = isset($tmp[0]) ? $tmp[0] : '';
        $user_data['surname'] = isset($tmp[1]) ? $tmp[1] : '';
                        
        $user_data['original'] = $linkedin_user;
        
        return $user_data;
    //</editor-fold>  
    }
    
    # ========================================================================#
    #
    #                           Account merge
    #    
    # ========================================================================# 
    
    
    /**
     * Complete merge
     *
     * @access public           
     * @param  string $provider - social provider
     * @param  array $user_data - social user data 
     * @return mixed redirect string or false
     */
    public static function checkMerge($provider, $user_data) {
    //<editor-fold defaultstate="collapsed" desc="checkMerge">
        
        $account_merge = session()->pull('account_merge');
        
        $account_merge_check = true;
        
        if (!empty($account_merge) && $account_merge['type'] === $provider) {
            
            $check = SocialLoginProvider::whereProviderAndSocialId($provider, $user_data['id'])->first();

            if (empty($check)) {
                $account_merge_check = true;
            }
            else {
                $user = $check->user;
                if ($user->id === $account_merge['user_id']) {
                    self::mergeCompleted($user, $account_merge['provider'], $account_merge['user_data']);
                    $account_merge_check = false;
                }
                else {
                    $account_merge_check = true;
                }
            }
                        
        }
        
        if ($account_merge_check) {
            
            $user = User::whereEmail($user_data['email'])->first();
            
            if (!empty($user)) {
                                
                $socialproviders = $user->socialProviders;
                
                foreach ($socialproviders as $socialprovider) {
                    if ($socialprovider->provider === $provider) {
                        return false;
                    }
                }
                
                if ($user->can_login_with_email) {
                    if ($user->email_confirmed) {
                        return self::startMerge($user, 'password', $provider, $user_data);
                    }
                    else {
                        $user->can_login_with_email = false;
                        $user->password = null;
                        $user->email_confirmation_code = null;
                        $user->save();
                        
                        self::mergeCompleted($user, $provider, $user_data);
                        Auth::login($user, true);
        
                        return Authorization::getRedirect($user);
                    }
                }
                else {
                    $socialprovider = $socialproviders->first();
                    return self::startMerge($user, $socialprovider->provider, $provider, $user_data);
                }
            }
            
            
        }
        
        
        return false;
    //</editor-fold>  
    }
    
    /**
     * Start merge
     *
     * @access public           
     * @param  \App\Models\Core\User $user - user
     * @param  string $type - merge type 
     * @param  string $provider - social provider
     * @param  array $user_data - user data from social provider
     * @return string
     */
    public static function startMerge($user, $type, $provider, $user_data) {
    //<editor-fold defaultstate="collapsed" desc="startMerge">
        session()->put('account_merge', [
            'user_id' => $user->id,
            'email' => $user->email,
            'type' => $type,
            'provider' => $provider,
            'user_data' => $user_data,
        ]);
        
        $config = Authorization::getConfig();
        
        if ($type === 'password') {
            $action = Arr::get($config, 'email.accountMergePage');
            return action($action, ['lang' => config('app.locale')]);
        }
        else {
            if ($type === 'facebook') {
                return url('login_with_facebook');
            }
            else if ($type === 'linkedin') {
                return url('login_with_linkedin');
            }
            else {
                return url('login_with_google');
            }
        }
    //</editor-fold>  
    }
    
    /**
     * Complete merge
     *
     * @access public  
     * @param  \App\Models\Core\User $user - user
     * @param  string $provider - social provider 
     * @param  array $user_data - social user data 
     * @return void
     */
    public static function mergeCompleted($user, $provider, $user_data) {
    //<editor-fold defaultstate="collapsed" desc="mergeCompleted">
        $social_provider = new SocialLoginProvider;
        $social_provider->provider = $provider;
        $social_provider->user_id = $user->id;
        $social_provider->social_id = $user_data['id'];
        $social_provider->extra_data = $user_data['original'];
        $social_provider->save();  
    //</editor-fold>  
    }

    
}