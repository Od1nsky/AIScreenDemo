<script lang="ts">
import { defineComponent } from 'vue'
import Moveable from 'vue3-moveable'
import type { OnDrag, OnScale, OnRotate, RotationPosition } from 'moveable'

export default defineComponent({
  name: 'MovableComponent',
  components: {
    Moveable
  },
  props: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 100
    },
    rotation: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      required: true
    }
  },
  emits: ['update:x', 'update:y', 'update:width', 'update:height', 'update:rotation'],
  setup(props, { emit }) {
    const draggable = true
    const throttleDrag = 1
    const edgeDraggable = false
    const startDragRotate = 0
    const throttleDragRotate = 0
    const scalable = true
    const keepRatio = false
    const throttleScale = 0
    const renderDirections = ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']
    const rotatable = true
    const throttleRotate = 0
    const rotationPosition: RotationPosition = 'top'

    const onDrag = (e: OnDrag) => {
      e.target.style.transform = e.transform
      const matrix = new DOMMatrix(e.transform)
      emit('update:x', matrix.m41)
      emit('update:y', matrix.m42)
    }

    const onScale = (e: OnScale) => {
      if (e.drag) {
        e.target.style.transform = e.drag.transform
        const matrix = new DOMMatrix(e.drag.transform)
        emit('update:x', matrix.m41)
        emit('update:y', matrix.m42)
        emit('update:width', props.width * matrix.m11)
        emit('update:height', props.height * matrix.m22)
      }
    }

    const onRotate = (e: OnRotate) => {
      if (e.drag) {
        e.target.style.transform = e.drag.transform
        const matrix = new DOMMatrix(e.drag.transform)
        emit('update:x', matrix.m41)
        emit('update:y', matrix.m42)
        emit('update:rotation', Math.atan2(matrix.m21, matrix.m11) * (180 / Math.PI))
      }
    }

    return {
      draggable,
      throttleDrag,
      edgeDraggable,
      startDragRotate,
      throttleDragRotate,
      scalable,
      keepRatio,
      throttleScale,
      renderDirections,
      rotatable,
      throttleRotate,
      rotationPosition,
      onDrag,
      onScale,
      onRotate
    }
  }
})
</script>

<template>
  <div class="container">
    <div 
      :id="id"
      class="target"
      :style="{
        transform: `translate(${x}px, ${y}px) rotate(${rotation}deg)`,
        width: `${width}px`,
        height: `${height}px`
      }"
    >
      <slot></slot>
    </div>
    <Moveable
      :target="[`#${id}`]"
      :draggable="draggable"
      :throttleDrag="throttleDrag"
      :edgeDraggable="edgeDraggable"
      :startDragRotate="startDragRotate"
      :throttleDragRotate="throttleDragRotate"
      :scalable="scalable"
      :keepRatio="keepRatio"
      :throttleScale="throttleScale"
      :renderDirections="renderDirections"
      :rotatable="rotatable"
      :throttleRotate="throttleRotate"
      :rotationPosition="rotationPosition"
      @drag="onDrag"
      @scale="onScale"
      @rotate="onRotate"
    />
  </div>
</template>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100%;
}

.target {
  position: absolute;
  cursor: move;
  background: transparent;
  transform-origin: center center;
  will-change: transform;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
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
