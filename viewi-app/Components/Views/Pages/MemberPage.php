<?php

namespace Components\Views\Pages;

use Components\Services\Middleware\MermberGuard;
use Viewi\Components\Attributes\Middleware;
use Viewi\Components\BaseComponent;

#[Middleware([MermberGuard::class])]
class MemberPage extends BaseComponent
{
}
