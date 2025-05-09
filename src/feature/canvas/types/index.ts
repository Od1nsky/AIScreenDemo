export interface Movable {
  id: string
  x: number
  y: number
  width: number
  height: number
  rotation: number
}

export interface ElementControls {
  isDraggable: boolean
  isResizable: boolean
  isRotatable: boolean
}

export interface MoveableEvent {
  target: HTMLElement
  transform: string
  drag?: {
    transform: string
  }
  width?: number
  height?: number
  delta?: number[]
  direction?: number[]
  rotate?: number
} 