# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-be
pkgver=1
pkgrel=5
arch=(any)
url="http://www.kernel.org/"
license=('MIT')
depends=('nodejs'
         'npm')
install=${pkgname}.install



package() {
echo "package"

   install -d "${pkgdir}/opt/ropieee-be/server"
   install -d "${pkgdir}/etc/systemd/system"

   install -m0644 "../ropieee-be.service"         "${pkgdir}/etc/systemd/system"
   install -m0644 "../server/app.js"              "${pkgdir}/opt/ropieee-be/app.js"
   install -m0644 "../server/config.js"           "${pkgdir}/opt/ropieee-be/config.js"
   install -m0644 "../server/npm-shrinkwrap.json" "${pkgdir}/opt/ropieee-be/npm-shrinkwrap.json"
   install -m0644 "../server/package.json"        "${pkgdir}/opt/ropieee-be/package.json"
}

