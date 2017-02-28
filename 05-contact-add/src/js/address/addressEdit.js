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
import {addressDetail} from 'address/addressDetail';
import $ from 'jquery';

/** @constant {String} */
const SECTION_ID = 'contact-edit__form';
/** @constant {String} */
const SECTION_SELECTOR = '#' + SECTION_ID;

const API_URL = '/api/address/';
const API_PICTURE_URL = '/api/picture/';
const PLACEHOLDER_PICTURE = 'placeholder.jpg';

class AddressEdit extends ViewEditForm {
    constructor() {
        super();
        this.element = {};
        this.updateMode = null;
        this.empty = {id: '', name: '', email: '', homeworld: '', species: '', info: '', picture: PLACEHOLDER_PICTURE};

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
                required: true,
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
                    ['isMax', 1024, 'Please use 1024 characters max']
                ]
            }),
            picture: new FormItem({
                groupId: SECTION_ID,
                name: 'picture',
                required: false
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
        this.element.list = $('main');
        this.element.form = $(SECTION_SELECTOR);
        this.element.popup = $('#contact-edit');
        this.element.cancelButton = $('.contact-edit .popup__close');
        this.element.submitButton = $('.contact-edit__submit');
        this.element.fileUpload = this.element.form.find('input[type="file"]')[0];
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
            this.element.list.removeClass('blur');
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
        let pictureFile = this.element.fileUpload.files[0];
        if (pictureFile) {
            data.find(item => {
                return item.name === 'picture';
            }).value = pictureFile.name;
        }

        console.log('submitted = ' + JSON.stringify(data));

        switch (this.mode) {
            case 'post':
                ajax.post(API_URL, data)
                    .then(result => this._submitSuccess(pictureFile))
                    .catch(error => console.log('NotWritten'));
                break;
            case 'patch':
                ajax.patch(API_URL + this._getValByKey(data, 'id'), data)
                    .then(result => this._submitSuccess(pictureFile))
                    .catch(error => console.log('NotWritten'));
                break;
        }
    }

    _submitPicture(pictureFile) {
        ajax.upload(API_PICTURE_URL, pictureFile)
            .then(result => console.log('File saved'))
            .catch(error => console.log('File not saved'));
    }

    _submitSuccess(pictureFile) {
        if (pictureFile) {
            this._submitPicture(pictureFile);
        }
        addressList.getList();
        addressDetail.resetLastId();
        this.element.popup.hide();
        this.element.list.removeClass('blur');
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
