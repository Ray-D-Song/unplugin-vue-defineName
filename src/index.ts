import type { UnpluginFactory } from 'unplugin'
import { createUnplugin } from 'unplugin'
import type {
  SFCScriptBlock,
} from '@vue/compiler-sfc'
import {
  compileScript,
  parse,
} from '@vue/compiler-sfc'
import MagicString from 'magic-string'

declare global {
  const defineName: (name: string) => void
}

export const DEFINE_NAME = 'defineName'

export function getDefineNameCallExpression(scriptSetup: SFCScriptBlock) {
  const callExpressionList = scriptSetup.scriptSetupAst!.filter(
    node =>
      node.type === 'ExpressionStatement'
      && node.expression.type === 'CallExpression'
      && node.expression.callee.type === 'Identifier'
      && node.expression.callee.name === DEFINE_NAME,
  )
  return callExpressionList[callExpressionList.length - 1]
}

export function getDefineNameCallExpressionArgument(callExpression: any) {
  if (!callExpression)
    return null
  return callExpression.expression.arguments[0].value
}

export function transform(code: string, id: string) {
  if (!code.includes(DEFINE_NAME))
    return

  const { descriptor } = parse(code, { filename: id })

  if (!descriptor.scriptSetup)
    return

  if (!descriptor.scriptSetup.scriptSetupAst)
    descriptor.scriptSetup = compileScript(descriptor, { id })

  const { source, scriptSetup } = descriptor
  const defineNameCallExpression = getDefineNameCallExpression(scriptSetup)
  const componentName = getDefineNameCallExpressionArgument(
    defineNameCallExpression,
  )

  if (!componentName)
    return null

  let s: MagicString | undefined
  const str = () => s || (s = new MagicString(source))

  str().appendLeft(
    0,
    `
    <script lang="${scriptSetup.attrs.lang || 'js'}">
      export default {
        name: '${componentName}'
      }
    </script>
  `,
  )

  if (defineNameCallExpression.start && defineNameCallExpression.end) {
    str().remove(
      scriptSetup.loc.start.offset + defineNameCallExpression.start,
      scriptSetup.loc.start.offset + defineNameCallExpression.end,
    )
  }

  const result = {
    code: str().toString(),
    map: str().generateMap({
      source: id,
      includeContent: true,
    }),
  }

  return { ...result }
}

export const unpluginFactory: UnpluginFactory<undefined> = () => ({
  name: 'unplugin-vue-defineName',
  transform,
})

export const unplugin = /* #__PURE__ */ createUnplugin(unpluginFactory)

export default unplugin
