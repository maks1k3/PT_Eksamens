<?php
namespace App\Testing\Tests;

use Auth;
use App\Testing\Main;
use App\Testing\Common;
use DB;

class SampleTest
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
        
        $auth_user = Common::getUser();
        Auth::onceUsingId($auth_user->id);
        
        //<editor-fold defaultstate="collapsed" desc="Test data">         
        DB::table('users')->insert([
            ['date' => '2019-06-19', 'title' => 'test']
        ]);        
        //</editor-fold>      
        
        //test code
        
        # ========================================================================#
        #
        #                           Receieved result
        #    
        # ========================================================================#   
                 
        //<editor-fold defaultstate="collapsed" desc="Receieved result">
        $result = [];
        
        $query = DB::connection('main')->table('table');
        
        $query->select(
            'id',    
            'date', 
            'title'
        );
        
        $query->orderBy('id', 'asc');
        
        $result = $query->get()->toArray();        
        //</editor-fold>  
        
        # ========================================================================#
        #
        #                           Expected result
        #    
        # ========================================================================#  
        
        //<editor-fold defaultstate="collapsed" desc="Expected result">        
        $expected = [
            [
                'id' => '1',
                'date' => '2019-06-19',
                'title' => 'Test'
            ]
        ];
        //</editor-fold>      
                        
        return Main::validate($expected, $result);
    //</editor-fold>
    }
    
    
}