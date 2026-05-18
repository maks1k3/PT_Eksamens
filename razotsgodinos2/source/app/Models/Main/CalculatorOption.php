<?php

namespace App\Models\Main;

use Illuminate\Database\Eloquent\Model;

class CalculatorOption extends Model
{
    protected $connection = 'main';
    protected $table = 'calculator_options';
    public $timestamps = false;

    protected $fillable = ['work_type_id', 'code', 'sort'];

    public static function getOptions(string $lang = 'lv', ?int $workTypeId = null): array
    {
        $q = self::query()->orderBy('sort', 'asc')->orderBy('id', 'asc');
        if ($workTypeId) $q->where('work_type_id', $workTypeId);

        $items = $q->get();

        $langs = \App\Logic\Core\Langs::getAll();
        if (!in_array($lang, $langs)) $lang = 'lv';

        $out = [];
        foreach ($items as $it) {
            $ct = \App\Logic\Core\ContentTranslations::getContainer(
    \App\Types\Main\ContentTranslations::calculator_option->value,
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