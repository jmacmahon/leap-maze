#!/bin/sh

watchify src/js/main.js -t [ babelify --presets [ es2015 ] ] -o bundled/bundle.js
