<template>
  <div class="toolbar">
    <div class="toolbar-left">
      <button 
        class="add-button"
        @click="$emit('add')"
      >
        Add Object
      </button>
      <button 
        class="remove-button" 
        @click="$emit('remove')"
        :disabled="!selectedId"
      >
        Remove Selected
      </button>
    </div>
    <div class="toolbar-right">
      <button 
        class="control-button"
        :class="{ active: !elementControls?.isDraggable }"
        @click="$emit('toggle-draggable')"
        :disabled="!selectedId"
      >
        Lock Position
      </button>
      <button 
        class="control-button"
        :class="{ active: !elementControls?.isResizable }"
        @click="$emit('toggle-resizable')"
        :disabled="!selectedId"
      >
        Lock Size
      </button>
      <button 
        class="control-button"
        :class="{ active: !elementControls?.isRotatable }"
        @click="$emit('toggle-rotatable')"
        :disabled="!selectedId"
      >
        Lock Rotation
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { ElementControls } from '../types'

export default defineComponent({
  name: 'CanvasToolbar',
  props: {
    selectedId: {
      type: String,
      default: null
    },
    elementControls: {
      type: Object as () => ElementControls | undefined,
      default: undefined
    }
  },
  emits: ['add', 'remove', 'toggle-draggable', 'toggle-resizable', 'toggle-rotatable']
})
</script>

<style scoped>
.toolbar {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  border-bottom: 1px solid #ddd;
}

.toolbar-left {
  display: flex;
  gap: 10px;
}

.toolbar-right {
  display: flex;
  gap: 10px;
}

.add-button,
.remove-button,
.control-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.add-button {
  background: #4CAF50;
  color: white;
}

.remove-button {
  background: #ff4444;
  color: white;
}

.remove-button:disabled {
  background: #ffcccc;
  cursor: not-allowed;
}

.control-button {
  background: #4CAF50;
  color: white;
}

.control-button:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.control-button.active {
  background: #2E7D32;
}
</style> 