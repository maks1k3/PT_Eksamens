<?php
namespace App\Helpers\Core;
use Embed\Embed;
use Embed\Http\CurlDispatcher;
use Embed\Http\Crawler;
use Embed\Http\CurlClient;
use Illuminate\Support\Arr;
use App\Helpers\Misc\Encoding;

class EmbedHelper
{
    /**
    * Get default embed configuration
    * 
    * @access public   
    * @return array 
    */
    public static function getDefaultConfig(){
    //<editor-fold defaultstate="collapsed" desc="getDefaultConfig">    
        return [
            'html' => [
                'max_images' => 0, //0 - single image -1 - all images
                'external_images' => false
            ],           
        ];       
    //</editor-fold>      
    }
    
    /**
    * Get default crawler
    * 
    * @access public   
    * @return void
    */
    private static function getDefaultCrawler($client) : void{
    //<editor-fold defaultstate="collapsed" desc="getDefaultCrawler">    
        $client->setSettings([
            'max_redirs' => 10,
            'connect_timeout' => 2,
            'timeout' => 5,
            'ssl_verify_peer' => 0,
            'ssl_verify_host' => 0,
            'user_agent' => "Embed PHP Library",
        ]);
    //</editor-fold>      
    }
    
    /**
    * Get default embed configuration
    * 
    * @access public   
    * @param  string $url - url to parse
    * @param  array $config - configuration
    * @param  object $dispatcher - dispatcher
    * @return array
    */
    public static function parse($url, $config = null, $dispatcher = null,$type = 'video'){
    //<editor-fold defaultstate="collapsed" desc="parse">    
        $embed = new Embed();
        if ($config === null) {
            $config = self::getDefaultConfig();
        }     
        
        if ($dispatcher === null) {
            $dispatcher = self::getDefaultCrawler($embed);
        }
        
        try {
            $info = $embed->get($url);
        } catch (\Exception $exc) {
            //$exc->getTraceAsString();
            return [];
        }
//        dd($info);
        $result = [];
        
        $result['title'] = $info->title;//The page title
        $result['description'] = $info->description;//The page description
        
        $result['title'] = iconv(mb_detect_encoding($result["title"], mb_detect_order(), true), 'UTF-8//IGNORE', $result['title']);
        $result['description'] = iconv(mb_detect_encoding($result["description"], mb_detect_order(), true), 'UTF-8//IGNORE', $result['description']);
        
        $result['title'] = Encoding::replace4byte($result['title']);
        $result['description'] = Encoding::replace4byte($result['description']);
                
        $result['title'] = sanitize_string($result["title"], true, 100);
        $result['description'] = sanitize_string($result["description"], true, 250);
        
        $result['title'] = html_entity_decode($result["title"]);
        $result['description'] = html_entity_decode($result["description"]);
        
//        dd($info->code->);
        $result['url'] = $info->url; //The canonical url
        $result['inputUrl'] = $url; //The canonical url
//        $result['type'] = $type; //The page type (link, video, image, rich)
        
       
//        $result['tags'] = $info->tags; //The page keywords (tags)

//        $result['images'] = $info->images; //List of all images found in the page
        $result['image'] = $info->image; //The image choosen as main image
//        $result['imageWidth'] = $info->imageWidth; //The width of the main image
//        $result['imageHeight'] = $info->imageHeight; //The height of the main image

        $result['iframe'] = $info->code; //The code to embed the image, video, etc
        preg_match('/src="([^"]+)"/', $result['iframe'], $match);
        $result['iframeSrc'] = !empty($match[1]) ? $match[1] : '' ;
        
        $result['width'] = Arr::get($info->code,'width',''); //The width of the embed code
        $result['height'] = Arr::get($info->code,'height',''); //The height of the embed code
        $result['aspectRatio'] = Arr::get($info->code,'ratio',''); //The aspect ratio (width/height)

        $result['authorName'] = $info->authorName; //The resource author 
        $result['authorUrl'] = $info->authorUrl; //The author url

        $result['providerName'] = $info->providerName; //The provider name of the page (Youtube, Twitter, Instagram, etc)
        $result['provider'] = mb_strtolower($info->providerName);
        $result['providerUrl'] = $info->providerUrl; //The provider url
//        $result['providerIcons'] = $info->providerIcons; //All provider icons found in the page
//        $result['providerIcon'] = $info->providerIcon; //The icon choosen as main icon

//        $result['publishedDate'] = $info->publishedDate; //The published date of the resource
        $result['license'] = $info->license; //The license url of the resource
//        $result['linkedData'] = $info->linkedData; //The linked-data info (http://json-ld.org/)
        $result['feeds'] = $info->feeds; //The RSS/Atom feeds
        
        $url_parsed = parse_url($url);
        $result['domain'] = isset($url_parsed['host']) ? $url_parsed['host'] : '';
        
        return $result;
    //</editor-fold>      
    }
    
}
