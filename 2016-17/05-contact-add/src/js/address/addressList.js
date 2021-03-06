/**
 * REST Demo - GET / list
 * @module AddressList
 * @requires module:common/ajax
 * @requires jquery
 */
import {ajax} from 'common/ajax';
import {addressDetail} from 'address/addressDetail';
import {addressEdit} from 'address/addressEdit';
import $ from 'jquery';

/** @constant {String} */
const API_URL = '/api/address/';
const IMG_URL = '/img/uploads/';
const ADDRESS_FIELDS = {
    id: {type: 'id', selector: ''},
    name: {type: 'name', selector: '.contact__name'},
    picture: {type: 'img', selector: '.contact__picture'},
    email: {type: 'txt', selector: '.contact__text-email a'},
    homeworld: {type: 'txt', selector: '.contact__text-homeworld span'},
    species: {type: 'txt', selector: '.contact__text-species span'},
    force: {type: 'force', selector: '.contact__force'}
};

/**
 * Shows address by searching ID
 * @class
 * @extends ViewEditForm
 */
class AddressList {
    constructor() {
        this.element = {};
    }

    /**
     * Object initialisation
     */
    init() {
        this.element.list = $('main');
        this.element.prototype = $('#prototype');
        this.element.addButton = $('.contact-list__add');
        this._initBindings();
        this.getList();
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.addButton.on('click', e => {
            this.element.list.addClass('blur');
            addressEdit.edit();
        });
    }

    /**
     * Event bindings
     * @private
     * @param {jQuery} element - element to bind event
     */
    _bindItem(element) {
        element.on('click', (e) => {
            addressDetail.draw(e.currentTarget.dataset['id']);
        });
    }

    /**
     * @private
     */
    getList() {
        ajax.get(API_URL)
            .then((result) => {
                this.drawList(result);
            })
            .catch(function(error) {
                console.error('😨 Coškaj plane še stalo!');
            });
    }

    drawList(result) {
        this.element.list.empty();
        result.forEach((address) => {
            let newElement = this._drawItem(address);
            this.element.list.append(newElement);
            this._bindItem(newElement);
        });
    }

    _drawItem(itemData) {
        let field;
        let itemElement;
        let newItem = this.element.prototype.clone();

        newItem.attr('id', '');

        for (field in ADDRESS_FIELDS) {
            if (ADDRESS_FIELDS[field] !== null) {
                itemElement = newItem.find(ADDRESS_FIELDS[field].selector);
                switch (ADDRESS_FIELDS[field].type) {
                    case 'id':
                        newItem.attr('data-id', itemData[field]);
                    case 'img':
                        itemElement.attr('src', `${IMG_URL}${itemData[field]}`);
                        break;
                    case 'force':
                        if (itemData['force'] === 'dark') {
                            itemElement.addClass('contact__force--dark');
                        }
                        itemElement.text(itemData[field]);
                        break;
                    case 'name':
                        let cache = itemElement.children();
                        itemElement.text(itemData[field]).append(cache);
                        break;
                    case 'txt':
                        itemElement.text(itemData[field]);
                        break;
                }
            }
        }

        return newItem;
    }
}

export let addressList = new AddressList();
