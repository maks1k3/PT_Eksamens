<?php
namespace App\Schema;


class CMS
{
    public static function get($schema){
        
        $enabled = true;
        
        if (!$enabled) {
            return $schema;
        }

/*
|--------------------------------------------------------------------------
|                             content
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="content"> 
$table = $schema->createTable('content');
$table->addOption('comment','Content');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Content\'s name']);
$table->addColumn('media', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Media']);
$table->addColumn('data', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Content\'s data in json']);


$table->setPrimaryKey(['id']);
$table->addIndex(['name'],'idx_name');
$table->addUniqueIndex(['name'],'unique_name');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             collections
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="collections"> 
$table = $schema->createTable('collections');
$table->addOption('comment','Collections');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Collection\'s name']);
$table->addColumn('collection_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Collection\'s id']);
$table->addColumn('media', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Media']);
$table->addColumn('data', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Item\'s data in json']);

$table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Item\'s position']);
$table->addColumn('date', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Item\'s date']);
$table->addColumn('active', 'boolean', ['notnull'=>true, 'default' => 0, 'comment'=>'Is item visibled']);


$table->setPrimaryKey(['id']);
$table->addIndex(['position'],'idx_position');
$table->addIndex(['name', 'collection_id'],'idx_name_collection_id');
//</editor-fold>


        return $schema;
    }
}

    