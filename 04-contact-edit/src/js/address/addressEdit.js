/**
 * REST Demo - GET / show
 * @module AddressShow
 * @requires module:common/ViewEditForm
 * @requires module:common/FormItem
 * @requires module:common/formErrors
 * @requires module:common/ajax
 * @requires jquery
 */
import {ViewEditForm} from 'common/ViewEditForm';
import {FormItem} from 'common/FormItem';
import {formErrors} from 'common/formErrors';
import {ajax} from 'common/ajax';
import {addressList} from 'address/addressList';
import $ from 'jquery';

/** @constant {String} */
const SECTION_ID = 'section-address__edit';
/** @constant {String} */
const SECTION_SELECTOR = '#' + SECTION_ID;

const API_URL = '/api/address/';

class AddressEdit extends ViewEditForm {
    constructor() {
        super();
        this.element = {};
        this.updateMode = null;
        this.empty = {id: '', name: '', email: '', homeworld: '', species: ''};

        this.items = {
            id: new FormItem({
                groupId: SECTION_ID,
                name: 'id',
                required: true,
                trim: true,
                filterRegex: /[^0-9]/gi,
                validators: [
                    ['isInteger']
                ]
            }),
            name: new FormItem({
                groupId: SECTION_ID,
                name: 'name',
                required: false,
                trim: true,
                validators: [
                    ['isMin', 2, 'Please provide a valid name'],
                    ['isMax', 255, 'Please use 255 characters max']
                ]
            }),
            email: new FormItem({
                groupId: SECTION_ID,
                name: 'email',
                required: true,
                trim: true,
                validators: [
                    ['isMin', 1, 'Please complete email'],
                    ['isMax', 255],
                    ['isEmail', 'Please provide a valid email address']
                ]
            }),
            homeworld: new FormItem({
                groupId: SECTION_ID,
                name: 'homeworld',
                required: false,
                trim: true,
                validators: [
                    ['isMin', 2, 'Please provide a valid homeworld'],
                    ['isMax', 255, 'Please use 255 characters max']
                ]
            }),
            species: new FormItem({
                groupId: SECTION_ID,
                name: 'species',
                required: false,
                trim: true,
                validators: [
                    ['isMin', 2, 'Please provide a valid species'],
                    ['isMax', 255, 'Please use 255 characters max']
                ]
            }),
            info: new FormItem({
                groupId: SECTION_ID,
                name: 'info',
                required: false,
                trim: true,
                validators: [
                    ['isMin', 2, 'Please provide a valid info'],
                    ['isMax', 255, 'Please use 255 characters max']
                ]
            })
        };
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
        this.element.form = $(SECTION_SELECTOR);
        this.element.popup = $('#section-address__popup');
        this.element.cancelButton = $('#section-address__edit-cancel');
        this.element.submitButton = $('#section-address__edit-submit');
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.submitButton.on('click', (e) => {
            let errors = this._runValidators(SECTION_ID);
            this._hideErrors();
            if (errors.length) {
                formErrors.showErrors(errors, SECTION_SELECTOR, undefined, true);
            } else {
                formErrors.hideErrors(SECTION_SELECTOR, undefined, true);
                this._submit();
            }
        });

        this.element.cancelButton.on('click', (e) => {
            this.element.popup.hide();
        });
    }

    edit(id = null) {
        this._hideErrors();
        this.element.popup.show();
        if (id !== null) {
            this.mode = 'patch';
            ajax.get(API_URL + id).then((result) => this._updateValues(result));
        } else {
            this.mode = 'post';
            this._updateValues(this.empty);
        }
    }

    _updateValues(data) {
        for (var prop in data) {
            $(SECTION_SELECTOR + ' [name="' + prop + '"]').val(data[prop]);
        }
    }

    _submit() {
        let data = this.element.form.serializeArray();
        console.log('submitted = ' + JSON.stringify(data));

        switch (this.mode) {
            case 'post':
                ajax.post(API_URL, data)
                    .then(
                        (result) => this._submitSuccess()
                    ).catch(function(error) {
                        console.log('NotWritten');
                    });
                break;
            case 'patch':
                ajax.patch(API_URL + this._getValByKey(data, 'id'), data)
                    .then(
                        (result) => this._submitSuccess()
                    ).catch(function(error) {
                        console.log('NotWritten');
                    });
                break;
        }
    }

    _submitSuccess() {
        this.element.popup.hide();
        addressList.submit();
    }

    /**
     * Hide errors
     * @private
     */
    _hideErrors() {
        formErrors.hideErrors(SECTION_SELECTOR);
    }

    _getValByKey(arr, key) {
        return arr.find(function(item) {
            return item.name === key;
        })['value'];
    }
}

export let addressEdit = new AddressEdit();