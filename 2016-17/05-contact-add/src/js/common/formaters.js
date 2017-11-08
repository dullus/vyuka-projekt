/**
 * Formaters for html views
 * @module common/formaters
 * @instance
 */

 /**
  * Formaters for html views
  * @class
  * @memberof module:common/formaters
  */
class Formaters {

    /**
     * Convert month number to short month name
     * @param {Integer} value - month number to convert
     * @return {String} - short month name
     */
    MMM(value) {
        let idx = parseInt(value, 10);
        if (isNaN(idx)) {
            return '';
        }
        if (idx > 12 || idx < 1) {
            return '';
        }
        let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return month[idx - 1];
    }

    /**
     * Convert checkbox on/off state to text
     * @param {Integer} value - checkbox value
     * @param {String} [onText='on'] - text value of on
     * @param {String} [offText='off'] - text value of off
     * @return {String} - text for on or off value
     */
    checkBoxToText(value, onText = 'on', offText = 'off') {
        // undefined, null, false, '' are off
        if (!value) {
            return offText;
        }
        return onText;
    }
}

export let formaters = new Formaters();
