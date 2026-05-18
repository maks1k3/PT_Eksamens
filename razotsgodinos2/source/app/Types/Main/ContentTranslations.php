<?php
namespace App\Types\Main;
//s
enum ContentTranslations: string
{
    case cms_collection = 'cms_collection';
    case cms_content = 'cms_content';
    
    case meta_data = 'meta_data';
    case translations = 'translations';
    
    //blogss
    case blog_entry = 'blog_entry';
    case blog_category = 'blog_category';
    
    //expensesw
    case expenses = 'expenses';
    case expenses_items = 'expenses_items';
    
    
    //calculator 
    case calculator_category = 'calculator_category';
    case calculator_work_type = 'calculator_work_type';
    case calculator_option = 'calculator_option';
    case calculator_prices = 'calculator_prices';
}