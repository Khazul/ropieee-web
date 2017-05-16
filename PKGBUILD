# Maintainer: Harry ten Berge <htenberge@gmail.com>

pkgname=ropieee-web
pkgver=7
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

   install -m0644 "../ropieee1-web.service"       "${pkgdir}/etc/systemd/system"
   install -m0644 "../server/app.js"              "${pkgdir}/opt/RoPieee/web/app.js"
   install -m0644 "../server/config.js"           "${pkgdir}/opt/RoPieee/web/config.js"
   install -m0644 "../server/npm-shrinkwrap.json" "${pkgdir}/opt/RoPieee/web/npm-shrinkwrap.json"
   install -m0644 "../server/package.json"        "${pkgdir}/opt/RoPieee/web/package.json"
   install -m0644 "../server/views/commit.pug"    "${pkgdir}/opt/RoPieee/web/views/commit.pug"
   install -m0644 "../server/views/home.pug"      "${pkgdir}/opt/RoPieee/web/views/home.pug"
   install -m0644 "../server/views/summary.pug"   "${pkgdir}/opt/RoPieee/web/views/summary.pug"
   install -m0644 "../server/views/shutdown.pug"  "${pkgdir}/opt/RoPieee/web/views/shutdown.pug"
}
