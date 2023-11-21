<?php

namespace Components\Views\Pages;

use Viewi\Components\BaseComponent;
use Viewi\Components\Config\ConfigService;
use Viewi\Components\Environment\Platform;

class TestPage extends BaseComponent
{
    public ?string $baseUrl = '';

    public function __construct(private Platform $platform, private ConfigService $config)
    {
        $this->baseUrl = $config->get('baseUrl');
    }

    public function getEnvironment()
    {
        return $this->platform->browser ? 'Browser' : 'Server';
    }
}
