# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-be
pkgver=1
pkgrel=1
arch=(any)
url="http://www.kernel.org/"
license=('MIT')
depends=('nodejs')
install=${pkgname}.install



package() {
echo "package"

   install -d "${pkgdir}/opt/ropieee-be/server"

   install -m0644 "../ropieee-be.service"                    "${pkgdir}/etc/systemd/system"
   install -m0644 "../server/app.js"                       "${pkgdir}/opt/ropieee-be/app.js"
   install -m0644 "../server/config.js"                       "${pkgdir}/opt/ropieee-be/config.js"
   install -m0644 "../server/node_modules"                       "${pkgdir}/opt/ropieee-be/node_modules"




#   install -m0755 "../RoPieee/bootstrap"                            "${pkgdir}/opt/ropieee-be"
#   install -m0755 "../RoPieee/SETUP"                                "${pkgdir}/opt/ropieee-be"
}

