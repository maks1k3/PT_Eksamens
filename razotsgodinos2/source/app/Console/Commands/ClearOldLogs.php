<?php
namespace App\Console\Commands;

use Illuminate\Console\Command;

use App\Logic\Core\Log;
use App\Models\Core\Log as LogModel;

class ClearOldLogs extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'logs:clear_old';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Clear logs one month old';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        
        $start = date('Y-m-d H:i:s', strtotime('first day of last month midnight'));
        
        LogModel::where('time', '<=', $start)->delete();
        
        Log::debug('Old logs cleared!');
        
        Log::info('Old logs cleared!');

        $this->info('Old logs cleared!');
    }
}