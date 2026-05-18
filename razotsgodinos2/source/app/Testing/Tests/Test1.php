<?php
namespace App\Testing\Tests;

use App\Testing\Main;
use DB;

class Test1
{

   
        
    /**
     * Common
     *
     * @access public           
     * @return void
    */
    private static function common() {
    //<editor-fold defaultstate="collapsed" desc="common"> 
        
    //</editor-fold>
    }
    
    
    /**
     * Test example
     *
     * @access public           
     * @return void
    */
    public static function testExample() {
    //<editor-fold defaultstate="collapsed" desc="testExample">         
        Main::prepareDatabase();
        
        $content = new \App\Models\CMS\Content; 
        
        $content->name = 'test';
        
        $content->save();
        
        $expected = [
            'id' => 1,
            'name' => 'test',           
        ];
        
        $query = DB::connection('main')->table('content');
        
        $query->select(
            'id', 
            'name'
        );
        
        $result = $query->first();
        
        
        return Main::validate($expected, $result);
    //</editor-fold>
    }
    
    
}