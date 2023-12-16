<?php

namespace Components\Views\Pages;

use Components\Services\Middleware\MemberGuard;
use Viewi\Components\Attributes\Middleware;
use Viewi\Components\BaseComponent;

#[Middleware([MemberGuard::class])]
class MemberPage extends BaseComponent
{
}
