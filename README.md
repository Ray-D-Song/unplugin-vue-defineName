# unplugin-vue-definename
> In Vue 3.3+, the official defineOptions macro supports defining the name attribute.
## use
```bash
npm install -D unplugin-vue-definename
# or
yarn add -D unplugin-vue-definename
# or
pnpm add -D unplugin-vue-definename
```
<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import DefineName from 'unplugin-vue-definename/vite'

export default defineConfig({
  plugins: [
    DefineName()
  ],
})
```

<br></details>

<details>
<summary>Rollup</summary><br>

```ts
// rollup.config.js
import DefineName from 'unplugin-vue-definename/rollup'

export default {
  plugins: [
    DefineName()
  ],
}
```

<br></details>


<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  plugins: [
    require('unplugin-vue-definename/webpack')()
  ]
}
```

<br></details>

<details>
<summary>Nuxt</summary><br>

```ts
// nuxt.config.js
export default defineNuxtConfig({
  modules: [
    ['unplugin-vue-definename/nuxt'],
  ],
})
```

> This module works for both Nuxt 2 and [Nuxt Vite](https://github.com/nuxt/vite)

<br></details>

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-vue-definename/webpack')(),
    ],
  },
}
```

<br></details>

<details>
<summary>esbuild</summary><br>

```ts
// esbuild.config.js
import { build } from 'esbuild'
import DefineName from 'unplugin-vue-definename'

build({
  plugins: [DefineName()],
})
```

<br></details>

## why?
If you want to set the name attribute of a component using Vue's `<script setup>` syntax, the only way is to create a separate script tag.
```vue
<script setup>
//...
</script>

<script>
export default {
  name: 'comp'
}
</script>
```
This is not very elegant.

## how
```vue
<script setup>
defineName('comp')
//...
</script>
```
will be compiled to
```vue
<script setup>
//...
</script>

<script>
export default {
  name: 'comp'
}
</script>
```

## todo
Plan to introduce the <script setup name="comp"> syntax.
