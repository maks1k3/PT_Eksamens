<?php

namespace App\Http\Controllers\Api\Dev;

use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Response;
use App\Logic\Core\DataSource;
use DB;
use App\Schema\Config as SchemaConfig;
use App\Helpers\Core\SchemaHelper;

class DatabaseAdministrationDatasource extends DataSource
{
    /**
     * Add select
     *
     * @access public           
     * @param  DB $query - query 
     * @param  array $columns - $columns     
     * @return void
     */
    public static function addSelect($query, $columns) {
    //<editor-fold defaultstate="collapsed" desc="addSelect"> 
        foreach($columns as $column => $alias) {
            if (!Str::startsWith($column, '__empty__')) {
                $query->addSelect("{$column} as {$alias}");
            }
        }
    //</editor-fold>
    }
}

class DatabaseAdministrationController extends Controller
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
        $schema = SchemaConfig::get();
        
        //validation
        $rules = [
            'table' => 'required|in:'.implode(',', SchemaHelper::getTableNames($schema)),
        ];
        $validate = Response::validate($request->all(), $rules);
        if ($validate) return $validate;
        
        $table = $request->table;
        
        $tableSchema = SchemaHelper::tableToArray($schema->getTable($table));
        
        $query = DB::connection('main')->table($table);
        
        $columns = [];
        
        foreach ($tableSchema['columns'] as $column) {
            $columns[$column['name']] = $column['name'];
        }

        # ========================================================================#
        #
        #                           Formatters
        #
        # ========================================================================#

        $formatters = [];

        # ========================================================================#
        #
        #                           Filters
        #
        # ========================================================================#

        $filters = [];
        
        $operators = SchemaHelper::getColumnSearchOperators();
        
        
        foreach ($tableSchema['columns'] as $column) {
            
            foreach ($operators as $operator => $label) {
                $columnName = $column['name'];
                              
                $filters[$columnName.'__'.$operator] = function($query, $value) use ($operator, $columnName) {
                    
                    switch ($operator) {
                        case 'equal':
                            $query->where($columnName, '=', $value);
                            break;
                        case 'greater':
                            $query->where($columnName, '>', $value);
                            break;
                        case 'greater_or_equal':
                            $query->where($columnName, '>=', $value);
                            break;
                        case 'less':
                            $query->where($columnName, '<', $value);
                            break;
                        case 'less_or_equal':
                            $query->where($columnName, '<=', $value);
                            break;
                        case 'not_equal':
                            $query->where($columnName, '!=', $value);
                            break;
                        case 'like':
                            $query->where($columnName, 'LIKE', $value);
                            break;
                        case 'like_proc':
                            $query->where($columnName, 'LIKE', '%'.$value.'%');
                            break;
                        case 'not_like':
                            $query->where($columnName, 'NOT LIKE', $value);
                            break;
                        case 'in':
                            $query->whereIn($columnName, explode(',', $value));
                            break;
                        case 'not_in':
                            $query->whereNotIn($columnName, explode(',', $value));
                            break;
                        case 'is_null':
                            $query->whereNull($columnName);
                            break;
                        case 'is_not_null':
                            $query->whereNotNull($columnName);
                            break;
                    }
                    
                };
            }           
        }

        $filters['created_at_from'] = function($query, $value) {
            $query->where('created_at', '>=', $value.' 00:00:00');
        };

        $filters['created_at_to'] = function($query, $value) {
            $query->where('created_at', '<=', $value.' 23:59:59');
        };
        
        $filters['updated_at_from'] = function($query, $value) {
            $query->where('updated_at', '>=', $value.' 00:00:00');
        };

        $filters['updated_at_to'] = function($query, $value) {
            $query->where('updated_at', '<=', $value.' 23:59:59');
        };

        $options = [
            'results_per_page' => 10,
            'order' => [
                'id' => 'desc',
            ]
        ];

        $params = DatabaseAdministrationDatasource::parseRequest($request);
        $response = DatabaseAdministrationDatasource::get($params, $query, $columns, $filters, $formatters, $options);

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
        $schema = SchemaConfig::get();

        $actions = [
            
            'get_config' => [
                'rules' => [
                    
                ],
                'action' => function($request) use ($schema) {
                //<editor-fold defaultstate="collapsed" desc="get_schema">
                   
                    return Response::success([
                        'schema' => SchemaHelper::toArray($schema),
                        'tables' => SchemaHelper::getTableNames($schema),
                        'operators' => SchemaHelper::getColumnSearchOperators(),
                    ]);
                //</editor-fold>
                },
            ],

            'get' => [
                'rules' => [
                    'table' => 'required|in:'.implode(',', SchemaHelper::getTableNames($schema)),
                    'id' => 'required',
                ],
                'action' => function($request) use ($schema) {
                //<editor-fold defaultstate="collapsed" desc="get">
                    $row = DB::connection('main')->table($request->table)->whereId($request->id)->first();
                    
                    if (empty($row)) {
                        return Response::error("Row with id {$request->id} doesn't exist!");
                    }

                    return Response::success([
                        'row' => $row,
                        'schema' => SchemaHelper::tableToArray($schema->getTable($request->table)),
                    ]);
                //</editor-fold>
                },
            ],

            'create' => [
                'rules' => [
                    'table' => 'required|in:'.implode(',', SchemaHelper::getTableNames($schema)),
                ],
                'action' => function($request) use ($schema) {
                //<editor-fold defaultstate="collapsed" desc="create">
                    $schema = SchemaHelper::tableToArray($schema->getTable($request->table));
                    
                    $insert = [];
                    
                    foreach ($schema['columns'] as $column) {
                        $columnName = $column['name'];
                        $columnType = $column['type'];
                        
                        if ($request->has($columnName)) {
                            $input = $request->input($columnName);
                            
                            if ($columnType === 'datetime') {
                                if (!empty($input)) {
                                    if ($input !== date('Y-m-d H:i:s',  strtotime($input))) {
                                        return Response::error([
                                            'field' => $columnName,
                                            'msg' => 'Incorrect datetime format! Valid format is: Y-m-d H:i:s'
                                        ]);
                                    }                                   
                                    
                                    $insert[$columnName] = $input;
                                }
                            }
                            else if ($columnType === 'date') {
                                if (!empty($input)) {
                                    if ($input !== date('Y-m-d',  strtotime($input))) {
                                        return Response::error([
                                            'field' => $columnName,
                                            'msg' => 'Incorrect date format! Valid format is: Y-m-d'
                                        ]);
                                    }                                   
                                    
                                    $insert[$columnName] = $input;
                                }
                            }
                            else if ($columnType === 'time') {
                                if (!empty($input)) {
                                    if ($input !== date('H:i:s',  strtotime($input))) {
                                        return Response::error([
                                            'field' => $columnName,
                                            'msg' => 'Incorrect time format! Valid format is: H:i:s'
                                        ]);
                                    }                                   
                                    
                                    $insert[$columnName] = $input;
                                }
                            }
                            else if (in_array($columnType, ['integer', 'bigint'])) {    
                                $rules = [];
                                $rules[$columnName] = 'integer';

                                $validate = Response::validate($request->all(), $rules);
                                if ($validate) return $validate;
                                
                                
                                $insert[$columnName] = intval($input);
                            }                            
                            else if ($columnType === 'boolean') {    
                                $rules = [];
                                $rules[$columnName] = 'boolean';

                                $validate = Response::validate($request->all(), $rules);
                                if ($validate) return $validate;
                                
                                
                                $insert[$columnName] = intval($input);
                            }
                            else if (in_array($columnType, ['float', 'decimal'])) {    
                                $rules = [];
                                $rules[$columnName] = 'numeric';

                                $validate = Response::validate($request->all(), $rules);
                                if ($validate) return $validate;
                                
                                
                                $insert[$columnName] = (double)$input;
                            }
                            else if ($columnType === 'text') {   
                                $insert[$columnName] = base64_decode($input);
                            } 
                            else {
                                $insert[$columnName] = $input;
                            }
                        }
                    }
                    
                    $id = DB::table($request->table)->insertGetId($insert);
                    
                    $row = DB::connection('main')->table($request->table)->whereId($request->id)->first();

                    return Response::success([
                        'msg' => 'Row is created!',
                        'row' => $row,
                    ]);
                //</editor-fold>
                },
            ],

            'update' => [
                'rules' => [
                    'table' => 'required|in:'.implode(',', SchemaHelper::getTableNames($schema)),
                    'id' => 'required',                   
                ],
                'action' => function($request) use ($schema) {
                //<editor-fold defaultstate="collapsed" desc="update">
                    $row = DB::connection('main')->table($request->table)->whereId($request->id)->first();
                    
                    if (empty($row)) {
                        return Response::error("Row with id {$request->id} doesn't exist!");
                    }
                    
                    $schema = SchemaHelper::tableToArray($schema->getTable($request->table));
                    
                    $update = [];
                    
                    foreach ($schema['columns'] as $column) {
                        $columnName = $column['name'];
                        $columnType = $column['type'];
                        
                        if ($request->has($columnName)) {
                            $input = $request->input($columnName);
                            
                            if ($columnType === 'datetime') {
                                if (!empty($input)) {
                                    if ($input !== date('Y-m-d H:i:s',  strtotime($input))) {
                                        return Response::error([
                                            'field' => $columnName,
                                            'msg' => 'Incorrect datetime format! Valid format is: Y-m-d H:i:s'
                                        ]);
                                    } 
                                    $update[$columnName] = $input;
                                }
                            }
                            else if ($columnType === 'date') {
                                if (!empty($input)) {
                                    if ($input !== date('Y-m-d',  strtotime($input))) {
                                        return Response::error([
                                            'field' => $columnName,
                                            'msg' => 'Incorrect date format! Valid format is: Y-m-d'
                                        ]);
                                        
                                    }                                   
                                    
                                    $update[$columnName] = $input;
                                }
                            }
                            else if ($columnType === 'time') {
                                if (!empty($input)) {
                                    if ($input !== date('H:i:s',  strtotime($input))) {
                                        return Response::error([
                                            'field' => $columnName,
                                            'msg' => 'Incorrect time format! Valid format is: H:i:s'
                                        ]);
                                    }                                   
                                    
                                    $update[$columnName] = $input;
                                }
                            }
                            else if (in_array($columnType, ['integer', 'bigint'])) {    
                                $rules = [];
                                $rules[$columnName] = 'integer';

                                $validate = Response::validate($request->all(), $rules);
                                if ($validate) return $validate;
                                
                                
                                $update[$columnName] = intval($input);
                            }                            
                            else if ($columnType === 'boolean') {    
                                $rules = [];
                                $rules[$columnName] = 'boolean';

                                $validate = Response::validate($request->all(), $rules);
                                if ($validate) return $validate;
                                
                                
                                $update[$columnName] = $input;
                            }
                            else if (in_array($columnType, ['float', 'decimal'])) {    
                                $rules = [];
                                $rules[$columnName] = 'numeric';

                                $validate = Response::validate($request->all(), $rules);
                                if ($validate) return $validate;
                                
                                
                                $update[$columnName] = (double)$input;
                            }
                            else if ($columnType === 'text') {   
                                $update[$columnName] = base64_decode($input);
                            } 
                            else {
                                $update[$columnName] = $input;
                            }
                        }
                    }
                    
                    DB::table($request->table)->whereId($request->id)->update($update);                    
                    
                    $row = DB::connection('main')->table($request->table)->whereId($request->id)->first();

                    return Response::success([
                        'msg' => 'Row is saved!',
                        'row' => $row,
                    ]);
                //</editor-fold>
                },
            ],

            'delete' => [
                'rules' => [
                    'table' => 'required|in:'.implode(',', SchemaHelper::getTableNames($schema)),
                    'id' => 'required',
                ],
                'action' => function($request) {
                //<editor-fold defaultstate="collapsed" desc="delete">
                    $row = DB::connection('main')->table($request->table)->whereId($request->id)->first();
                    
                    if (empty($row)) {
                        return Response::error("Row with id {$request->id} doesn't exist!");
                    }
                    
                    DB::connection('main')->table($request->table)->whereId($request->id)->delete();

                    return Response::success([
                        'msg' => 'Row is deleted!',
                    ]);
                //</editor-fold>
                },
            ],

        ];

        return Response::parse($request, $actions);
    //</editor-fold>
    }
    

}