<h1 align="center">Welcome to svelte-tooltips 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version- (0.2.0)-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/DonutLaser/svelte-tooltips#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/DonutLaser/svelte-tooltips/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
</p>

> A package that provides a highly customizable way to open tooltips in Svelte on any DOM element

### 🏠 [Homepage](https://github.com/DonutLaser/svelte-tooltips)

## Install

```sh
npm install svelte-tooltips
```

## Usage
### Adding a tooltip to an element 
```svelte
<!-- App.svelte -->
<script>
    import { tooltip } from 'svelte-tooltips';

</script>

<button use:tooltip={{ message: "Hello from the tooltip" }}>This is a button</button>
```
To add a tooltip, use `use:tooltip` directive, provide it an options object and the tooltip will be available for as long as the dom element is not destroyed.

Notes:
- A tooltip will always be rendered as a child of the `body` 
- There can only be one tooltip open at a time

### Tooltip options
| Option                    | Type    | Default value | Description                                                                                                                                  |
|---------------------------|---------|---------------|----------------------------------------------------------------------------------------------------------------------------------------------|
| **message** (Required)    | string  |               | A message to show in the tooltip, can only be text.                                                                                          |
| **tooltipClass**          | string  | <empty>       | A class that will style the tooltip. **Must be defined in global.css**. Overrides the default style completely.                              |
| **placement**             | string  | top           | Can be one of: `left`, `right`, `top` or `bottom`. Does nothing when `openNextToMouseCursor` is set to `true`.                               |
| **offset**                | number  | 0             | An offset from the element and the tooltip. Does nothing when `openNextToMouseCursor` is set to `true`.                                      |
| **delay**                 | number  | 0             | Delay in milliseconds to wait before showing the tooltip.                                                                                    |
| **openNextToMouseCursor** | boolean | false         | Whether to open the tooltip in a manner similar to the native tooltip of the browser instead of putting the tooltip next to the DOM element  |

### Global options
To avoid having to set the same options on for every DOM element that has a tooltip, it is possible to set the global options for all the tooltips. This way, you will only need to provide the message to the tooltip to show it and every other option will be taken from the global options you have set. If you set global options, but have a tooltip that has to have some different options, you can set the options on the tooltip and they will override the global ones.
```svelte
<!-- App.svelte -->
<script>
  import { onMount } from "svelte";
  import { setGlobalTooltipOptions } from "svelte-tooltips";

  onMount(() => {
    setGlobalTooltipOptions({
      tooltipClass: 'tooltip',
      delay: 500,
      openNextToMouseCursor: true
    });
  });
</script>
```
## Author

👤 **Vidmantas Luneckas**

* Github: [@DonutLaser](https://github.com/DonutLaser)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/DonutLaser/svelte-tooltips/issues). You can also take a look at the [contributing guide](https://github.com/DonutLaser/svelte-tooltips/blob/master/CONTRIBUTING.md).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2021 [Vidmantas Luneckas](https://github.com/DonutLaser).<br />
This project is [MIT](https://github.com/DonutLaser/svelte-tooltips/blob/master/LICENSE) licensed.

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_