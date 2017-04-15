# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-be
pkgver=1
pkgrel=7
arch=(any)
url="http://www.kernel.org/"
license=('MIT')
depends=('nodejs'
         'npm')
install=${pkgname}.install



package() {
echo "package"

   install -d "${pkgdir}/opt/ropieee-be/server"
   install -d "${pkgdir}/opt/ropieee-be/server/views"
   install -d "${pkgdir}/etc/systemd/system"

   install -m0644 "../ropieee-be.service"         "${pkgdir}/etc/systemd/system"
   install -m0644 "../server/app.js"              "${pkgdir}/opt/ropieee-be/server/app.js"
   install -m0644 "../server/config.js"           "${pkgdir}/opt/ropieee-be/server/config.js"
   install -m0644 "../server/npm-shrinkwrap.json" "${pkgdir}/opt/ropieee-be/server/npm-shrinkwrap.json"
   install -m0644 "../server/package.json"        "${pkgdir}/opt/ropieee-be/server/package.json"
   install -m0644 "../server/views/commit.pug"    "${pkgdir}/opt/ropieee-be/server/views/commit.pug"
   install -m0644 "../server/views/home.pug"      "${pkgdir}/opt/ropieee-be/server/views/home.pug"
   install -m0644 "../server/views/summary.pug"   "${pkgdir}/opt/ropieee-be/server/views/summary.pug"
}




