const { src, dest, parallel, watch } = require('gulp');
const pug          = require('gulp-pug');
const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync');
const cmq          = require('gulp-combine-mq');
const connectSSI   = require('connect-ssi');
const os           = require('os');
const autoprefixer = require(`gulp-autoprefixer`);
const htmlhint     = require(`gulp-htmlhint`);
const jsValidate   = require('gulp-jsvalidate');
const notify       = require(`gulp-notify`);
const uglify       = require('gulp-uglify');


const browserVersion = [
  'Android >= 4.4',
  'Chrome >= 57',
  'ChromeAndroid >= 57',
  'Edge >= 14',
  'Firefox >= 52',
  'ie 11',
  'iOS >= 9',
  'Safari >= 9'
];
const SRC_DIR    = 'src';
const DIST_DIR   = 'dist';
const port       = {};
      port.http  = 8080;
      port.https = 9090;



var localIpAddress;
(function(ifaces){
  if(typeof ifaces["en0"] !== "undefined") {
    ifaces["en0"].forEach(function(iface) {
      if ("IPv4" !== iface.family || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
        return;
      }
      localIpAddress = iface.address;
    });
  } else {
    Object.keys(ifaces).forEach(function(ifname) {
      var alias = 0;
      ifaces[ifname].forEach(function(iface) {
        if ("IPv4" !== iface.family || iface.internal !== false) {
          // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
          return;
        }
        localIpAddress = iface.address;
      });
    });
  }
})(os.networkInterfaces());


function html() {
  return src(`./${SRC_DIR}/**/!(_)*.pug`)
    .pipe(pug({
      pretty: true
    }))
    .pipe(htmlhint())
    .pipe(htmlhint.reporter())
    .pipe(dest(`./${DIST_DIR}`))
    .pipe(notify({message: 'PUG compile finished'}))
    .pipe(browserSync.reload({
      stream: true
    }));
}

function css() {
  return src(`./${SRC_DIR}/**/*.scss`)
    .pipe(sass({
      outputStyle: 'expanded'
    }))
    .pipe(autoprefixer({
      browsers: browserVersion,
      cascade: false
    }))
    .pipe(cmq({
      beautify: false
    }))
    .pipe(dest(`./${DIST_DIR}`))
    .pipe(notify({message: 'CSS compile finished'}))
    .pipe(browserSync.reload({
      stream: true
    }));
}

function js() {
  return src(`./${SRC_DIR}/**/*.js`)
    // .pipe(concat('app.min.js'))
    .pipe(jsValidate())
    .pipe(uglify())
    .pipe(dest(`./${DIST_DIR}`))
    .pipe(notify({message: 'JS compile finished'}))
    .pipe(browserSync.reload({
      stream: true
    }));
}

// server
function gulp_server() {
  browserSync({
    // setting your IP here
    host: localIpAddress,
    port: port.http,
    server: {
      baseDir: `./${DIST_DIR}/http/`,
      directory: true,
      middleware: [
        connectSSI({
          baseDir: `${DIST_DIR}/http/`,
          ext: '.html'
        }),
        (req, res, next) => {
          next();
        }
      ],
    }
  });
}

// watch
function watchFiles() {
  watch(`${SRC_DIR}/**/*.js`, js);
  watch(`${SRC_DIR}/**/*.scss`, css);
  watch(`${SRC_DIR}/**/*.pug`, html);
}


exports.js      = js;
exports.css     = css;
exports.html    = html;
exports.default = parallel(watchFiles, html, css, js, gulp_server);