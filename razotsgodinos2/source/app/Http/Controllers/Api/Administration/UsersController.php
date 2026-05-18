<?php

namespace App\Http\Controllers\Api\Administration;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Enum;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use DB;
use App\Models\Core\User;
use App\Models\Main\Profile;
use App\Types\Core\Group;
use App\Helpers\Core\DateHelper;
use App\Logic\Core\Users;

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

        $columns = [
            'u.id' => 'id',
            'u.email' => 'email',
            'u.last_activity' => 'last_activity',
            'u.active' => 'active',
            'u.user_groups' => 'user_groups',
            'p.name' => 'name',
            'p.surname' => 'surname',
        ];

        $query->leftJoin('profile as p','p.user_id', '=', 'u.id');
        
        $query->where('u.user_groups', 'not like', '%[super_admin]%');

        # ========================================================================#
        #
        #                           Formatters
        #
        # ========================================================================#

        $formatters = [];

        $formatters['user_groups'] = function($value, $row) {            
            return implode(', ', extractTags($value));
        };

        # ========================================================================#
        #
        #                           Filters
        #
        # ========================================================================#

        $filters = [];

        $filters['id'] = function($query, $value) {
            $query->where('u.id', '=', $value);
        };
        
        $filters['email'] = function($query, $value) {
            $query->where('u.email', '=', $value);
        };

        //special filters
        $filters['select_active'] = function($query, $value) {
            $query->where('u.active', '=' , $value);
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
                    'group' => ['required',new Enum(Group::class)],  
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="create"> 
                    if (!empty(User::whereEmail($request->email)->first())) {
                        return Response::error([
                            'msg' => 'E-pasts tiek izmantots!',
                            'field' => 'email',                         
                        ]);
                    }   
                    
                    $user = new User;
                    $user->email = $request->email;   
                    $user->password = bcrypt($request->password);
                    $user->can_login_with_email = true;
                    $user->email_confirmed = true;
                    $user->reg_date = DateHelper::getDateTime();
                    $user->active = true;
                    $user->user_groups = [$request->group];
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
                        'msg' => "Lietotājs {$user->email} ir izveidots!"
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
                    'group' => ['required',new Enum(Group::class)],  
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="update"> 
                    $user = User::find($request->id);
                    if (empty($user)) {
                        return Response::error("User with id {$request->id} doesn't exist!");                        
                    }      
                                    
                    $user->active = !!$request->active;
                    $user->user_groups = [$request->group];
                    $user->save();
                    
                    $user->profile->name = $request->name;
                    $user->profile->surname = $request->surname;
                    $user->profile->save();
                    
                    
                    return Response::success([
                        'msg' => "Lietotājs {$user->email} ir atjaunināts!",
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
                    
                    return Response::success("Lietotāja {$user->email} parole ir atjaunināta!");                   
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

                    $query->where('u.user_groups', 'not like', '%[super_admin]%');

                    $term = "%{$request->term}%";
                    
                    $query->where(function ($query) use($term, $request) {
                        $query->where('u.email', 'like', $term)
                        ->orWhere('u.id', '=', $request->term)
                        ->orWhere('p.name', 'like', $term)
                        ->orWhere('p.surname', 'like', $term);
                    });
                   
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

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }

}