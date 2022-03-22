# What is this?

These are a set of tools that I can't be bothered to write again and maintain
in 10 different places at once.

# What is included?

Currently there are 2 components to the script:

- Modal, for creating modals and dialogs
- Button, for adding buttons to the header

# Usage

To use the script, simply add the following line to the beginning block of your
userscript:

```js
// @require https://greasyfork.org/scripts/441792-cidwwa/code/CIDWWA.js?version=1031245
```

Afterwards you are ready to use the included features.

# Current tools:

## Modals

To use modals, create one, by doing:

```js
const modal = window.createModal({title: "My Modal"});
```

After you've done this, you can set the content of the modal using:

```js
modal.setContent("Hello world");
```

This function accepts either an HTML string or a node.

These are the available methods on the modal instance:

- `Modal#toggle()` - toggle the visibility of the modal, returns the new state
- `Modal#open()` - show the modal
- `Modal#close()` - hide the modal
- `Modal#onOpen(callback)` - add a callback that will be ran when the modal
  opens
- `Modal#onClose(callback)` - add a callback that will be ran when the modal
  closes

For more examples, check out my [Bookmark
Userscript](https://greasyfork.org/scripts/441006-wk-extra-study-mover/code)

## Button

To use a button, create one, by doing:

```js
const button = window.createButton({
    japaneseText: "...",
    englishText: "...",
    color: "...",
    hoverColor: "...",
    withDropdown: {
      bgColor: "...",
    },
});
```

The color, hoverColor and withDropdown arguments are optional, they set the color the button
will take up when clicked or being hovered over and the dropdown menu of the
button.

The dropdown can also be created using `Button#attachDropdown(config)` with the
same object the withModal option recieved.

These are the available methods on the button instance:

- `Button#onTurnOn(callback)` - add a callback that will be ran when the button is
  activated
- `Button#onTurnOff(callback)` - add a callback that will be ran when the button is
  deactivated
- `Button#setState(state)` - explicitly set the state of the button, useful if
  you have other methods for cancelling the attached action
- `Button#attachDropdown(config)` - attaches a dropdown to the button
- `Button#setDropdownContent(content)` - sets the content of the dropdown,
  accepts either an HTML string or a node

For more examples, check out my [Bookmark
Userscript](https://greasyfork.org/scripts/441006-wk-extra-study-mover/code)

# Contributing

If you have a tool that you feel like would fit the point of the script, feel
free to add it in a PR.

Requirements for additions:

- There is an attached eslint config, make sure you run your code through that.
- If the tool you're adding has a visual part to it, make sure it fits WK as
  much as possible. If you're not sure how, open a WIP PR.
