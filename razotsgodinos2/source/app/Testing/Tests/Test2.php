<?php
namespace App\Testing\Tests;

use App\Testing\Main;
use DB;

class Test2
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
    public static function testCreating() {
    //<editor-fold defaultstate="collapsed" desc="testCreating"> 
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
    
    /**
     * Test example
     *
     * @access public           
     * @return void
    */
    public static function testCreating2() {
    //<editor-fold defaultstate="collapsed" desc="testCreating2"> 
        Main::prepareDatabase();
        
        $content = new \App\Models\CMS\Content; 
        
        $content->name = 'test2';
        
        $content->save();
        
        $expected = [
            'id' => 1,
            'name' => 'test2',
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