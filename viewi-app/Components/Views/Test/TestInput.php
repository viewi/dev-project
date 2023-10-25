<?php

namespace Components\Views\Test;

use Viewi\Components\BaseComponent;
use Viewi\Components\DOM\DomEvent;

class TestInput extends BaseComponent
{
    public ?string $id = null;
    public ?string $model = null;

    public function onInput(DomEvent $event)
    {
        $this->emitEvent('model', $event->target->value);
    }
}
