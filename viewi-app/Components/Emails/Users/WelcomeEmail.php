<?php

namespace Components\Emails\Users;

use Viewi\Components\BaseComponent;
use Viewi\Components\Config\ConfigService;

class WelcomeEmail extends BaseComponent
{
    public string $baseUrl = '/';

    public function __construct(ConfigService $config)
    {
        $this->baseUrl = $config->get('baseUrl');
    }
}
