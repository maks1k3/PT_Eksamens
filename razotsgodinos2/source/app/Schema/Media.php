<?php
namespace App\Schema;

class Media
{
    public static function get($schema){
        
        $enabled = true;
        
        if (!$enabled) {
            return $schema;
        }



/*
|--------------------------------------------------------------------------
|                             images
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="images"> 
$table = $schema->createTable('images');
$table->addOption('comment','Images');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','MyISAM');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('container_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Image\'s container']);
$table->addColumn('container_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Container\'s name']);
$table->addColumn('title', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Image\'s title']);
$table->addColumn('description', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Image\'s description']);
$table->addColumn('file_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'File name of the image']);
$table->addColumn('original', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Link to original image']);
$table->addColumn('width', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Image\'s width']);
$table->addColumn('height', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Image\'s height']);
$table->addColumn('mime', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Image\'s mime']);
$table->addColumn('extension', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Image\'s extension']);
$table->addColumn('size', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Image\'s size in bytes']);
$table->addColumn('resized', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Is image resized']);
$table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Image\'s position']);

$table->setPrimaryKey(['id']);
$table->addIndex(['position'],'idx_position');
$table->addIndex(['container_id','container_name'],'idx_container_id_container_name');
$table->addIndex(['title','description'],'fulltext_title_description',['fulltext']);
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             videos
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="videos"> 
$table = $schema->createTable('videos');
$table->addOption('comment','Videos');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','MyISAM');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('container_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Video\'s container']);
$table->addColumn('container_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Container\'s name']);
$table->addColumn('title', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Video\'s title']);
$table->addColumn('description', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Video\'s description']);
$table->addColumn('player', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Link to player']);
$table->addColumn('provider', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Video\'s provider']);
$table->addColumn('link', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Normalized link to video on video hosting website']);
$table->addColumn('thumbnail', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'File name of the video thumbnail']);
$table->addColumn('thumbnail_width', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Thumbnail\'s width']);
$table->addColumn('thumbnail_height', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Thumbnail\'s height']);
$table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Video\'s position']);

$table->setPrimaryKey(['id']);
$table->addIndex(['position'],'idx_position');
$table->addIndex(['container_id','container_name'],'idx_container_id_container_name');
$table->addIndex(['title','description'],'fulltext_title_description',['fulltext']);
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             files
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="files"> 
$table = $schema->createTable('files');
$table->addOption('comment','Files list');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('container_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'File\'s container']);
$table->addColumn('container_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Container\'s name']);
$table->addColumn('display_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'File\'s display name']);
$table->addColumn('file_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'File name of the file']);
$table->addColumn('original_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Original file\'s name']);
$table->addColumn('mime', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'File\'s mime']);
$table->addColumn('extension', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'File\'s extension']);
$table->addColumn('size', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'File\'s size in bytes']);
$table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'File\'s position']);

$table->setPrimaryKey(['id']);
$table->addIndex(['position'],'idx_position');
$table->addIndex(['container_id','container_name'],'idx_container_id_container_name');
//</editor-fold>





        return $schema;
    }
}

    