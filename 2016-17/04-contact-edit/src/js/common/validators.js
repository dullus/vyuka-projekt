/**
 * Validators for html form items
 * @module common/validators
 * @instance
 */

/**
 * Validators for html form items
 * @class
 * @memberof module:common/validators
 */
class Validators {

    /**
     * Minimal string length
     * @param {String} value - string to check
     * @param {Integer} len - min length
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isMin(value, len, errorMsg) {
        if (value && this.isInteger(len) === true) {
            if (value.length >= len) {
                return true;
            }
        }
        len = len || '{min length}';
        return errorMsg || 'Minimal length is ' + len + ' characters.';
    }

    /**
     * Maximal string length
     * @param {String} value - string to check
     * @param {Integer} len - max length
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isMax(value, len, errorMsg) {
        if (value && this.isInteger(len) === true) {
            if (value.length <= len) {
                return true;
            }
        }
        len = len || '{max length}';
        return errorMsg || 'Please use ' + len + ' characters max.';
    };

    /**
     * String length in interval
     * @param {String} value - string to check
     * @param {Integer} min - min length
     * @param {Integer} max - max length
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isMinMax(value, min, max, errorMsg) {
        if (value && this.isInteger(min) === true && this.isInteger(max) === true) {
            if ((value.length >= min) && (value.length <= max)) {
                return true;
            }
        }
        min = min || '{min length}';
        max = max || '{max length}';
        return errorMsg || 'Password must contain ' + min + '-' + max + ' characters.';
    }

    /**
     * Email validity checks
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isEmail(value, errorMsg) {
        if (!value) {
            return errorMsg || 'We need a contact email address';
        } else if (value.indexOf('@') < 0) {
            return errorMsg || 'Please include an @ in your email address.';
        } else if (value.charAt(0) === '@') {
            return errorMsg || 'Please enter the part of your email that precedes the @.';
        } else if (value.charAt(value.length - 1) === '@') {
            return errorMsg || 'Please enter the part of your email that follows the @.';
        } else if (!this._validateEmail(value)) {
            return errorMsg || 'Please enter a correctly formatted email address.';
        }

        return true;
    }

    /**
     * Email regex validator
     * @private
     * @param {String} email - email string
     * @return {Boolean}
     */
    _validateEmail(email) {
        /* eslint-disable */
        var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
        /* eslint-enable */
        return pattern.test(email);
    }

    /**
     * Check if selectbox has option selected
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isSelected(value, errorMsg) {
        if (value !== '') {
            return true;
        }
        return errorMsg || 'Select one of items.';
    }

    /**
     * Strict string compare
     * @param {String} value - string to check
     * @param {String} compare - value to compare
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isSameAs(value, compare, errorMsg) {
        if (value === compare) {
            return true;
        }
        return errorMsg || 'Passwords don\'t match.';
    }

    /**
     * String contains uppercase character
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    hasUpperCase(value, errorMsg) {
        if (typeof value === 'string') {
            if (value.match(/[A-Z]/) !== null) {
                return true;
            }
        }
        return errorMsg || 'Password must contain an uppercase letter.';
    }

    /**
     * String contains lowercase character
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    hasLowerCase(value, errorMsg) {
        if (typeof value === 'string') {
            if (value.match(/[a-z]/) !== null) {
                return true;
            }
        }
        return errorMsg || 'Password must contain a lowercase letter.';
    }

    /**
     * String contains digit character
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    hasNumber(value, errorMsg) {
        if (typeof value === 'string') {
            if (value.match(/\d+/) !== null) {
                return true;
            }
        }
        return errorMsg || 'Password must contain a number.';
    };

    /**
     * Is string valid phone number
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isPhone(value, errorMsg) {
        if (typeof value === 'string') {
            /* eslint-disable */
            var parsed = value.match(/^((\+44\s?7\d{3}|\(?07\d{3}\)?)\s?\d{3}\s?\d{3})|(((\(?0\d{4}\)?\s?\d{3}\s?\d{3})|(\(?0\d{3}\)?\s?\d{3}\s?\d{4})|(\(?0\d{2}\)?\s?\d{4}\s?\d{4}))(\s?\#(\d{4}|\d{3}))?)$/);
            /* eslint-enable */
            if (parsed !== null && parsed[0] === value) {
                return true;
            }
        }
        return errorMsg || 'Please provide a valid phone number.';
    }

    /**
     * Is string number
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isNumber(value, errorMsg) {
        if (value && (typeof value === 'string' || typeof value === 'number')) {
            if (isNaN(value) === false) {
                return true;
            }
        }
        return errorMsg || 'Please provide numeric value.';
    }

    /**
     * Is string integer
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isInteger(value, errorMsg) {
        if (this.isNumber(value)) {
            var x = parseFloat(value);
            if ((x | 0) === x) {
                return true;
            }
        }
        return errorMsg || 'Please provide integer value.';
    }

    /**
     * Is number from interval
     * @param {String} value - string to check
     * @param {Number} min - min value
     * @param {Number} max - max value
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isInterval(value, min, max, errorMsg) {
        if (this.isNumber(value)) {
            var x = parseFloat(value, 10);
            if (x >= min && x <= max) {
                return true;
            }
        }
        min = min || 'min value';
        max = max || 'max value';
        return errorMsg || 'Please provide value within (' + min + ', ' + max + ') interval.';
    }

    /**
     * Checks day number validity
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isDay(value, errorMsg) {
        if (this.isInteger(value) === true && this.isInterval(value, 1, 31) === true) {
            return true;
        }
        return errorMsg || 'Please provide valid day number.';
    }

    /**
     * Checks month number validity
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isMonth(value, errorMsg) {
        if (this.isInteger(value) === true && this.isInterval(value, 1, 12) === true) {
            return true;
        }
        return errorMsg || 'Please provide valid month number.';
    }

    /**
     * Checks year interval
     * @param {String} value - string to check
     * @param {Integer} min - min value
     * @param {Integer} max - max value
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isYear(value, min, max, errorMsg) {
        if (this.isInteger(value) === true && this.isInterval(value, min, max) === true) {
            return true;
        }
        return errorMsg || 'Please provide valid year number.';
    }

    /**
     * United Kingdom postcode validity
     * @param {String} value - string to check
     * @param {String} [errorMsg] - custom error text
     * @return {(Boolean|String)} - error _{String}_ on failure, **true** on success
     */
    isPostcode(value, errorMsg) {
        // var pattern = new RegExp(/^([A-Z][A-Z0-9]{0,3}\s?[0-9][A-Z0-9]{2})$/i);
        var pattern = new RegExp(/^[a-z\d\s]+$/i);
        if (typeof value === 'string') {
            if (pattern.test(value.toUpperCase())) {
                return true;
            }
        }
        return errorMsg || 'Please provide a valid postcode.';
    }
}

export let validators = new Validators();
