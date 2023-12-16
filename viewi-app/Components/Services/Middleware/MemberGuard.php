<?php

namespace Components\Services\Middleware;

use Viewi\Components\Middleware\IMIddleware;
use Viewi\Components\Middleware\IMIddlewareContext;
use Viewi\DI\Singleton;

#[Singleton]
class MemberGuard implements IMIddleware
{
    public function run(IMIddlewareContext $c)
    {
        $c->next();
    }
}
