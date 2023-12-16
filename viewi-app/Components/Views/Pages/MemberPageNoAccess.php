<?php

namespace Components\Views\Pages;

use Components\Services\Middleware\MemberGuardNoAccess;
use Viewi\Components\Attributes\Middleware;
use Viewi\Components\BaseComponent;

#[Middleware([MemberGuardNoAccess::class])]
class MemberPageNoAccess extends BaseComponent
{
}
