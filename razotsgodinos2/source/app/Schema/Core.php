<?php
namespace App\Schema;


class Core
{
    public static function get($schema){
        
/*
|--------------------------------------------------------------------------
|                             sessions
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="sessions"> 
$table = $schema->createTable('sessions');
$table->addOption('comment','Sessions');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');  

$table->addColumn('id', 'string', ['length' => 255, 'notnull'=>true]);
$table->addColumn('user_id', 'integer', ['unsigned' => true, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s id']);
$table->addColumn('ip_address', 'string', ['length' => 45, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s ip address']);
$table->addColumn('user_agent', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'User agent']);
$table->addColumn('payload', 'text', ['notnull'=>true,  'comment'=>'Session\'s payload']);
$table->addColumn('last_activity', 'integer', ['notnull'=>true, 'comment'=>'Last activity unix timestamp']);


$table->addUniqueIndex(['id'],'unique_id');
//</editor-fold>  
        
/*
|--------------------------------------------------------------------------
|                             users
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="users"> 
$table = $schema->createTable('users');
$table->addOption('comment','Users');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('email', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s email']);
$table->addColumn('password', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s password']);
$table->addColumn('token', 'string', ['length' => 30, 'notnull' => false, 'default' => null, 'comment' => 'Mobile app api authorization token']);
$table->addColumn('reg_date', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Registration date']);
$table->addColumn('last_login', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Last login date']);
$table->addColumn('last_activity', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Last activity']);


$table->addColumn('remember_token', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Remember me token']);
$table->addColumn('can_login_with_email', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Can user login with email']);
$table->addColumn('email_confirmed', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Email confirmed']);
$table->addColumn('email_confirmation_code', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Email confirmation code']);

$table->addColumn('lang', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Selected lang']);

$table->addColumn('user_groups', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'[group1],[group2]']);
$table->addColumn('user_permissions', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'[permission1],[permission2]']);

$table->addColumn('blocked', 'boolean', ['notnull'=>true, 'default' => 0, 'comment'=>'Is user blocked']);
$table->addColumn('failed_attempts', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Number of failed login attempts (Is cleared when logged in)']);
$table->addColumn('block_end_time', 'datetime', ['notnull'=>false, 'default' => null, 'comment'=>'Timestamp when block will end']);


$table->addColumn('active', 'boolean', [ 'notnull'=>true, 'default' => 0, 'comment'=>'Can user log in']);
$table->addColumn('extra_data', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Extra user data in json format']);


$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['email'],'unique_users_email');
$table->addUniqueIndex(['token'],'unique_token');

//</editor-fold> 
        
/*
|--------------------------------------------------------------------------
|                             social_login_providers
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="social_login_providers"> 
$table = $schema->createTable('social_login_providers');
$table->addOption('comment','Social login providers');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
$table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

$table->addColumn('provider', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Provider\'s name']);
$table->addColumn('user_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'User\'s id']);
$table->addColumn('social_id', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'User\'s id from social provider']);

$table->addColumn('extra_data', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Extra user data in json format']);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['provider','user_id'], 'unique_provider_user_id');
$table->addIndex(['user_id'],'idx_user_id');
$table->addIndex(['social_id'],'idx_social_id');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             password_resets
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="password_resets"> 
$table = $schema->createTable('password_resets');
$table->addOption('comment','Password resets');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
$table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);

$table->addColumn('email', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'User\'s email']);
$table->addColumn('token', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Password reset token']);

$table->setPrimaryKey(['id']);
$table->addIndex(['email'],'idx_email');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             logs
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="logs"> 
$table = $schema->createTable('logs');
$table->addOption('comment','Logs');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('type', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Log type']);
$table->addColumn('user_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'User\'s id']);
$table->addColumn('user_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s email or username']);
$table->addColumn('event', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Event\'s name']);
$table->addColumn('time', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Time when event occured']);
$table->addColumn('ip', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s ip']);
$table->addColumn('device', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s device']);
$table->addColumn('browser', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s browser']);
$table->addColumn('operating_system', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s operating_system']);
$table->addColumn('user_agent', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Raw user agent']);
$table->addColumn('description', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Detailed event description in json']);


$table->setPrimaryKey(['id']);
$table->addIndex(['type','user_id'], 'idx_type_user_id');
//</editor-fold> 

/*
|--------------------------------------------------------------------------
|                             content_translations
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="content_translations"> 
$table = $schema->createTable('content_translations');
$table->addOption('comment','Content translations');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','MyISAM');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('lang', 'string', ['length' => 2, 'notnull'=>false, 'default' => null, 'comment'=>'Lang\'s code']);
$table->addColumn('container_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Container\'s id']);
$table->addColumn('container_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Container\'s name']);
$table->addColumn('title', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Translated title']);
$table->addColumn('content', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Translated content']);
$table->addColumn('search_index', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Search index']);
$table->addColumn('data', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Data in json']);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['lang','container_id','container_name'],'unique_lang_container_id_container_name');
$table->addIndex(['lang'],'idx_lang');
$table->addIndex(['container_id','container_name'],'idx_container_id_container_name');
$table->addIndex(['title','search_index'],'fulltext_title_search_index', ['fulltext']);
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             langs
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="langs"> 
$table = $schema->createTable('langs');
$table->addOption('comment','Langs');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 2, 'notnull'=>false, 'default' => null, 'comment'=>'Lang\'s name']);
$table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Lang\'s position']);
$table->addColumn('active', 'boolean', ['notnull'=>true, 'default' => 0, 'comment'=>'Is language enabled']);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['name'],'unique_name');
$table->addIndex(['name'],'idx_name');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             translations
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="translations"> 
$table = $schema->createTable('translations');
$table->addOption('comment','Translations');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Translation item\'s name']);

$table->setPrimaryKey(['id']);
$table->addIndex(['name'],'idx_name');
$table->addUniqueIndex(['name'],'unique_name');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             settings
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="settings"> 
$table = $schema->createTable('settings');
$table->addOption('comment','Settings');
$table->addOption('collate','utf8_unicode_ci');
$table->addOption('engine','InnoDB');
$table->addOption('charset','utf8');

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Setting\'s name']);
$table->addColumn('value', 'text', ['notnull'=>false, 'default' => null, 'comment'=>'Setting\'s value in json']);


$table->setPrimaryKey(['id']);
$table->addIndex(['name'],'idx_name');
$table->addUniqueIndex(['name'],'unique_name');
//</editor-fold>

/*
|--------------------------------------------------------------------------
|                             meta_data
|--------------------------------------------------------------------------|
*/ 
//<editor-fold defaultstate="collapsed" desc="meta_data"> 
$table = $schema->createTable('meta_data');
$table->addOption('comment','Meta data');
$table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
$table->addOption('engine','InnoDB'); 
$table->addOption('charset','utf8');//utf8mb4

$table->addColumn('id', 'integer', ['unsigned' => true, 'notnull'=>true, 'autoincrement'=>true]);
$table->addColumn('created_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Created timestamp']);
$table->addColumn('updated_at', 'datetime', [ 'notnull'=>false, 'default' => null, 'comment'=>'Updated timestamp']);

$table->addColumn('container_id', 'integer', ['unsigned' => true, 'notnull'=>true, 'default' => 0, 'comment'=>'Meta data\'s container']);
$table->addColumn('container_name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'Container\'s name']);


$table->setPrimaryKey(['id']);
$table->addIndex(['container_id','container_name'],'idx_container_id_container_name');
//</editor-fold>


        return $schema;
    }
}

    