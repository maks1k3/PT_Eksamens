<?php
namespace App\Schema;

class Main
{
    public static function get($schema){
        

    /*
    |--------------------------------------------------------------------------
    |                             profile
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="profile"> 
    $table = $schema->createTable('profile');
    $table->addOption('comment','User\'s profile');
    $table->addOption('collate','utf8_unicode_ci');//utf8mb4_unicode_ci
    $table->addOption('engine','InnoDB'); 
    $table->addOption('charset','utf8');//utf8mb4

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', [ 'notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

       
    $table->addColumn('user_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'User\'s id']);
    $table->addColumn('avatar_image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'User\'s avatar image']);

    $table->addColumn('name', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s name']);
    $table->addColumn('surname', 'string', ['length' => 255, 'notnull'=>false, 'default' => null, 'comment'=>'User\'s surname']);
    $table->addColumn('contact_email', 'string', ['length' => 255, 'notnull' => false, 'default' => null, 'comment' => 'Contact email']);
    
    $table->addColumn('completed', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Is profile completed']);



    $table->setPrimaryKey(['id']);
    $table->addIndex(['user_id'],'idx_user_id');
    $table->addIndex(['avatar_image_id'], 'idx_avatar_image_id');
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             expenses
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="expenses"> 
    $table = $schema->createTable('expenses');
    $table->addOption('comment', 'Expenses');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    
    $table->addColumn('project_type', 'integer', ['notnull' => false, 'default' => null, 'comment' => 'Project type']);    
    
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);
    
    $table->setPrimaryKey(['id']);
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             expenses_items
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="expenses_items"> 
    $table = $schema->createTable('expenses_items');
    $table->addOption('comment', 'Expenses Items');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    
    $table->addColumn('expenses_id', 'integer', ['notnull' => false, 'default' => null, 'comment' => 'Expenses ID']);
    
    $table->addColumn('price', 'decimal', ['precision' => 10, 'scale' => 2, 'notnull' => false, 'default' => null, 'comment' => 'Item price']);
    $table->addColumn('price_per_unit', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Price per unit']);
    
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);
    
    $table->setPrimaryKey(['id']);
    //s
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             blog_entries
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="blog_entries"> 
    $table = $schema->createTable('blog_entries');
    $table->addOption('comment', 'Blog entries');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

    $table->addColumn('image_id', 'integer', ['unsigned' => true, 'notnull' => true, 'default' => 0, 'comment' => 'Image id']);
    $table->addColumn('active', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Active']);
    $table->addColumn('categories', 'text', ['notnull' => false, 'default' => null, 'comment' => '[category_id],[category_id]']);    
    $table->addColumn('pinned', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Pinned']);
    $table->addColumn('tip_projects', 'boolean', ['notnull' => true, 'default' => 0, 'comment' => 'Tipveida projekts']);
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);
    
    $table->setPrimaryKey(['id']);
    //ssы
    //
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             blog_categories
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="blog_categories"> 
    $table = $schema->createTable('blog_categories');
    $table->addOption('comment', 'Blog categories');
    $table->addOption('collate', 'utf8mb4_unicode_ci');//utf8_unicode_ci
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');//utf8

    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);
    
    $table->addColumn('position', 'integer', ['unsigned' => true, 'notnull'=> true, 'default' => 0, 'comment'=>'Item\'s position']);

    $table->setPrimaryKey(['id']);
    
    //</editor-fold>
    
    /*
    |--------------------------------------------------------------------------
    |                             expense_records
    |--------------------------------------------------------------------------|
    */ 
    //<editor-fold defaultstate="collapsed" desc="expense_records"> 
    $table = $schema->createTable('expense_records');
    $table->addOption('comment', 'Expense records with project details');
    $table->addOption('collate', 'utf8mb4_unicode_ci');
    $table->addOption('engine', 'InnoDB'); 
    $table->addOption('row_format', 'DYNAMIC');
    $table->addOption('charset', 'utf8mb4');

    // Primary key
    $table->addColumn('id', 'integer', ['unsigned' => true, 'notnull' => true, 'autoincrement' => true]);

    // Timestamps
    $table->addColumn('created_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Created timestamp']);
    $table->addColumn('updated_at', 'datetime', ['notnull' => false, 'default' => null, 'comment' => 'Updated timestamp']);

