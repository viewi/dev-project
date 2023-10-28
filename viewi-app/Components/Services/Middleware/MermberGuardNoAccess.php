<?php

namespace Components\Services\Middleware;

use Viewi\Components\Middleware\IMIddleware;
use Viewi\DI\Singleton;

#[Singleton]
class MermberGuardNoAccess implements IMIddleware
{
    public function run(callable $next)
    {
        $next(false); // cancel
    }
}
