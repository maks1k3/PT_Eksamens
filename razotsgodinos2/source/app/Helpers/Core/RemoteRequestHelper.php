<?php
namespace App\Helpers\Core;
use GuzzleHttp\Client;
use App\Logic\Core\Log;
use Illuminate\Support\Arr;

class RemoteRequestHelper
{
    
    /**
    * Get request
    *
    * @access public    
    * @param  array $params - params
    * @return array
    */
    public static function get($params){
    //<editor-fold defaultstate="collapsed" desc="get"> 
         
        $url = Arr::get($params, 'url');
        
        if (empty($url)) {
            return null;
        }
        
        $data = Arr::get($params, 'data', []);
        $data_type = Arr::get($params, 'data_type', 'form_params');
        $headers = Arr::get($params, 'headers', []);
        $type = Arr::get($params, 'type', 'get');
        
        if (!in_array($type, ['get', 'post'])) {
            $type = 'get';
        }
        $result = $type === 'get' ? self::getReqest($url, $data, $headers) : self::postRequest($url, $data, $headers, $data_type);
        
        return $result;        
    //</editor-fold>    
    }       
    
    
    /**
    * Send request
    *
    * @access public    
    * @param  array $params - params
    * @return void
    */
    public static function send($params){
    //<editor-fold defaultstate="collapsed" desc="send"> 
        
        $url = Arr::get($params, 'url');
        
        if (empty($url)) {
            return;
        }
        
        $data = Arr::get($params, 'data', []);
        $headers = Arr::get($params, 'headers', []);
        $data_type = Arr::get($params, 'data_type', 'form_params');
        $type = Arr::get($params, 'type', 'get');
        $onSuccess = Arr::get($params, 'success');        
        $onError = Arr::get($params, 'error');
        $logError = Arr::get($params, 'logError', true);
        
        if (!in_array($type, ['get', 'post'])) {
            $type = 'get';
        }
        
        $result = $type === 'get' ? self::getReqest($url, $data, $headers) : self::postRequest($url, $data, $headers, $data_type);
        
        
        $status = $result['status'];
        $header = $result['header'];
        $body = $result['body'];
        
        if ($status === 200) {
            if (is_callable($onSuccess)) {
                $onSuccess($body, $header);
            }
        }
        else {
            if (is_callable($onError)) {
                $onError($body, $header, $status);
            }
            
            if ($logError) {
                Log::error('remote_request_failed', [
                   'url' => $url, 
                   'type' => $type, 
                   'data' => $data, 
                   'status' => $status, 
                   'header' => $header, 
                   'body' => $body, 
                ]);
            }
        }
        
    //</editor-fold>    
    }     
        
    /**
    * Make get request
    *
    * @access private              
    * @param  string $url - url
    * @param  array $data - data
    * @param  array $headers - headers
    * @return array [status, header, body]
    */
    private static function getReqest($url, $data = [], $headers = []){
    //<editor-fold defaultstate="collapsed" desc="getReqest"> 
        $client = new Client();
        if (empty($data)) {
            $request = $client->request('GET', $url, [
                'http_errors' => false, 
                'headers' => $headers,
            ]);
        }        
        else{
            $params = [
                'query' => $data,
                'http_errors' => false,
                'headers' => $headers,
            ];
            $request = $client->request('GET', $url, $params);
        }
                
        return self::parse($request);        
    //</editor-fold>    
    } 
    
    /**
    * Make post request
    *
    * @access private              
    * @param  string $url - url
    * @param  array  $params - post form params
    * @param  array  $headers - headers
    * @param  string $data_type - default: 'form_params'
    * @return array [status, header, body]
    */
    private static function postRequest($url, $data = [], $headers = [], $data_type = 'form_params'){
    //<editor-fold defaultstate="collapsed" desc="postRequest"> 
        $client = new Client();        
        
        if(empty($data)){
            $request = $client->request('POST', $url, [
                'http_errors' => false,
                'headers' => $headers,
            ]);
        }        
        else{
            $params = [
                'http_errors' => false,
                'headers' => $headers,                
            ];
            $params[$data_type] = $data;
            
            $request = $client->request('POST', $url, $params);
        }
        
        return self::parse($request);        
    //</editor-fold>    
    } 

    /**
    * Parse request
    *
    * @access private              
    * @param  ojbect $request - GuzzleHttp request
    * @return array [status, original_status, header, body]
    */
    private static function parse($request){
    //<editor-fold defaultstate="collapsed" desc="parse"> 
        return [
            'status' => $request->getStatusCode(),            
            'header' => $request->getHeaders(),
            'body' => (string)$request->getBody(),
        ];        
    //</editor-fold>    
    } 
    
}