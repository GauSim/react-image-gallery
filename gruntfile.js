module.exports = function (grunt) {
	"use strict";

	// Display task timing
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json')
	});

	grunt.loadNpmTasks("grunt-systemjs-builder");
	grunt.registerTask("default", ['bundle']);

	grunt.registerTask("bundle", "jspm bundling into SFX", function () {

		// see more details on that here: https://github.com/jspm/jspm-cli/blob/master/docs/api.md
		var done = this.async();

		var jspm = require('jspm');
		jspm.setPackagePath('.');

		jspm.bundleSFX('app', 'dist/build.js', {
			minify: true,
			mangle: true,
			lowResSourceMaps: true,
			sourceMaps: false
		}).then(function (output) {
			grunt.log.writeln('done bundling');
			console.log(output)
			done();
		}).catch(function (error) {
			grunt.log.writeln(error);
			done(error);
		});
		
	});
};