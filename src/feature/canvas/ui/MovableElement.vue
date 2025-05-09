<template>
  <div
    :id="movable.id"
    class="movable-element"
    :class="{ 'is-selected': isSelected }"
    :style="{
      transform: `translate(${movable.x}px, ${movable.y}px) rotate(${movable.rotation}deg)`,
      width: `${movable.width}px`,
      height: `${movable.height}px`
    }"
    @click.stop="$emit('select', movable.id)"
  >
    Element {{ movable.id }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { Movable } from '../types'

export default defineComponent({
  name: 'MovableElement',
  props: {
    movable: {
      type: Object as () => Movable,
      required: true
    },
    isSelected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select']
})
</script>

<style scoped>
.movable-element {
  position: absolute;
  cursor: move;
  background: rgba(76, 175, 80, 0.1);
  border: 2px solid #4CAF50;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #4CAF50;
  user-select: none;
  transform-origin: center center;
  will-change: transform;
}

.movable-element.is-selected {
  border-color: #2E7D32;
  background: rgba(46, 125, 50, 0.1);
}
</style> 