<?php
namespace App\Logic\Core;
//s
use Illuminate\Support\Arr;
use Validator;

class Response
{

    /**
    * Send response to client
    * 
    * @access public
    * @param string $status - 'success', 'error'
    * @param array $data - response data    
    * @return mixed
    */
    public static function showResponse($status, $data) {
    //<editor-fold defaultstate="collapsed" desc="showResponse">    
        $response = [];
        
        if (is_ajax() || request()->wantsJson()) {
            
            if ($status === 'success') {
                $response['response'] = $data;            
            }
            else{
                $response['error'] = $data; 
            }

            return response()->json($response);         
        }
        else {
            if (!empty($data['redirect'])) {
                return redirect($data['redirect']);
            }
            else { 
                return redirect('/');
            }
        }
    //</editor-fold>      
    }
    
    /**
    * Return error response
    * 
    * @access public
    * @param  mixed $response - response
    * @return response
    */
    public static function error($response) {
    //<editor-fold defaultstate="collapsed" desc="error"> 
        if (!is_array($response)) {
            $response = [
                'msg' => $response
            ];
        } 
        
        return self::showResponse('error', $response); 
    //</editor-fold>      
    }
    
    /**
    * Return success response
    * 
    * @access public
    * @param mixed $response - response
    * @return response
    */
    public static function success($response) {
    //<editor-fold defaultstate="collapsed" desc="success">         
        if (!is_array($response)) {
            $response = [
                'msg' => $response
            ];
        }    
        
        return self::showResponse('success', $response); 
    //</editor-fold>      
    }
    
    /**
    * Validate
    * 
    * @access public
    * @param  array $params - params to validate
    * @param  array $rules - validation rules   
    * @param  array $lang - validation lang   
    * @return mixed
    */
    public static function validate($params, $rules, $lang = null){
    //<editor-fold defaultstate="collapsed" desc="validate"> 
        if ($lang !== null) {            
            $current_locale = app()->getLocale();
            app()->setLocale($lang);
        }        
                
        $validator = Validator::make($params, $rules);  
        
        $result = false;
        
        if ($validator->fails()){                    
            $response = [
                'msg' => $validator->messages()->first(),
                'field' => head($validator->messages()->keys()),
            ];
            $result = self::error($response);                                           
        }   
        
        if ($lang !== null) {
            app()->setLocale($current_locale);
        }
        
        return $result;
    //</editor-fold>      
    }
    
    /**
    * Parse response
    * 
    * @access public
    * @param  Illuminate\Http\Request $request - request     
    * @param  array $config - response parsing config   
    * @return  response
    */
    public static function parse($request, $config){
    //<editor-fold defaultstate="collapsed" desc="parse">    
        $rules = 'required|string|in:'.implode(',', array_keys($config));
                       
        $validate = self::validate($request->all(), [                                    
            'action' => $rules, 
        ]);
        if ($validate) return $validate;
        
        foreach ($config as $action => $row) {
            
            if ($request->action === $action) {
                
                $rules = Arr::get($row, 'rules', []);
                
                $validate = self::validate($request->all(), $rules);
                if ($validate) return $validate;

                return $row['action']($request); 
                                
                break;
            }
            
        }
        
        return self::error('Server error'); 
    //</editor-fold>      
    }
    
    /**
     * Export as CSV
     *
     * @access public           
     * @param  array $column_headers - column headers
     * @param  array $rows - rows
     * @param  string $file_name - name of the .csv file
     * @return response
     */
    public static function exportAsCSV($column_headers, $rows, $file_name = 'file') {
    //<editor-fold defaultstate="collapsed" desc="exportAsCSV">
        $headers = [
            'Content-type' => 'text/csv',
            'Content-Disposition' => 'attachment; filename='.$file_name.'.csv',
            'Pragma' => 'no-cache',
            'Cache-Control' => 'must-revalidate, post-check=0, pre-check=0',
            'Expires' => '0'
        ];
        
        $callback = function() use ($column_headers, $rows)
        {
            $file = fopen('php://output', 'w');
            fputcsv($file, $column_headers);

            foreach($rows as $row) {
                fputcsv($file, $row);
            }
            fclose($file);
        };
        
        return response()->stream($callback, 200, $headers);
    //</editor-fold>  
    }
    
}