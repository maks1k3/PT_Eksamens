<?php
namespace App\Helpers\Core;

use Doctrine\DBAL\Schema\Comparator;

/*Usage 

    $config_schema = \App\Schema\Config::get();
    $current_schema = \App\Helpers\Core\Schema::getSchema(\DB::connection());
    $platform = \App\Helpers\Core\Schema::getPlatform(\DB::connection());

    $create_sql = $config_schema->toSql($platform);
    $schema_diff=  App\Helpers\Core\Schema::getDiff($current_schema, $config_schema);
    $diff_sql = $schema_diff->toSql($platform);

    dump($create_sql);
    dump($diff_sql);
 */

class SchemaHelper
{
    /**
    * Get schema for given DB
    *
    * @access public              
    * @param \DB $db - database 
    * @return object
    */
    public static function getSchema($db){
    //<editor-fold defaultstate="collapsed" desc="getSchema"> 
        $sm = $db->getDoctrineSchemaManager();        
        return $sm->createSchema();
    //</editor-fold>    
    } 
    
    /**
    * Get platform for given DB
    *
    * @access public              
    * @param \DB $db - database 
    * @return object
    */
    public static function getPlatform($db){
    //<editor-fold defaultstate="collapsed" desc="getPlatform"> 
        return $db->getDoctrineSchemaManager()->getDatabasePlatform();        
    //</editor-fold>    
    } 
    
    /**
    * Compare two schemas
    *
    * @access public              
    * @param \Schema $fromSchema - database 
    * @param \Schema $toSchema - database 
    * @return object
    */
    public static function getDiff($fromSchema, $toSchema){
    //<editor-fold defaultstate="collapsed" desc="getPlatform"> 
        $comparator = new Comparator();
        return $comparator->compare($fromSchema, $toSchema);
    //</editor-fold>    
    } 

    /**
    * Get table names
    *
    * @access public              
    * @param \Schema $schema - database schema     
    * @param  array $exclude - exclude this tables
    * @return array
    */
    public static function getTableNames($schema, $exclude = ['sessions']){
    //<editor-fold defaultstate="collapsed" desc="getTableNames"> 
        $result = [];
        
        $tables = $schema->getTables();
        
        foreach ($tables as $table) {
            
            $tableName =  $table->getName();
            
            if (!in_array($tableName, $exclude)) {
                $result[] = $table->getName();
            }            
        }
        
        sort($result);
        
        return $result;
    //</editor-fold>    
    } 
    
    /**
    * Convert schema to array
    *
    * @access public              
    * @param \Schema $schema - database schema   
    * @param  array $exclude - exclude this tables  
    * @return array
    */
    public static function toArray($schema, $exclude = ['sessions']){
    //<editor-fold defaultstate="collapsed" desc="toArray"> 
        $result = [];
        
        $tables = $schema->getTables();
        
        foreach ($tables as $table) {
            
            if (!in_array($table->getName(), $exclude)) {            
                $result[$table->getName()] = self::tableToArray($table);
            }  
        }
        
        return $result;
    //</editor-fold>    
    } 
    
    /**
    * Convert schema table to array
    *
    * @access public              
    * @param \Schema\Table $column - database table schema     
    * @return array
    */
    public static function tableToArray($table){
    //<editor-fold defaultstate="collapsed" desc="tableToArray"> 
        $result = [];
                  
        $result['columns'] = [];
        $columns = $table->getColumns();

        foreach ($columns as $column) {
            $result['columns'][] = self::columnToArray($column);
        }

        $result['indexes'] = [];            
        $indexes = $table->getIndexes();

        foreach ($indexes as $indexName => $index) {
            $result['indexes'][] = self::indexToArray($index, $indexName);
        }
        
        return $result;
    //</editor-fold>    
    } 
    
    /**
    * Convert schema column to array
    *
    * @access public              
    * @param \Schema\Column $column - database column schema     
    * @return array
    */
    public static function columnToArray($column){
    //<editor-fold defaultstate="collapsed" desc="columnToArray"> 
        $column = $column->toArray();
        $column['type'] = $column['type']->getName();
        return $column; 
    //</editor-fold>    
    } 
    
    /**
    * Convert schema index to array
    *
    * @access public              
    * @param \Schema\Index $index - database index schema     
    * @return array
    */
    public static function indexToArray($index, $name){
    //<editor-fold defaultstate="collapsed" desc="indexToArray"> 
        return [
            'name' => $name,
            'columns' => $index->getColumns(),
            'isUnique' => $index->isUnique(),
            'isSimpleIndex' => $index->isSimpleIndex(),
            'flags' => $index->getFlags(),
            'options' => $index->getOptions(),
        ];
    //</editor-fold>    
    } 
    
    /**
    * Get column search operators
    *
    * @access public            
    * @return array
    */
    public static function getColumnSearchOperators(){
    //<editor-fold defaultstate="collapsed" desc="getColumnSearchOperators"> 
        return [
            'equal' => '=',
            'greater' => '>',
            'greater_or_equal' => '>=',
            'less' => '<',
            'less_or_equal' => '<=',
            'not_equal' => '!=',
            'like' => 'LIKE',
            'like_proc' => 'LIKE %...%',
            'not_like' => 'NOT LIKE',
            'in' => 'IN (...)',
            'not_in' => 'NOT IN (...)',
            'is_null' => 'IS NULL',
            'is_not_null' => 'IS NOT NULL',
        ];
    //</editor-fold>    
    } 

}