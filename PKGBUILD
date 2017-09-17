# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-web
pkgver=20170917
pkgrel=1
arch=(any)
url="https://github.com/RoPieee/ropieee-web"
license=('MIT')
depends=('nodejs'
         'npm')
install=${pkgname}.install



package() {
echo "package"

   install -d "${pkgdir}/opt/RoPieee/web"
   install -d "${pkgdir}/opt/RoPieee/web/views"
   install -d "${pkgdir}/etc/systemd/system"

   install -m0644 "../ropieee1-web.service"            "${pkgdir}/etc/systemd/system"
   install -m0644 "../server/app.js"                   "${pkgdir}/opt/RoPieee/web/app.js"
   install -m0644 "../server/config.js"                "${pkgdir}/opt/RoPieee/web/config.js"
   install -m0644 "../server/npm-shrinkwrap.json"      "${pkgdir}/opt/RoPieee/web/npm-shrinkwrap.json"
   install -m0644 "../server/package.json"             "${pkgdir}/opt/RoPieee/web/package.json"
   install -m0644 "../server/views/commit.pug"         "${pkgdir}/opt/RoPieee/web/views/commit.pug"
   install -m0644 "../server/views/advanced.pug"       "${pkgdir}/opt/RoPieee/web/views/advanced.pug"
   install -m0644 "../server/views/display.pug"        "${pkgdir}/opt/RoPieee/web/views/display.pug"
   install -m0644 "../server/views/head.pug"           "${pkgdir}/opt/RoPieee/web/views/head.pug"
   install -m0644 "../server/views/header.pug"         "${pkgdir}/opt/RoPieee/web/views/header.pug"
   install -m0644 "../server/views/general.pug"        "${pkgdir}/opt/RoPieee/web/views/general.pug"
   install -m0644 "../server/views/info.pug"           "${pkgdir}/opt/RoPieee/web/views/info.pug"
   install -m0644 "../server/views/summary.pug"        "${pkgdir}/opt/RoPieee/web/views/summary.pug"
   install -m0644 "../server/views/shutdown.pug"       "${pkgdir}/opt/RoPieee/web/views/shutdown.pug"
   install -m0644 "../server/views/reboot.pug"         "${pkgdir}/opt/RoPieee/web/views/reboot.pug"
   install -m0644 "../server/views/feedback.pug"       "${pkgdir}/opt/RoPieee/web/views/feedback.pug"
   install -m0644 "../server/views/feedback_sent.pug"  "${pkgdir}/opt/RoPieee/web/views/feedback_sent.pug"
   install -m0644 "../server/views/extension.pug"      "${pkgdir}/opt/RoPieee/web/views/extension.pug"
   install -m0644 "../server/views/update.pug"         "${pkgdir}/opt/RoPieee/web/views/update.pug"
   install -m0644 "../server/views/network.pug"        "${pkgdir}/opt/RoPieee/web/views/network.pug"
}
