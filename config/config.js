/**
 * Created by diego on 08/03/17.
 */
"use strict";

module.exports = () => {

    var config = require("./config.json");

    if (isNaN(process.env.PORT)) {
        console.error("Variable de entorno PORT no definida o inválida. El proceso se abortará");
        process.exit();
    }

    if (process.env.HOST === undefined || process.env.HOST === '') {
        console.error("Variable de entorno HOST no definida o inválida. El proceso se abortará");
        process.exit();
    }

    config.PORT = process.env.PORT;
    config.HOST = process.env.HOST;

    return config;
};