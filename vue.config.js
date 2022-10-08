const path = require('path');
const webpack = require("webpack");

module.exports = {
    "pluginOptions": {
        "electronBuilder": {
            "nodeIntegration": true,
            builderOptions: {
                win: {
                    icon: './icons/icon.ico'
                },
                mac:{
                    icon: './icons/icon.icns'
                },
                linux:{
                    icon: './icons'
                }
            }
        }
    },
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack:{
        devtool: 'inline-source-map',
        plugins:[
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ],
    }
}
