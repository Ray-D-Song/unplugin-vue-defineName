import { describe, expect, it } from 'vitest'
import { transform } from '../src'

describe('transform', () => {
  it('compile defineName', () => {
    const code = `
<script setup>
defineProps({
  foo: string
})

defineName('test')
</script>
    `
    expect(
      transform(code, 'id')?.code,
    ).toBe(`
    <script lang="js">
      export default {
        name: 'test'
      }
    </script>
  
<script setup>
defineProps({
  foo: string
})


</script>
    `)
  })
})
