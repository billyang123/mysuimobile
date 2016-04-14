/*!
 * zanfuwu
 */
/* jshint node: true */
module.exports = function(grunt) {
    'use strict';

    // Force use of Unix newlines
    grunt.util.linefeed = '\n';

    RegExp.quote = function(string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
    };

    var buildTo = grunt.option('buildTo');
    var dist = buildTo ? (buildTo + '/') : 'dist/';

    var suiPath = "sui_modules/";
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Metadata.
        meta: {
            distPath: dist,
            doclessetsPath: 'dev/assets/',
            docsDistPath: 'dev/assets/',
            docsPath: 'dev/',
            jsPath: 'js/'+suiPath,
            lessPath: 'less/'
        },

        banner: '/*!\n' +

        ' * =====================================================\n' +
        ' * zanfuwu by yangbinbin - http://m.zanfuwu.com/\n' +
        ' *\n' +
        ' * =====================================================\n' +
        ' */\n',
        //,

        clean: {
            dist: ['<%= meta.distPath %>', '<%= meta.docsDistPath %>']
        },

        concat: {
            zanfuwu: {
              options: {
                  banner: '<%= banner %>;$.smVersion = "<%= pkg.version %>";'
              },
              src: [
                  'js/'+suiPath+'intro.js',
                  'js/'+suiPath+'util.js',
                  'js/'+suiPath+'zepto-adapter.js',
                  'js/'+suiPath+'device.js',
                  'js/'+suiPath+'fastclick.js',
                  'js/'+suiPath+'modal.js',
                  'js/'+suiPath+'calendar.js',
                  'js/'+suiPath+'picker.js',
                  'js/'+suiPath+'datetime-picker.js',
                  'js/'+suiPath+'iscroll.js',
                  'js/'+suiPath+'scroller.js',
                  'js/'+suiPath+'tabs.js',
                  'js/'+suiPath+'fixed-tab.js',
                  'js/'+suiPath+'pull-to-refresh-js-scroll.js',
                  'js/'+suiPath+'pull-to-refresh.js',
                  'js/'+suiPath+'infinite-scroll.js',
                  'js/'+suiPath+'searchbar.js',
                  'js/'+suiPath+'panels.js',
                  'js/'+suiPath+'router.js',
                  'js/'+suiPath+'last-position.js',
                  'js/'+suiPath+'init.js',
                  'js/'+suiPath+'scroll-fix.js'
              ],
              dest: '<%= meta.distPath %>js/<%= pkg.name %>.js'
            },
            extend: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    'js/'+suiPath+'swiper.js',
                    'js/'+suiPath+'swiper-init.js',
                    'js/'+suiPath+'photo-browser.js',
                    'js/myplugin/*.js'
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-extend.js'
            },
            cityPicker: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    'js/'+suiPath+'city-data.js',
                    'js/'+suiPath+'city-picker.js'
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-city-picker.js'
            },
            dev: {
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    'js/app_modules/*.js',
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-app.js'
            },
            config:{
                options: {
                    banner: '<%= banner %>'
                },
                src: [
                    'js/config.js',
                ],
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-config.js'
            },
            zepto:{
                src: [
                    'js/zepto.js'
                ],
                dest: '<%= meta.distPath %>js/zepto.js'
            },
            cropper:{
                src: [
                    'js/cropper.js'
                ],
                dest: '<%= meta.distPath %>js/cropper.js'
            },
            vue:{
                src: [
                    'js/vue.js'
                ],
                dest: '<%= meta.distPath %>js/vue.js'
            },
            wkim:{
                src: [
                    'js/im/wkim-3.2.5.js',
                    'js/im/myWkim/*.js'
                ],
                dest: '<%= meta.distPath %>js/wkim.js'
            },
            moment:{
                src: [
                    'js/moment/moment.js'
                ],
                dest: '<%= meta.distPath %>js/moment.js'
            },
            lrz:{
                src:[
                    'js/lrz/lrz.bundle.js'
                ],
                dest: '<%= meta.distPath %>js/lrz.bundle.js'
            }
        },


        less: {
            options: {
                paths: ['./', '<%= meta.lessPath %>'],
                ieCompat: false
            },
            core: {
                src: '<%= meta.lessPath %>zanfuwu.less',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>.css'
            },
            extend: {
                src: '<%= meta.lessPath %>zanfuwu-extend.less',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>-extend.css'
            },
            dev: {
                src: '<%= meta.lessPath %>/zanfuwu-app.less',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>-app.css'
            }
        },

        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '<%= banner %>'
                },
                files: {
                    src: [
                        '<%= meta.distPath %>css/*.css'
                        // '<%= meta.doclessetsPath %>css/app.css'
                    ]
                }
            }
        },

        copy: {
            
            fonts: {
                expand: true,
                src: 'fonts/*',
                dest: '<%= meta.docsDistPath %>'
            },    
            img: {
                expand: true,
                src: 'img/**/*',
                dest: '<%= meta.docsDistPath %>'
            },
            dev: {
                expand: true,
                cwd: '<%= meta.distPath %>',
                src: [
                    '**/*'
                ],
                dest: '<%= meta.docsDistPath %>'
            }
        },

        autoprefixer: {
            options: {
                browsers: [
                    'Android >= 4',
                    'Chrome >= 40',
                    'last 6 Firefox versions',
                    'iOS >= 6',
                    'Safari >= 6'
                ]
            },
            core: {
                src: '<%= less.core.dest %>'
            },
            extend: {
                src: '<%= less.extend.dest %>'
            },
            dev: {
                src: '<%= less.dev.dest %>'
            }
        },

        cssmin: {
            options: {
                keepSpecialComments: '*',// keep all important comments
                advanced: false
            },
            zanfuwu: {
                src: '<%= meta.distPath %>css/<%= pkg.name %>.css',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>.min.css'
            },
            extend: {
                src: '<%= meta.distPath %>css/<%= pkg.name %>-extend.css',
                dest: '<%= meta.distPath %>css/<%= pkg.name %>-extend.min.css'
            },
            dev: {
                src: [
                    '<%= meta.distPath %>css/zanfuwu-app.css'
                ],
                dest: '<%= meta.distPath %>css/<%= pkg.name %>-app.min.css'
            }
        },

        uglify: {
            options: {
                banner: '<%= banner %>',
                compress: {
                    warnings: false
                },
                mangle: true,
                preserveComments: false
            },
            zanfuwu: {
                src: '<%= concat.zanfuwu.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>.min.js'
            },
            extend: {
                src: '<%= concat.extend.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-extend.min.js'
            },
            cityPicker: {
                src: '<%= concat.cityPicker.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-city-picker.min.js'
            },
            dev: {
                src: '<%= concat.dev.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-app.min.js'
            },
            config:{
                src: '<%= concat.config.dest %>',
                dest: '<%= meta.distPath %>js/<%= pkg.name %>-config.min.js'
            },
            zepto:{
            	src: '<%= concat.zepto.dest %>',
                dest: '<%= meta.distPath %>js/zepto.min.js'
            },
            cropper:{
                src:'<%= concat.cropper.dest %>',
                dest: '<%= meta.distPath %>js/cropper.min.js'
            },
            vue:{
                src:'<%= concat.vue.dest %>',
                dest: '<%= meta.distPath %>js/vue.min.js'
            },
            wkim:{
                src:'<%= concat.wkim.dest %>',
                dest: '<%= meta.distPath %>js/wkim.min.js'
            },
            moment:{
                src:'<%= concat.moment.dest %>',
                dest: '<%= meta.distPath %>js/moment.min.js'
            }
        },

        qunit: {
            options: {
                inject: 'js/tests/unit/phantom.js'
            },
            files: 'js/tests/index.html'
        },

        watch: {
            // options: {
            //     hostname: '0.0.0.0',
            //     livereload: true,
            //     port: 8000
            // },
            js: {
                files: ['<%= meta.jsPath %>**/*.js'],
                tasks: ['dist-js', 'dist']
            },
            css: {
                files: ['<%= meta.lessPath %>**/*.less'],
                tasks: ['dist-css', 'copy']
            },
            html: {
                files: '<%= meta.docsPath %>**',
                tasks: ['jekyll']
            }
        },

        jekyll: {
            dev: {}
        },

        jshint: {
            options: {
                jshintrc: 'js/.jshintrc'
            },
            grunt: {
                src: ['Gruntfile.js', 'grunt/*.js']
            },
            src: {
                src: ['js/sui_modules/*.js','js/*.js']
            },
            dev: {
                src: ['<%= meta.doclessetsPath %>/js/app.js', '<%= meta.doclessetsPath %>/js/app/*.js']
            }
        },


        connect: {
            site: {
                options: {
                    base: '_site/',
                    hostname: '0.0.0.0',
                    livereload: true,
                    open: true,
                    port: 8000
                }
            }
        }
    });

    // Load the plugins
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Default task(s).
    grunt.registerTask('dist-css', ['less', 'autoprefixer', 'usebanner', 'cssmin']);
    grunt.registerTask('build-css', ['dist-css', 'cssmin']);
    grunt.registerTask('dist-js', ['concat']);
    grunt.registerTask('build-js', ['dist-js', 'uglify']);
    grunt.registerTask('dist', ['clean', 'build-css', 'build-js', 'copy']);
    grunt.registerTask('validate-html', ['jekyll']);
    grunt.registerTask('build', ['dist']);
    grunt.registerTask('test', ['dist', 'jshint', 'qunit', 'validate-html']);
    grunt.registerTask('server', ['dist', 'jekyll', 'watch']);
    //grunt.registerTask('server', ['dist', 'jekyll',"connect", 'watch']);
    if (buildTo) {
        //CDN发布环境
        grunt.registerTask('default', ['build-js', 'build-css', 'copy']);
    } else {
        //开发环境
        grunt.registerTask('default', ['test', 'dist']);
    }

    // Version numbering task.
    // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
    // This can be overzealous, so its changes should always be manually reviewed!
};
