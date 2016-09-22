//==UserScript==
//@name         UofS TimeTable Enhancer
//@namespace    http://tampermonkey.net/
//@version      0.1
//@description  A bit of Javascript for enhancing the LAF of the timetable page on the usask website
//@author       Zang JiaWei, Nobleman Chukwu, Bengin Lee, Mark Nguyen
//@match        https://pawnss.usask.ca/ban/*
//@require   	http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
//@require		http://www.eyecon.ro/datepicker/js/datepicker.js
//@grant        none
//==/UserScript==


/**
 * Add CSS into this variable
 */
var newCSS = "";
newCSS += "";
var maincolor = "#2c8fe4";
var search = document.querySelector('.pagebodydiv > form:nth-child(2) > table:nth-child(1)');


$(document).ready(function() {
	$(".ddlabel A").css({ 'color': '#39a3b1', 'font-size': '100%' });
	CreateButton();
	addStyle(newCSS);
	//$("input[name=start_date_in]").addEventListener("focusin", alert("touch down")); //dd
	//$("input:text[name='start_date_in']").bind("click", DatePick);
	//submit
	$("input[type='submit']").bind("click", alert("hah"));
});

/**
 * Add button above the schedule to allow navigation between terms
 * */
function navigation_term(){
	
}

/**
 * Replace the title with "Student schedule for 2016-2017 Term 1"
 * */
function replace_title(){
	
}


/**
 * Highlight the current day
 * */
function hightlight_current(){
	
}


/**
 * Large buttons for navigating the weeks. Kinda like the Google images page
 * */
function navigating_weeks(){
	
}


/**
 * Get rid of the hideous number that shows the number of weeks you have been attending the UofS
 * */
function rid_number(){
	
}

function DatePick(){//dd
	alert("Date pick function is runing");

}

/**
 * Creating the share button 
 * Add share functionality works
 */
function CreateButton(){
	var input=document.createElement("div");
	input.id = "Share_button";
	input.onclick = ShareAction;
	document.body.appendChild(input); 
	
	$("#Share_button").css({ 
		'font-size':'1em',
		'position':'fixed',
		'bottom':'40px',
		'right':'40px',
		'border-radius':'50%',
		'overflow':'hidden',
		'width':'60px',
		'height':'60px',
		'border':'5px solid #39a3b1',
		'background':'#39a3b1',
		'box-shadow':'0px 0px 20px 0px #000'
		
	});
}

/**
 * adding style into head
 * */
function addStyle(css){
	document.head.appendChild(document.createElement("style")).textContent = css;
}

/**
 * adding javascript code into head
 * */
function addJs(js){//dd
	
	document.head.appendChild(document.createElement("script")).textContent = js;
}
/**
 * 
 * Function Share function Caller
 * */
function ShareAction(){
	//TODO
	//Edit some code into here, for sharing
	alert("Share Button work!");
}

(function() {
	'use strict';
	var lnk = document.createElement('link');
	lnk.rel = "stylesheet";
	lnk.href = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css";
	document.head.appendChild(lnk);
	document.querySelector(".pagebodydiv > div.infotextdiv").style.display = "none";
	/*
	 * var search = document.querySelector('.pagebodydiv > form:nth-child(2) > table:nth-child(1)');
	if (search) {
		console.log("Found the search thingy");
	}
	search.style.display = 'none';
	*/
	var tableStyle = 'table table-striped table-bordered table-condensed table-responsive';
	var timeTable = document.querySelector('.datadisplaytable');
	timeTable.className = tableStyle;

})();



