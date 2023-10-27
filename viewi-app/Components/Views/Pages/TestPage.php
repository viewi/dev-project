<?php

namespace Components\Views\Pages;

use Viewi\Components\BaseComponent;
use Viewi\Components\Config\ConfigService;
use Viewi\Components\Environment\Process;

class TestPage extends BaseComponent
{
    public ?string $baseUrl = '';

    public function __construct(private Process $process, private ConfigService $config)
    {
        $this->baseUrl = $config->get('baseUrl');
    }

    public function getEnvironment()
    {
        return $this->process->browser ? 'Browser' : 'Server';
    }
}
