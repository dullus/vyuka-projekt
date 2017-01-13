/**
 * My starting module
 * @module app
 * @requires module:address/addressShow
 */
import {addressList} from 'address/addressList';
import {addressDetail} from 'address/addressDetail';
import {addressEdit} from 'address/addressEdit';

/**
 * My starting class
 * @class
 */
class App {
    /**
     * Object initialisation
     */
    init() {
        addressList.init();
        addressDetail.init();
        addressEdit.init();
    }
}

var app = new App();
app.init();
