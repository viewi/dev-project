<?php

namespace Components\Services\Middleware;

use Viewi\Components\Middleware\IMIddleware;
use Viewi\Components\Middleware\IMIddlewareContext;
use Viewi\Components\Routing\ClientRoute;
use Viewi\DI\Singleton;

#[Singleton]
class MemberGuardNoAccess implements IMIddleware
{
    public function __construct(private ClientRoute $route)
    {
    }

    public function run(IMIddlewareContext $c)
    {
        $c->next(false); // cancel
        $this->route->navigate('/');
    }
}
