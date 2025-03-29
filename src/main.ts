// @ts-nocheck

import './style.css'
import Sharee from "./lib/Sharee";
import initVue from './vue/main';
import initReact from './react/main';
import TelegramDriver from "./lib/drivers/TelegramDriver";

if (document.location.pathname === '/vue') {
  initVue();
} else if (document.location.pathname === '/react') {
  initReact();
} else {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div>
      <h2>Normal</h2>
      <div><div id="sharee-normal"></div></div>
    </div>
    <div>
      <h2>Hover Button</h2>
      <div><button id="sharee-hover" class="transition-all duration-300 bg-app-light-blue-10 hover:bg-app-light-blue-9 text-white rounded-lg font-300 p-1.7 sm:p-2" data-v-e56f4d16=""><svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.5 22.5C20.1569 22.5 21.5 21.1569 21.5 19.5C21.5 17.8431 20.1569 16.5 18.5 16.5C16.8431 16.5 15.5 17.8431 15.5 19.5C15.5 21.1569 16.8431 22.5 18.5 22.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M6.5 15.5C8.15685 15.5 9.5 14.1569 9.5 12.5C9.5 10.8431 8.15685 9.5 6.5 9.5C4.84315 9.5 3.5 10.8431 3.5 12.5C3.5 14.1569 4.84315 15.5 6.5 15.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M9.09 14.01L15.92 17.99" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18.5 8.5C20.1569 8.5 21.5 7.15685 21.5 5.5C21.5 3.84315 20.1569 2.5 18.5 2.5C16.8431 2.5 15.5 3.84315 15.5 5.5C15.5 7.15685 16.8431 8.5 18.5 8.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M15.91 7.01001L9.09 10.99" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg></button></div>
    </div>
    <div>
      <h2>Normal without title</h2>
      <div><div id="sharee-normal-no-title"></div></div>
    </div>
    <div>
      <h2>Text Selection</h2>
      <p id="sharee-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </div>
    <div>
      <h2>Share Button Dropdown</h2>
      <p class="read-the-docs">
        <button id="sharee">SHARE</button>
      </p>
    </div>
  </div>
`
  function customDriver(lang, options) {
    this.lang = lang;
    this.options = options;
    this.buttonText = 'Telegram';
    this.icon = '<svg style="transform:scale(0.83)" fill="currentColor" width="512px" height="512px" viewBox="-32 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="M433.941 65.941l-51.882-51.882A48 48 0 0 0 348.118 0H176c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h224c26.51 0 48-21.49 48-48v-48h80c26.51 0 48-21.49 48-48V99.882a48 48 0 0 0-14.059-33.941zM266 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h74v224c0 26.51 21.49 48 48 48h96v42a6 6 0 0 1-6 6zm128-96H182a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h106v88c0 13.255 10.745 24 24 24h88v202a6 6 0 0 1-6 6zm6-256h-64V48h9.632c1.591 0 3.117.632 4.243 1.757l48.368 48.368a6 6 0 0 1 1.757 4.243V112z"/></svg>';
    this.backgroundColor = '#366a81';
    this.backgroundHoverColor = '#0371aa';
    this.textColor = '#fff';
    this.textHoverColor = '#fff'
    this.getLink = () => {
      return 'http://google.com'
    }
    this.getButtonText = () => {
      // @ts-ignore
      return this.lang[this.buttonText.replaceAll(' ', '_')] || this.buttonText;
    }
    this.rippleColor = '#ffffff75';
  }

  Sharee.addDriver('tel', TelegramDriver)
  Sharee.addDriver('tel2', customDriver)
  new Sharee(document.querySelector('#sharee')!, {
    mode: 'dropdown',
    lang: 'fa',
    drivers: ['tel', 'tel2']
  });

  new Sharee(document.querySelector('#sharee-text')!, {
    mode: 'text',
    lang: 'fa'
  });

  new Sharee(document.querySelector('#sharee-normal')!, {
    mode: 'normal',
    lang: 'en'
  });

  new Sharee(document.querySelector('#sharee-hover')!, {
    mode: 'hover',
    lang: 'en'
  });

  new Sharee(document.querySelector('#sharee-normal-no-title')!, {
    mode: 'normal',
    lang: 'fa',
    modeOptions: {
      noTitle: true
    }
  });

  new Sharee(document.body, {
    mode: 'fixed',
    lang: 'fa',
    modeOptions: {
      position: 'bottom-right'
    }
  });

  new Sharee(document.body, {
    mode: 'fixed',
    lang: 'fa',
    modeOptions: {
      position: 'top-left',
      noTitle: false
    }
  });
}
