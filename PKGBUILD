# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-web
pkgver=20180519
pkgrel=1
arch=(any)
url="https://github.com/RoPieee/ropieee-web"
license=('MIT')
depends=('nodejs'
         'npm')
options=('!strip')
source=('ropieee-web-checkout::git://github.com/RoPieee/ropieee-web.git#branch=master')
md5sums=('SKIP')
install=${pkgname}.install



build() {
echo "build"
   cd ${srcdir}/ropieee-web-checkout/server
   rm -rf node_modules
   npm --verbose --production install
}

package() {
echo "package"

   install -d "${pkgdir}/opt/RoPieee/webpage"
   install -d "${pkgdir}/opt/RoPieee/webpage/views"
   install -d "${pkgdir}/opt/RoPieee/webpage/static"
   install -d "${pkgdir}/etc/systemd/system"

   cp -R "${srcdir}/ropieee_web_checkout/server/node_modules"                       "${pkgdir}/opt/RoPieee/webpage"
   install -m0644 "${srcdir}/ropieee_web_checkout/ropieee-web.service"              "${pkgdir}/etc/systemd/system"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/app.js"                    "${pkgdir}/opt/RoPieee/webpage/app.js"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/config.js"                 "${pkgdir}/opt/RoPieee/webpage/config.js"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/updater.js"                "${pkgdir}/opt/RoPieee/webpage/updater.js"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/helpers.js"                "${pkgdir}/opt/RoPieee/webpage/helpers.js"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/npm-shrinkwrap.json"       "${pkgdir}/opt/RoPieee/webpage/npm-shrinkwrap.json"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/package.json"              "${pkgdir}/opt/RoPieee/webpage/package.json"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/commit.pug"          "${pkgdir}/opt/RoPieee/webpage/views/commit.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/advanced.pug"        "${pkgdir}/opt/RoPieee/webpage/views/advanced.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/display.pug"         "${pkgdir}/opt/RoPieee/webpage/views/display.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/head.pug"            "${pkgdir}/opt/RoPieee/webpage/views/head.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/header.pug"          "${pkgdir}/opt/RoPieee/webpage/views/header.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/general.pug"         "${pkgdir}/opt/RoPieee/webpage/views/general.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/info.pug"            "${pkgdir}/opt/RoPieee/webpage/views/info.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/summary.pug"         "${pkgdir}/opt/RoPieee/webpage/views/summary.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/summary_network.pug" "${pkgdir}/opt/RoPieee/webpage/views/summary_network.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/shutdown.pug"        "${pkgdir}/opt/RoPieee/webpage/views/shutdown.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/reboot.pug"          "${pkgdir}/opt/RoPieee/webpage/views/reboot.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/feedback.pug"        "${pkgdir}/opt/RoPieee/webpage/views/feedback.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/feedback_sent.pug"   "${pkgdir}/opt/RoPieee/webpage/views/feedback_sent.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/extension.pug"       "${pkgdir}/opt/RoPieee/webpage/views/extension.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/update.pug"          "${pkgdir}/opt/RoPieee/webpage/views/update.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/network.pug"         "${pkgdir}/opt/RoPieee/webpage/views/network.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/footer.pug"          "${pkgdir}/opt/RoPieee/webpage/views/footer.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/views/down.pug"            "${pkgdir}/opt/RoPieee/webpage/views/down.pug"
   install -m0644 "${srcdir}/ropieee_web_checkout/server/static/sticky-footer.css"  "${pkgdir}/opt/RoPieee/webpage/static/sticky-footer.css"
}
