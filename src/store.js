import { proxy } from 'valtio'

// create our first state
const state = proxy({
    intro: true,
    selectedColor: '#EFBD4E',
    selectedDecal: 'three2'
})

export { state }