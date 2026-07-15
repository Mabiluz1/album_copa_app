import { mount } from '@vue/test-utils'
import Tab1Page from '@/views/Tab1Page.vue'
import { describe, expect, test } from 'vitest'

describe('Tab1Page.vue', () => {
  test('renderiza o álbum e os filtros persistentes', () => {
    const wrapper = mount(Tab1Page)

    expect(wrapper.text()).toContain('Álbum da Copa')
    expect(wrapper.text()).toContain('Coletadas')
    expect(wrapper.text()).toContain('Faltantes')
    expect(wrapper.text()).toContain('Favoritas')
  })
})
