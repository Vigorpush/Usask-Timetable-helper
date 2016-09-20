//==UserScript==
//@name         UofS TimeTable Enhancer
//@namespace    http://tampermonkey.net/
//@version      0.1
//@description  A bit of Javascript for enhancing the LAF of the timetable page on the usask website
//@author       Zang JiaWei, Nobleman Chukwu, Bengin Lee, Mark Nguyen
//@match        https://pawnss.usask.ca/ban/*
//@require   	http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
//@grant        none
//==/UserScript==

//global values
var maincolor = "#2c8fe4";
//TODO
/*
 * Add CSS into this variable
 */
var newCSS = "";
newCSS += "";


$(document).ready(function() {
	
    $(".ddlabel A").css({ 'color': '#39a3b1', 'font-size': '100%' });
    
    /*
     * Creating the share button 
     * 
     * Add share functionality works
	 */
	//TODO
    var input=document.createElement("input");
    input.type="button";
    input.value="Share!";
    input.id = "Share_button";
    input.onclick = ShareAction;
    input.setAttribute("style", "font-size:18px;position:absolute;bottom:120px;right:40px;");
    document.body.appendChild(input); 
     

});

(function() {
	'use strict';
	
	var lnk = document.createElement('link');
	lnk.rel = "stylesheet";
	lnk.href = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css";
	document.head.appendChild(lnk);
	//document.body.style.background = maincolor;
	document.querySelector(".pagebodydiv > div.infotextdiv").style.display = "none";
	var search = document.querySelector('.pagebodydiv > form:nth-child(2) > table:nth-child(1)');
	if (search) {
		console.log("Found the search thingy");
	}
	search.style.display = 'none';

	var tableStyle = 'table table-striped table-bordered table-condensed table-responsive';
	var timeTable = document.querySelector('.datadisplaytable');
	timeTable.className = tableStyle;

})();

	/*
	 * adding style into head
	 * */
	function addStyle(css){
		document.head.appendChild(document.createElement("style")).textContent = css;
	}
	
	addStyle(newCSS);
	
	//Function Share function Caller
	function ShareAction(){
		alert("Share Button work!");
	}
	

