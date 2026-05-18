<?php
namespace App\Logic\Main;
use App\Models\Media\Video;

use App\Helpers\Core\MetaHelper;
use App\Logic\Main\Blog\BlogCategories;
use App\Logic\Main\Blog\BlogEntries;
use App\Logic\CMS\Data;
use App\Logic\Core\MetaData;
use App\Logic\Core\Store;

class Pages
{
    
    /**
     * Get common state for every page
     *
     * @access public
     * @param  string $lang - current lang            
     * @return void
     */
    public static function getCommonState($lang) {
    //<editor-fold defaultstate="collapsed" desc="getCommonState">
        return [
            'marketing_cookies' => session()->get('marketing_cookies','notVisted')
        ];
    //</editor-fold>  
    }

     /**
     * Get common content
     *
     * @access public           
     * @return array
    */
    public static function getCommonContent() {
    //<editor-fold defaultstate="collapsed" desc="getCommonContent"> 
        return [
            'check_info',
            'calculator_block_content',
            'home_selection',
            'phone',
            'email', 
            'facebook',
            'instagram',
            'nav_menu',
        ];
    //</editor-fold>
    }    
    
    /**
     * Get common content
     *
     * @access public           
     * @return array
    */
    public static function getCommonCollections() {
    //<editor-fold defaultstate="collapsed" desc="getCommonCCollections"> 
        return [
           
        ];
    //</editor-fold>
    }    
    
