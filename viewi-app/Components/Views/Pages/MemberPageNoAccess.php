<?php

namespace Components\Views\Pages;

use Components\Services\Middleware\MermberGuardNoAccess;
use Viewi\Components\Attributes\Middleware;
use Viewi\Components\BaseComponent;

#[Middleware([MermberGuardNoAccess::class])]
class MemberPageNoAccess extends BaseComponent
{
}
