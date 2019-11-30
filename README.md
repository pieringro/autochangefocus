# Auto Change Focus
[![NPM](https://nodei.co/npm/auto_change_focus.png)](https://npmjs.org/package/auto_change_focus)

A chain of text inputs that automatically changes focus to the next one as soon as the last character has been typed in the previous.

### Usage

Read demo/index.html

```
<div id="example2"></div>

<script>
$(document).ready( function(){
    $('#example2').autoChangeFocus({
        inputsList: [
            {
                id: 'example2id0',
                maxLength: 3,
                checkKeyPressed: function (event) {
                    if (isNaN(event.key)) {
                        return false;
                    }
                    return true;
                }
            },
            {
                id: 'example2id1',
                maxLength: 5
            },
        ],
    });
});
</script>

```


