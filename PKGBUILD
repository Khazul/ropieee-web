# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-web
pkgver=2
pkgrel=2
arch=(any)
url="http://www.kernel.org/"
license=('MIT')
depends=('nodejs'
         'npm')
install=${pkgname}.install



package() {
echo "package"

   install -d "${pkgdir}/opt/ropieee-web/server"
   install -d "${pkgdir}/opt/ropieee-web/server/views"
   install -d "${pkgdir}/etc/systemd/system"

   install -m0644 "../ropieee-web.service"        "${pkgdir}/etc/systemd/system"
   install -m0644 "../server/app.js"              "${pkgdir}/opt/ropieee-web/server/app.js"
   install -m0644 "../server/config.js"           "${pkgdir}/opt/ropieee-web/server/config.js"
   install -m0644 "../server/npm-shrinkwrap.json" "${pkgdir}/opt/ropieee-web/server/npm-shrinkwrap.json"
   install -m0644 "../server/package.json"        "${pkgdir}/opt/ropieee-web/server/package.json"
   install -m0644 "../server/views/commit.pug"    "${pkgdir}/opt/ropieee-web/server/views/commit.pug"
   install -m0644 "../server/views/home.pug"      "${pkgdir}/opt/ropieee-web/server/views/home.pug"
   install -m0644 "../server/views/summary.pug"   "${pkgdir}/opt/ropieee-web/server/views/summary.pug"
}
