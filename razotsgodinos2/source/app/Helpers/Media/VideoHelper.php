<?php
namespace App\Helpers\Media;
use Illuminate\Support\Arr;
//a
use App\Helpers\Core\EmbedHelper;
use App\Helpers\Core\RemoteRequestHelper;
use App\Logic\Core\Log;

class VideoHelper
{
    /**
     * Get video data
     *
     * @access public           
     * @param  string $url - link to video
     * @return mixed
    */
    public static function getVideoData($url) {
    //<editor-fold defaultstate="collapsed" desc="getVideoData"> 
        $url_data = EmbedHelper::parse($url);
        
        if (empty($url_data)) {
            return false;
        }
        
        
        return [
            'title' => $url_data['title'],
            'description' => $url_data['description'],
            'player' => $url_data['iframeSrc'],
            'provider' => $url_data['provider'],
            'link' => $url_data['url'],
            'thumbnail' => $url_data['image'],
        ];
       
        //test if youtube
        $result = self::parseYouTube($url);

        return $result;
        
    //</editor-fold>
    }
    
    /* ========================================================================*
    *
    *                     Parse youtube video
    *
    * ========================================================================*/
    /**
   * Parse youtube video
   *
   * Urls like:
   * https://www.youtube.com/watch?v=jNQXAC9IVRw
   * https://youtu.be/jNQXAC9IVRw
   * https://www.youtube.com/embed/jNQXAC9IVRw
   *
   * Output like:
   Array
   (
      [provider] => youtube
      [video_id] => jNQXAC9IVRw
      [player] => https://www.youtube.com/embed/jNQXAC9IVRw
      [link] => https://www.youtube.com/watch?v=jNQXAC9IVRw
      [title] => Me at the zoo
      [description] =>
      [thumbnail] => https://img.youtube.com/vi/jNQXAC9IVRw/hqdefault.jpg
      [thumbnail_width] => 480
      [thumbnail_height] => 360
   )
   *
   * @param string $url - link to the video
   * @return array video data or null
   */
    public static function parseYouTube($url) {
    //<editor-fold defaultstate="collapsed" desc="parseYouTube"> 
        $result = [];
        
        $url_data = parse_url($url);
        
        $hostname = Arr::get($url_data, 'host');

        //test if youtube video
        if (
          !in_array($hostname, [
            'www.youtube.com',
            'youtu.be',
            'youtube.com',
          ])          
        ) {
          return null;
        }

        //extract video id
        $pattern = '/^(?:https?:\/\/|\/\/)?(?:www\.|m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})(?![\w-])/';
        
        $matches = [];
      
        preg_match($pattern, $url, $matches, PREG_OFFSET_CAPTURE, 0);
     
        $videoId = Arr::get($matches, '1.0', null);
        
        if (empty($videoId)) {
          return null;
        }

        $videoDataUrl = 'https://www.youtube.com/oembed';
        $params = [];
        $params['url'] = "https://www.youtube.com/watch?v={$videoId}";
        
        $request = RemoteRequestHelper::get([
            'url' => $videoDataUrl,
            'data' => $params,
            'type' => 'get',//post
        ]);

        $status = $request['status'];
        $header = $request['header'];
        $body = $request['body'];
        
        $videoData = [];

        if ($status === 200) {            
            $videoData = json_decode($body, true);            
        }
        else {
            Log::error('remote_request_youtube_oembed_failed', [
                'url' => $videoDataUrl, 
                'type' => 'get', 
                'data' => $params, 
                'status' => $status, 
                'header' => $header, 
                'body' => $body, 
            ]);
        }
                
        if (empty($videoData)) {
            return null;
        }

        $result['provider'] = 'youtube';
        $result['video_id'] = $videoId;
        $result['player'] = "https://www.youtube.com/embed/{$videoId}";
        $result['link'] = "https://www.youtube.com/watch?v={$videoId}";
        $result['title'] = Arr::get($videoData, 'title', '');
        $result['description'] = '';
        $result['thumbnail'] = Arr::get($videoData, 'thumbnail_url', '');
        $result['thumbnail_width'] = intval(
          Arr::get($videoData, 'thumbnail_width', 1)
        );
        $result['thumbnail_height'] = intval(
          Arr::get($videoData, 'thumbnail_height', 1)
        );

        return $result;
    //</editor-fold>
    }
    
    
}