// ==UserScript==
// @name        chatworkHelper
// @namespace   http://github.com/yosugi/
// @include     https://www.chatwork.com/*
// @require     https://cdn.rawgit.com/yosugi/jquery.selection/master/src/jquery.selection.js
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

    function getContents() {
        var selected = $(chatTextAreaSelector).selection();
        if (selected) return selected;
        return $(chatTextAreaSelector).val();
    }

    function setContents(contents) {
        var selected = $(chatTextAreaSelector).selection();
        if (!selected) {
            // replace all string
            $(chatTextAreaSelector).val(contents);
            return;
        }

        // replace selected string
        $(chatTextAreaSelector).selection('replace', { text: contents });
        return;
    }

    // Add info button on toolbar
    var infoButtonClassName = 'addInfo';
    var $infoButton = $('<li style="display; inline-block;"><span>[情]</span></li>');
    $infoButton = addToolBarAttr($infoButton, infoButtonClassName, 'info タグで囲みます');
    $(toolBarSelector).append($infoButton);

    // Surround [info]...[/info]
    $('.' + infoButtonClassName).click(function () {
        var contents = getContents();
        setContents('[info]' + contents + '[/info]');
    });

    // Add title button on toolbar
    var titleButtonClassName = 'addTitle';
    var $titleButton = $('<li style="display; inline-block;"><span>[題]</span></li>');
    $titleButton = addToolBarAttr($titleButton, titleButtonClassName, '先頭行をタイトルで囲みます');
    $(toolBarSelector).append($titleButton);

    // Surround [info][title]...[/title]...[/info]
    $('.' + titleButtonClassName).click(function () {
        var contents = getContents();
        var pos = contents.indexOf('\n');
        var title = contents.substring(0, pos);
        var remain = contents.substring(pos + 1);
        var newContents = '[title]' + title + '[/title]' + remain;

        setContents('[info]' + newContents + '[/info]');
    });

    // Add code button on toolbar
    var codeButtonClassName = 'addCode';
    var $codeButton = $('<li style="display; inline-block;"><span>[符]</span></li>');
    $codeButton = addToolBarAttr($codeButton, codeButtonClassName, 'code タグで囲みます');
    $(toolBarSelector).append($codeButton);

    // Surround [code]...[/code]
    $('.' + codeButtonClassName).click(function () {
        var contents = getContents();
        setContents('[code]' + contents + '[/code]');
    });

    // Add delete button on toolbar
    var deleteButtonClassName = 'deleteTag';
    var $deleteButton = $('<li style="display; inline-block;"><span>[消]</span></li>');
    $deleteButton = addToolBarAttr($deleteButton, deleteButtonClassName, 'タグを削除します');
    $(toolBarSelector).append($deleteButton);

    // Delete tag
    $('.' + deleteButtonClassName).click(function () {
        var contents = getContents();
        var replaced = contents
           .replace(/\[\/?info\]/g, '')
           .replace(/\[\/?code\]/g, '')
           .replace(/\[title\]/g, '')
           .replace(/\[\/title\]/g, '\n');

        setContents(replaced);
    });

})(jQuery);

