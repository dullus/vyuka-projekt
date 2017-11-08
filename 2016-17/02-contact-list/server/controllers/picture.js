let multer  = require('multer');
let utils = require('../utils/utils');

const targetDir = '../web/img/uploads';

/*
 * POST 'multipart/form-data' file upload
 *
 * URL routes:
 *
 *  POST   /api/picture => save()
 *
 * @example POST 'multipart/form-data' containig file to http://localhost:3000/api/picture/
 */
class PictureController {
    constructor() {
        let storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, `${__dirname}/${targetDir}`);
            },
            filename: (req, file, cb) => {
                cb(null, file.originalname);
            }
        });
        let upload = multer({storage: storage});

        this.upload = upload.any();
    }

    /**
     * Save handler
     *
     * @param {Object} req - request
     * @param {Object} res - response
     */
    save(req, res) {
        if (req.files.length) {
            utils.serverLog('/picture => save', {
                method: req.method,
                query: {},
                params: {},
                body: {[req.files[0].fieldname]: req.files[0].originalname}
            });
            res.send(req.files);
        } else {
            console.error('ERR: Missing file');
            res.status(400).send('{"error": "Missing file"}');
        }
    }
}

module.exports = new PictureController();
