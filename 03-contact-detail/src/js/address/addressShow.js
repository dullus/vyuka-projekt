/**
 * REST Demo - GET / show
 * @module AddressShow
 * @requires module:common/ajax
 * @requires jquery
 */
// import {FormItem} from 'common/formaters';
import {ajax} from 'common/ajax';
import $ from 'jquery';

const API_URL = '/api/address/';
const IMG_URL = '/img/uploads/';

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
        this.element.closeButton = $('.contact-detail__button--close');
        this.element.editButton = $('.contact-detail__button--edit');
        this.element.detail = $('#contact-detail');
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.closeButton.on('click', e => {
            this.element.detail.hide();
        });

        this.element.editButton.on('click', e => {
            console.log('😎 Veckaj ňebavi, zajtra dorobime..');
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
        }
    }

    _updateValues(data) {
        for (var prop in data) {
            if (prop === 'picture') {
                $(`${this.element.detail} [data-prop="${prop}"]`).attr('src', `${IMG_URL}${data[prop]}`);
            } else {
                $(`${this.element.detail} [data-prop="${prop}"]`).text(data[prop]);
            }
        }
    }

}

export let addressDetail = new AddressDetail();
