<?php

namespace Components\Emails\Users;

use Viewi\Builder\Attributes\Skip;
use Viewi\Components\BaseComponent;
use Viewi\Components\Config\ConfigService;

#[Skip]
class WelcomeEmail extends BaseComponent
{
    public string $baseUrl = '/';

    public function __construct(ConfigService $config)
    {
        $this->baseUrl = $config->get('baseUrl');
    }
}
