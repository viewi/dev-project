<?php

namespace Components\Views\Test;

use Viewi\Components\BaseComponent;
use Viewi\Components\DOM\DomEvent;

class TestButton extends BaseComponent
{
    public ?string $id = null;
    public ?string $title = null;
    public ?string $class = null;
    public bool $disabled = false;
    public bool $loading = false;

    public function onClick(DomEvent $event)
    {
        $this->emitEvent('click', $event);
    }
}
