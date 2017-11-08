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
import {addressDetail} from 'address/addressDetail';
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
        this.element.list = addressList.element.list;
        this.element.confirm = $('#contact-delete');
        this.element.closeButton = $('.contact-delete .popup__close');
        this.element.noButton = $('.contact-delete__no');
        this.element.yesButton = $('.contact-delete__yes');
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.closeButton.on('click', e => {
            this._closePopup();
        });

        this.element.noButton.on('click', (e) => {
            this._closePopup();
        });

        this.element.yesButton.on('click', (e) => {
            this._submit();
            this._closePopup();
        });
    }

    delete(id = null) {
        this.element.confirm.show();
        if (id !== null) {
            this.id = id;
            this.element.confirm.show();
        } else {
            console.error('😨 Nedal si mi ID-cko!');
        }
    }

    _closePopup() {
        this.element.list.removeClass('blur');
        this.element.confirm.hide();
    }

    _submit() {
        ajax.delete(API_URL + this.id)
            .then(
                (result) => this._submitSuccess()
            ).catch(function(error) {
                console.error('😨 Coškaj plane še stalo!');
            });
    }

    _submitSuccess() {
        this.element.confirm.hide();
        addressList.getList();
        addressDetail.resetLastId();
    }
}

export let addressDelete = new AddressDelete();
