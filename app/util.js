
export var Util = {
    ///Check if a part of (or all) text in a input element is selected
    IsTextPartSelected: function (input) {
        if (typeof input.selectionStart == "number") {
            return input.selectionStart !== input.selectionEnd;
        } else if (typeof document.selection != "undefined") {
            input.focus();
            return document.selection.createRange().text == input.value;
        }
    },
};

