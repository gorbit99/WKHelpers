// ==UserScript==
// @name         CIDWWA
// @namespace    http://tampermonkey.net/
// @version      0.1.0
// @description  Code I don't want to write again
// @author       Gorbit99
// @icon         https://www.google.com/s2/favicons?sz=64&domain=wanikani.com
// @grant        none
// @license      MIT
// ==/UserScript==
'use strict';


class Modal {
  #container;
  #itemContainer;

  #open = false;
  #onOpen = [];
  #onClose = [];

  constructor(config) {
    this.#container = document.createElement("div");
    document.body.append(this.#container);
    this.#container.style.position = "fixed";
    this.#container.style.inset = "0";
    this.#container.style.display = "none";
    this.#container.style.justifyContent = "center";
    this.#container.style.alignItems = "center";
    this.#container.style.pointerEvents = "none";
    this.#container.style.zIndex = "999";

    const modalStyle = `
      background: #f4f4f4;
      border: 1px solid black;
      border-radius: 5px;
      padding: 16px 12px 12px;
      pointer-events: auto;
    `;

    const itemContainerStyle = `
      background: white;
      border-radius: 5px;
      padding: 16px;
      display: flex;
      justify-content: center;
    `;

    this.#container.innerHTML = `
      <div style="${modalStyle}">
        <div style="display: flex; justify-content: space-between">
          <h3 style="margin: 0 0 10px 12px">${config.title ?? ""}</h3>
          <i class="fa fa-times" style="font-size: 20px; cursor: pointer;"></i>
        </div>
        <div style="${itemContainerStyle}" class="modal-itemcontainer">

        </div>
      </div>
    `;

    this.#itemContainer = this.#container.querySelector(".modal-itemcontainer");
    this.#container.querySelector("i").addEventListener("click", () => this.close());
  }

  toggle() {
    this.#open = !this.#open;
    this.#container.style.display = this.#open ? "flex" : "none";

    if (this.#open) {
      this.#onOpen.forEach((callback) => callback());
    }
    else {
      this.#onClose.forEach((callback) => callback());
    }
    return this.#open;
  }

  open() {
    if (this.#open) {
      return;
    }
    this.toggle();
  }

  close() {
    if (!this.#open) {
      return;
    }
    this.toggle();
  }

  onOpen(callback) {
    this.#onOpen.push(callback);
  }

  onClose(callback) {
    this.#onClose.push(callback);
  }

  setContent(content) {
    if (typeof content === "string") {
      this.#itemContainer.innerHTML = content;
    } else {
      this.#itemContainer.children.forEach((child) => child.remove());
      this.#itemContainer.append(content);
    }
  }
}

class WKButton {
  #container;
  #button;
  #dropdown;

  #onTurnOn = [];
  #onTurnOff = [];
  #state = false;

  constructor(config) {
    const sitemap = document.querySelector("#sitemap");
    this.#container = document.createElement("li");
    sitemap.insertBefore(this.#container, sitemap.firstChild);
    this.#container.classList.add("sitemap__section");
    this.#container.innerHTML = `
        <button class="sitemap__section-header wk-custom-button">
            <span lang="ja">${config.japaneseText}</span>
            <span lang="en">${config.englishText}</span>
        </button>
    `;

    if (config.withDropdown) {
      this.attachDropdown(config.withDropdown);
    }

    this.#button = this.#container.querySelector(".wk-custom-button");

    if (config.color) {
      this.#button.dataset.color = config.color;
      this.#button.style.setProperty("--focus-color", config.color);
    }
    if (config.hoverColor) {
      this.#button.dataset.hoverColor = config.hoverColor;
      this.#button.style.setProperty("--hover-color", config.hoverColor);
    }

    this.#button.addEventListener("click", () => {
      this.#state = !this.#state;
      this.#button.dataset.expanded = this.#state;
      if (this.#dropdown) {
        this.#dropdown.dataset.expanded = this.#state;;
      }
      if (this.#state) {
        this.#onTurnOn.forEach((callback) => callback());
      }
      else {
        this.#onTurnOff.forEach((callback) => callback());
      }
    });
  }

  attachDropdown(config) {
    if (this.#dropdown) {
      throw "A dropdown is already attached!";
    }

    this.#dropdown = document.createElement("div");
    this.#dropdown.classList.add("sitemap__expandable-chunk");
    this.#dropdown.dataset.expanded = false;
    this.#container.append(this.#dropdown);

    this.#dropdown.style.setProperty("--dropdown-background", config.bgColor);
  }

  setDropdownContent(content) {
    if (typeof content === "string") {
      this.#dropdown.innerHTML = content;
    } else {
      this.#dropdown.children.forEach((child) => child.remove());
      this.#dropdown.append(content);
    }
  }

  onTurnOn(callback) {
    this.#onTurnOn.push(callback);
  }

  onTurnOff(callback) {
    this.#onTurnOff.push(callback);
  }

  setState(state) {
    this.#state = state;
    this.#button.dataset.expanded = state;
    if (this.#dropdown) {
      this.#dropdown.dataset.expanded = state;
    }
  }
}

if (!window.createModal) {
  window.createModal = function(config) {
    return new Modal(config);
  };

  window.createButton = function(config) {
    return new WKButton(config);
  };

  const styleElement = document.createElement("style");
  document.head.append(styleElement);
  styleElement.innerHTML = `
    .wk-custom-button[data-color][data-expanded="true"],
    .wk-custom-button[data-color]:focus {
      color: var(--focus-color);
      border-color: var(--focus-color);
    }

    .wk-custom-button[data-hover-color]:not([data-expanded="true"]):not(:focus):hover {
      color: var(--focus-color);
      border-color: var(--hover-color);
    }

    .wk-custom-button + .sitemap__expandable-chunk,
    .wk-custom-button + .sitemap__expandable-chunk:before {
      background-color: var(--dropdown-background);
    }
  `;
}
