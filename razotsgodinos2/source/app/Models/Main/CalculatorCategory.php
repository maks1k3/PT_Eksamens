<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class CalculatorCategory extends Model
{
    protected $connection = 'main';
    protected $table = 'calculator_categories';
    public $timestamps = false;

    protected $fillable = ['code', 'sort'];

    public static function getOptions(string $lang = 'lv'): array
    {
        $items = self::orderBy('sort', 'asc')->orderBy('id', 'asc')->get();

        $langs = \App\Logic\Core\Langs::getAll();
        if (!in_array($lang, $langs)) $lang = 'lv';

        $out = [];
        foreach ($items as $it) {
            $ct = \App\Logic\Core\ContentTranslations::getContainer(
    \App\Types\Main\ContentTranslations::calculator_category->value,
    (int)$it->id,
    $lang
);

            $label = trim((string)($ct->title ?? ''));
            if ($label === '') $label = $it->code;

            $out[] = ['value' => (int)$it->id, 'label' => $label];
        }

        return $out;
    }
}