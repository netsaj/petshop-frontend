const webpack = require("webpack");

module.exports = {
    "pluginOptions": {
        "electronBuilder": {
            "nodeIntegration": true
        }
    },
    "transpileDependencies": [
        "vuetify"
    ],
    configureWebpack:{
        plugins:[
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery"
            })
        ]
    }
}
