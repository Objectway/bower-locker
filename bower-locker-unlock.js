#!/usr/bin/env node
'use strict';

var fs = require('fs');

/**
 * Function to unlock the `bower.json` file by returning it to its unlocked version
 *   The unlocked version is stored at `bower-locker.bower.json`
 * @param {Boolean} isVerbose Flag to indicate whether we should log verbosely or not
 */
function unlock(isVerbose) {
    if (isVerbose) {
        console.log('Start unlocking ...');
    }

    // Load bower.json and make sure it is a locked bower.json file
    var bowerConfigStr = fs.readFileSync('bower.json', {encoding: 'utf8'});
    var bowerConfig = JSON.parse(bowerConfigStr);
    if (!bowerConfig.bowerLocker) {
        console.warn('The bower.json is already unlocked.\n' +
        "Run 'bower-locker lock' to create a locked file.");
        process.exit(1);
    }

    // Load original bower file
    var originalBowerConfigJSON = JSON.parse( fs.readFileSync('bower-locker.bower.json', {encoding: 'utf8'}) );
    // Mantein the actual last version of the app
    originalBowerConfigJSON.version = JSON.parse(fs.readFileSync('bower.json', {encoding: 'utf8'})).version;
    // Write it back as bower.json
    fs.writeFileSync('bower.json', JSON.stringify(originalBowerConfigJSON), {encoding: 'utf8'});

    console.log('Unlocking completed.');
}

module.exports = unlock;
