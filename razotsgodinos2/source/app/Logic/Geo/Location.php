<?php
namespace App\Logic\Geo;

use App\Models\Geo\Country;
use App\Models\Geo\Region;
use App\Models\Geo\City;

class Location
{    
    
    /**
     * Save 
     *
     * @access public           
     * @param  array $data - placeData from GoogleMaps::parsePlaceData      
     * @return void
    */
    public static function save($data) {
    //<editor-fold defaultstate="collapsed" desc="save"> 
        $country = Country::firstOrCreate([
            'name' => $data['country'], 
            'code' => $data['country_code']
        ]);
        
        $region_id = 0;
        
        if (!empty($data['region'])) {
            $region = Region::firstOrCreate([
                'name' => $data['region'], 
                'short_name' => $data['region_short_name'],
                'country_id' => $country->id,
            ]);
            
            $region_id = $region->id;
        }
        
        if (!empty($data['city'])) {
            City::firstOrCreate([
                'name' => $data['city'], 
                'region_id' => $region_id,
                'country_id' => $country->id,
            ]);            
        }                
    //</editor-fold>
    }
    
     /**
     * Update user location 
     *
     * @access public           
     * @param  \App\Models\Main\Profile - user's profile   
     * @param  array $data - placeData from GoogleMaps::parsePlaceData      
     * @return void
    */
    public static function updateUserLocation($profile, $data) {
    //<editor-fold defaultstate="collapsed" desc="save"> 
        
        $country = Country::whereNameAndCode($data['country'], $data['country_code'])->first();
        
        if (!empty($country)) {
            $profile->country_id = $country->id;
        }
               
        
        $region_id = 0;
        if (!empty($data['region'])) {
            $region = Region::whereShortNameAndCountryId($data['region_short_name'], $country->id)->first();                        
            $profile->region_id = $region->id;
            $region_id = $region->id;
        }
        
        if (!empty($data['city'])) {
            $city = City::whereNameAndRegionIdAndCountryId($data['city'], $region_id, $country->id)->first();
            $profile->city_id = $city->id;          
        }               
        
        $profile->save();
    //</editor-fold>
    }
 
}