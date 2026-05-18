<?php
namespace App\Http\Controllers\Main;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Logic\Core\Langs;
use App\Logic\Main\Pages;

class PublicPagesController extends Controller
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
    * Main
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function main() {
    //<editor-fold defaultstate="collapsed" desc="main">  
        $lang = Langs::getDefault();
        
        return view('public.main', ['state' => Pages::home($lang)]);
    //</editor-fold>    
    }
    
    /**
    * Home
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function home($lang) {
    //<editor-fold defaultstate="collapsed" desc="home">                 
        return view('public.main', ['state' => Pages::home($lang)]);
    //</editor-fold>    
    }
    
    /**
    * About us
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
   public function about_us($lang)
{
    return view('public.main', [
        'state' => Pages::about_us($lang)
    ]);
}

  public function services($lang)
{
    return view('public.main', [
        'state' => Pages::services($lang)
    ]);
}


    
    /**
    * Building
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function building($lang) {
    //<editor-fold defaultstate="collapsed" desc="building">                 
        return view('public.main', ['state' => Pages::building($lang)]);
    //</editor-fold>    
    }
    
    /**
    * Blog
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function blog($lang) {
    //<editor-fold defaultstate="collapsed" desc="blog">                 
        return view('public.main', ['state' => Pages::blog($lang)]);
    //</editor-fold>    
    }
    
    /**
    * Renovation
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function renovation($lang) {
    //<editor-fold defaultstate="collapsed" desc="renovation">                 
        return view('public.main', ['state' => Pages::renovation($lang)]);
    //</editor-fold>    
    }
    
    /**
    * Contacts
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function contacts($lang) {
    //<editor-fold defaultstate="collapsed" desc="contacts">                 
        return view('public.main', ['state' => Pages::contacts($lang)]);
    //</editor-fold>    
    }
    
    /**
    * Price calculator
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function priceCalculator($lang) {
    //<editor-fold defaultstate="collapsed" desc="priceCalculator">                 
        return view('public.main', ['state' => Pages::priceCalculator($lang)]);
    //</editor-fold>    
    }
    
    /**
    * privacy_policy
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function privacyPolicy($lang) {
    //<editor-fold defaultstate="collapsed" desc="privacy_policy">                 
        return view('public.main', ['state' => Pages::privacyPolicy($lang)]);
    //</editor-fold>    
    }
    
    //Entry opens
    
    /**
    * Blog Entry
    *
    * @access public       
    * @return \Illuminate\Http\Response 
    */
    public function blogEntry($lang, $blog_id) {
    //<editor-fold defaultstate="collapsed" desc="blogEntry">   
        $state = Pages::blogEntry($lang, $blog_id);
                
        if (empty($state)) {
            abort(404);
        }
     
        return view('public.main', ['state' => $state]);
    //</editor-fold>    
    }
    public function tipveidaBlog($lang){
        return view('public.main', ['state' => Pages::tipveidaBlog($lang)]);
    }
    //s
}
