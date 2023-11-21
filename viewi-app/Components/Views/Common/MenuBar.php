<?php

namespace Components\Views\Common;

use Viewi\Components\BaseComponent;
use Viewi\Components\Routing\ClientRoute;

class MenuBar extends BaseComponent
{
    public function __construct(private ClientRoute $route)
    {
    }

    public function goHome()
    {
        $this->route->navigate('/');
    }

    public function back()
    {
        $this->route->navigateBack();
    }

    public function getCurrentUrl()
    {
        return $this->route->getUrl();
    }
}
