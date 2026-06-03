<?php

namespace Modules\BrokerApp\Providers;

use Modules\Core\Menu\MenuItem;
use Modules\Core\Support\ModuleServiceProvider;

class BrokerAppServiceProvider extends ModuleServiceProvider
{
    protected bool $withTranslations = false;

    protected bool $withMigrations = false;

    /**
     * Provide the BrokerApp sidebar entry.
     */
    protected function menu(): MenuItem
    {
        return MenuItem::group('BrokerApp', [
            MenuItem::make('Loan Boards', '/brokerapp/loans')
                ->id('brokerapp-loan-boards')
                ->icon('ViewColumns'),
            MenuItem::make('Loan Workspace', '/brokerapp/loans?view=workspace')
                ->id('brokerapp-loan-workspace')
                ->icon('DocumentText'),
        ], 'Briefcase')
            ->id('brokerapp')
            ->position(15);
    }

    /**
     * Provide the module name.
     */
    protected function moduleName(): string
    {
        return 'BrokerApp';
    }

    /**
     * Provide the module name in lowercase.
     */
    protected function moduleNameLower(): string
    {
        return 'brokerapp';
    }
}
