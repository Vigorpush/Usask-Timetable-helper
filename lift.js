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
    CreateButton(); //need naming standard for vars
    navigation_term();
    replace_title();
    rid_number();
    highlightCurrentDay();
    $( "input[name='goto_date_in']" ).focus(function(){
    	HS_setDate(this);
    });
});
/**
 * Add button above the schedule to allow navigation between terms
 * */
function navigation_term() {
    var input = document.createElement("div");
    input.id = "Term_button";
    input.onclick = TermSwitchAction;
    document.body.appendChild(input);

    $("#Term_button").css({
        'font-size': '1em',
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

function TermSwitchAction() {
    document.location.href = "https://pawnss.usask.ca/ban/bwskfshd.P_CrseSchd?start_date_in=01/02/2017";
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
/**
 * Date picker function
 * example that how to use it
 * <input type="text" name="date" onfocus="HS_setDate(this)" placeholder="something">
 * */
//Start of date picker function
function HS_DateAdd(interval,number,date){
	number = parseInt(number);
	if (typeof(date)=="string"){var date = new Date(date.split("-")[0],date.split("-")[1],date.split("-")[2]);}
	if (typeof(date)=="object"){var date = date;}
	switch(interval){
	case "y":return new Date(date.getFullYear()+number,date.getMonth(),date.getDate()); break;
	case "m":return new Date(date.getFullYear(),date.getMonth()+number,checkDate(date.getFullYear(),date.getMonth()+number,date.getDate())); break;
	case "d":return new Date(date.getFullYear(),date.getMonth(),date.getDate()+number); break;
	case "w":return new Date(date.getFullYear(),date.getMonth(),7*number+date.getDate()); break;
	}

}
function checkDate(year,month,date){
	var enddate = ["31","28","31","30","31","30","31","31","30","31","30","31"];
	var returnDate = "";
	if (year%4===0){enddate[1]="29";}
	if (date>enddate[month]){returnDate = enddate[month];}else{returnDate = date;}
	return returnDate;
}
function WeekDay(date){
	var theDate;
	if (typeof(date)=="string"){theDate = new Date(date.split("-")[0],date.split("-")[1],date.split("-")[2]);}
	if (typeof(date)=="object"){theDate = date;}
	return theDate.getDay();
}
function HS_calender(){
	var lis = "";
	var style = "";
	style +="<style type='text/css'>";
	style +=".calender { width:170px; height:auto; font-size:12px; margin-right:14px; background:url(calenderbg.gif) no-repeat right center #fff; border:1px solid #397EAE; padding:1px}";
	style +=".calender ul {list-style-type:none; margin:0; padding:0;}";
	style +=".calender .day { background-color:#EDF5FF; height:20px;}";
	style +=".calender .day li,.calender .date li{ float:left; width:14%; height:20px; line-height:20px; text-align:center}";
	style +=".calender li a { text-decoration:none; font-family:Tahoma; font-size:11px; color:#333}";
	style +=".calender li a:hover { color:#f30; text-decoration:underline}";
	style +=".calender li a.hasArticle {font-weight:bold; color:#f60 !important}";
	style +=".lastMonthDate, .nextMonthDate {color:#bbb;font-size:11px}";
	style +=".selectThisYear a, .selectThisMonth a{text-decoration:none; margin:0 2px; color:#000; font-weight:bold}";
	style +=".calender .LastMonth, .calender .NextMonth{ text-decoration:none; color:#000; font-size:18px; font-weight:bold; line-height:16px;}";
	style +=".calender .LastMonth { float:left;}";
	style +=".calender .NextMonth { float:right;}";
	style +=".calenderBody {clear:both}";
	style +=".calenderTitle {text-align:center;height:20px; line-height:20px; clear:both}";
	style +=".today { background-color:#ffffaa;border:1px solid #f60; padding:2px}";
	style +=".today a { color:#f30; }";
	style +=".calenderBottom {clear:both; border-top:1px solid #ddd; padding: 3px 0; text-align:left}";
	style +=".calenderBottom a {text-decoration:none; margin:2px !important; font-weight:bold; color:#000}";
	style +=".calenderBottom a.closeCalender{float:right}";
	style +=".closeCalenderBox {float:right; border:1px solid #000; background:#fff; font-size:9px; width:11px; height:11px; line-height:11px; text-align:center;overflow:hidden; font-weight:normal !important}";
	style +="</style>";
	var now;
	if (typeof(arguments[0])=="string"){
		selectDate = arguments[0].split("-");
		var year = selectDate[0];
		var month = parseInt(selectDate[1])-1+"";
		var date = selectDate[2];
		now = new Date(year,month,date);
	}else if (typeof(arguments[0])=="object"){
		now = arguments[0];
	}
	var lastMonthEndDate = HS_DateAdd("d","-1",now.getFullYear()+"-"+now.getMonth()+"-01").getDate();
	var lastMonthDate = WeekDay(now.getFullYear()+"-"+now.getMonth()+"-01");
	var thisMonthLastDate = HS_DateAdd("d","-1",now.getFullYear()+"-"+(parseInt(now.getMonth())+1).toString()+"-01");
	var thisMonthEndDate = thisMonthLastDate.getDate();
	var thisMonthEndDay = thisMonthLastDate.getDay();
	var todayObj = new Date();
	today = todayObj.getFullYear()+"-"+todayObj.getMonth()+"-"+todayObj.getDate();
	for (i=0; i<lastMonthDate; i++){  // Last Month's Date
		lis = "<li class='lastMonthDate'>"+lastMonthEndDate+"</li>" + lis;
		lastMonthEndDate--;
	}
	for (i=1; i<=thisMonthEndDate; i++){ // Current Month's Date
		if(today == now.getFullYear()+"-"+now.getMonth()+"-"+i){
			var todayString = now.getFullYear()+"-"+(parseInt(now.getMonth())+1).toString()+"-"+i;
			lis += "<li><a href=javascript:void(0) class='today' onclick='_selectThisDay(this)' title='"+now.getFullYear()+"-"+(parseInt(now.getMonth())+1)+"-"+i+"'>"+i+"</a></li>";
		}else{
			lis += "<li><a href=javascript:void(0) onclick='_selectThisDay(this)' title='"+now.getFullYear()+"-"+(parseInt(now.getMonth())+1)+"-"+i+"'>"+i+"</a></li>";
		}
	}
	var j=1;
	for (i=thisMonthEndDay; i<6; i++){  // Next Month's Date
		lis += "<li class='nextMonthDate'>"+j+"</li>";
		j++;
	}
	lis += style;
	var CalenderTitle = "<a href='javascript:void(0)' class='NextMonth' onclick=HS_calender(HS_DateAdd('m',1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Next Month'>&raquo;</a>";
	CalenderTitle += "<a href='javascript:void(0)' class='LastMonth' onclick=HS_calender(HS_DateAdd('m',-1,'"+now.getFullYear()+"-"+now.getMonth()+"-"+now.getDate()+"'),this) title='Previous Month'>&laquo;</a>";
	CalenderTitle += "<span class='selectThisYear'><a href='javascript:void(0)' onclick='CalenderselectYear(this)' title='Click here to select other year' >"+now.getFullYear()+"</a></span><span class='selectThisMonth'><a href='javascript:void(0)' onclick='CalenderselectMonth(this)' title='Click here to select other month'>"+(parseInt(now.getMonth())+1).toString()+"</a></span>"; 
	if (arguments.length>1){
		arguments[1].parentNode.parentNode.getElementsByTagName("ul")[1].innerHTML = lis;
		arguments[1].parentNode.innerHTML = CalenderTitle;
	}else{
		var CalenderBox = style+"<div class='calender'><div class='calenderTitle'>"+CalenderTitle+"</div><div class='calenderBody'><ul class='day'><li>S</li><li>M</li><li>T</li><li>W</li><li>T</li><li>F</li><li>S</li></ul><ul class='date' id='thisMonthDate'>"+lis+"</ul></div><div class='calenderBottom'><a href='javascript:void(0)' class='closeCalender' onclick='closeCalender(this)'>×</a><span><span><a href=javascript:void(0) onclick='_selectThisDay(this)' title='"+todayString+"'>Today</a></span></span></div></div>";
		return CalenderBox;
	}
}
function _selectThisDay(d){
	var boxObj = d.parentNode.parentNode.parentNode.parentNode.parentNode;
		boxObj.targetObj.value = d.title;
		alert("please some one change the order of ： "+boxObj.targetObj.value);
		//TODO
		boxObj.parentNode.removeChild(boxObj);
}
function closeCalender(d){
	var boxObj = d.parentNode.parentNode.parentNode;
		boxObj.parentNode.removeChild(boxObj);
}
function CalenderselectYear(obj){
		var opt = "";
		var thisYear = obj.innerHTML;
		for (i=1970; i<=2020; i++){
			if (i==thisYear){
				opt += "<option value="+i+" selected>"+i+"</option>";
			}else{
				opt += "<option value="+i+">"+i+"</option>";
			}
		}
		opt = "<select onblur='selectThisYear(this)' onchange='selectThisYear(this)' style='font-size:11px'>"+opt+"</select>";
		obj.parentNode.innerHTML = opt;
}
function selectThisYear(obj){
	HS_calender(obj.value+"-"+obj.parentNode.parentNode.getElementsByTagName("span")[1].getElementsByTagName("a")[0].innerHTML+"-1",obj.parentNode);
}
function CalenderselectMonth(obj){
		var opt = "";
		var thisMonth = obj.innerHTML;
		for (i=1; i<=12; i++){
			if (i==thisMonth){
				opt += "<option value="+i+" selected>"+i+"</option>";
			}else{
				opt += "<option value="+i+">"+i+"</option>";
			}
		}
		opt = "<select onblur='selectThisMonth(this)' onchange='selectThisMonth(this)' style='font-size:11px'>"+opt+"</select>";
		obj.parentNode.innerHTML = opt;
}
function selectThisMonth(obj){
	HS_calender(obj.parentNode.parentNode.getElementsByTagName("span")[0].getElementsByTagName("a")[0].innerHTML+"-"+obj.value+"-1",obj.parentNode);
}
function HS_setDate(inputObj){
	var calenderObj = document.createElement("span");
	calenderObj.innerHTML = HS_calender(new Date());
	calenderObj.style.position = "absolute";
	calenderObj.targetObj = inputObj;
	inputObj.parentNode.insertBefore(calenderObj,inputObj.nextSibling);
}
//End of date picker function