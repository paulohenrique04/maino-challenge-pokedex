import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import NavBar from '../components/NavBar.vue'
import { createStore } from 'vuex'

const createMockStore = () => {
  const mutations = {
    setNamePokemonFilter: vi.fn(),
    setTypePokemonFilter: vi.fn(),
    setIdPokemonFilter: vi.fn(),
    setSpeciePokemonFilter: vi.fn()
  }
  
  const store = createStore({
    mutations
  })
  
  return { store, mutations }
}

describe('Navbar Component', () => {
  it('renderiza corretamente', () => {
    const { store } = createMockStore()
    const wrapper = mount(NavBar, {
      global: {
        plugins: [store]
      }
    })
    
    expect(wrapper.find('.navbar-brand').text()).toBe('Pokédex')
    expect(wrapper.find('input[placeholder="Nome"]').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="ID"]').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
    expect(wrapper.find('input[placeholder="Espécie"]').exists()).toBe(true)

    const filterButton = wrapper.find('button.btn.btn-light')
    expect(filterButton.exists()).toBe(true)
    expect(filterButton.text().trim()).toBe('Filtrar')
  })

  it('alterna a classe "show" quando o botão de toggle é clicado', async () => {
    const { store } = createMockStore()
    const wrapper = mount(NavBar, {
      global: {
        plugins: [store]
      }
    })
    
    const toggleButton = wrapper.find('.navbar-toggler')
    const navbarCollapse = wrapper.find('#navbarNav')
    
    expect(navbarCollapse.classes()).not.toContain('show')
    
    await toggleButton.trigger('click')
    
    expect(navbarCollapse.classes()).toContain('show')
   
    await toggleButton.trigger('click')
    
    expect(navbarCollapse.classes()).not.toContain('show')
  })

  it('atualiza os valores dos filtros quando os inputs são modificados', async () => {
    const { store } = createMockStore()
    const wrapper = mount(NavBar, {
      global: {
        plugins: [store]
      }
    })
    
    const nameInput = wrapper.find('input[placeholder="Nome"]')
    await nameInput.setValue('Pikachu')
    expect(wrapper.vm.filters.name).toBe('Pikachu')
    
    const idInput = wrapper.find('input[placeholder="ID"]')
    await idInput.setValue(25)
    expect(wrapper.vm.filters.id).toBe(25)
    
    const typeSelect = wrapper.find('select')
    await typeSelect.setValue('electric')
    expect(wrapper.vm.filters.type).toBe('electric')
    
    const speciesInput = wrapper.find('input[placeholder="Espécie"]')
    await speciesInput.setValue('pikachu')
    expect(wrapper.vm.filters.species).toBe('pikachu')
  })

  it('chama as mutations do Vuex quando o botão Filtrar é clicado', async () => {
    const { store, mutations } = createMockStore()
    const wrapper = mount(NavBar, {
        global: {
        plugins: [store]
        }
    })
    
    console.log(wrapper.vm.$store)
    
    await wrapper.find('input[placeholder="Nome"]').setValue('Pikachu')
    await wrapper.find('input[placeholder="ID"]').setValue(25)
    await wrapper.find('select').setValue('electric')
    await wrapper.find('input[placeholder="Espécie"]').setValue('pikachu')
    
    console.log('Filters:', wrapper.vm.filters)
    
    const filterButton = wrapper.find('button.btn.btn-light')
    await filterButton.trigger('click')
    
    console.log('applyFilters called?', mutations.setNamePokemonFilter.mock.calls)
    
    expect(mutations.setNamePokemonFilter).toHaveBeenCalled()
    expect(mutations.setNamePokemonFilter).toHaveBeenCalledWith(expect.anything(), 'Pikachu')
    expect(mutations.setTypePokemonFilter).toHaveBeenCalledWith(expect.anything(), 'electric')
    expect(mutations.setIdPokemonFilter).toHaveBeenCalledWith(expect.anything(), '25')
    expect(mutations.setSpeciePokemonFilter).toHaveBeenCalledWith(expect.anything(), 'pikachu')
    })
})