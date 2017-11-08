/**
 * REST Demo - GET / show
 * @module AddressShow
 * @requires module:common/ViewEditForm
 * @requires module:common/FormItem
 * @requires module:common/formErrors
 * @requires module:common/ajax
 * @requires jquery
 */
import {ajax} from 'common/ajax';
import {addressList} from 'address/addressList';
import $ from 'jquery';

const API_URL = '/api/address/';

class AddressDelete {
    constructor() {
        this.element = {};
        this.id = null;
    }

    /**
     * Object initialisation
     */
    init() {
        this._initElements();
        this._initBindings();
    }

    /**
     * Cache all needed jquery elements
     * @private
     */
    _initElements() {
        this.element.confirm = $('#section-address__confirm');
        this.element.cancelButton = $('#section-address__delete-cancel');
        this.element.submitButton = $('#section-address__delete-submit');
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.submitButton.on('click', (e) => {
            this._submit();
        });

        this.element.cancelButton.on('click', (e) => {
            this.element.confirm.hide();
        });
    }

    delete(id = null) {
        this.element.confirm.show();
        if (id !== null) {
            this.id = id;
            this.element.confirm.show();
        } else {
            console.log('NoID');
        }
    }

    _submit() {
        ajax.delete(API_URL + this.id)
            .then(
                (result) => this._submitSuccess()
            ).catch(function(error) {
                console.log('NotDeleted');
            });
    }

    _submitSuccess() {
        this.element.confirm.hide();
        addressList.submit();
    }
}

export let addressDelete = new AddressDelete();