    // Contact information
    $table->addColumn('full_name', 'string', ['length' => 255, 'notnull' => true, 'comment' => 'Full name of the contact person']);
    $table->addColumn('email', 'string', ['length' => 255, 'notnull' => true, 'comment' => 'Email address']);
    $table->addColumn('phone', 'string', ['length' => 50, 'notnull' => false, 'default' => null, 'comment' => 'Phone number']);

    // Expenses data (JSON column)
    $table->addColumn('expenses', 'json', [
        'notnull' => true,
        'comment' => 'Stores expense data including project details, items, and totals'
    ]);

    $table->setPrimaryKey(['id']);

    // Indexes for better query performance
    $table->addIndex(['email'], 'idx_expense_records_email');
    $table->addIndex(['phone'], 'idx_expense_records_phone');
    //</editor-fold>
        
/*
|--------------------------------------------------------------------------|
|                             calculator_categories
|--------------------------------------------------------------------------|
*/
$table = $schema->createTable('calculator_categories');
$table->addOption('comment', 'Calculator categories');
$table->addOption('collate', 'utf8mb4_unicode_ci');
$table->addOption('engine', 'InnoDB');
$table->addOption('charset', 'utf8mb4');

$table->addColumn('id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'autoincrement' => true
]);

$table->addColumn('code', 'string', [
    'length' => 100,
    'notnull' => true,
    'comment' => 'Category code '
]);

$table->addColumn('sort', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'default' => 0
]);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['code'], 'uniq_calc_category_code');


/*
|--------------------------------------------------------------------------|
|                             calculator_work_types
|--------------------------------------------------------------------------|
*/
$table = $schema->createTable('calculator_work_types');
$table->addOption('comment', 'Calculator work types');
$table->addOption('collate', 'utf8mb4_unicode_ci');
$table->addOption('engine', 'InnoDB');
$table->addOption('charset', 'utf8mb4');

$table->addColumn('id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'autoincrement' => true
]);

$table->addColumn('code', 'string', [
    'length' => 50,
    'notnull' => true,
    'comment' => 'area, pamati, grida, sienas, krasots, jumts, vizualizacija'
]);

$table->addColumn('unit', 'string', [
    'length' => 10,
    'notnull' => true,
    'default' => 'per_m2',
    'comment' => 'per_m2 '
]);

$table->addColumn('sort', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'default' => 0
]);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['code'], 'uniq_calc_work_type_code');


/*
|--------------------------------------------------------------------------|
|                             calculator_options
|--------------------------------------------------------------------------|
*/
$table = $schema->createTable('calculator_options');
$table->addOption('comment', 'Calculator options for work types');
$table->addOption('collate', 'utf8mb4_unicode_ci');
$table->addOption('engine', 'InnoDB');
$table->addOption('charset', 'utf8mb4');

$table->addColumn('id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'autoincrement' => true
]);

$table->addColumn('work_type_id', 'integer', [
    'unsigned' => true,
    'notnull' => true
]);

$table->addColumn('code', 'string', [
    'length' => 100,
    'notnull' => true,
    'comment' => 'Option code'
]);

$table->addColumn('sort', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'default' => 0
]);

$table->setPrimaryKey(['id']);
$table->addUniqueIndex(['work_type_id', 'code'], 'uniq_calc_option');
$table->addIndex(['work_type_id'], 'idx_calc_option_work_type');


/*
|--------------------------------------------------------------------------|
|                             calculator_prices
|--------------------------------------------------------------------------|
*/
$table = $schema->createTable('calculator_prices');
$table->addOption('comment', 'Calculator prices');
$table->addOption('collate', 'utf8mb4_unicode_ci');
$table->addOption('engine', 'InnoDB');
$table->addOption('charset', 'utf8mb4');

