import { ref } from 'vue'

export interface MovableObject {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

const movables = ref<MovableObject[]>([])
const selectedId = ref<string | undefined>(undefined)

export function useMovable() {
  const addMovable = () => {
    const newMovable: MovableObject = {
      id: `movable-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x: 100,
      y: 100,
      width: 150,
      height: 150,
      rotation: 0
    }
    movables.value.push(newMovable)
    selectedId.value = newMovable.id
    return newMovable.id
  }

  const removeMovable = () => {
    if (selectedId.value) {
      movables.value = movables.value.filter(m => m.id !== selectedId.value)
      selectedId.value = undefined
    }
  }

  const selectMovable = (id: string) => {
    selectedId.value = id
  }

  const deselectAll = () => {
    selectedId.value = undefined
  }

  const updateMovable = (id: string, updates: Partial<MovableObject>) => {
    const index = movables.value.findIndex(m => m.id === id)
    if (index !== -1) {
      movables.value[index] = {
        ...movables.value[index],
        ...updates
      }
    }
  }

  return {
    movables,
    selectedId,
    addMovable,
    removeMovable,
    selectMovable,
    deselectAll,
    updateMovable
  }
}

