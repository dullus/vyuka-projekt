let jsonfile = require('jsonfile');
let utils = require('../utils/utils');

// const file = 'server/fixtures/rest/address.json';
 const file = 'server/fixtures/rest/sw.json';

/**
 * Auto generate RESTful url routes.
 *
 * URL routes:
 *
 *  GET    /address[/]        => address.list()
 *  GET    /address/:id       => address.show()
 *  GET    /address/:id/edit  => address.edit() (UNIMPLEMENTED)
 *  POST   /address[/]        => address.create()
 *  PATCH  /address/:id       => address.update()
 *  DELETE /address/:id       => address.destroy()
 *
 * @param {Object} req - request
 * @param {Object} res - response
 * @param {Function} next - next error function
 *
 * @example http://localhost:3000/api/address/
 * @example http://localhost:3000/api/address/1000
 */
class AddressController {
    constructor() {
        jsonfile.spaces = 4;
    }

    list(req, res, next) {
        utils.serverLog('/address => list', req);
        jsonfile.readFile(file, (err, obj) => {
            if (!err) {
                res.end(JSON.stringify(obj['address']));
            } else {
                next();
            }
        });
    }

    show(req, res, next) {
        utils.serverLog('/address/:id => show', req);
        jsonfile.readFile(file, (err, obj) => {
            if (!err) {
                let out = JSON.stringify(utils.existsId(obj['address'], 'id', req.params.id));
                if (typeof out !== 'undefined') {
                    res.end(out);
                } else {
                    next();
                }
            } else {
                console.error(err);
                next();
            }
        });
    }

    edit(req, res, next) {
        utils.serverLog('/address/:id/edit => edit', req);
        res.end('uninmplemented');
    }

    create(req, res, next) {
        utils.serverLog('/address => create', req);
        jsonfile.readFile(file, (err, obj) => {
            if (!err) {
                obj['address'].push(req.body);
                jsonfile.writeFile(file, obj, err => {
                    console.error(err);
                    return;
                });
            }
        });
        res.end('{"result":"ok"}');
    }

    update(req, res, next) {
        utils.serverLog('/address/:id => update', req);
        jsonfile.readFile(file, (err, obj) => {
            if (!err) {
                let index = utils.findBy(obj['address'], 'id', req.params.id);
                utils.update(obj['address'][index], req.body);
                jsonfile.writeFile(file, obj, err => {
                    console.error(err);
                    return;
                });
            }
        });
        res.end('{"result":"ok"}');
    }

    destroy(req, res, next) {
        utils.serverLog('/address/:id => destroy', req);
        jsonfile.readFile(file, (err, obj) => {
            if (!err) {
                utils.removeBy(obj['address'], 'id', req.params.id);
                jsonfile.writeFile(file, obj, err => {
                    console.error(err);
                    return;
                });
            }
        });
        res.end('{"result":"ok"}');
    }
}

module.exports = new AddressController();
