import './style.css'
import Sharee from "./lib/Sharee";
import initVue from './vue/main';
import initReact from './react/main';

if (document.location.pathname === '/vue') {
  initVue()
} else if (document.location.pathname === '/react') {
  initReact()
} else {
  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <div>
      <h2>Normal</h2>
      <div><div id="sharee-normal"></div></div>
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

  new Sharee(document.querySelector('#sharee')!, {
    mode: 'dropdown',
    lang: 'fa'
  })

  new Sharee(document.querySelector('#sharee-text')!, {
    mode: 'text',
    lang: 'fa'
  })

  new Sharee(document.querySelector('#sharee-normal')!, {
    mode: 'normal',
    lang: 'en'
  })

  new Sharee(document.querySelector('#sharee-normal-no-title')!, {
    mode: 'normal',
    lang: 'fa',
    modeOptions: {
      noTitle: true
    }
  })

  new Sharee(document.body, {
    mode: 'fixed',
    lang: 'fa',
    modeOptions: {
      position: 'bottom-right'
    }
  })

  new Sharee(document.body, {
    mode: 'fixed',
    lang: 'fa',
    modeOptions: {
      position: 'top-left',
      noTitle: false
    }
  })
}
