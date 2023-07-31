# ficusjs-core

FicusJS core provides functions for creating fast, lightweight web components
and modules for packaging sets of components.

Components created with FicusJS are native custom elements
created in a functional and declarative way.

A set of components can be shared as a module using a package manager or publishing it to a URL.
By packaging your components into a module, it can be imported into other applications and re-used multiple times.

For documentation visit [https://docs.ficusjs.org/](https://docs.ficusjs.org/)

## Getting started

The `createCustomElement` function defines a new component with the provided tag plus declarative object and registers it in the browser as a [custom element](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements).

```js
// import the createCustomElement function
import { createCustomElement } from 'https://cdn.skypack.dev/@ficusjs/core'

// import the renderer and html tagged template literal from the htm renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/htm'

createCustomElement('my-component', {
  renderer,
  props: {
    personName: {
      type: String,
      required: true
    }
  },
  render () {
    return html`
      <p>
        Hi, there! My name is ${this.props.personName}
      </p>
    `
  }
})
```

The `use` function will import a module of components into your application ready to use.

```js
// import the use function
import { use } from 'https://cdn.skypack.dev/@ficusjs/core'

// import the renderer and html tagged template literal from the uhtml renderer
import { html, renderer } from 'https://cdn.skypack.dev/@ficusjs/renderers@5/uhtml'

// import component module from a local path
import { module } from './path/to/component-module.esm.js'

// import the components into your application, passing the renderer and html tagged template literal to the module
use(module, { renderer, html })
```

See the [documentation](https://docs.ficusjs.org/modules/) for more information on creating and consuming modules.

## Installation

FicusJS core is part of [FicusJS](https://docs.ficusjs.org) but can also be installed independently in a number of ways.

### CDN

We recommend using native ES modules in the browser.

```html
<script type="module">
  import { createCustomElement, use } from 'https://cdn.skypack.dev/@ficusjs/core'
</script>
```

FicusJS core is available on [Skypack](https://www.skypack.dev/view/@ficusjs/core).

### NPM

FicusJS core work nicely with build tools such as Snowpack, Webpack or Rollup. If you are using a NodeJS tool, you can install the NPM package.

```bash
npm install @ficusjs/core
```

### Available builds

FicusJS core only provides ES module builds. For legacy browsers or alternative modules such as CommonJS, it is recommended to use a build tool to transpile the code.

## Development

How to set-up FicusJS core for local development.

1. Clone the repository:

```bash
git clone https://github.com/ficusjs/ficusjs-core.git
```

2. Change the working directory

```bash
cd ficusjs-core
```

3. Install dependencies

```bash
npm install
```

4. Run the local development server

```bash
npm run dev
```

That's it! Now open http://localhost:8080 to see a local app.

## License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.

## Contributing to FicusJS core

Any kind of positive contribution is welcome! Please help us to grow by contributing to the project.

If you wish to contribute, you can work on any features you think would enhance the library. After adding your code, please send us a Pull Request.

> Please read [CONTRIBUTING](CONTRIBUTING.md) for details on our [CODE OF CONDUCT](CODE_OF_CONDUCT.md), and the process for submitting pull requests to us.

## Support

We all need support and motivation. FicusJS is not an exception. Please give this project a ⭐️ to encourage and show that you liked it. Don't forget to leave a star ⭐️ before you move away.

If you found the library helpful, please consider [sponsoring us](https://github.com/sponsors/ficusjs).
