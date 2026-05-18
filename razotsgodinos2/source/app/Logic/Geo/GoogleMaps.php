<?php
namespace App\Logic\Geo;

use Illuminate\Support\Arr;

use App\Helpers\Core\RemoteRequestHelper;

class GoogleMaps
{
    # ========================================================================#
    #
    #                            Methods
    #    
    # ========================================================================#
        
    /**
     * Get place data from google maps api
     *
     * @access public           
     * @param  string $place_id - place id ChIJ7T0H5bDP7kYRMP7yaM3PAAQ
     * @param  func $onSuccess - on success callback 
     * @param  func $onError - on error callback 
     * @return void
    */
    public static function getPlaceData($place_id, $onSuccess, $onError = null) {
    //<editor-fold defaultstate="collapsed" desc="getPlaceData">         
        $options = [
            'url' => 'https://maps.googleapis.com/maps/api/place/details/json',
            'data' => [
                'language' => config('services.google_maps.lang'),
                'key' => config('services.google_maps.key'),
                'placeid' => $place_id
            ],
            'type' => 'get',            
            'success' => function ($response, $header) use ($onSuccess) {
                $onSuccess(Arr::get(json_decode($response, true),'result'));
            },
        ];
            
        if (is_callable($onError)) {
            $options['error'] = function ($response, $header) use ($onError) {
                $onError($response, $header);
            };
        }
        
        RemoteRequestHelper::send($options);        
    //</editor-fold>
    }    
    
    /**
     * Get localized place name
     *
     * @access public           
     * @param  string $place_name - place name
     * @param  string $lang - language
     * @param  func $onSuccess - on success callback 
     * @param  func $onError - on error callback
     * @return void
    */
    public static function getLocalizedPlaceName($place_name, $lang, $onSuccess, $onError = null) {
    //<editor-fold defaultstate="collapsed" desc="getLocalizedPlaceName"> 
        $options = [
            'url' => 'https://maps.googleapis.com/maps/api/place/textsearch/json',
            'data' => [
                'language' => $lang,
                'key' => config('services.google_maps.key'),
                'query' => $place_name
            ],
            'type' => 'get',            
            'success' => function ($response, $header) use ($onSuccess) {
                $onSuccess(Arr::get(json_decode($response, true),'results'));
            },
        ];
            
        if (is_callable($onError)) {
            $options['error'] = function ($response, $header) use ($onError) {
                $onError($response, $header);
            };
        }
        
        RemoteRequestHelper::send($options);    
    //</editor-fold>
    }
    
    /**
     * Get country, region, city, address, postal code from place data
     *
     * @access public       
     * @param  array - response from self::getPlaceData     
     * @return array - result example
        array:10 [▼
          "place_id" => "ChIJRdOOttXP7kYRir4C-BL03Xk"
          "street" => "13. janvāra iela"
          "country" => "Latvia"
          "country_code" => "LV"
          "city" => "Rīga"
          "region" => ""
          "region_short_name" => ""
          "address" => "13. janvāra iela, Rīga, LV-1050, Latvia"
          "postal_code" => "LV-1050"
          "lat" => 56.9452376
          "lng" => 24.1130009
        ]
     * @return void
    */
    public static function parsePlaceData($data) {
    //<editor-fold defaultstate="collapsed" desc="parsePlaceData"> 
        $result = [
            'place_id' => '',
            'street' => '',
            'country' => '',
            'country_code' => '',
            'city' => '',        
            'region' => '',
            'region_short_name' => '',
            'address' => '', 
            'postal_code' => '',
            'lat' => '',
            'lng' => '', 
        ];
        
        $result['place_id'] = Arr::get($data, 'place_id', '');

        foreach ($data['address_components'] as $comp) {
            if (in_array('country',$comp['types'])) {
                $result['country'] = $comp['long_name'];
                $result['country_code'] = $comp['short_name'];
            }
            else if (in_array('administrative_area_level_1', $comp['types'])) {
                $result['region'] = $comp['long_name'];
                $result['region_short_name'] = $comp['short_name'];
            }
            else if (in_array('locality', $comp['types'])) {
                $result['city'] = $comp['short_name'];
            }
            else if (in_array('postal_code', $comp['types'])) {
                $result['postal_code'] = $comp['short_name'];
            }
            else if (in_array('route', $comp['types'])) {
                $result['street'] = $comp['short_name'];
            }
        }
        
        $result['address'] = Arr::get($data, 'formatted_address', '');
        $result['lat'] = Arr::get($data, 'geometry.location.lat', '');
        $result['lng'] = Arr::get($data, 'geometry.location.lng', '');
        
        
        return $result;
    //</editor-fold>
    }
}