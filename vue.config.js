module.exports = {
    devServer: {
        disableHostCheck: true
    },
    pwa: {
        name: 'Rota de fuga',
        themeColor: '#4DBA87',
        msTileColor: '#000000',
        start_url: '/',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black',
    
        // configure the workbox plugin
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
          // swSrc is required in InjectManifest mode.
          swSrc: 'dev/sw.js',
          // ...other Workbox options...
        }
    }
};