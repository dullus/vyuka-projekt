/**
 * Prototype for form items
 * @module common/FormItem
 * @requires common/validators
 * @requires common/formaters
 * @requires jquery
 */
import {validators} from 'common/validators';
import {formaters} from 'common/formaters';
import $ from 'jquery';

/**
 * Prototype for form items
 * @class
 *
 * @param {Object} config - configuration object
 *   @param {String} [config.groupId]- selector for section
 *   @param {String} [config.name] - html element name attribute
 *   @param {Array} [config.validators] - array of validators
 *   @param {Array} [config.formater] - array with formater
 *   @param {jQuery} [config.element] - element object
 *   @param {String} [config.filterRegex] - regex for input filtering
 *   @param {Boolean} [config.required] - flag if required
 *   @param {Boolean} [config.trim] - flag if trimable
 *
 * @property {String} groupId - selector for section
 * @property {String} name - html element name attribute
 * @property {Array} validators - array of validators
 * @property {Array} formater - array with formater
 * @property {jQuery} element - element object
 * @property {String} filterRegex - regex for input filtering
 * @property {Boolean} required - flag if required
 * @property {Boolean} trim - flag if trimable
 *
 * @example
 *  var item = new FormItem({
 *      groupId: '#section-address',
 *      name: 'postcode',
 *      required: true
 *  });
 */
class FormItem {

    constructor(config) {
        this.groupId = config.groupId || null;
        this.name = config.name || null;
        this.validators = config.validators || [];
        this.formater = config.formater || null;
        this.element = config.element || null;
        this.filterRegex = config.filterRegex || null;
        this.required = (typeof config.required !== 'undefined') ? config.required : true;
        this.trim = (typeof config.trim !== 'undefined') ? config.trim : false;

        // automatic element selector assignement
        if (this.element === null && this.groupId !== null && this.name !== null) {
            this.element = $('#' + this.groupId + ' [name=' + this.name + ']');
            if (typeof this.element[0] === 'undefined') {
                this.element = null;
            }
        }

        this.setOldValue();
        this._initInputBindings();
    }

    /**
     * Bind listeners upon FormItem element input change
     * @private
     */
    _initInputBindings() {
        if (this.element !== null) {
            if (this.filterRegex !== null) {
                this.element.on('input keyup', e => {
                    let value = e.target.value;
                    let filteredValue = value.replace(this.filterRegex, '');
                    if (value !== filteredValue) {
                        e.target.value = filteredValue;
                    }
                });
            }
        }
    }

    /**
     * Value getter for html item
     * @return {(null|String)} **null** when element is nonexistent else _{String}_ value
     */
    getValue() {
        if (this.element === null) {
            return null;
        }
        if (this.element.is(':checkbox')) {
            return this.element.is(':checked');
        }
        return this.element.val();
    }

    /**
     * Old value getter for html item
     * @return {String}
     */
    getOldValue() {
        return this._oldValue;
    }

    /**
     * Value setter for html item
     * @param {Mixed} value - value to set
     */
    setValue(value) {
        if (this.element === null) {
            return;
        }
        if (this.element.is(':checkbox')) {
            if (value && value !== 'false') {
                this.element.prop('checked', true);
            } else {
                this.element.prop('checked', false);
            }
        } else {
            this.element.val(value);
        }
        this.element.trigger('set-value');
    }

    /**
     * Setter for old value, copies current value.
     */
    setOldValue() {
        this._oldValue = this.getValue();
    }

    /**
     * Setter for value, copies from old value.
     */
    restoreOldValue() {
        this.setValue(this._oldValue);
    }

    /**
     * Run all validators for item
     * @param {Boolean} [required] - if given then replaces **this.required** value
     * @return {(Boolean|String)} boolean **true** on success, _{String}_ with error on failure
     */
    validate(required) {
        var validator;
        var args;
        var out = true;
        var value = this.getValue();
        var mandatory = (typeof required === 'undefined') ? this._isRequired() : required;

        if (this.trim) {
            value = value.trim();
            this.setValue(value);
        }

        // quit if empty and not required
        if (value === '' || typeof value === 'boolean') {
            if (mandatory === false) {
                return out;
            }
        }

        for (let i = 0; i < this.validators.length; i++) {
            validator = this.validators[i];
            args = validator.slice(1);
            args.unshift(value);
            // check if evaluation of args is needed
            for (let j = 0; j <= args.length; j++) {
                if (typeof args[j] === 'function') {
                    args[j] = args[j].call();
                }
            }
            out = validators[validator[0]].apply(validators, args);

            if (out !== true) {
                break;
            }
        }

        return out;
    }

    /**
     * Checks if item is required
     * @private
     * @return {Boolean}
     */
    _isRequired() {
        var out;

        if (typeof this.required === 'function') {
            out = this.required.call();
        } else {
            out = this.required;
        }

        return out;
    }

    /**
     * Value getter form html item with formating
     * @return {String} formatted value of item
     */
    getFormatedValue() {
        var args;
        var formater;
        var value = this.getValue();

        if (Array.isArray(this.formater)) {
            formater = this.formater[0];
            args = this.formater.slice(1);
            args.unshift(value);

            return formaters[formater].apply(formaters, args);
        }

        // original value if formater definition in item is missing
        return value;
    }

    /**
     * Check if item value has changed
     * @return {Boolean}
     */
    isChanged() {
        return (this._oldValue !== this.getValue());
    }

}

export {FormItem};
