<?php

namespace Components\Services\Middleware;

use Viewi\Components\Middleware\IMIddleware;
use Viewi\Components\Middleware\IMIddlewareContext;
use Viewi\DI\Singleton;

#[Singleton]
class MermberGuard implements IMIddleware
{
    public function run(IMIddlewareContext $c)
    {
        $c->next();
    }
}
