<template>
  <div class="add-buttons">
    <button @click="handleAddObject('text')" class="add-button">
      Add Text
    </button>
    <button @click="handleAddObject('shape')" class="add-button">
      Add Shape
    </button>
    <button @click="handleAddObject('image')" class="add-button">
      Add Image
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useMovable } from '@/store/useMovable'

export default defineComponent({
  name: 'AddMovableButton',
  setup() {
    const { addMovable, movables } = useMovable()

    const handleAddObject = (type: 'text' | 'image' | 'shape') => {
      console.log('Adding object of type:', type)
      addMovable()
      console.log('Current objects:', movables.value)
    }

    return {
      handleAddObject
    }
  }
})
</script>

<style scoped>
.add-buttons {
  display: flex;
  gap: 10px;
}

.add-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.add-button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.add-button:active {
  transform: translateY(0);
  box-shadow: none;
}
</style>
