# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-web
pkgver=20171104
pkgrel=1
arch=(any)
url="https://github.com/RoPieee/ropieee-web"
license=('MIT')
depends=('nodejs'
         'npm')
options=('!strip')
source=('web::git://github.com/RoPieee/ropieee-web.git#branch=master')
md5sums=('SKIP')
install=${pkgname}.install


build() {
echo "build"
   cd ${srcdir}/web/server
   rm -rf node_modules
   # npm -g --production --prefix="${pkgdir}/opt/RoPieee/web" install
   npm --verbose --production install
}

package() {
echo "package"

   install -d "${pkgdir}/opt/RoPieee/webpage"
   install -d "${pkgdir}/opt/RoPieee/webpage/views"
   install -d "${pkgdir}/opt/RoPieee/webpage/static"
   install -d "${pkgdir}/etc/systemd/system"

   cp -R "${srcdir}/web/server/node_modules"                       "${pkgdir}/opt/RoPieee/webpage"
   install -m0644 "${srcdir}/web/ropieee-web.service"              "${pkgdir}/etc/systemd/system"
   install -m0644 "${srcdir}/web/server/app.js"                    "${pkgdir}/opt/RoPieee/webpage/app.js"
   install -m0644 "${srcdir}/web/server/config.js"                 "${pkgdir}/opt/RoPieee/webpage/config.js"
   install -m0644 "${srcdir}/web/server/updater.js"                "${pkgdir}/opt/RoPieee/webpage/updater.js"
   install -m0644 "${srcdir}/web/server/helpers.js"                "${pkgdir}/opt/RoPieee/webpage/helpers.js"
   install -m0644 "${srcdir}/web/server/npm-shrinkwrap.json"       "${pkgdir}/opt/RoPieee/webpage/npm-shrinkwrap.json"
   install -m0644 "${srcdir}/web/server/package.json"              "${pkgdir}/opt/RoPieee/webpage/package.json"
   install -m0644 "${srcdir}/web/server/views/commit.pug"          "${pkgdir}/opt/RoPieee/webpage/views/commit.pug"
   install -m0644 "${srcdir}/web/server/views/advanced.pug"        "${pkgdir}/opt/RoPieee/webpage/views/advanced.pug"
   install -m0644 "${srcdir}/web/server/views/display.pug"         "${pkgdir}/opt/RoPieee/webpage/views/display.pug"
   install -m0644 "${srcdir}/web/server/views/head.pug"            "${pkgdir}/opt/RoPieee/webpage/views/head.pug"
   install -m0644 "${srcdir}/web/server/views/header.pug"          "${pkgdir}/opt/RoPieee/webpage/views/header.pug"
   install -m0644 "${srcdir}/web/server/views/general.pug"         "${pkgdir}/opt/RoPieee/webpage/views/general.pug"
   install -m0644 "${srcdir}/web/server/views/info.pug"            "${pkgdir}/opt/RoPieee/webpage/views/info.pug"
   install -m0644 "${srcdir}/web/server/views/summary.pug"         "${pkgdir}/opt/RoPieee/webpage/views/summary.pug"
   install -m0644 "${srcdir}/web/server/views/summary_network.pug" "${pkgdir}/opt/RoPieee/webpage/views/summary_network.pug"
   install -m0644 "${srcdir}/web/server/views/shutdown.pug"        "${pkgdir}/opt/RoPieee/webpage/views/shutdown.pug"
   install -m0644 "${srcdir}/web/server/views/reboot.pug"          "${pkgdir}/opt/RoPieee/webpage/views/reboot.pug"
   install -m0644 "${srcdir}/web/server/views/feedback.pug"        "${pkgdir}/opt/RoPieee/webpage/views/feedback.pug"
   install -m0644 "${srcdir}/web/server/views/feedback_sent.pug"   "${pkgdir}/opt/RoPieee/webpage/views/feedback_sent.pug"
   install -m0644 "${srcdir}/web/server/views/extension.pug"       "${pkgdir}/opt/RoPieee/webpage/views/extension.pug"
   install -m0644 "${srcdir}/web/server/views/update.pug"          "${pkgdir}/opt/RoPieee/webpage/views/update.pug"
   install -m0644 "${srcdir}/web/server/views/network.pug"         "${pkgdir}/opt/RoPieee/webpage/views/network.pug"
   install -m0644 "${srcdir}/web/server/views/footer.pug"          "${pkgdir}/opt/RoPieee/webpage/views/footer.pug"
   install -m0644 "${srcdir}/web/server/static/sticky-footer.css"  "${pkgdir}/opt/RoPieee/webpage/static/sticky-footer.css"
}
