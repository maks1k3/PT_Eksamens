<?php
namespace App\Schema;

class Geo
{
    public static function get($schema){
        
        $enabled = true;
        
        if (!$enabled) {
            return $schema;
        }



/*
|--------------------------------------------------------------------------
|                             countries
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="countries"> 
$table = $schema->createTable('countries');
$table->addOption('comment','Countries');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment'=>'Country\'s name']);
$table->addColumn('code', 'string', ['length' => 10, 'notnull'=>false, 'default' => null, 'comment'=>'Country\'s code']);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['name'], 'unique_name');
$table->addUniqueIndex(['code'], 'unique_code');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             regions
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="regions"> 
$table = $schema->createTable('regions');
$table->addOption('comment','Regions');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Regions\'s name']);
$table->addColumn('short_name', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Regions\'s short name']);
$table->addColumn('country_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Regions\'s country']);


$table->setPrimaryKey(['id']);
$table->addIndex(['country_id'], 'idx_country_id');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             cities
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="cities"> 
$table = $schema->createTable('cities');
$table->addOption('comment','Cities');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'City\'s name']);
$table->addColumn('region_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'City\'s region']);
$table->addColumn('country_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'City\'s country']);


$table->setPrimaryKey(['id']);
$table->addIndex(['country_id'], 'idx_country_id');
$table->addIndex(['region_id'], 'idx_region_id');
//</editor-fold>





        return $schema;
    }
}

    