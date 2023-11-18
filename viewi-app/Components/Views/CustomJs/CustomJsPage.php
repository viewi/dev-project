<?php

namespace Components\Views\CustomJs;

use Viewi\Components\BaseComponent;

class CustomJsPage extends BaseComponent
{
    public string $title = 'Custom JS page';
    public string $markText = "some text \n\n# Marked in browser\n\nRendered by **marked**.";

    public function getMarkedHtml($text)
    {
        // nothing on server-side
    }
}
