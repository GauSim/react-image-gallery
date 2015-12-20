module.exports = function (grunt) {
	"use strict";

	// Display task timing
	require('time-grunt')(grunt);

	grunt.initConfig({
		pkg: grunt.file.readJSON('./package.json')
	});

	grunt.loadNpmTasks("grunt-systemjs-builder");
	grunt.registerTask("default", ['bundle']);

	grunt.registerTask("test", ['bundle2']);

	grunt.registerTask("bundle2", "jspm bundling into SFX", function () {
	
		// see more details on that here: https://github.com/jspm/jspm-cli/blob/master/docs/api.md
		var done = this.async();

		var jspm = require('jspm');
		jspm.setPackagePath('.');

		var builder = new jspm.Builder();
		var swig = require('swig');
		var template = swig.compileFile('./index_full.html');
		var http = require('http');
		
		// in momory build
		builder.bundle("app", {
			minify: true,
			mangle: true,
			lowResSourceMaps: true,
			sourceMaps: false
		})
			.then(function (jsFile) {
				console.log(jsFile);

				// Create an HTTP server
				var srv = http.createServer(function (req, res) {
					res.writeHead(200, { 'Content-Type': 'text/html' });
					res.end(template({ render: jsFile }));
				});
				srv.listen(9999);
				//done();
			})
			.catch(function (err) {
				console.log(err);
				done(err);
			});

	});

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