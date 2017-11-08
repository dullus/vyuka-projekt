/**
 * Prototype for form modules
 * @module common/ViewEditForm
 */
/**
 * Prototype for form modules
 * @class
 *
 * @memberof module:common/ViewEditForm
 *
 * @property {Object} items - object with form items
 */
class ViewEditForm {
    constructor() {
        this.items = {};
    }

    /**
     * Checks all form items if they are changed
     * @return {Boolean} true if they are unsaved changes, false when nothing changed
     */
    hasUnsavedChanges() {
        for (let item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                if (this.items[item].isChanged()) {
                    return true;
                }
            }
        }

        return false;
    }

    /**
     * @typedef _errorMessage
     * @type Object
     * @property {String} field - form item name
     * @property {String} message - error message
     */
    /**
     * Run all validators for given @groupId and populate errors object
     * @protected
     * @param {String} [groupId] - group/form to validate, usefull
     *      when you have items from more groups/forms
     * @return {Array} - array of {@link _errorMessage} objects
     */
    _runValidators(groupId) {
        var out;
        var errors = [];
        var skip;

        for (let key in this.items) {
            if (this.items.hasOwnProperty(key)) {
                skip = false;
                if (typeof groupId !== 'undefined') {
                    if (this.items[key].groupId !== groupId) {
                        skip = true;
                    }
                }

                if (skip === false) {
                    out = this.items[key].validate();
                    if (out !== true) {
                        errors.push({
                            field: this.items[key].name,
                            message: out
                        });
                    }
                }
            }
        }

        return errors;
    }

    /**
     * Copy form values to view
     * @protected
     * @param {String} dataAttribute - data attribute in your view section
     */
    _copyToView(dataAttribute) {
        var value;

        for (let item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                if (this.items[item].isChanged()) {
                    value = this.items[item].getFormatedValue();

                    this._copyToViewElement(
                        this.element.viewWindow,
                        dataAttribute,
                        item,
                        value
                    );
                }
            }
        }
    }

    /**
     * Copy value to (theoretically any) view element
     * @protected
     * @param {jQuery} viewWindow - view element
     * @param {String} dataAttribute - data attribute in your view section
     * @param {String} item - data attribute value with name of item
     * @param {String} value - text value to copy
     */
    _copyToViewElement(viewWindow, dataAttribute, item, value) {
        var viewWindow = viewWindow ? viewWindow : this.element.viewWindow;

        var viewEl = viewWindow.find('[' + dataAttribute + '=' + item + ']');
        if (viewEl.length !== 0) {
            viewEl.text(value);
        }
    }

    /**
     * Copy changed form values to old values
     * @protected
     */
    _setOldValues() {
        for (var item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                if (this.items[item].isChanged()) {
                    this.items[item].setOldValue();
                }
            }
        }
    }

    /**
     * Restore old values
     * @public
     */
    restoreOldValues() {
        for (var item in this.items) {
            if (this.items.hasOwnProperty(item)) {
                if (this.items[item].isChanged()) {
                    this.items[item].restoreOldValue();
                }
            }
        }
    }

}

export {ViewEditForm};
