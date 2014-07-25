#!/usr/bin/env node

var exec = require('child_process').exec;

// Platforms we are busy building
var platforms = process.env.CORDOVA_PLATFORMS.split(",");

// Directory where the webcontent of each platform should be placed
var platformWebDir = {
	"android" : "platforms/android/assets/",
	"ios" : "platforms/ios/"
};

// File we want to obfuscate
var obfuscateFiles = [
	"www/js/myfile"
];

// Loop through each platform
for(var pIdx in platforms){
	var platform = platforms[pIdx];
	
	// Skip if it is a platform we don't have a web dir of
	if(platformWebDir[platform] == null){
		continue;
	}

	// Loop through each file for this platform
	for(var fIdx in obfuscateFiles) {
		var file = obfuscateFiles[fIdx];
		exec("uglifyjs " + file + " -m -c -o " + platformWebDir[platform] + file);
	}
}