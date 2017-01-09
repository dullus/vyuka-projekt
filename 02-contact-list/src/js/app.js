/**
 * My starting module
 * @module app
 * @requires module:address/addressShow
 */
// import {addressList} from 'address/addressList';
import {addressListFinal} from 'address/addressListFinal';

/**
 * My starting class
 * @class
 */
class App {
    /**
     * Object initialisation
     */
    init() {
        // addressList.init();
        addressListFinal.init();
    }
}

var app = new App();
app.init();
