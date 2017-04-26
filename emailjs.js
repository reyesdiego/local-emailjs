/**
 * Created by diego on 06/03/17.
 */

'use strict';

class EmailJs {
    constructor (options) {
        const email = require("emailjs");
        var conf;

        this.from = options.from;
        this.status = options.status;
        this.throughBcc = options.throughBcc;

        conf = {
            from: options.from,
            user: options.user,
            password: options.password,
            host: options.host,
            port: options.port,
            domain: options.domain,
            ssl: options.ssl
        };

        this.server = email.server.connect(conf);
    }

    emailSimpleValidate (email) {
        var response = false,
            reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

        if (reg.test(email)) {
            response = true;
        }
        return response;
    }

    emailCaseSensitiveValidate (email) {
        var reg = /^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/,
            response = false;

        if (reg.test(email)) {
            response = true;
        }
        return response;
    }

    emailFreeValidate (email) {
        var reg = /^([\w-\.]+@(?!gmail.com)(?!yahoo.com)(?!hotmail.com)([\w-]+\.)+[\w-]{2,4})?$/,
            response = false;

        if (reg.test(email)) {
            response = true;
        }
        return response;
    }

    send (to, subject, text, attachment) {
        return new Promise((resolve, reject) => {
            var config = {
                    from: this.from,
                    subject: subject
                },
                tos = [];

            if (typeof text === 'object') {
                config.attachment = text;
                config.text = '';
            } else {
                config.text = text;
            }

            if (to === undefined) {
                return reject({status: "ERROR", code: "AGP-0001", data: "La cuenta de email destino es inválida"});
            } else if (typeof to === 'string') {
                to = to.trim();
                if (!this.emailSimpleValidate(to)) {
                    return reject({status: "ERROR", code: "AGP-0001", data: "La cuenta de email destino es inválida"});
                } else {
                    tos.push(to);
                }
            } else if (typeof to === 'object') {
                to.forEach(item => {
                    item = item.trim();
                    if (!this.emailSimpleValidate(item)) {
                        return reject({status: "ERROR", code: "AGP-0001", data: "La cuenta de email es inválida"});
                    }
                });
                tos = to;
            }

            if (this.status === true) {
                if (this.throughBcc) {
                    config.bcc = tos.join(',');
                } else {
                    config.to = tos.join(',');
                }
                this.server.send(config, (err, message) => {
                    if (err) {
                        reject({status: "ERROR", code: "AGP-0002", data: err.message});
                    } else {
                        resolve({status: "OK", data: message});
                    }
                });
            } else {
                reject({status: "ERROR", code: "AGP-0008", data: 'Envío de email deshabilitado en Config'});
            }
        });
    }

}

module.exports = function (options) {

    const seneca = this;

    seneca.add({role: "email", cmd: "send"}, (args, done) => {
        console.log("Seneca EmailJs - Role email - Cmd send - To %s", args.to);
        var email = new EmailJs(options);
        email.send(args.to, args.subject, args.text)
        .then(data => {
                done(null, data);
            })
        .catch(err => {
                done(null, err);
            });
    });
};
