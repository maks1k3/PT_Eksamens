<?php
namespace App\Schema;

use Doctrine\DBAL\Schema;

class Config
{
    public static function get(){
        $schema = new Schema\Schema;

        Core::get($schema);
        CMS::get($schema);
        Media::get($schema);
        Main::get($schema);
        //Geo::get($schema);

        return $schema;
    }
}

    