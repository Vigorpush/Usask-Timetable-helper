The purpose of this project is to improve the usask page which allows a user to view their timetable and print it if the need arises.

To accomplish this, we will be relying on a plugin which allows for injecting javascript and code into websites and modifying the behaviour of the website.
This plugin has different names depending on the Environment.
- ViolentMonkey - [Opera](https://addons.opera.com/en/extensions/details/violent-monkey/), [Chrome](https://chrome.google.com/webstore/detail/violent-monkey/jinjaccalgkegednnccohejagnlnfdag)
- GreaseMonkey - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)
- TamperMonkey - [Chrome](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/tampermonkey/), [Opera](https://addons.opera.com/en/extensions/details/tampermonkey-beta/?display=en), [Safari](https://tampermonkey.net/?browser=safari), [Edge](https://www.microsoft.com/en-us/store/p/tampermonkey/9nblggh5162s)

For this project, we will make use of TamperMonkey for full cross-browser compatibility

The script we will be creating will add functionality such as:
- being able to get a nicely formatted view of your schedule for printing
- ability to share the schedule with others
- ability to export the schedule to other formats such as .ical, .pdf, (tentatively) .png|.jpg

// Testing commit by Mark.