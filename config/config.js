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

    if (process.env.IP === undefined || process.env.IP === '') {
        console.error("Variable de entorno IP no definida o inválida. El proceso se abortará");
        process.exit();
    }

    config.PORT = process.env.PORT;
    config.IP = process.env.IP;

    return config;
};