<?php
namespace App\Config;

use Arr;

class Content
{

            
    /**
     * Get CMS content configuration
     *
     * @access public                
     * @return array
    */
    public static function get() {
    //<editor-fold defaultstate="collapsed" desc="get"> 
        $config = [];
        
        
        /*
        |--------------------------------------------------------------------------
        |                             about_me_second
        |--------------------------------------------------------------------------|
        */
//<editor-fold defaultstate="collapsed" desc="about_me_second"> 
$config['about_text'] = [
    'langData' => function ($title, $content, $data) {
        return [
            'content_1' => Arr::get($data, 'content_1', ''),
            'content_2' => Arr::get($data, 'content_2', ''),
            'content_3' => Arr::get($data, 'content_3', ''),
        ];
    },
    'media' => [
        'images' => 1,
    ],
];
    
    /*
        |--------------------------------------------------------------------------
        |                             benefits_3
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="benefits_3"> 
        $config['benefits_3'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'benefit_3' => Arr::get($data, 'benefit_3', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             benefits_4
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="benefits_4"> 
        $config['benefits_4'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'benefit_4' => Arr::get($data, 'benefit_4', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             work_title_1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="work_title_1"> 
        $config['work_title_1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'work_title1' => Arr::get($data, 'work_title1', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             work_title_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="work_title_2"> 
        $config['work_title_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'work_title2' => Arr::get($data, 'work_title2', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             work_title_3
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="work_title_3"> 
        $config['work_title_3'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'work_title3' => Arr::get($data, 'work_title3', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             work_text
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="work_text"> 
        $config['work_text'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'work_Text' => Arr::get($data, 'work_Text', ''),
                ];
            },
        ];

        //</editor-fold>
        /*
        |--------------------------------------------------------------------------
        |                             hero_slide_1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="hero_slide"> 
        $config['hero_slide_1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'text' => Arr::get($data, 'text', ''),
                    'heading' => Arr::get($data, 'heading', ''),
                    'text_bottom' => Arr::get($data, 'text_bottom', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        //
        //
        //</editor-fold>
            
              /*
        |--------------------------------------------------------------------------
        |                             hero_slide_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="hero_slide_2"> 
        $config['hero_slide_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'text' => Arr::get($data, 'text', ''),
                    'heading' => Arr::get($data, 'heading', ''),
                    'text_bottom' => Arr::get($data, 'text_bottom', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             hero_slide_3
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="hero_slide_3"> 
        $config['hero_slide_3'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'text' => Arr::get($data, 'text', ''),
                    'heading' => Arr::get($data, 'heading', ''),
                    'text_bottom' => Arr::get($data, 'text_bottom', ''),
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             review_1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="review_1"> 
        $config['review_1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'text' => Arr::get($data, 'text', ''),
                    'date' => Arr::get($data, 'date', ''),
                     
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             review_heading
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="review_heading"> 
        $config['review_heading'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'review_head' => Arr::get($data, 'review_head', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             price_calculator_head
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="price_calculator_head"> 
        $config['price_calculator_head'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'heading' => Arr::get($data, 'heading', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             calculate
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculate"> 
        $config['calculate'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'calc' => Arr::get($data, 'calc', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             second_view
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="second_view"> 
        $config['second_view'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'type' => Arr::get($data, 'type', ''),
                    'area' => Arr::get($data, 'area', ''),
                    'prices' => Arr::get($data, 'prices', ''),
                    'price' => Arr::get($data, 'price', ''),
                    'pvn' => Arr::get($data, 'pvn', ''),
                    'note' => Arr::get($data, 'note', ''),
                    'contacts' => Arr::get($data, 'contacts', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             type
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="type"> 
        $config['type'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'types' => Arr::get($data, 'types', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             area
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="area"> 
        $config['area'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'areaa' => Arr::get($data, 'areaa', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             predict
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="predict"> 
        $config['predict'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'price' => Arr::get($data, 'price', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             eur
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="predict"> 
        $config['eur'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'eurr' => Arr::get($data, 'eurr', ''),
                ];
            },
        ];

        //</editor-fold>
            
        /*
        |--------------------------------------------------------------------------
        |                             note
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="note"> 
        $config['note'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'notes' => Arr::get($data, 'notes', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             contact
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="contact"> 
        $config['contact'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'contacts' => Arr::get($data, 'contacts', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             send
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="send"> 
        $config['send'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'sendd' => Arr::get($data, 'sendd', ''),
                ];
            },
        ];

        //</editor-fold>
                 /*
        |--------------------------------------------------------------------------
        |                             back
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="back"> 
        $config['back'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'backk' => Arr::get($data, 'backk', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             success_message
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="success_message"> 
        $config['success_message'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'message' => Arr::get($data, 'message', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             pvn
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="pvn"> 
        $config['pvn'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'pvnn' => Arr::get($data, 'pvnn', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             review_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="review_2"> 
        $config['review_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'text' => Arr::get($data, 'text', ''),
                    'date' => Arr::get($data, 'date', ''),
                     
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             add_more_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="add_more_btn1"> 
        $config['add_more_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'add_more_Btn1' => Arr::get($data, 'add_more_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             phone
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="phone"> 
        $config['phone'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'phone_number' => Arr::get($data, 'phone_number', ''),
                     'phone_url' => Arr::get($data, 'phone_url', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             email
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="email"> 
        $config['email'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'Email' => Arr::get($data, 'Email', ''),
                    'Email_url' => Arr::get($data, 'Email_url', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             facebook
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="facebook"> 
        $config['facebook'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'facebook_url' => Arr::get($data, 'facebook_url', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             instagram
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="instagram"> 
        $config['instagram'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'instagram_url' => Arr::get($data, 'instagram_url', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             adress
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="adress"> 
        $config['adress'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'Adress' => Arr::get($data, 'Adress', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             review_3
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="review_3"> 
        $config['review_3'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'text' => Arr::get($data, 'text', ''),
                    'date' => Arr::get($data, 'date', ''),
                     
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
          /*
        |--------------------------------------------------------------------------
        |                             calculator_pricing
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_pricing"> 
        $config['calculator_pricing'] = [  
            'data' => function ($data) {
                return [
                    'lapene_pamati_bloku' => Arr::get($data, 'lapene_pamati_bloku', ''),
                    'lapene_pamati_betoneti' => Arr::get($data, 'lapene_pamati_betoneti', ''),
                    'lapene_pamati_skruvpali' => Arr::get($data, 'lapene_pamati_skruvpali', ''),
                    'lapene_grida_yes' => Arr::get($data, 'lapene_grida_yes', ''),
                    'lapene_sienas_yes' => Arr::get($data, 'lapene_sienas_yes', ''),
                    'lapene_krasots_yes' => Arr::get($data, 'lapene_krasots_yes', ''),
                    'lapene_jumts_sindelis' => Arr::get($data, 'lapene_jumts_sindelis', ''),
                    'lapene_jumts_metala' => Arr::get($data, 'lapene_jumts_metala', ''),
                    'lapene_vizualizacija_yes' => Arr::get($data, 'lapene_vizualizacija_yes', ''),
                    'darza_pamati_bloku' => Arr::get($data, 'darza_pamati_bloku', ''),
                    'darza_pamati_betoneti' => Arr::get($data, 'darza_pamati_betoneti', ''),
                    'darza_pamati_skruvpali' => Arr::get($data, 'darza_pamati_skruvpali', ''),
                    'darza_grida_yes' => Arr::get($data, 'darza_grida_yes', ''),
                    'darza_sienas_yes' => Arr::get($data, 'darza_sienas_yes', ''),
                    'darza_krasots_yes' => Arr::get($data, 'darza_krasots_yes', ''),
                    'darza_jumts_sindelis' => Arr::get($data, 'darza_jumts_sindelis', ''),
                    'darza_jumts_metala' => Arr::get($data, 'darza_jumts_metala', ''),
                    'darza_vizualizacija_yes' => Arr::get($data, 'darza_vizualizacija_yes', ''),
                    'auto_pamati_bloku' => Arr::get($data, 'auto_pamati_bloku', ''),
                    'auto_pamati_betoneti' => Arr::get($data, 'auto_pamati_betoneti', ''),
                    'auto_pamati_skruvpali' => Arr::get($data, 'auto_pamati_skruvpali', ''),
                    'auto_grida_yes' => Arr::get($data, 'auto_grida_yes', ''),
                    'auto_sienas_yes' => Arr::get($data, 'auto_sienas_yes', ''),
                    'auto_krasots_yes' => Arr::get($data, 'auto_krasots_yes', ''),
                    'auto_jumts_sindelis' => Arr::get($data, 'auto_jumts_sindelis', ''),
                    'auto_jumts_metala' => Arr::get($data, 'auto_jumts_metala', ''),
                    'auto_vizualizacija_yes' => Arr::get($data, 'auto_vizualizacija_yes', ''),
                ];
            },
        ];

        //</editor-fold>
                /*
        |--------------------------------------------------------------------------
        |                             tip_projects_title
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="tip_projects_title"> 
        $config['tip_projects_title'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'tip_projects_Title' => Arr::get($data, 'tip_projects_Title', ''),
                ];
            },
        ];

        //</editor-fold>
                /*
        |--------------------------------------------------------------------------
        |                             viedo_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="viedo_content"> 
        $config['video_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'heading' => Arr::get($data, 'heading', ''),
                    'time' => Arr::get($data, 'time', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             projects
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="projects"> 
        $config['projects'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             tipveida
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="tipveida"> 
        $config['tipveida'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             share_with
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="share_with"> 
        $config['share_with'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'share_project' => Arr::get($data, 'share_project', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             send_message
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="send_message"> 
        $config['send_message'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'message' => Arr::get($data, 'message', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             our_contacts
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="our_contacts"> 
        $config['our_contacts'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'contacts' => Arr::get($data, 'contacts', ''),
                ];
            },
        ];

        //</editor-fold>
               /*
        |--------------------------------------------------------------------------
        |                             contact_send_btn
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="contact_send_btn"> 
        $config['contact_send_btn'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'contact_send_Btn' => Arr::get($data, 'contact_send_Btn', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             home_hero_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_hero_btn1"> 
        $config['home_hero_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'home_hero_Btn1' => Arr::get($data, 'home_hero_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             tip_projects_text
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="tip_projects_text"> 
        $config['tip_projects_text'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'tip_projects_Text' => Arr::get($data, 'tip_projects_Text', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             home_hero_btn2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_hero_btn2"> 
        $config['home_hero_btn2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'home_hero_Btn2' => Arr::get($data, 'home_hero_Btn2', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             home_projects_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_projects_btn1"> 
        $config['home_projects_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'home_projects_Btn1' => Arr::get($data, 'home_projects_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             home_tip_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_tip_btn1"> 
        $config['home_tip_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'home_tip_Btn1' => Arr::get($data, 'home_tip_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             home_review_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_review_btn1"> 
        $config['home_review_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'home_review_Btn1' => Arr::get($data, 'home_review_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             filter
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="filter"> 
        $config['filter'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'Filter' => Arr::get($data, 'Filter', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             nav_menu
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="nav_menu"> 
        $config['nav_menu'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'about' => Arr::get($data, 'about', ''),
                    'projects' => Arr::get($data, 'projects', ''),
                    'standard' => Arr::get($data, 'standard', ''),
                    'contacts' => Arr::get($data, 'contacts', ''),
                    'calculator' => Arr::get($data, 'calculator', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             tip_open_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="tip_open_btn1"> 
        $config['tip_open_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'tip_open_Btn1' => Arr::get($data, 'tip_open_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             tip_blog_btn1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="tip_blog_btn1"> 
        $config['tip_blog_btn1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'tip_blog_Btn1' => Arr::get($data, 'tip_blog_Btn1', ''),
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             add_more_btn
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="add_more_btn"> 
        $config['add_more_btn'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'add_more' => Arr::get($data, 'add_more', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             tip_projects_btn
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="tip_projects_btn"> 
        $config['tip_projects_btn'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'tip_projects_Btn' => Arr::get($data, 'tip_projects_Btn', ''),
                ];
            },
        ];

        //</editor-fold>

    /*
        |--------------------------------------------------------------------------
        |                             about_image
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_image"> 
        $config['about_image'] = [  
            'media' => [
                'images' => 1,
            ],  
        ];
        
        
        
        
       
                /*
        |--------------------------------------------------------------------------
        |                             calculator_head
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_head"> 
        $config['calculator_head'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'heading' => Arr::get($data, 'heading', ''),
                    
                ];
            },
        ];

        //</editor-fold>
              /*
        |--------------------------------------------------------------------------
        |                             calculator_text
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_text"> 
        $config['calculator_text'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'calculator_Text' => Arr::get($data, 'calculator_Text', ''),
                ];
            },
        ];

        //</editor-fold>
            
            /*
        |--------------------------------------------------------------------------
        |                             calculator_image_1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_image_1"> 
        $config['calculator_image_1'] = [  
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        /*
        |--------------------------------------------------------------------------
        |                             calculator_image_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_image_2"> 
        $config['calculator_image_2'] = [  
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
         /*
        |--------------------------------------------------------------------------
        |                             calculator_image_3
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_image_3"> 
        $config['calculator_image_3'] = [  
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
         /*
        |--------------------------------------------------------------------------
        |                             our_projects
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="our_projects"> 
        $config['our_projects'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'our_Projects' => Arr::get($data, 'our_Projects', ''),
                ];
            },
        ];

        //</editor-fold>
            
            
        /*
        |--------------------------------------------------------------------------
        |                             benefits_1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="benefits_1"> 
        $config['benefits_1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'benefit_1' => Arr::get($data, 'benefit_1', ''),
                ];
            },
        ];

        //</editor-fold>
            
             /*
        |--------------------------------------------------------------------------
        |                             benefits_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="benefits_2"> 
        $config['benefits_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'benefit_2' => Arr::get($data, 'benefit_2', ''),
                ];
            },
        ];

        //</editor-fold>
            /*
        |--------------------------------------------------------------------------
        |                             about_text_1
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_text_1"> 
        $config['about_text_1'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'aboutText_1' => Arr::get($data, 'aboutText_1', ''),
                ];
            },
        ];

        //</editor-fold>
            
             /*
        |--------------------------------------------------------------------------
        |                             about_text_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_text_2"> 
        $config['about_text_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'aboutText_2' => Arr::get($data, 'aboutText_2', ''),
                ];
            },
        ];

        //</editor-fold>
             /*
        |--------------------------------------------------------------------------
        |                             about_head
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_head"> 
        $config['about_head'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'aboutHeader' => Arr::get($data, 'aboutHeader', ''),
                ];
            },
        ];

        //</editor-fold>
        /*
         * 
        
         * |--------------------------------------------------------------------------
        |                             contacts_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="contacts_hero"> 
        $config['contacts_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             price_calculator_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="price_calculator_content"> 
        $config['price_calculator_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                    'disclaimer' => Arr::get($data, 'disclaimer', ''),
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             price_calculator_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="price_calculator_hero"> 
        $config['price_calculator_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             blog_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="blog_hero"> 
        $config['blog_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             certificates_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="certificates_content"> 
        $config['certificates_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_divider_2
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_divider_2"> 
        $config['about_us_divider_2'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_our_info
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_our_info"> 
        $config['about_us_our_info'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'right_title' => Arr::get($data, 'right_title', ''),
                    'left_title' => Arr::get($data, 'left_title', ''),
                    'left_content' => Arr::get($data, 'left_content', ''),
                    'right_content' => Arr::get($data, 'right_content', ''),
                    'box_1' => Arr::get($data, 'box_1', ''),
                    'box_2' => Arr::get($data, 'box_2', ''),
                    'box_3' => Arr::get($data, 'box_3', ''),
                    'box_4' => Arr::get($data, 'box_4', ''),
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_divider
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_divider"> 
        $config['about_us_divider'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'content' => $content,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             about_us_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="about_us_hero"> 
        $config['about_us_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             building_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="building_hero"> 
        $config['building_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             renovation_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="renovation_hero"> 
        $config['renovation_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             check_info
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="check_info"> 
        $config['check_info'] = [  
            'data' => function ($data) {
                return [
                    'phone' => Arr::get($data, 'phone', ''),
                    'email' => Arr::get($data, 'email', ''),
                    'address' => Arr::get($data, 'address', ''),
                    'sia' => Arr::get($data, 'sia', ''),
                    'reg_nr' => Arr::get($data, 'reg_nr', ''),
                    'work_time' => Arr::get($data, 'work_time', ''),
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             home_questions
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_questions"> 
        $config['home_questions'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             reviews_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="reviews_content"> 
        $config['reviews_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             calculator_block_content
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="calculator_block_content"> 
        $config['calculator_block_content'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             home_selection
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_selection"> 
        $config['home_selection'] = [  
            'media' => [
                'images' => 2,
            ],  
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             home_divider
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_divider"> 
        $config['home_divider'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
        ];

        //</editor-fold>
        
        /*
        |--------------------------------------------------------------------------
        |                             home_hero
        |--------------------------------------------------------------------------|
        */ 
        //<editor-fold defaultstate="collapsed" desc="home_hero"> 
        $config['home_hero'] = [  
            'langData' => function ($title, $content, $data) {               
                return [
                    'title' => $title,
                    'content' => $content,
                ];
            },
            'media' => [
                'images' => 1,
            ],  
        ];

        //</editor-fold>
                
        
        return $config;
    //</editor-fold>
    }
    
}