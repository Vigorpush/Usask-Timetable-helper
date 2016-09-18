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

//Start of testing jQuery
alert('jQuery Work!');

var runEverySecond = function(){
  $('p').find('img').attr('width', '0px');
  $('a').css('padding', '0px');

  console.debug('Hello Word has ' + $('p').length + ' paragraphs');
};

$(document).ready(function() {
	/*
    so far those are not working by somereason
	 */
	//Adding Share Button
	var newEm = document.createElement("span");
	newEm.innerHTML= "share";
	newEm.id = "share_button";
	newEm.addEventListener('click', ShareAction, true);//callback the ShareAction function
	addStyle("#share_button{margin:9px 0 0 0; background:black; left:20px;}");
	alert("test");
	//
    setInterval(runEverySecond,1000);
});
//End of testing jQuery

(function() {
	'use strict';
	
	var lnk = document.createElement('link');
	lnk.rel = "stylesheet";
	lnk.href = "http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css";
	document.head.appendChild(lnk);
	document.body.style.background = maincolor;
	//document.getElementByTag("A:link").style.color ="magenta";//change the font color in calender
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

	//Added CSS style
	var newCSS = "";
	newCSS += "";
	
	function addStyle(css){
		document.head.appendChild(document.createElement("style")).textContent = css;
	}
	
	addStyle(newCSS);
	
	//Function Share function Caller
	function ShareAction(){
		alert("Share Button work!");
}

