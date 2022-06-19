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
// @require https://greasyfork.org/scripts/441792-cidwwa/code/CIDWWA.js?version=1062515
```

Afterwards you are ready to use the included features.

# Current tools:

## Modals

To use modals, create one, by doing:

```js
const modal = window.createModal({title: "My Modal"});
```

The following values can be provided to the createModal function:

- title (required): string - Sets the title of the modal
- preventDragging: boolean - If true, the modal won't be made draggable, default
  false
- tintBackground: boolean - If true, the background will be tinted black,
  default false
- clickOutAction: Enum - The action that happens if the user clicks outside the
  modal area, possible values:
    - "none", default, the user can click out and interact with other elements
    - "block", nothing happens, the user can't interact with other elements
    - "close", the modal will be closed
- width: html width string (number + unit) - The actual width of the modal
- height: html height string (number + unit) - The actual height of the modal
- overflow-x: html overflow value - The overflow behaviour of the container in
  the x direction
- overflow-y: html overflow value - The overflow behaviour of the container in
  the y direction


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
- `Button#attachSubtext()` - attaches a span below the button and returns it

For more examples, check out my [Bookmark
Userscript](https://greasyfork.org/scripts/441006-wk-extra-study-mover/code)

## Style

To use a style element, create one by doing:

```js
const style = window.createStyle();
```

Afterwards you can either use `Style#setStyle(data)` or `Style#addStyle(data)`
to either completely change the whole styling or just append to it respectively.

Both methods take in a style object of the form:

```js
{
  ".my-element": {
    display: "flex",
    flexDirection: "column",
    color: "red",
    
    ".my-child": {
      alignSelf: "flex-end",
    }
  }
}
```

Basic nesting is supported, when a `&` character is used, it will be replaced
with the parent's selector. Examples:

```js
{
  ".my-element": {
    ".my-child": { // = ".my-element .my-child"
      ...
    },

    "&.state": { // = ".my-element.state"
      ...
    }
  }
}
```

You can nest inside nested objects too.

Css property keys are in the style of the javascript style object, so instead of
dashes, it uses uppercase characters to separate words.

The resulting css will be inserted as a style element into the dom, so further
style overriding is possible.

# Contributing

If you have a tool that you feel like would fit the point of the script, feel
free to add it in a PR.

Requirements for additions:

- There is an attached eslint config, make sure you run your code through that.
- If the tool you're adding has a visual part to it, make sure it fits WK as
  much as possible. If you're not sure how, open a WIP PR.
