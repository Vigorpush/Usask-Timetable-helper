// ==UserScript==
// @name            UofS TimeTable Enhancer
// @namespace       http://tampermonkey.net/
// @version         0.1
// @description     A bit of Javascript for enhancing the LAF of the timetable page on the usask website
// @author          Zang JiaWei, Nobleman Chukwu, Bengin Lee, Mark Nguyen
// @match           https://pawnss.usask.ca/ban/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js
// @require         https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js
// @require         https://gitlab.com/481-HCI/Scripts/raw/master/html2canvas.js
// @require         http://www.eyecon.ro/datepicker/js/datepicker.js
// @require         http://t4t5.github.io/sweetalert/dist/sweetalert-dev.js
// @resource        sweetAlert http://t4t5.github.io/sweetalert/dist/sweetalert.css
// @resource        sharemenu https://gitlab.com/481-HCI/Scripts/raw/master/Sharemenu.css
// @resource        bootStrap https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css
// @grant           GM_getResourceText
// @grant           GM_addStyle
// ==/UserScript==


var UofSTimeTable = (function () {

    var timeTableImage = null;

    var shareMenuString = "";
    shareMenuString += "<div class=\"sharewindows\">";
    shareMenuString += "    <div class=\"sharewindows\">";
    shareMenuString += "        <link href=\"http:\/\/fonts.googleapis.com\/css?family=Source+Sans+Pro\" rel=\"stylesheet\"";
    shareMenuString += "        type=\"text\/css\">";
    shareMenuString += "        <link href=\"http:\/\/fonts.googleapis.com\/css?family=Roboto+Condensed:400,700\" rel=\"stylesheet\"";
    shareMenuString += "        type=\"text\/css\">";
    shareMenuString += "        <div id=\"wrapper\" class=\"centered\" style=\"height: 340px;!important\">";
    shareMenuString += "            <h1>Share Menu<\/h1>";
    shareMenuString += "            <ul class=\"nav\">";
    shareMenuString += "                <li class=\"hm\"><img class=\"icon\" src=\"https:\/\/cdn0.iconfinder.com\/data\/icons\/typicons-2\/24\/home-24.png\"";
    shareMenuString += "                    alt=\"\"><span>Home<\/span>";
    shareMenuString += "                <\/li>";
    shareMenuString += "                <li class=\"fb\"><img class=\"icon\" src=\"https:\/\/cdn0.iconfinder.com\/data\/icons\/typicons-2\/24\/social-facebook-24.png\"";
    shareMenuString += "                    alt=\"\"><span>Facebook<\/span>";
    shareMenuString += "                <\/li>";
    shareMenuString += "                <li class=\"gp\"><img class=\"icon\" src=\"https:\/\/cdn3.iconfinder.com\/data\/icons\/picons-social\/57\/40-google-plus-24.png\"";
    shareMenuString += "                    alt=\"\"><span>Google-plus<\/span>";
    shareMenuString += "                <\/li>";
    shareMenuString += "                <li class=\"tw\"><img class=\"icon\" src=\"https:\/\/cdn0.iconfinder.com\/data\/icons\/typicons-2\/24\/social-twitter-24.png\"";
    shareMenuString += "                    alt=\"\"><span>Twitter<\/span>";
    shareMenuString += "                <\/li>";
    // shareMenuString += "                <li class=\"cl\">";
    // shareMenuString += "                    <img class=\"icon\" '=\"\" src=\"https:\/\/cdn0.iconfinder.com\/data\/icons\/typicons-2\/24\/phone-24.png\" alt=\"\"><span>Call<\/span><\/li>";
    shareMenuString += "            <\/ul>";
    shareMenuString += "        <\/div>";
    shareMenuString += "    <\/div>";
    shareMenuString += "<\/div>";
    shareMenuString += "";

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/png'});
    }

    (function () {
        html2canvas($(".datadisplaytable").get(0), {
            onrendered: function (canvas) {
                var data = canvas.toDataURL("image/png");
                timeTableImage = dataURItoBlob(data);
            },
            height: 400,
            width: 600
        });
    })();

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
     * adding style sheets into head
     */
    function addStyleSheet(resName) {
        var style = GM_getResourceText(resName);
        GM_addStyle(style);
    }

    function current_page_date() {
        var regular_date = /(\w+ \d+.*)/;
        var match = regular_date.exec($(".fieldlargetext").text());
        UofSTimeTable.CURRENT_PAGE_MONDAY_DATE = new Date(match[1]);
    }

    function addFBMetaData() {
        $.getScript('//connect.facebook.net/en_US/sdk.js', function () {
            FB.init({
                appId: "236016180144708",
                cookie: true,
                status: true,
                version: 'v1.0', // or v2.1, v2.2, v2.3, ...
                xfbml: false
            });

            $('.fb').click(function () {
                var scheduleImage;
                FB.ui({
                        method: 'share_open_graph',
                        action_type: 'og.shares',
                        action_properties: JSON.stringify({
                            object: {
                                'og:url': "https://paws5.usask.ca/web/home-community#ssb-mycourses",
                                "og:title": "Student Schedule by Day and Time",
                                "og:description": "Schedule for the week of ",
                                "og:site_name": "paws.usask.ca",
                                "og:image": timeTableImage
                            }
                        })
                    },
                    function (resp) {
                        if (resp && !resp.error_message) {
                            // Good
                        } else {
                            swal({
                                title: "Error",
                                text: "An error occured when attempting to share to facebook",
                                type: "error",
                                timer: 2000
                            });
                        }
                    });
            });
        });

        // $('head').append($("<meta>", {
        //     property: "og:url",
        //     content: "https://paws5.usask.ca/web/home-community#ssb-mycourses"
        // })).append($("<meta>", {
        //     property: "og:type",
        //     content: "profile"
        // })).append($("<meta>", {
        //     property: "og:title",
        //     content: "Student Schedule by Day and Time"
        // })).append($("<meta>", {
        //     property: "og:description",
        //     content: "Schedule for the week of "
        // })).append($("<meta>", {
        //     property: "og:image",
        //     content: "https://pawscas.usask.ca/uofs-theme/images/login-logo@2x.png"
        // })).append($("<meta>", {
        //     property: "og:site_name",
        //     content: "paws.usask.ca"
        // }));
    }

    /**
     * This enlarges the search top rows of the timetable table
     * @constructor
     */
    return {

        CURRENT_PAGE_MONDAY_DATE: new Date(),

        TIMETABLE: $('table.datadisplaytable'),

        /**
         * Creating the share button
         * Add share functionality works
         */
        ShareButton: function () {
            var $shareMenuElement = $($.parseHTML(shareMenuString));
            var $body = $("body");
            var menuShowing = false;

            var $div = $("<div>", {
                id: "Share_button",
                css: {
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
                },
                click: function () {
                    $shareMenuElement.show({
                        easing: 'linear',
                        complete: function () {
                            menuShowing = true;
                        }
                    });
                }
            });

            $body.append($div, $shareMenuElement.hide())
                .on('click', function (event) {
                    if (menuShowing && !$.contains($shareMenuElement.get(0), $(event.target).get(0))) {
                        $shareMenuElement.hide();
                        menuShowing = false;
                    }
                });
        },

        /**
         * Function to highlight all the cells that correspond to the current day
         * @param params json object containing parameters for the state attributes of each cell
         */
        HighlightDays: function (params) {
            var cell_color = params.cell_color || '#ffc61a';
            var font_color = params.font_color || 'white';
            var font_size = params.font_size || '1em';
            var days = params.days || [true];

            var today = new Date();
            var temp = new Date(this.CURRENT_PAGE_MONDAY_DATE);
            temp.setDate(temp.getDate() + today.getDay() - 1);


            this.TIMETABLE.addClass("table table-striped table-bordered table-responsive table-condensed");

            if (today.getDate() != temp.getDate() || today.getMonth() != temp.getMonth()) {
                return;
            }

            var d = new Date().getDay() - 1;

            var rowInfo = [new Cell(), new Cell(), new Cell(),
                new Cell(), new Cell(), new Cell(), new Cell()
            ];

            this.TIMETABLE.find('tr').slice(1).each(function (_) {
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
            addStyleSheet('sharemenu');
            EnlargeTopRows();
            current_page_date();
            addFBMetaData();
            return this;
        }//End of init function
    };//End of return
})();

$(document).ready(function () {

    UofSTimeTable.init().HighlightDays({
        cell_color: "#2fb673",
        font_color: "white",
        font_size: "1em"
    });

    UofSTimeTable.ShareButton(); //need naming standard for vars

    replace_title();
    rid_number();
    makeTimeLabel();
    invokeTime();
    EnlargeTopRows(); //always after ridnumber
    addhelpertext();
    resetnextweekposition();
    addednextterm();
    addedprevterm();

    removeSpaceOnTop();
    NextTermListener();
    PrevTermListener();

    // $.ajaxSetup({ cache: true });
    // $.getScript('//connect.facebook.net/en_US/sdk.js', function(){
    //     FB.init({
    //         appId: '{236016180144708}',
    //         version: 'v2.7' // or v2.1, v2.2, v2.3, ...
    //     });
    // });

});
//////////////////////////////////////////
//                  //
//      Function Callees    //
//                  //
//////////////////////////////////////////


/**
 * This function will add click listener to the next term button
 */
function NextTermListener() {
    $("#NexttermButton").on('click', function () {
        SwitchNextTerm();
    });
}

/**
 * This function will add click listener to the prev term button
 */
function PrevTermListener() {
    $("#PrevtermButton").on('click', function () {
        SwitchPrevTerm();
    });
}

/**
 * This function will remove the empty space on the top
 */
function removeSpaceOnTop() {
    $(".pageheaderdiv1 > h1").remove();
}

/**
 * Change the top two rows style in this table
 **/
function EnlargeTopRows() {
    var timeTable = UofSTimeTable.TIMETABLE;

    timeTable.find("tr:nth-child(1)").children().slice(1).css({
        "font-size": "1.2em",
        "text-align": "center"
    });

    timeTable.find("tr:nth-child(2)").children().slice(1).css({
        "font-size": "0.8em",
        "text-align": "center"
    });
}


var maxYear = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000 + 1;//globel var for next year value
function SwitchNextTerm() {

    var CurrentYear = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000 + 1;
    if (CurrentYear > maxYear) {
        //alert("reached to max");
        return;
    }


    var month = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getMonth() + 1;
    if ((month >= 1) && (month < 5)) {
        var currentsummerT1 = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000;
        document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=05/30/" + currentsummerT1 + "";
        //alert("move to summer term1!");
        return;
    }

    if ((month >= 5) && (month < 7)) {
        var currentsummerT2 = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000;
        document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=07/30/" + currentsummerT2 + "";
        //alert("move to summer term2!");
        return;
    }

    if ((month >= 7) && (month < 9)) {
        var currentregularT1 = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000;
        document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=09/30/" + currentregularT1 + "";
        //alert("move to regular term1!");
        return;
    }


    document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=01/30/" + CurrentYear + "";
}

function SwitchPrevTerm() {
    var CurrentYear = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000 - 1;
    var month = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getMonth() + 1;
    if ((month >= 9) && (month <= 12)) {
        //alert("move to summer term!");
    }


    var month = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getMonth() + 1;
    if ((month >= 1) && (month < 5)) {
        var currentsummerT1 = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000 - 1;
        document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=09/30/" + currentsummerT1 + "";
        //alert("move to regular term1!");
        return;
    }

    if ((month >= 5) && (month < 7)) {
        var currentsummerT2 = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000;
        document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=01/30/" + currentsummerT2 + "";
        //alert("move to regular term2!");
        return;
    }

    if ((month >= 7) && (month < 9)) {
        var currentregularT1 = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000;
        document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=05/30/" + currentregularT1 + "";
        //alert("move to summar term1!");
        return;
    }

    document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=07/30/" + CurrentYear + "";
}


/**
 * Replace the title with "Student schedule for 2016-2017"
 * */
function replace_title() {
    var CurrentYear = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getYear() - 100 + 2000;
    var checkyear = CurrentYear;
    var month = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE.getMonth() + 1;
    var term;
    if ((month >= 9) && (month <= 12)) {
        term = "Term 1";
    }
    if ((month >= 1) && (month < 5)) {
        term = "Term 2";
    }
    if ((month >= 5) && (month < 7)) {
        term = "Summer Term 1";
    }
    if ((month >= 7) && (month < 9)) {
        term = "Summer Term 2";
    }

    if ((month >= 1) && (month < 5)) {
        checkyear = CurrentYear - 1;
    }
    document.querySelector(".pagetitlediv").innerHTML = "Student Schedule for " + checkyear + " - " + (checkyear + 1) + " " + term + "<br><br>";
    document.querySelector(".pagetitlediv").style.color = '#39a3b1';
    document.querySelector(".pagetitlediv").style.fontSize = 'x-large';
    document.querySelector(".pagebodydiv > div.infotextdiv").style.display = 'none';//Removes the useless information on the page that no one reads.
}

/**
 * Get rid of the hideous number that shows the number of weeks you have been attending the UofS
 * */
function rid_number() {

    var monthNames = [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
    ];


    $("body > div.pagebodydiv > table:nth-child(3) > tbody > tr > td:nth-child(3)").remove();//Remove the useless information detailing the total number of weeks a student has been attending the U of S.


    var weekDays = $("body > div.pagebodydiv > table.datadisplaytable.table.table-striped.table-bordered.table-responsive.table-condensed > tbody > tr:nth-child(1)");
    var monthDate = weekDays.clone();
    weekDays.after(monthDate);// clone a new row, and append after the first row

    var today = UofSTimeTable.CURRENT_PAGE_MONDAY_DATE;
    $(monthDate).children().slice(1).each(function (index) { // put the month and date into second row
        var month = monthNames[today.getMonth()];
        var html_String = month + "&nbsp;" + today.getDate();
        $(this).html("&nbsp;&nbsp;&nbsp;" + html_String);
        today.setDate(today.getDate() + 1);
    });


    //compare the information shows that No courses .., then remove the additional row
    if ($.trim($(monthDate).text()) == "No courses with assigned times this week.") {
        $(monthDate).remove();
    }
}


/**
 * Show comfirmation information
 */
function Comfirmation() {
    swal({
        title: "Error!",
        text: "Here's my error message!",
        type: "error",
        confirmButtonText: "Cool"
    });
}
//End of Comfirmation


/**
 * This function will add helper information about the search format
 */
function addhelpertext() {
    var targetposition = $(".fieldlabeltext");
    var designation = $("body > div.pagebodydiv > form > table > tbody > tr > td ").append("<div ><p class ='helper'>Example for Feb 06, 2016 : 02/06/2016</p></div>");
    $(".helper").css({
        "margin-top": "0.5%",
        "font-size": "1em",
        "color": "#545454"
    });
}


/**
 * This function will reset the position of next week button to the right
 */
function resetnextweekposition() {
    var nextweek = $(".rightaligntext");
    $(".rightaligntext").css({
        "margin-right": "-61.5%"
    });
}
/**
 * This function will added next term button
 */
function addednextterm() {
    $("td.pldefault:nth-child(4) > p:nth-child(1)").append("<div id='NexttermButton'  style='display:inline;'><a>Next term</a></div>");
    $("#NexttermButton").css({
        "margin-left": "0.5%",
    });
}

/**
 * This function will added prev term button
 */
function addedprevterm() {
    $("body > div.pagebodydiv > table:nth-child(3) > tbody > tr > td:nth-child(1)").prepend("<div id='PrevtermButton'  style = 'display:inline;'><a>Previous term</a></div>");
    $("#PrevtermButton").css({
        "margin-right": "0.5%",
    });
}


/**
 * Shows realtime
 */
var time = document.createElement('label'); //Create a time label
function makeTimeLabel() {
    time.innerHTML = new Date();
    document.getElementsByTagName('body')[0].appendChild(time);
    $("body > label").css({
        "position": "fixed",
        "bottom": "0",
        "left": "0",
        "border": "2px solid #73AD21",
        "background-color": "white"
    });
}

function updateTime() {
    var date = new Date();
    var hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    var am_pm = date.getHours() >= 12 ? "PM" : "AM";
    hours = hours < 10 ? "0" + hours : hours;
    var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
    var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    //TimeString = hours + ":" + minutes + ":" + seconds + " " + am_pm;
    //time.innerHTML = TimeString;
    time.innerHTML = new Date();
}
function invokeTime() {
    window.setInterval(updateTime, 1000); // update the time every second
}
//End of current time clock
