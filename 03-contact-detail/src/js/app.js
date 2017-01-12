/**
 * My starting module
 * @module app
 * @requires module:address/addressList
 * @requires module:address/addressShow
 */
import {addressList} from 'address/addressList';
import {addressDetail} from 'address/addressDetail';

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
    }
}

var app = new App();
app.init();
