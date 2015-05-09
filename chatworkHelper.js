// ==UserScript==
// @name        chatworkHelper
// @namespace   http://github.com/yosugi/
// @include     https://www.chatwork.com/*
// @grant none
// ==/UserScript==

// This script is under the MIT-license.
// http://opensource.org/licenses/mit-license.php
(function ($) {
    'use strict';

    var toolBarSelector = '.chatSendTool';
    var chatTextAreaSelector = '#_chatText';

    function addToolBarAttr($li, className, label) {
        $li.addClass('_showDescription');
        $li.addClass(className);
        $li.attr('aria-label', label);
        $li.attr('role', 'buttone');
        return $li;
    };

    // Add info button on toolbar
    var infoButtonClassName = 'addInfo';
    var $infoButton = $('<li style="display; inline-block;"><span>[情]</span></li>');
    $infoButton = addToolBarAttr($infoButton, infoButtonClassName, 'info タグで囲みます');
    $(toolBarSelector).append($infoButton);

    // Surround [info]...[/info]
    $('.' + infoButtonClassName).click(function () {
        var contents = $(chatTextAreaSelector).val();
        $(chatTextAreaSelector).val('[info]' + contents + '[/info]');
    });

    // Add title button on toolbar
    var titleButtonClassName = 'addTitle';
    var $titleButton = $('<li style="display; inline-block;"><span>[題]</span></li>');
    $titleButton = addToolBarAttr($titleButton, titleButtonClassName, '先頭行をタイトルで囲みます');
    $(toolBarSelector).append($titleButton);

    // Surround [info][title]...[/title]...[/info]
    $('.' + titleButtonClassName).click(function () {
        var contents = $(chatTextAreaSelector).val();
        var pos = contents.indexOf('\n');
        var title = contents.substring(0, pos);
        var remain = contents.substring(pos + 1);
        var newContents = '[title]' + title + '[/title]' + remain;

        $(chatTextAreaSelector).val('[info]' + newContents + '[/info]');
    });

    // Add code button on toolbar
    var codeButtonClassName = 'addCode';
    var $codeButton = $('<li style="display; inline-block;"><span>[符]</span></li>');
    $codeButton = addToolBarAttr($codeButton, codeButtonClassName, 'code タグで囲みます');
    $(toolBarSelector).append($codeButton);

    // Surround [code]...[/code]
    $('.' + codeButtonClassName).click(function () {
        var contents = $(chatTextAreaSelector).val();
        $(chatTextAreaSelector).val('[code]' + contents + '[/code]');
    });

})(jQuery);

