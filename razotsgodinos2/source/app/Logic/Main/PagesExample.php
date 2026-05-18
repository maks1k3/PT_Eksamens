<?php
namespace App\Logic\Main;
use Illuminate\Support\Arr;

use App\Logic\Core\Langs;
use App\Logic\CMS\Data;
use App\Models\CMS\Collection;
use App\Logic\Core\MetaData;
use App\Helpers\Core\MetaHelper;
use App\Logic\Core\Store;
use App\Logic\Core\Translations;

class PagesExample
{

     /**
     * Get common content
     *
     * @access public           
     * @return array
    */
    public static function getCommonContent() {
    //<editor-fold defaultstate="collapsed" desc="getCommonContent"> 
        return [
            'contacts',          
            'requisites',          
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
            'info_pages' => array(
                'results_per_page' => 'all',
                'order' => array(
                    'position' => 'asc',
                )
            ),
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
            'home_page_content',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'home_page_slider' => [
                'results_per_page' => 'all',                
                'order' => [
                    'position' => 'asc',
                ]
            ],
            'news' => [
                'results_per_page' => 3, 
                'page' => 1,
                'active' => true,
                'order' => [
                    'date' => 'desc',
                ]
            ],
            'solutions' => [
                'results_per_page' => 2, 
                'page' => 1,
                'order' => [
                    'position' => 'asc',
                ]
            ],
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
          
        $state['Menu'] = ['current' => 'home'];

        $state['Page'] = [];        
        $state['Page']['current'] = 'home';
        
        $meta_data = MetaData::get($lang, 'home');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
       
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * About us
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function aboutUs($lang) {
    //<editor-fold defaultstate="collapsed" desc="aboutUs"> 
                
        $content = array_merge(self::getCommonContent(), [
            'about_us'
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'about_us_images' => [
                'results_per_page' => 'all',                
                'order' => [
                    'position' => 'asc',
                ]
            ],
            'about_us_videos' => [
                'results_per_page' => 'all',                
                'order' => [
                    'position' => 'asc',
                ]
            ],
            'about_us_files' => [
                'results_per_page' => 'all',                
                'order' => [
                    'position' => 'asc',
                ]
            ],
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
          
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
     * Contacts
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function contacts($lang) {
    //<editor-fold defaultstate="collapsed" desc="contacts"> 
                
        $content = array_merge(self::getCommonContent(), [
            'contacts_map',
            'contacts_text',
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'contacts' => [
                'results_per_page' => 'all',                
                'order' => [
                    'position' => 'asc',
                ]
            ],
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);
          
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
     * News
     *
     * @access public  
     * @param  Illuminate\Http\Request $request - request          
     * @param  string $lang - current lang 
     * @return array
    */
    public static function news($request, $lang) {
    //<editor-fold defaultstate="collapsed" desc="news"> 
        $page = $request->page === null ? 1 : intval($request->page);
        
        $content = array_merge(self::getCommonContent(), [

        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'news' => [
                'results_per_page' => 2,
                'page' => $page,
                'active' => 1,
                'order' => array(
                    'date' => 'desc',
                )
            ],           
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);        
                
        
        $state['Menu'] = ['current' => 'news'];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'news';
        
        $state['NewsPage'] = [];        
        $state['NewsPage']['current'] = 'news';
        
        $state['BreadCrumbs'] = [
            [
                'title' => Translations::get('news'),
                'url' => url("{$lang}/news"),                       
            ],            
        ];        
        
        $meta_data = MetaData::get($lang, 'news');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
    
    /**
     * News Item
     *
     * @access public            
     * @param  string $lang - current lang 
     * @param  string $id - id-title 
     * @return array
    */
    public static function newsItem($lang, $id) {
    //<editor-fold defaultstate="collapsed" desc="newsItem"> 
        $id = head(explode('-', $id));
        $id = intval($id);
        
        $newsItem = Collection::whereNameAndId('news', $id)->first();
        
        if (empty($newsItem)) {
            return null;
        }
        
        
        $content = array_merge(self::getCommonContent(), [

        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'gallery' => [
                'collection_name' => 'gallery',
                'collection_id' => $id,                
                'results_per_page' => 'all',                 
                'order' => [
                    'position' => 'asc',
                ]
            ],           
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections,
            'collectionItems' => [$id],
        ]);        
                
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'news';        
        
        $state['NewsPage'] = [];      
        $state['NewsPage']['current'] = 'news_item';
        $state['NewsPage']['id'] = $id;    
                
        $item = Arr::get($state, "collectionItems.{$id}");
        
        $state['BreadCrumbs'] = [
            [
                'title' => Translations::get('news'),
                'url' => url("{$lang}/news"),                
            ],    
            [
                'title' => $item['langData']['title'],
                'url' => url("{$lang}/news/{$id}-{$item['langData']['slug']}"),                       
            ],             
        ];
        
        MetaHelper::setTitle($item['langData']['title']);
        MetaHelper::setDescription($item['langData']['content']);        
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }
 
    /**
     * Solutions
     *
     * @access public  
     * @param  Illuminate\Http\Request $request - request          
     * @param  string $lang - current lang 
     * @return array
    */
    public static function solutions($request, $lang) {
    //<editor-fold defaultstate="collapsed" desc="solutions"> 
        $page = $request->page === null ? 1 : intval($request->page);
        
        $content = array_merge(self::getCommonContent(), [

        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'solutions' => [
                'results_per_page' => 2,
                'page' => $page,
                'order' => [
                    'position' => 'asc',
                ]
            ],
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);        
                
        
        $state['Menu'] = ['current' => 'solutions'];
                
        $state['Page'] = [];        
        $state['Page']['current'] = 'solutions';
        
        $state['SolutionsPage'] = [];        
        $state['SolutionsPage']['current'] = 'solutions';
        
        $state['BreadCrumbs'] = [
            [
                'title' => Translations::get('solutions'),
                'url' => url("{$lang}/solutions"),                
            ],         
        ];
        
        $meta_data = MetaData::get($lang, 'solutions');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }    
    
    /**
     * Solution
     *
     * @access public            
     * @param  string $lang - current lang 
     * @param  string $id - id-title 
     * @return array
    */
    public static function solution($lang, $id) {
    //<editor-fold defaultstate="collapsed" desc="solution"> 
        $id = head(explode('-', $id));
        $id = intval($id);
        
        $solutionItem = Collection::whereNameAndId('solutions', $id)->first();
        
        if (empty($solutionItem)) {
            return null;
        }
        
        
        $content = array_merge(self::getCommonContent(), [

        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'gallery' => [
                'collection_name' => 'gallery',
                'collection_id' => $id,                
                'results_per_page' => 'all',                 
                'order' => [
                    'position' => 'asc',
                ]
            ],
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections,
            'collectionItems' => [$id],
        ]);        
                
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'solutions';
        
        $state['SolutionsPage'] = [];      
        $state['SolutionsPage']['current'] = 'solution';
        $state['SolutionsPage']['id'] = $id;
        
        $state['Page']['id'] = $id;
        
        $item = Arr::get($state, "collectionItems.{$id}");
        
        $state['BreadCrumbs'] = [
            [
                'title' => Translations::get('solutions'),
                'url' => url("{$lang}/solutions"),                
            ],    
            [
                'title' => $item['langData']['title'],
                'url' => url("{$lang}/solution/{$id}-{$item['langData']['slug']}"),                       
            ],             
        ];
        
        MetaHelper::setTitle($item['langData']['title']);
        MetaHelper::setDescription($item['langData']['content']);        
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }  
    
    /**
     * Products
     *
     * @access public     
     * @param  Illuminate\Http\Request $request - request            
     * @param  string $lang - current lang 
     * @param  string $segment_1 - id-title 
     * @param  string $segment_2 - id-title 
     * @return array
    */
    public static function products($request, $lang, $segment_1, $segment_2) {
    //<editor-fold defaultstate="collapsed" desc="commonItems"> 
        $page = $request->page === null ? 1 : intval($request->page);
        
        //return null;
                                      
    # ========================================================================#
    #
    #                           Products main page
    #    
    # ========================================================================#    
    //<editor-fold defaultstate="collapsed" desc="Products main page">
    
        if ($segment_1 === null && $segment_2 === null) {
           
            
            $content = array_merge(self::getCommonContent(), [
                
            ]);

            $collections = array_merge(self::getCommonCollections(), [
                'categories' => array(
                    'active' => 1,
                    'results_per_page' => 'all',
                    'order' => array(
                        'position' => 'asc',
                    )
                ),
            ]);

            $state = Data::get($lang, [
                'content' => $content,
                'collections' => $collections
            ]);        


            $state['Menu'] = ['current' => 'products'];
            
            $state['Page'] = [];
            $state['Page']['current'] = 'products';
            
            
            $state['ProductsPage'] = [];
            $state['ProductsPage']['current'] = 'categories';
            $state['ProductsPage']['parentCategoryId'] = 0;
            $state['ProductsPage']['subCategoryId'] = 0;
                        
            $meta_data = MetaData::get($lang, 'products');
        
            MetaHelper::setTitle($meta_data['title']);
            MetaHelper::setDescription($meta_data['description']);

            return Store::setState($lang, $state);
        }    
    //</editor-fold>  
    # ========================================================================#
    #
    #                           Parsing segments
    #    
    # ========================================================================#    
    //<editor-fold defaultstate="collapsed" desc="Products main page">
        else {
            
            $state = [];
            
            $state['Page'] = [];
            $state['Page']['current'] = 'products';
            
            $state['ProductsPage'] = [];
            
            $content = array_merge(self::getCommonContent(), [
                
            ]);
            
            $collections = array_merge(self::getCommonCollections(), [
                'categories' => array(
                    'active' => 1,
                    'results_per_page' => 'all',
                    'order' => array(
                        'position' => 'asc',
                    )
                ),
            ]);
            
            $collectionItems = [];
            
            if ($segment_1 !== null ) {
                $segment_1 = head(explode('-', $segment_1));
                $id = intval($segment_1);                
                
                $category = Collection::whereNameAndId('categories', $id)->first();
                
                if (empty($category)) {
                    return null;
                }
                
                $collectionItems[] = $id;
                
                $content_type = Arr::get($category->data, 'type', 'products');
                
                if ($content_type === 'products') {
                    $collections['products'] = [
                        'collection_id' => $id, 
                        'page' => $page,
                        'results_per_page' => '2',
                        'order' => [
                            'position' => 'asc',
                        ]
                    ];

                    $state['ProductsPage']['current'] = 'products';
                    $state['ProductsPage']['parentCategoryId'] = $id;
                    $state['ProductsPage']['subCategoryId'] = 0;
                }
                else {
                    $collections['sub_categories'] = [
                        'collection_id' => $id, 
                        'results_per_page' => 'all',
                        'order' => [
                            'position' => 'asc',
                        ]
                    ];

                    $state['ProductsPage']['current'] = 'categories';
                    $state['ProductsPage']['parentCategoryId'] = $id;
                    $state['ProductsPage']['subCategoryId'] = 0;
                }
                               
                
                
            }
            if ($segment_2 !== null ) {
                $segment_2 = head(explode('-', $segment_2));
                $id = intval($segment_2);  
                
                if ($content_type === 'sub_categories') {
                    $collections['products'] = [
                        'collection_id' => $id, 
                        'page' => $page,
                        'results_per_page' => '2',
                        'order' => [
                            'position' => 'asc',
                        ]
                    ];
                    
                    $state['ProductsPage']['current'] = 'products';
                    $state['ProductsPage']['subCategoryId'] = $id;
                }
                else {
                    return null;
                }
                
                
            }
            
            $state = array_merge($state, Data::get($lang, [
                'content' => $content,
                'collections' => $collections,
                'collectionItems' => $collectionItems,                
            ]));      
            
            $item = Arr::get($state, "collectionItems.{$id}"); 
        
            MetaHelper::setTitle($item['langData']['title']);
            
            if (isset($item['langData']['content'])){               
                MetaHelper::setDescription($item['langData']['content']);
            }
            
            return Store::setState($lang, $state);
        }
           
    //</editor-fold>      
        
        
        
    //</editor-fold>
    }    
    
    /**
     * Product
     *
     * @access public           
     * @param  string $lang - current lang 
     * @param  string $id - id-title 
     * @return array
    */
    public static function product($lang, $id) {
    //<editor-fold defaultstate="collapsed" desc="product"> 
        $id = head(explode('-', $id));
        $id = intval($id);
                        
        $product = Collection::whereNameAndId('products', $id)->first();
        
        if (empty($product)) {
            return null;
        }
        
        $state = [];
        $state['Page'] = [];
        $state['Page']['current'] = 'products';
        
        $state['ProductsPage'] = [];        
        $state['ProductsPage']['current'] = 'product';
            
        $content = array_merge(self::getCommonContent(), [
            
        ]);

        $collections = array_merge(self::getCommonCollections(), [
            'categories' => array(
                'active' => 1,
                'results_per_page' => 'all',
                'order' => array(
                    'position' => 'asc',
                )
            ),
        ]);
        
        $collectionItems = [$product->id];
        
        
        $tmp = Collection::whereId($product->collection_id)->first();
        
        if ($tmp->collection_id === 0) {
            $category = $tmp;
            $sub_category = null;
            $state['ProductsPage']['parentCategoryId'] = $category->id;
            $state['ProductsPage']['subCategoryId'] = 0;
        }
        else {
            $sub_category = $tmp;
            $category = Collection::whereId($sub_category->collection_id)->first();
            $state['ProductsPage']['parentCategoryId'] = $category->id;
            $state['ProductsPage']['subCategoryId'] = $sub_category->id;
            
            $collections['sub_categories'] = [
                'collection_id' => $category->id, 
                'results_per_page' => 'all',
                'order' => [
                    'position' => 'asc',
                ]
            ];
        }
        
        
        
        $state = array_merge($state, Data::get($lang, [
            'content' => $content,
            'collections' => $collections,
            'collectionItems' => $collectionItems,                
        ]));         

        
        $state['ProductsPage']['productId'] = $id;
        
        $item = Arr::get($state, "collectionItems.{$id}"); 
        
        MetaHelper::setTitle($item['langData']['title']);
        MetaHelper::setDescription($item['langData']['content']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }        
    
    /**
     * Info page
     *
     * @access public            
     * @param  string $lang - current lang 
     * @param  string $id - id-title 
     * @return array
    */
    public static function infoPage($lang, $id) {
    //<editor-fold defaultstate="collapsed" desc="infoPage"> 
        $id = head(explode('-', $id));
        $id = intval($id);
        
        $info = Collection::whereNameAndId('info_pages', $id)->first();
        
        if (empty($info)) {
            return null;
        }
        
        
        $content = array_merge(self::getCommonContent(), [

        ]);
        
        $collections = array_merge(self::getCommonCollections(), [

        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections,
            'collectionItems' => [$id],
        ]);        
                
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'info_page';
        $state['Page']['id'] = $id;
        
        $item = Arr::get($state, "collectionItems.{$id}");  
        
        
        MetaHelper::setTitle($item['langData']['title']);
        MetaHelper::setDescription($item['langData']['content']);        
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }     
    
    /**
     * Search
     *
     * @access public           
     * @param  string $lang - current lang 
     * @return array
    */
    public static function search($lang) {
    //<editor-fold defaultstate="collapsed" desc="search"> 
        
        $content = array_merge(self::getCommonContent(), [
//           'search_page_image'
        ]);
        
        $collections = array_merge(self::getCommonCollections(), [
            'new_images_collection' => [
                'results_per_page' => 'all',
                'order' => [
                    'position' => 'asc',
                ]
            ],
            'new_videos_collection' => [
                'results_per_page' => 'all',
                'order' => [
                    'position' => 'asc',
                ]
            ],
            'new_files_collection' => [
                'results_per_page' => 'all',
                'order' => [
                    'position' => 'asc',
                ]
            ],
        ]);
        
        $state = Data::get($lang, [
            'content' => $content,
            'collections' => $collections
        ]);        
                
        
        $state['Menu'] = ['current' => 'search'];
        
        $state['Page'] = [];        
        $state['Page']['current'] = 'search';
        
        
        $meta_data = MetaData::get($lang, 'search');
        
        MetaHelper::setTitle($meta_data['title']);
        MetaHelper::setDescription($meta_data['description']);
        
        return Store::setState($lang, $state);
    //</editor-fold>
    }    
    
   
    
}