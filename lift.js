// ==UserScript==
// @name		UofS TimeTable Enhancer
// @namespace	http://tampermonkey.net/
// @version		0.1
// @description	A bit of Javascript for enhancing the LAF of the timetable page on the usask website
// @author		Zang JiaWei, Nobleman Chukwu, Bengin Lee, Mark Nguyen
// @match		https://pawnss.usask.ca/ban/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require		https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
// @require		http://www.eyecon.ro/datepicker/js/datepicker.js
// @resource	bootStrap https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
// @grant		GM_getResourceText
// @grant		GM_addStyle
// ==/UserScript==


/**
 * Add CSS into this variable
 */

$(document).ready(function () {
    addStyleSheet('bootStrap');
    $(".ddlabel A").css({'color': '#39a3b1', 'font-size': '100%'});
    CreateButton();
    highlightCurrentDay();
});


function DatePick() {
    alert("test");
    $('input[name=start_date_in]').DatePicker({
        format: 'm/d/Y',
        date: $('#input[name=start_date_in]').val(),
        current: $('#input[name=start_date_in]').val(),
        starts: 1,
        position: 'r',
        onBeforeShow: function () {
            $('#input[name=start_date_in]').DatePickerSetDate($('#input[name=start_date_in]').val(), true);
        },
    });
}

/**
 * Creating the share button
 * Add share functionality works
 */
function CreateButton() {
    var input = document.createElement("input");
    input.type = "button";
    input.value = "Share!";
    input.id = "Share_button";
    input.onclick = ShareAction;
    //TODO
    //Add style into this button
    input.setAttribute("style", "font-size:18px;position:absolute;bottom:120px;right:40px;");
    document.body.appendChild(input);
}

/**
 * adding style into head
 */
function addStyleSheet(resName) {
    var style = GM_getResourceText(resName);
    GM_addStyle(style);
}

/**
 * Function to highlight all the cells that correspond to the current
 * day
 */
function highlightCurrentDay() {
    var d = new Date().getDay() - 1;
    var timeTable = $('table.datadisplaytable')
        .addClass("table table-striped table-bordered table-responsive table-condensed");


    // Since the table cells are staggered, we need a way of
    // knowing where each cell begins and ends
    function Cell(occuppiedBefore, row) {
        this.ocb = occuppiedBefore;
        this.height = row;
    }

    var rowInfo = [new Cell(0, 0),
        new Cell(0, 0),
        new Cell(0, 0),
        new Cell(0, 0),
        new Cell(0, 0),
        new Cell(0, 0),
        new Cell(0, 0)
    ];

    $(timeTable).find('tr').slice(1)
        .each(function (_) {
            var currRow = $(this);
            $.each(rowInfo, function (key, cell) {
                // height of zero means that the original row ends here and a new row starts
                if (cell.height == 0) {
                    var currCell = currRow.find('td:nth-of-type(' + (key - cell.ocb + 1) + ')');
                    var span = $(currCell).attr('rowspan');

                    cell.height = span ? parseInt(span) : 1;

                    if (key == d) {
                        $(currCell).css({
                            'background-color': '#2daf6e'
                        }).find('a').css({
                            'color': 'white'
                        });
                    }
                }
                if (key > 0) {
                    cell.ocb = rowInfo[key - 1].ocb + (rowInfo[key - 1].height > 0);
                }
                cell.height--;
            });
        });
}

/**
 * Function Share function Caller
 */
function ShareAction() {
    //TODO
    //Edit some code into here, for sharing
    alert("Share Button work! And so does JQuery!");
}










