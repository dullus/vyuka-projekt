/**
 * Form Error displaying
 * @module common/formErrors
 */
import $ from 'jquery';

/** @constant {String} */
const FORM_ERROR_CLASS = 'my-car-form__errors';
/** @constant {String} */
const ELEMENT_ERROR_CLASS = 'error';
/** @constant {String} */
const ELEMENT_ERROR_LABEL_CLASS = 'error-label';
/** @constant {Integer} */
const ELEMENT_DELTA = 20;

/**
 * Form Error displaying
 * @memberof module:common/formErrors
 * @class
 */
class FormErrors {

    /**
     * Highlights errors in form fields
     * @param {Object} errors - error object
     * @param {String} sectionId - section where display error, jquery selector
     * @param {String} [finerSelector] - left or right subsection selector
     *        for more precise $formErrors targeting
     * @param {Boolean} [noGlobal=false] - if true then global error box is hidden
     */
    showErrors(errors, sectionId, finerSelector = undefined, noGlobal = false) {
        var labelEl;
        var message;

        if (typeof finerSelector !== 'undefined') {
            sectionId += ' ' + finerSelector;
        }

        var $formErrors = $(sectionId + ' .' + FORM_ERROR_CLASS);

        // remove previous errors
        this.hideErrors(sectionId, finerSelector);

        try {
            for (let i = 0; i < errors.length; i++) {
                message = errors[i].message.replace(/\./g, '. ');
                $(sectionId + ' [name="' + errors[i].field + '"]').addClass(ELEMENT_ERROR_CLASS);

                if (noGlobal !== true) {
                    $formErrors.append($('<li>').text(message));
                } else {
                    $(sectionId + ' [name="' + errors[i].field + '"].' +
                        ELEMENT_ERROR_CLASS + ' ~ .' + ELEMENT_ERROR_LABEL_CLASS).text(message);
                }
            }

            if (noGlobal !== true) {
                // scroll to error box
                $formErrors.show();
                this._scrollTo($formErrors);
            } else {
                // scroll to first error
                labelEl = $(sectionId + ' label[for=' + errors[0].field + ']');
                if (typeof labelEl[0] === 'undefined') {
                    labelEl = $(sectionId + ' [name=' + errors[0].field + ']');
                }
                this._scrollTo(labelEl);
            }
        } catch (e) {
            console.log('Unknown error caused error in error displaying!');
        }
    }

    /**
     * Removes error highligthing in form fields that had error
     * @param {String} sectionId - section where display error, jquery selector
     * @param {String} [finerSelector] - left or right subsection selector
     *        for more precise targeting
     */
    hideErrors(sectionId, finerSelector) {
        if (typeof finerSelector !== 'undefined') {
            sectionId += ' ' + finerSelector;
        }
        let $formErrors = $(sectionId + ' .' + FORM_ERROR_CLASS);
        let $elementErrors = $(sectionId + ' .' + ELEMENT_ERROR_CLASS);

        $elementErrors.map((index, item) => {
            $(item).removeClass(ELEMENT_ERROR_CLASS);
        });

        $formErrors.empty().hide();
    }

    /**
     * Add error highligthing in form field that has error
     * @param {JQuery} element - JQuery element for error highlighting
     */
    showError(element) {
        element.addClass(ELEMENT_ERROR_CLASS);
    }

    /**
     * Remove error highligthing in form field that had error
     * @param {JQuery} element - JQuery element for error removal
     */
    hideError(element) {
        element.removeClass(ELEMENT_ERROR_CLASS);
    }

    /**
     * Hides error box
     * @param {(jQuery|String)} errorBoxElement - _{jQuery}_ element or _{String}_ with section selector
     */
    hideFormErrors(errorBoxElement) {
        var $formErrors;

        if (typeof errorBoxElement === 'string') {
            $formErrors = $(errorBoxElement + ' .' + FORM_ERROR_CLASS);
        } else {
            $formErrors = errorBoxElement;
        }

        $formErrors.empty().hide();
    }

    /**
     * Display standard unknown error message.
     * @param {String} sectionId - section where display error, jquery selector
     * @param {String} [finerSelector] - left or right subsection selector
     *        for more precise $formErrors targeting
     * @param {Boolean} [noGlobal=false] - if true then global error box is hidden
     */
    showDefaultError(sectionId, finerSelector, noGlobal = false) {
        this.showErrors(
            [{message: 'Sorry, there has been a problem processing your request. Please try again later!'}],
            sectionId, finerSelector, noGlobal);
    }

    /**
     * Scrolls viewport to element
     * @param {jQuery} element - target element of scroll
     * @private
     */
    _scrollTo(element) {
        // $('body').animate({scrollTop: element.offset().top - ELEMENT_DELTA}, 200);
    }
}

export let formErrors = new FormErrors();
