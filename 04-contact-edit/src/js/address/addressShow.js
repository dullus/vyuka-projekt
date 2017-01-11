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
import $ from 'jquery';

/** @constant {String} */
const SECTION_ID = 'section-address__show';
/** @constant {String} */
const SECTION_SELECTOR = '#' + SECTION_ID;

const API_URL = '/api/address/';

/**
 * Shows address by searching ID
 * @class
 * @extends ViewEditForm
 */
class AddressShow extends ViewEditForm {
    constructor() {
        super();
        this.element = {};
        this.items = {
            id: new FormItem({
                groupId: SECTION_ID,
                name: 'id',
                required: true,
                trim: true,
                validators: [
                    ['isInteger']
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
        this.element.submitButton = $('#section-address__show-submit');
        this.element.result = $('#section-address__show-result');
    }

    /**
     * Event bindings
     * @private
     */
    _initBindings() {
        this.element.submitButton.on('click', e => {
            let errors = this._runValidators(SECTION_ID);
            this._hideErrors();
            if (errors.length) {
                formErrors.showErrors(errors, SECTION_SELECTOR, undefined, true);
            } else {
                formErrors.hideErrors(SECTION_SELECTOR, undefined, true);
                this._submit();
            }
        });
    }

    /**
     * @private
     */
    _submit() {
        let data = this.element.form.serializeArray();
        console.log('submitted = ' + JSON.stringify(data));
        ajax.get(API_URL + data[0].value)
            .then(
                (result) => this.drawGetResult(result)
            ).catch(function(error) {
                console.log('NotFound');
            });
    }

    drawGetResult(result) {
        this.element.result.show();
        for (var prop in result) {
            $('.link-box_address [data-item="' + prop + '"] span').text(result[prop]);
        }
    }

    /**
     * Hide errors
     * @private
     */
    _hideErrors() {
        formErrors.hideErrors(SECTION_SELECTOR);
    }
}

export let addressShow = new AddressShow();
