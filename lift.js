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

$(document).ready(function () {
    addStyleSheet('bootStrap');
    $(".ddlabel A").css({'color': '#39a3b1', 'font-size': '100%'});
    CreateButton();
    replace_title();
    rid_number();
    highlightCurrentDay();
});
/**
 * Add button above the schedule to allow navigation between terms
 * */
function navigation_term() {

}

/**
 * Replace the title with "Student schedule for 2016-2017 Term 1"
 * */
function replace_title() {
    //TODO: Somehow obtain the current term and year. Right now it's just hard-coded.

    //Changes the title, "Student Schedule by Day and Time", to "Student Schedule for 2016 - 2017 Term 1".
    //In doing so, the information on the right, which includes the time, date and student's identity, is removed.
    //If we want to keep that information, we'll need to create a table.
    document.querySelector(".pagetitlediv").innerHTML = "Student Schedule for 2016 - 2017 Term 1<br><br>";
    document.querySelector(".pagetitlediv").style.color = '#39a3b1';
    document.querySelector(".pagetitlediv").style.fontSize = 'x-large';
    //Removes the useless information on the page that no one reads.
    document.querySelector(".pagebodydiv > div.infotextdiv").style.display = 'none';
}


/**
 * Highlight the current day
 * */
function hightlight_current() {

}
/**
 * Large buttons for navigating the weeks. Kinda like the Google images page
 * */
function navigating_weeks() {

}

/**
 * Get rid of the hideous number that shows the number of weeks you have been attending the UofS
 * */
function rid_number() {
    //TODO: Fix the Previous and Next Week links to correctly display the current week number and date.
    //TODO: Somehow obtain the current week number. Right now it's just hard-coded, not what we want.

    //Remove the useless information detailing the total number of weeks a student has been attending the U of S.
    document.querySelector(".fieldmediumtext").style.display = 'none';

    var monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    var today = new Date();
    var date = today.getDate();
    var monthIndex = today.getMonth();
    var year = today.getFullYear();

    var day = today.getDay();
    for (var i = -1; day > 0; day--) {
        i++;
    }

    var weekOf = date - i;

    var nextWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7);

    //Changes "Week of Sep 26, 2016" to "Week # September 26, 2016"
    document.querySelector(".fieldlargetext").innerHTML =
        ('Week 4 ' + monthNames[monthIndex] + ' ' + weekOf + ', ' + year);
}

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
        }
    });
}

/**
 * Creating the share button
 * Add share functionality works
 */
function CreateButton() {
    var input = document.createElement("div");
    input.id = "Share_button";
    input.onclick = ShareAction;
    document.body.appendChild(input);

    $("#Share_button").css({
        'font-size': '1em',
        'position': 'fixed',
        'bottom': '40px',
        'right': '40px',
        'border-radius': '50%',
        'overflow': 'hidden',
        'width': '60px',
        'height': '60px',
        'border': '5px solid #39a3b1',
        'background': '#39a3b1',
        'box-shadow': '0px 0px 20px 0px #000'
    });
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
                if (cell.height === 0) {
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


