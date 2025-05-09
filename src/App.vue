<template>
  <div class="app">
    <CanvasToolbar
      :selected-id="selectedId"
      :element-controls="getElementControls(selectedId)"
      @add="handleAddMovable"
      @remove="handleRemoveMovable"
      @toggle-draggable="toggleElementDraggable"
      @toggle-resizable="toggleElementResizable"
      @toggle-rotatable="toggleElementRotatable"
    />
    <CanvasArea
      :selected-id="selectedId"
      :element-controls="elementControls"
      @select="handleSelectMovable"
      @deselect="handleDeselectAll"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useMovable } from '@/store/useMovable'
import { CanvasToolbar, CanvasArea } from '@/feature/canvas'
import type { ElementControls } from '@/feature/canvas/types'

export default defineComponent({
  name: 'App',
  components: {
    CanvasToolbar,
    CanvasArea
  },
  setup() {
    const { movables, selectedId, addMovable, removeMovable, selectMovable, deselectAll } = useMovable()
    const elementControls = ref<Record<string, ElementControls>>({})

    const getElementControls = (id: string | undefined): ElementControls | undefined => {
      if (!id) return undefined
      if (!elementControls.value[id]) {
        elementControls.value[id] = {
          isDraggable: true,
          isResizable: true,
          isRotatable: true
        }
      }
      return elementControls.value[id]
    }

    const handleAddMovable = () => {
      const id = addMovable()
      elementControls.value[id] = {
        isDraggable: true,
        isResizable: true,
        isRotatable: true
      }
    }

    const handleRemoveMovable = () => {
      if (selectedId.value) {
        delete elementControls.value[selectedId.value]
        removeMovable()
      }
    }

    const handleSelectMovable = (id: string) => {
      selectMovable(id)
    }

    const handleDeselectAll = () => {
      deselectAll()
    }

    const toggleElementDraggable = () => {
      if (selectedId.value) {
        const controls = getElementControls(selectedId.value)
        if (controls) {
          controls.isDraggable = !controls.isDraggable
        }
      }
    }

    const toggleElementResizable = () => {
      if (selectedId.value) {
        const controls = getElementControls(selectedId.value)
        if (controls) {
          controls.isResizable = !controls.isResizable
        }
      }
    }

    const toggleElementRotatable = () => {
      if (selectedId.value) {
        const controls = getElementControls(selectedId.value)
        if (controls) {
          controls.isRotatable = !controls.isRotatable
        }
      }
    }

    return {
      movables,
      selectedId,
      elementControls,
      getElementControls,
      handleAddMovable,
      handleRemoveMovable,
      handleSelectMovable,
      handleDeselectAll,
      toggleElementDraggable,
      toggleElementResizable,
      toggleElementRotatable
    }
  }
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  overflow: hidden;
}
</style>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}
</style>
