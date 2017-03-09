/**
 * Created by diego on 02/03/17.
 */

"use strict";

const config = require("./config/config.js")();

const seneca = require("seneca")();

seneca.use("./emailjs.js", config.email);
seneca.listen(config.PORT, config.HOST, (err, data) => {
    console.info('Micro Service EmailJs');
    console.info(` HOST: ${data.host} \n PORT: ${data.port}`);
});