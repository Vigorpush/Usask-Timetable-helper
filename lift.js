// ==UserScript==
// @name		UofS TimeTable Enhancer
// @namespace	http://tampermonkey.net/
// @version		0.1
// @description	A bit of Javascript for enhancing the LAF of the timetable page on the usask website
// @author		Zang JiaWei, Nobleman Chukwu, Bengin Lee, Mark Nguyen
// @match		https://pawnss.usask.ca/ban/*
// @require		https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require		https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
// @require     https://gitlab.com/481-HCI/Scripts/raw/master/html2canvas.js
// @require     https://gitlab.com/481-HCI/Scripts/raw/master/jquery.plugin.html2canvas.js
// @require		http://www.eyecon.ro/datepicker/js/datepicker.js
// @require 	http://t4t5.github.io/sweetalert/dist/sweetalert-dev.js
// @resource	sweetAlert http://t4t5.github.io/sweetalert/dist/sweetalert.css
// @resource	bootStrap https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
// @grant		GM_getResourceText
// @grant		GM_addStyle
// ==/UserScript==


var UofSTimeTable = (function () {

    var TIMETABLE = $('table.datadisplaytable');

    /**
     * A cell object
     * Since the table cells are staggered, we need a way of
     * knowing where each cell begins and ends
     * @constructor
     */
    function Cell() {
        this.ocb = 0;
        this.height = 0;
    }

    /**
     * adding style into head
     */
    function addStyleSheet(resName) {
        var style = GM_getResourceText(resName);
        GM_addStyle(style);
    }

    function current_page_date(){
        var regular_date = /(\w+ \d+.*)/;
        var match =  regular_date.exec($(".fieldlargetext").text());
        UofSTimeTable.CURRENT_PAGE_MONDAY_DATE = new Date(match[1]);
    }

    return {

        CURRENT_PAGE_MONDAY_DATE:  new Date(),

        /**
         * Creating the share button
         * Add share functionality works
         */
        CreateButton: function () {
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

        },

        /**
         * Function to highlight all the cells that correspond to the current
         * day
         * @param params json object containing parameters for the state attributes of each cell
         */
        highlightDays: function (params) {
            var cell_color = params.cell_color || '#ffc61a';
            var font_color = params.font_color || 'white';
            var font_size = params.font_size || '1em';
            var days = params.days || [true];

            var today = new Date();
            var temp = new Date(this.CURRENT_PAGE_MONDAY_DATE);
            temp.setDate(temp.getDate() + today.getDay() - 1);


            var d = new Date().getDay() - 1;
            TIMETABLE.addClass("table table-striped table-bordered table-responsive table-condensed");

            if (today.getDate() != temp.getDate() || today.getMonth() != temp.getMonth()) {
                return;
            }


            var rowInfo = [new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(), new Cell()
            ];

            TIMETABLE.find('tr').slice(1).each(function (_) {
                var currRow = $(this);
                $.each(rowInfo, function (key, cell) {
                    // height of zero means that the original row ends here and a new row starts
                    if (cell.height === 0) {
                        var currCell = currRow.find('td:nth-of-type(' + (key - cell.ocb + 1) + ')');
                        var span = $(currCell).attr('rowspan');

                        cell.height = span ? parseInt(span) : 1;

                        if (days[0] && key == d) {
                            $(currCell).css({
                                'background-color': cell_color
                            }).find('a').css({
                                'color': font_color,
                                'font-size': font_size
                            });
                        }
                    }
                    if (key > 0) {
                        cell.ocb = rowInfo[key - 1].ocb + (rowInfo[key - 1].height > 0);
                    }
                    cell.height--;
                });
            });
        },

        init: function () {
            $(".ddlabel A").css({'color': '#39a3b1', 'font-size': '100%'});
            addStyleSheet('bootStrap');
            addStyleSheet('sweetAlert');
            // $(document).ready(current_page_date);
            current_page_date();
            return this;
        }
    };

})();

$(document).ready(function () {
    UofSTimeTable.init().highlightDays({
        cell_color: "#2fb673",
        font_color: "white",
        font_size: "1em"
    });

    UofSTimeTable.CreateButton(); //need naming standard for vars
    navigation_term();
    navigation_term_to_one();
    replace_title();
    rid_number();
    // current_page_date();

    $(".pageheaderdiv1 > h1").remove();

});


/**
 * Add button above the schedule to allow navigation between terms
 * */
function navigation_term() {
    var input = document.createElement("div");
    input.id = "Term_button";
    input.onclick = TermSwitchAction;
    input.innerHTML = input.innerHTML + '> >';
    document.body.appendChild(input);

    $("#Term_button").css({
        'font-size': '2em',
        'position': 'absolute',
        'bottom': '420px',
        'right': '80px',
        'border-radius': '50%',
        'overflow': 'hidden',
        'width': '60px',
        'height': '60px',
        'border': '5px solid #00ffff',
        'background': '#00ffff',
        'box-shadow': '0px 0px 20px 0px #000'
    });
}

function navigation_term_to_one() {
    var input = document.createElement("div");
    input.id = "Term_button_to_one";
    input.onclick = TermSwitchToOneAction;
    input.innerHTML = input.innerHTML + '< <';
    document.body.appendChild(input);

    $("#Term_button_to_one").css({
        'font-size': '2em',
        'position': 'absolute',
        'bottom': '420px',
        'left': '20px',
        'border-radius': '50%',
        'overflow': 'hidden',
        'width': '60px',
        'height': '60px',
        'border': '5px solid #00ffff',
        'background': '#00ffff',
        'box-shadow': '0px 0px 20px 0px #000'
    });
}

function TermSwitchAction() {
    document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=01/02/2017";
}

function TermSwitchToOneAction() {
    document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=09/05/2016";
}

/**
 * Replace the title with "Student schedule for 2016-2017 Term 1"
 * */
function replace_title() {
    //TODO: Somehow obtain the current term and year. Right now it's just hard-coded.

    //Changes the title, "Student Schedule by Day and Time", to "Student Schedule for 2016 - 2017 Term 1".
    //In doing so, the information on the right, which includes the time, date and student's identity, is removed.
    //If we want to keep that information, we'll need to create a table.
    document.querySelector(".pagetitlediv").innerHTML = "Student Schedule for 2016 - 2017<br><br>";
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
    //document.querySelector(".fieldmediumtext").style.display = 'none';

    var monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];

    /* Hide the week info stuff */
    $("body > div.pagebodydiv > table:nth-child(3) > tbody > tr > td:nth-child(3)").hide();

    var weekDays = $("body > div.pagebodydiv > table.datadisplaytable.table.table-striped.table-bordered.table-responsive.table-condensed > tbody > tr:nth-child(1)");
    var monthDate = weekDays.clone();
    weekDays.after(monthDate);

    var today = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE;

    $(monthDate).children().slice(1).each(function (index) {

        var month = monthNames[today.getMonth()];
        var html_String = month + "&nbsp;" + today.getDate();
        $(this).html("&nbsp;&nbsp;&nbsp;" + html_String);
        today.setDate(today.getDate() + 1);
    });

    if ($.trim($(monthDate).text()) == "No courses with assigned times this week.") {
        $(monthDate).remove();
    }
}

/**
 * Function Share function Caller
 */
function ShareAction() {
    //TODO
    //Edit some code into here, for sharing
    swal({
        title: "Error!",
        text: "Here's my error message!",
        type: "error",
        confirmButtonText: "Cool"
    });
}
