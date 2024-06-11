# unplugin-vue-definename
> 在 Vue3.3+ 中官方支持了 defineOptions 宏, 你可以在其中定义 name 属性.
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
如果你想要在 Vue 的`<script setup>`语法下设置组件的`name`属性, 唯一的做法是再创建一个独立的`script`标签.  
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
这并不是很优雅.

## how
```vue
<script setup>
defineName('comp')
//...
</script>
```
将会被编译为
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
计划引入`<script setup name="comp">`写法
