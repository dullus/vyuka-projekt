/**
 * My starting module
 * @module app
 * @requires module:address/addressList
 * @requires module:address/addressShow
 */
import {addressList} from 'address/addressList';
import {addressShow} from 'address/addressShow';

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
        addressShow.init();
    }
}

var app = new App();
app.init();
