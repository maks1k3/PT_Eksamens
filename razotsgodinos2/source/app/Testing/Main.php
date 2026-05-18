<?php
namespace App\Testing;

use DB;
use Config;
use App\Helpers\Core\SchemaHelper;
use App\Schema\Config as SchemaConfig;

class Main
{
    /**
     * Prepared database for testing
     *
     * @access public           
     * @return void
    */
    public static function prepareDatabase() {
    //<editor-fold defaultstate="collapsed" desc="prepareDatabase"> 
        $testing_connection = config('database.connections.testing');
                
        if (empty($testing_connection)) {
            throw new \Exception('No testing connection!');
        }
        
        Config::set('database.connections.main.database', $testing_connection['database']);
        Config::set('database.connections.main.username', $testing_connection['username']);
        Config::set('database.connections.main.password', $testing_connection['password']);

        DB::purge('main');
        DB::reconnect('main');
        
        //update db structure
        $db = DB::connection('main');
        $platform = SchemaHelper::getPlatform($db);
        $config_schema = SchemaConfig::get();    
        $current_schema = SchemaHelper::getSchema($db);

        $schema_diff = SchemaHelper::getDiff($current_schema, $config_schema);
        $sql_diff = $schema_diff->toSql($platform);

        foreach ($sql_diff as $value) {
            DB::connection('main')->statement($value.';'); 
        }           
               
        //truncate all tables
        $tables = SchemaHelper::getTableNames($current_schema);
        
        foreach ($tables as $table) {
            
            DB::connection('main')->table($table)->truncate();
        }
    //</editor-fold>
    }
    
    /**
     * Validate input and output
     *
     * @access public 
     * @param  array $input - expected result         
     * @param  array $output - received result        
     * @return array
    */
    public static function validate($input, $output) {
    //<editor-fold defaultstate="collapsed" desc="validate">
        
        if (empty($input)) {
            $input = [];
        }
        
        if (empty($output)) {
            $output = [];
        }
        
        if (is_object($input)) {
            $input = (array)$input;      
        }

        if (is_object($output)) {
            $output = (array)$output;      
        }
                
        array_walk_recursive($input, function (&$value) { 
            if (is_object($value)) {
                $value = (array)$value;      
            }
                   
        });
        
        array_walk_recursive($output, function (&$value) { 
            if (is_object($value)) {
                $value = (array)$value;      
            }          
        });        
        
        array_walk_recursive($input, function (&$value) { $value = (string)$value; });
        array_walk_recursive($output, function (&$value) { $value = (string)$value; });
                
        return [
            'passed' => $input === $output,
            'input' => json_encode($input, JSON_PRETTY_PRINT),
            'output' => json_encode($output, JSON_PRETTY_PRINT),
            'output_array' => self::varExportShort($output),
        ];
    //</editor-fold>
    }
    
     /**
     * Export data as string
     *
     * @access public 
     * @param  any $data - data     
     * @return string
    */
    public static function varExportShort($data) {
    //<editor-fold defaultstate="collapsed" desc="varExportShort">
        $dump = var_export($data, true);

        $dump = preg_replace('#(?:\A|\n)([ ]*)array \(#i', '[', $dump); // Starts
        $dump = preg_replace('#\n([ ]*)\),#', "\n$1],", $dump); // Ends
        $dump = preg_replace('#=> \[\n\s+\],\n#', "=> [],\n", $dump); // Empties

        if (gettype($data) == 'object') { // Deal with object states
            $dump = str_replace('__set_state(array(', '__set_state([', $dump);
            $dump = preg_replace('#\)\)$#', "])", $dump);
        } else { 
            $dump = preg_replace('#\)$#', "]", $dump);
        }
       
        return $dump;
    //</editor-fold>
    }
    
}