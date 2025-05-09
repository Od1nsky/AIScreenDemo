<template>
  <div 
    ref="canvasRef"
    class="canvas"
    @click="handleDeselectAll"
  >
    <MovableElement
      v-for="movable in movables"
      :key="movable.id"
      :movable="movable"
      :is-selected="selectedId === movable.id"
      @select="handleSelectMovable"
    />
    <Moveable
      :target="selectedId ? [`#${selectedId}`] : []"
      :draggable="getElementControls(selectedId)?.isDraggable ?? true"
      :throttleDrag="0"
      :edgeDraggable="false"
      :startDragRotate="0"
      :throttleDragRotate="0"
      :resizable="getElementControls(selectedId)?.isResizable ?? true"
      :keepRatio="false"
      :throttleResize="0"
      :renderDirections="['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']"
      :rotatable="getElementControls(selectedId)?.isRotatable ?? true"
      :throttleRotate="0"
      :rotationPosition="'top'"
      @drag="onDrag"
      @resize="onResize"
      @rotate="onRotate"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Moveable from 'vue3-moveable'
import { useMovable } from '@/store/useMovable'
import MovableElement from './MovableElement.vue'
import type { ElementControls } from '../types'
import type { OnDrag, OnResize, OnRotate } from 'moveable'

export default defineComponent({
  name: 'CanvasArea',
  components: {
    Moveable,
    MovableElement
  },
  props: {
    selectedId: {
      type: String,
      default: undefined
    },
    elementControls: {
      type: Object as () => Record<string, ElementControls>,
      required: true
    }
  },
  emits: ['select', 'deselect'],
  setup(props, { emit }) {
    const { movables, selectMovable, deselectAll, updateMovable } = useMovable()
    const canvasRef = ref<HTMLElement | null>(null)

    const getElementControls = (id: string | null): ElementControls | undefined => {
      if (!id) return undefined
      return props.elementControls[id]
    }

    const handleSelectMovable = (id: string) => {
      selectMovable(id)
      emit('select', id)
    }

    const handleDeselectAll = () => {
      deselectAll()
      emit('deselect')
    }

    const onDrag = (e: OnDrag) => {
      e.target.style.transform = e.transform
      const matrix = new DOMMatrix(e.transform)
      const id = e.target.id
      updateMovable(id, {
        x: matrix.m41,
        y: matrix.m42
      })
    }

    const onResize = (e: OnResize) => {
      if (e.drag) {
        const id = e.target.id
        const movable = movables.value.find(m => m.id === id)
        if (movable && e.width !== undefined && e.height !== undefined) {
          e.target.style.width = `${e.width}px`
          e.target.style.height = `${e.height}px`
          updateMovable(id, {
            width: e.width,
            height: e.height
          })
        }
      }
    }

    const onRotate = (e: OnRotate) => {
      if (e.rotate !== undefined && e.drag) {
        e.target.style.transform = e.drag.transform
        const matrix = new DOMMatrix(e.drag.transform)
        const id = e.target.id
        updateMovable(id, {
          x: matrix.m41,
          y: matrix.m42,
          rotation: e.rotate
        })
      }
    }

    return {
      movables,
      canvasRef,
      getElementControls,
      handleSelectMovable,
      handleDeselectAll,
      onDrag,
      onResize,
      onRotate
    }
  }
})
</script>

<style scoped>
.canvas {
  flex: 1;
  position: relative;
  overflow: hidden;
  background: white;
}

:deep(.moveable-control) {
  z-index: 1000;
}

:deep(.moveable-line) {
  background: #4CAF50 !important;
}

:deep(.moveable-control) {
  background: #4CAF50 !important;
  border: 2px solid white !important;
  margin-top: -4px !important;
  margin-left: -4px !important;
  width: 8px !important;
  height: 8px !important;
}

:deep(.moveable-rotation-control) {
  background: #4CAF50 !important;
  border: 2px solid white !important;
  margin-top: -4px !important;
  margin-left: -4px !important;
  width: 8px !important;
  height: 8px !important;
}

:deep(.moveable-rotation-line) {
  background: #4CAF50 !important;
}
</style> 