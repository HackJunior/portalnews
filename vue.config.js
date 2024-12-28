const { defineConfig } = require('@vue/cli-service')
const PrerenderSPAPlugin = require('prerender-spa-plugin');
const path = require('path');


module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: '/',
  /*configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: [
          '/', // Página principal
          '/noticias', // Ruta de listado de noticias
          '/noticias/noticia-slug' // Ejemplo de una noticia individual
        ],
        renderer: new PrerenderSPAPlugin.PuppeteerRenderer({
          renderAfterDocumentEvent: 'render-event', 
        }),
      }),
    ],
  },*/
};