/**
 * My starting module
 * @module app
 * @requires module:address/addressShow
 */
// import {addressShow} from 'address/addressShow';
import {addressList} from 'address/addressList';
import {addressEdit} from 'address/addressEdit';
// import {addressDelete} from 'address/addressDelete';

/**
 * My starting class
 * @class
 */
class App {
    /**
     * Object initialisation
     */
    init() {
        // addressShow.init();
        addressList.init();
        addressEdit.init();
        // addressDelete.init();
    }
}

var app = new App();
app.init();
