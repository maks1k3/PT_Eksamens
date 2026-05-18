<?php

namespace App\Http\Controllers\Api\Dev;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Testing\AllTests;

class TestingController extends Controller
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
       

        $actions = [        

            'get_tests' => [        
                'rules' => [
                    
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="get_tests"> 
                    $response = [];
        
                    $response['classes'] = [];
                    $response['tests'] = [];

                    $classes = AllTests::get();

                    foreach ($classes as $name => $class) {
                        $response['classes'][] = $name;
                        $class_methods = get_class_methods($class);

                        $response['tests'][$name] = $class_methods;
                    }
                    return Response::success($response);
                //</editor-fold>     
                },
            ],      
                        
            'test' => [        
                'rules' => [
                    'class' => 'required|string',
                    'method' => 'required|string',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="test"> 
                    $classes = AllTests::get();
                    
                    $class_names = array_keys($classes);
                    
                    if (!in_array($request->input('class'), $class_names)) {
                        return Response::error([
                            'msg' => "Class '{$request->input('class')}' doesn't exist!",
                        ]);
                    }
                    
                    if (!method_exists($classes[$request->input('class')], $request->input('method'))) {
                        return Response::error([
                            'msg' => "Class '{$request->input('class')}' doesn't have method '{$request->input('method')}'!",
                        ]);
                    }
                    
                    $class = $classes[$request->input('class')];
        
                    $methodName = $request->input('method');

                    return Response::success($class::$methodName());
                //</editor-fold>     
                },
            ],               

        ];

        return Response::parse($request, $actions);  
    //</editor-fold>             
    }

}