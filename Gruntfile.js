// Xavier University HTML Template
module.exports = function (grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		// These test must pass!
		jshint: {
			files:['Gruntfile.js', 'src/javascripts/*.js'],
			options: {
				reporter: require('jshint-stylish')
			}
		},
		// HTML Includes
		includes: {
			files: {
			    src: ['src/html/*.html'], // Source files
			    dest: 'docs', // Destination directory
			    flatten: true
			}
		},
		// Compile SASS (uses Compass, follow Ruby Install instructions)
		compass: {
  		dev: { // local serving point
    		options: {
      		sassDir:      'src/css',
      		cssDir:       'docs/css',
      		environment:  'development',
      		outputStyle:  'nested',
      		imagesDir:    'docs/images',
      		fontsDir:     'docs/fonts',
      		relativeAssets: true
    		}
  		}
		},
		// Check for required Prefixes
		postcss: {
  		options: {
    		map: true,
    		processors: [
      		require('autoprefixer')({
        		browsers: ['last 3 versions']
      		})
    		]
  		},
  		dist: {
    		src: 'docs/css/**/*.css'
  		}
		},
		// Concatenate JS files
		concat:{
  		base: { // Base.js contains anything that covers 100% of user interactions
  			src: ['src/js/**/base.*.js'],
  			dest: 'docs/js/base.js'
			}
			// May need more tasks for specific scripts for advisor/student/admin only areas
		},
		// Compress JS files to minified versions for Production
		uglify: {
  		prod: {
    		files: [{
      		expand: true,
      		src: ['docs/js/*.js', '!docs/js/*.min.js'],
      		dest: 'docs/js',
      		cwd: '.',
      		rename: function (dst, src){
        		// To keep the JS files and make new as *.min.js
        		return src.replace('.js', '.min.js');
      		}
    		}]
  		}
		},
		// Sombine SVG...
		svgstore: {
      options: {
        prefix : 'xu-', // This will prefix each <g> ID
        inheritviewbox: true,
        includeTitleElement: false,
        includedemo: false
      },
      default : {
        files: {
          'docs/svg/defs.svg': ['src/svgs/*.svg'],
          'src/html/includes/svg.html': ['src/svgs/*.svg']
        }
      }
    },
		// Minify source Images
		imagemin: {
  		prod: {
    		files: [{
      		expand: true,
      		cwd: 'src/images',
      		src: ['**/*.{png,jpg,gif,svg}'],
      		dest: 'docs/images'
    		}]
  		}
		},
		// Localhost Previews: NEEDS VirtualHost SETUP to work
		browserSync: {
  		bsFiles: {
        src : 'docs/**/*'
      },
      options: {
        watchTask: true,
          server: {
              baseDir: "./docs"
          }
      }
		},
		// Watch files for the sake of running various tasks
		watch: {
  		js: {
    		files: ['src/js/**/*.js'],
        tasks: ['newer:jshint', 'newer:concat', 'newer:uglify']
  		},
  		css: {
    		files: 'src/css/**/*.scss',
        tasks: ['compass:dev', 'newer:postcss']
  		},
  		images: {
    		files: 'src/images/**/*.{png,jpg,gif,svg}',
        tasks: ['newer:imagemin']
  		},
  		svg: {
    		files: 'src/svgs/**/*.svg',
    		tasks: ['newer:svgstore']
  		},
  		html: {
				files: ['src/html/**/*.html'],
				tasks: ['includes']
			}
		}
	});
	
	// load npm task packages
	// JS
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// CSS
	grunt.loadNpmTasks('grunt-contrib-compass');
	grunt.loadNpmTasks('grunt-postcss');
	// HTML
	grunt.loadNpmTasks('grunt-includes');
	// Images
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	// SVG combos
	grunt.loadNpmTasks('grunt-svgstore');
	// Maintenance
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-newer');
	
	// Setup the Task list of things to run
	// Default: Setup, and run the Dev suite
	grunt.registerTask('dev', [
  	'browserSync',
  	'compass',
  	'includes',
  	'svgstore',
  	'watch'
	]);
	grunt.registerTask('default', [
  	'dev'
	]);
};