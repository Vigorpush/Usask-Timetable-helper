//==UserScript==
//@name         UofS TimeTable Enhancer
//@namespace    http://tampermonkey.net/
//@version      0.1
//@description  A bit of Javascript for enhancing the LAF of the timetable page on the usask website
//@author       Zang JiaWei, Nobleman Chukwu, Bengin Lee
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
     * Make the Button shows up
     * Add functions for testing
     * Add share functionality works
	 */
	//TODO
	var newEm = document.createElement("button");
	newEm.innerHTML= "share";
	newEm.id = "share_button";
	newEm.addEventListener('click', ShareAction, true);//callback the ShareAction function
	addStyle("#share_button{margin:9px 0 0 0; background:black; left:20px;}");
	alert("test");//this code will check the button creating function is processed or not, feel free to delete.

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

