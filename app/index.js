
import { Util } from './util.js'

(function ($) {

    function AutoChangeFocus(element, options) {
        this.bearer = element;
        this.options = options;
        this.itemsList = this.options.inputsList;
    }

    AutoChangeFocus.prototype = {

        activate: function () {
            this.setContent();
        },

        setContent: function () {
            this.itemsList.forEach((item, index) => {

                // build placeholder
                let placeholder = '';
                for (let i = 0; i < item.maxLength; i++) {
                    placeholder += this.options.placeholderChar;
                }

                if(!item.class){
                    item.class = 'autochangefocus-input';
                }

                let input = $(`<input
                    class='${item.class}'
                    id='${item.id}'
                    maxLength='${item.maxLength}'
                    placeholder='${placeholder}'
                />`);

                $(this.bearer).append(input);

                this.setItemOnKeyPressEvent(item.id, index);
            });
        },

        setItemOnKeyPressEvent: function (id, index) {
            $(`#${id}`).on('keypress', { self: this }, function (event) {
                var self = event.data.self;

                if (!self.checkKeyPressed(id, event)) {
                    event.preventDefault();
                    return;
                }
                let currentValue = this.value;
                if (currentValue.length < this.maxLength) {
                }
                else {
                    if (Util.IsTextPartSelected(this) === false) {
                        event.preventDefault();
                        let nextItem = self.getNextItem(id);
                        if (nextItem) {
                            if (self.checkKeyPressed(nextItem.id, event)) {
                                $(`#${nextItem.id}`).val("");
                                $(`#${nextItem.id}`).focus();
                                self.insertNewCharToItem(nextItem, event.key);
                            }
                        }
                    }
                }
            });
        },

        insertNewCharToItem: function (item, newChar) {
            let currentValue = $(`#${item.id}`).val();
            if (currentValue.length < item.maxLength) {
                currentValue += newChar;
                $(`#${item.id}`).val(currentValue);
            }
        },

        getNextItem: function (id) {
            let itemIndex = this.itemsList.findIndex(x => x.id == id);
            if (itemIndex < this.itemsList.length - 1) {
                return this.itemsList[itemIndex + 1];
            }
        },

        checkKeyPressed: function (id, event) {
            let item = this.itemsList.find(x => x.id == id);
            if (item.checkKeyPressed) {
                return item.checkKeyPressed(event);
            }
            return this.options.checkKeyPressed(event);
        },
    }

    $.fn.autoChangeFocus = function (options) {
        return this.each(function () {
            options = $.extend({}, $.fn.autoChangeFocus.defaults, options);
            var autoChangeFocus = new AutoChangeFocus($(this), options);
            autoChangeFocus.activate();
        });
    }

    $.fn.autoChangeFocus.defaults = {
        // default params
        inputsList: [],
        placeholderChar: 'x',
        checkKeyPressed: function (event) { return true; }
    };

})(jQuery);