$table->addColumn('id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'autoincrement' => true
]);

$table->addColumn('category_id', 'integer', [
    'unsigned' => true,
    'notnull' => true
]);

$table->addColumn('work_type_id', 'integer', [
    'unsigned' => true,
    'notnull' => true
]);

$table->addColumn('option_id', 'integer', [
    'unsigned' => true,
    'notnull' => true
]);

$table->addColumn('price', 'decimal', [
    'precision' => 10,
    'scale' => 2,
    'notnull' => true,
    'default' => 0
]);

$table->setPrimaryKey(['id']);

$table->addUniqueIndex(
    ['category_id', 'work_type_id', 'option_id'],
    'uniq_calc_price'
);

$table->addIndex(['category_id'], 'idx_calc_price_category');
$table->addIndex(['work_type_id'], 'idx_calc_price_work_type');
$table->addIndex(['option_id'], 'idx_calc_price_option');


/*
|--------------------------------------------------------------------------|
|                             calculator_requests
|--------------------------------------------------------------------------|
*/
$table = $schema->createTable('calculator_requests');
$table->addOption('comment', 'Calculator requests');
$table->addOption('collate', 'utf8mb4_unicode_ci');
$table->addOption('engine', 'InnoDB');
$table->addOption('charset', 'utf8mb4');

$table->addColumn('id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'autoincrement' => true
]);

$table->addColumn('category_id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'default' => 0,
    'comment' => 'calculator_categories.id'
]);

$table->addColumn('calc', 'json', [
    'notnull' => true
]);

$table->addColumn('total', 'decimal', [
    'precision' => 10,
    'scale' => 2,
    'notnull' => true,
    'default' => 0
]);

$table->addColumn('nickname', 'string', [
    'length' => 255,
    'notnull' => true
]);

$table->addColumn('phone', 'string', [
    'length' => 50,
    'notnull' => true
]);

$table->addColumn('email', 'string', [
    'length' => 255,
    'notnull' => true
]);

$table->addColumn('message', 'text', [
    'notnull' => false,
    'default' => null
]);

$table->addColumn('privacy', 'boolean', [
    'notnull' => true,
    'default' => 0
]);

$table->setPrimaryKey(['id']);

$table->addIndex(['email'], 'idx_calc_req_email');
$table->addIndex(['phone'], 'idx_calc_req_phone');
$table->addIndex(['category_id'], 'idx_calc_req_category');
/*
|--------------------------------------------------------------------------|
|                             contact_form
|--------------------------------------------------------------------------|
*/
//<editor-fold defaultstate="collapsed" desc="contact_form">
$table = $schema->createTable('contact_form');
$table->addOption('comment', 'Contact form submissions');
$table->addOption('collate', 'utf8mb4_unicode_ci');
$table->addOption('engine', 'InnoDB');
$table->addOption('charset', 'utf8mb4');

$table->addColumn('id', 'integer', [
    'unsigned' => true,
    'notnull' => true,
    'autoincrement' => true
]);

$table->addColumn('nickname', 'string', [
    'length' => 255,
    'notnull' => true,
    'comment' => 'Name or company'
]);

$table->addColumn('phone', 'string', [
    'length' => 50,
    'notnull' => true,
    'comment' => 'Phone number'
]);

$table->addColumn('email', 'string', [
    'length' => 255,
    'notnull' => true,
    'comment' => 'Email'
]);

$table->addColumn('message', 'text', [
    'notnull' => true,
    'comment' => 'Message'
]);

$table->addColumn('privacy', 'boolean', [
    'notnull' => true,
    'default' => 0,
    'comment' => 'Privacy '
]);

$table->setPrimaryKey(['id']);

//</editor-fold>

//</editor-fold>


 

        return $schema;
    }
    
    
    
}


    