const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { dependencies } = require("./package.json");

module.exports = {
    entry: "./src/entry",
    mode: "development",
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
            test: /\.(js|jsx|ts|tsx)?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
        new ModuleFederationPlugin({
            name: "HomeApp",
            remotes: {
                "MicroFrontendsApp": "MicroFrontendsApp@http://localhost:3001/remoteEntry.js",  
            },
            shared: {
                ...dependencies,
                react: {
                  singleton: true,
                  requiredVersion: dependencies["react"],
                },
                "react-dom": {
                  singleton: true,
                  requiredVersion: dependencies["react-dom"],
                },
            },
        }),
    ],
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
    },
    target: "web",
};