/**
 * REST Demo - GET / show
 * @module AddressShow
 * @requires module:common/ajax
 * @requires jquery
 */
// import {FormItem} from 'common/formaters';
import {addressEdit} from 'address/addressEdit';
import {ajax} from 'common/ajax';
import $ from 'jquery';

const API_URL = '/api/address/';
const IMG_URL = '/img/uploads/';
const CONTACT_ITEMS = ['id', 'picture', 'name', 'email', 'homeworld', 'species', 'info'];
/**
 * Shows address by searching ID
 * @class
 * @extends ViewEditForm
 */
class AddressDetail  {
    constructor() {
        this.element = {};
        this._lastId = null;
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
        this.element.list = $('main');
        this.element.closeButton = $('.contact-detail .popup__close');
        this.element.editButton = $('.contact-detail__edit');
        this.element.detail = $('#contact-detail');
        CONTACT_ITEMS.map((item) => {
            let elementItem = this.element.detail.find(`[data-prop="${item}"]`);
            this.element[item] = elementItem.length ? elementItem : null;
        });
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.closeButton.on('click', e => {
            this.element.list.removeClass('blur');
            this.element.detail.hide();
        });

        this.element.editButton.on('click', e => {
            this.element.detail.hide();
            addressEdit.edit(this._lastId);
        });
    }

    draw(id) {
        if (id !== null) {
            if (id !== this._lastId) {
                ajax.get(API_URL + id)
                    .then((result) => {
                        this._updateValues(result);
                        this._lastId = id;
                    })
                    .catch((error) => {
                        console.error('😨 Coškaj plane še stalo!');
                        return;
                    });
            }
            this.element.detail.show();
            this.element.list.addClass('blur');
        }
    }

    _updateValues(data) {
        for (let prop in data) {
            if (this.element[prop]) {
                if (prop === 'picture') {
                    this.element[prop].attr('src', `${IMG_URL}${data[prop]}`);
                } else {
                    this.element[prop].text(data[prop]);
                }
            }
        }
    }

}

export let addressDetail = new AddressDetail();
