<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;    
use DB;

use App\Models\Core\User;
use App\Models\Main\Profile;
use App\Logic\Core\Users;
use App\Helpers\Core\DateHelper;
use App\Logic\Core\User\Groups;
use App\Logic\Core\User\Permissions;
use Auth;

class UsersController extends Controller
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
    * Search
    *
    * @access public
    * @return json
    */
    public function search(Request $request) {
    //<editor-fold defaultstate="collapsed" desc="search">    
        $query = DB::connection('main')->table('users as u');

        //columns       
        $columns = [
            'u.id' => 'id',            
            'u.email' => 'email',
            'p.name' => 'name',
            'p.surname' => 'surname',
            'u.last_activity' => 'last_activity',
            'u.active' => 'active',
            'u.blocked' => 'blocked',
            'u.user_groups' => 'user_groups',
            'u.user_permissions' => 'user_permissions',
        ];
        
        $query->leftJoin('profile as p','p.user_id', '=', 'u.id');
        
        # ========================================================================#
        #
        #                           Formatters
        #    
        # ========================================================================#    

        $formatters = [];
        
        $formatters['user_groups'] = function($value, $row) {            
            return implode(', ', extractTags($value));
        };
        
        $formatters['user_permissions'] = function($value, $row) {            
            return implode(', ', extractTags($value));
        };

        # ========================================================================#
        #
        #                           Filters
        #    
        # ========================================================================#  
        $filters = [];

        //override multi column search
        $filters['id'] = function($query, $value) {
            $query->where('u.id', '=', $value);
        };

        //special filters
        $filters['select_active'] = function($query, $value) {
            $query->where('u.active', '=' , $value);
        }; 
        
        $filters['select_blocked'] = function($query, $value) {
            $query->where('u.blocked', '=' , $value);
        };    
        
        $filters['select_user'] = function($query, $value) {
            $query->where('u.id', '=', $value);
        };    
        
        $filters['date_from'] = function($query, $value) {
            $query->where('u.last_activity', '>=' , $value.' 00:00:00');
        };    

        $filters['date_to'] = function($query, $value) {
            $query->where('u.last_activity', '<=' , $value.' 23:59:59');
        };         

        $options = [
            'results_per_page' => 10,
            'order' => [
                'u.id' => 'desc',
            ]
        ];       

        $params = DataSource::parseRequest($request);
        $response = DataSource::get($params, $query, $columns, $filters, $formatters, $options);

        return Response::success($response);       
    //</editor-fold>
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
            
            
            'get' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $user = User::find($request->id);
                    
                    if (empty($user)) {
                        return Response::error("User with id {$request->id} doesn't exist!");                        
                    }                       
                    
                    return Response::success([              
                        'user' => $user->toArray(),
                        'profile' => $user->profile,
                        'providers' => $user->socialProviders,
                    ]);                
                //</editor-fold>     
                },
            ],      

            //create
            'create' => [        
                'rules' => [
                    'email' => 'required|email',                         
                    'name' => 'required|string',                         
                    'surname' => 'required|string',  
                    'password' => 'required|min:6',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create"> 
                    if (!empty(User::whereEmail($request->email)->first())) {
                        return Response::error([
                            'msg' => 'Email is in use!',
                            'field' => 'email',                         
                        ]);
                    }   
                    
                    if (!empty($request->groups)) {
                        $request->groups = explode(',',$request->groups);
                        
                        if (!Groups::areValid($request->groups)) {
                            return Response::error("Not valid groups");
                        }
                    }
                    else {
                        $request->groups = [];
                    } 
                    
                    if (!empty($request->permissions)) {
                        $request->permissions = explode(',',$request->permissions);
                        
                        if (!Permissions::areValid($request->permissions)) {
                            return Response::error("Not valid permissions");
                        }
                    }
                    else {
                        $request->permissions = [];
                    } 
                    
                    $user = new User;
                    $user->email = $request->email;   
                    $user->password = bcrypt($request->password);
                    $user->can_login_with_email = true;
                    $user->email_confirmed = true;
                    $user->reg_date = DateHelper::getDateTime();
                    $user->active = true;
                    $user->user_groups = $request->groups;
                    $user->user_permissions = $request->permissions;
                    $user->save();    
                    
                    Users::updateUserToken($user);
                    
                    $profile = new Profile;      
                    $profile->user_id = $user->id; 
                    $profile->completed = true;
                    $profile->name = $request->name;
                    $profile->surname = $request->surname;
                    $profile->save();
                    

                    return Response::success([
                        'id' => $user->id,
                        'msg' => "User {$user->email} created!"
                    ]);                    
                //</editor-fold>     
                },
            ],       

            //update
            'update' => [        
                'rules' => [
                    'id' => 'required|integer',
                    'name' => 'required|string',                         
                    'surname' => 'required|string', 
                    'active' => 'present|boolean', 
                    'blocked' => 'present|boolean', 
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update"> 
                    $user = User::find($request->id);
                    if (empty($user)) {
                        return Response::error("User with id {$request->id} doesn't exist!");                        
                    }      
                    
                    if (!empty($request->groups)) {
                        $request->groups = explode(',',$request->groups);
                        
                        if (!Groups::areValid($request->groups)) {
                            return Response::error("Not valid groups");
                        }
                    }
                    else {
                        $request->groups = [];
                    } 
                    
                    if (!empty($request->permissions)) {
                        $request->permissions = explode(',',$request->permissions);
                        
                        if (!Permissions::areValid($request->permissions)) {
                            return Response::error("Not valid permissions");
                        }
                    }
                    else {
                        $request->permissions = [];
                    } 
                                       
                    $user->active = !!$request->active;
                    $user->blocked = !!$request->blocked;
                    $user->user_groups = $request->groups;
                    $user->user_permissions = $request->permissions;
                    $user->save();
                    
                    $user->profile->name = $request->name;
                    $user->profile->surname = $request->surname;
                    $user->profile->save();
                    
                    
                    return Response::success([
                        'msg' => "User {$user->email} is updated!",
                        'user' => $user->toArray(),
                        'profile' => $user->profile,
                    ]);
                //</editor-fold>     
                },
            ],         
                        
            //change_password
            'change_password' => [        
                'rules' => [
                    'id' => 'required|integer',
                    'password' => 'required|min:6', 
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="change_password"> 
                    $user = User::find($request->id);
                    if (empty($user)) {
                        return Response::error("User with id {$request->id} doesn't exist!");                        
                    }     
                    
                    $user->password = bcrypt($request->password);
                    $user->save();
                    
                    
                    return Response::success("User {$user->email} password is updated!");                   
                //</editor-fold>     
                },
            ], 
                        
            //delete
            'delete' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete"> 
                    $user = User::find($request->id);
                    
                    if (empty($user)) {
                        return Response::error("User with id {$request->id} doesn't exist!");                        
                    }    

                    
                    $user->profile->delete();
                    foreach ($user->socialProviders as $provider) {
                        $provider->delete();
                    }
                    $user->delete();
                    
                    return Response::success("User {$user->email} is deleted!");     
                //</editor-fold>     
                },
            ], 
                        
            //autocomplete
            'autocomplete' => [        
                'rules' => [
                    'term' => 'required|string|min:2',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="autocomplete"> 
                    $query = DB::connection('main')->table('users as u');
                    
                    $query->leftJoin('profile as p', 'p.user_id', '=', 'u.id');
                    
                    $query->select(
                        'u.id as value',
                        'p.name',
                        'p.surname',
                        'u.email as label' 
                    );

                    $term = "%{$request->term}%";

                    $query->where('u.email', 'like', $term);
                    $query->orWhere('u.id', '=', $request->term);
                    $query->orWhere('p.name', 'like', $term);
                    $query->orWhere('p.surname', 'like', $term);
                   
                    $data = $query->take(10)->get()->map(function($row) {
                        
                        return [
                            'value' => $row->value,
                            'label' => "{$row->name} {$row->surname} {$row->label}",
                        ];
                    });
                                
                    return Response::success([
                        'options' => $data->toArray(),
                    ]);                    
                //</editor-fold>     
                },
            ],       
                        
            //get_groups
            'get_groups' => [        
                'rules' => [
                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get_groups"> 
                    $groups = Groups::getAll();
                    
                    $options = collect($groups)->map(function ($group) {
                        return [
                            'value' => $group,
                            'label' => $group,
                        ];
                    })->all();
                    
                    return Response::success([
                        'options' => $options,
                    ]); 
                //</editor-fold>     
                },
            ],  
                        
            //get_permissions
            'get_permissions' => [        
                'rules' => [
                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get_permissions"> 
                    $permissions = Permissions::getAll();
                    
                    $options = collect($permissions)->map(function ($permission) {
                        return [
                            'value' => $permission,
                            'label' => $permission,
                        ];
                    })->all();
                    
                    return Response::success([
                        'options' => $options,
                    ]); 
                //</editor-fold>     
                },
            ],  
            
            'login_as_this_user' => [        
                'rules' => [
                    'id' => 'required|integer',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get"> 
                    $user = User::find($request->id);
                    
                    if (empty($user)) {
                        return Response::error("User with id {$request->id} doesn't exist!");                        
                    }            
                    
                    Auth::login($user);
                    
                    return Response::success([              
                        'Logged in!'
                    ]);                
                //</editor-fold>     
                },
            ], 

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}