    /**
     * Home page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function home($lang) {
    //<editor-fold defaultstate="collapsed" desc="home"> 

        $content = array_merge(self::getCommonContent(), [
           'home_hero',
           'home_divider',
           'reviews_content',
           'home_questions',
            'about_image',
            'review_heading',
            'benefits_1',
            'benefits_2',
            'about_head',
            'about_text_1',
            'about_text_2',
            'benefits_3',
            'benefits_4',
            'work_title_1',
            'work_title_2',
            'work_title_3',
            'work_text',
            'tip_projects_title',
            'tip_projects_text',
            'tip_projects_btn',
            'our_projects',
            'hero_slide_1',
            'hero_slide_2',
            'hero_slide_3',
            'review_1',
            'review_2',
            'review_3',
            'instagram',
            'facebook',
            'adress',
            'send_message',
            'our_contacts',
            'contact_send_btn',
            'home_hero_btn1',
            'home_hero_btn2',
            'home_projects_btn1',
            'home_tip_btn1',
            'home_review_btn1',
            
            
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'reviews' => [
                'results_per_page' => 'all'
            ],
            'reviews1',
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'home'];

        $state['Page'] = [];
        $state['projects'] = class_exists(\App\Logic\Main\Blog\BlogEntries::class)
    ? \App\Logic\Main\Blog\BlogEntries::getAll($lang)
    : [];

        $state['Page']['current'] = 'home';
        
        $meta_data = MetaData::get($lang, 'home');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * About us page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function about_us($lang) {
    //<editor-fold defaultstate="collapsed" desc="about_us"> 

        $content = array_merge(self::getCommonContent(), [
           'about_us_hero',
           'about_us_divider',
           'about_us_content',
           'about_us_divider_2',
           'about_us_our_info',
           'certificates_content',
            'about_image',
            
            'benefits_1',
            'benefits_2',
            'about_head',
            'about_text_1',
            'about_text_2',
            'benefits_3',
            'benefits_4',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'certificates_collection' => [
                'results_per_page' => 'all'
            ],
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'about_us'];

        $state['Page'] = [];
        $state['Page']['current'] = 'about_us';
        
        $meta_data = MetaData::get($lang, 'about_us');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
      /**
     * Renovation page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function renovation($lang) {
    //<editor-fold defaultstate="collapsed" desc="renovation"> 

        $content = array_merge(self::getCommonContent(), [
           'renovation_hero',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'renovation_collection' => [
                'results_per_page' => 'all'
            ],
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'renovation'];

        $state['Page'] = [];
        $state['projects'] = Blog\BlogEntries::getSpecified($lang, 1);
        $state['Page']['current'] = 'renovation';
        
        $meta_data = MetaData::get($lang, 'renovation');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * Building page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function building($lang) {
    //<editor-fold defaultstate="collapsed" desc="building"> 

        $content = array_merge(self::getCommonContent(), [
           'building_hero',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'building_collection' => [
                'results_per_page' => 'all'
            ],
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'building'];

        $state['Page'] = [];
        $state['projects'] = Blog\BlogEntries::getSpecified($lang, 2);
        $state['Page']['current'] = 'building';
        
        $meta_data = MetaData::get($lang, 'building');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
     /**
     * Blog page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function blog($lang) {
    //<editor-fold defaultstate="collapsed" desc="blog"> 

    $content = array_merge(self::getCommonContent(), [
        'blog_hero',
        'projects',
        'filter',
        'add_more_btn',
       
    ]);
    
    $collections = array_merge(self::getCommonCollections(), [
        
    ]);
  
    $state = self::getCommonState($lang);
    
    
    $data = Data::get($lang, [
        'content' => $content,
        'collections' => $collections
    ]);
    
    $state = array_merge($state, $data);

    $state['Page'] = [];

    $state['categories'] = class_exists(BlogCategories::class)
        ? BlogCategories::get($lang)
        : [];

    
    $state['items'] = class_exists(BlogEntries::class)
    ? BlogEntries::getAll($lang)
    : [];
    $state['Menu'] = ['current' => 'blog'];

    
    $state['Page']['current'] = 'blog';
    
    // meta
    $meta_data = MetaData::get($lang, 'blog');
    
    MetaHelper::setTitle($meta_data['title']);
    MetaHelper::setDescription($meta_data['description']);
    
    return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * Price calculator page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function priceCalculator($lang) {
    //<editor-fold defaultstate="collapsed" desc="priceCalculator"> 

        $content = array_merge(self::getCommonContent(), [
           'price_calculator_hero',
           'price_calculator_content',
            'calculator_head',
            'calculator_text',
            'calculator_image_1',
            'calculator_image_2',
            'calculator_image_3',
            'calculator_pricing',
            'price_calculator_head',
            'calculate',
            'second_view',
            'type',
            'area',
            'predict',
            'eur',
            'pvn',
            'note',
            'contact',
            'send',
            'back',
            'success_message'
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'price_calculator'];

        $state['Page'] = [];
        $state['Page']['current'] = 'price_calculator';
        
        $meta_data = MetaData::get($lang, 'price_calculator');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>//s
    }
    
     /**
     * Contacts page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function contacts($lang) {
    //<editor-fold defaultstate="collapsed" desc="contacts"> 

        $content = array_merge(self::getCommonContent(), [
           'contacts_hero',
            'facebook',
            'instagram',
            'adress',
            'send_message',
            'our_contacts',
            'contact_send_btn',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'contacts'];

        $state['Page'] = [];
        $state['Page']['current'] = 'contacts';
        
        $meta_data = MetaData::get($lang, 'contacts');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * privacy_policy
     *
     * @access public           
     * @param  
     * @return array
    */
    public static function privacyPolicy($lang) {
    //<editor-fold defaultstate="collapsed" desc="privacy_policy"> 

        $content = array_merge(self::getCommonContent(), [
           
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'privacy_policy' => [
                'results_per_page' => 'all'
            ]
        ]);
      
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
          
        $state['Menu'] = ['current' => 'privacy_policy'];

        $state['Page'] = [];        
        $state['Page']['current'] = 'privacy_policy';
        
        $meta_data = MetaData::get($lang, 'privacy_policy');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    //Entry opens
    
     /**
     * Blog entry page
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function blogEntry($lang, $blog_id) {
    //<editor-fold defaultstate="collapsed" desc="blogEntry"> 
        $id = head(explode('-', $blog_id));
        $id = intval($id);
        
        $blog = Blog\BlogEntries::getQuery($lang)->where('b.id', $id)->first();
        
        if (empty($blog)) {
            return null;
        }
        
        $blog = Blog\BlogEntries::formatResponseData($blog, $lang);
        
        $blog['videos'] = Video::query()
    ->where('container_name', 'blog_entry')
    ->where('container_id', $id)
    ->orderBy('position')
    ->get()
    ->toArray();
        
        $content = array_merge(self::getCommonContent(), [
            'video_content',
            'facebook',
            'instagram',
            'share_with',
            'tip_open_btn1',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
        ]);
        
        $state = self::getCommonState($lang);
        
        $data = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
        
        $state = array_merge($state, $data);
        
        $state['blog'] = $blog;

$isTip = !empty($blog['tip_projects']); 

$state['other_blog'] = Blog\BlogEntries::getOther($lang, $id, $isTip);
          
        $state['Menu'] = ['current' => 'blog'];

$state['Page'] = [];
$state['Page']['current'] = 'blog_entry';
        
//        MetaHelper::setTitle(Arr::get($service, 'lang_data.meta_title')); //
//        MetaHelper::setDescription(Arr::get($service, 'lang_data.meta_description'));
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    public static function tipveidaBlog($lang) {
    //<editor-fold defaultstate="collapsed" desc="tipveidaBlog">

    $content = array_merge(self::getCommonContent(), [
        'tipveida_blog_hero',
        'video_content',
        'tipveida',
        'tip_blog_btn1',
        'add_more_btn',
    ]);

    $collections = array_merge(self::getCommonCollections(), [
        
    ]);

    $state = self::getCommonState($lang);

    $data = Data::get($lang, [
        'content' => $content,
        'collections' => $collections
    ]);

    $state = array_merge($state, $data);

    $state['Page'] = [];

    $state['items'] = class_exists(BlogEntries::class)
        ? BlogEntries::getAll($lang)
        : [];

    $state['Menu'] = ['current' => 'tipveida_blog'];
    $state['Page']['current'] = 'tipveida_blog';

    // meta
//    $meta_data = MetaData::get($lang, 'tipveida_blog');
//    MetaHelper::setTitle($meta_data['title']);
//    MetaHelper::setDescription($meta_data['description']);

    return Store::setState($lang, $state);

    //</editor-fold>
}

}