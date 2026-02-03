<!-- MatrixRain.vue -->
<template>
  <div class="matrix-container">
    <canvas ref="canvas" class="matrix-canvas"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number | null = null

// Настройки
const fontSize = 16
const columns: number[] = []
let drops: number[] = []

const chars = '01隸アイウエオカキクケ刘德升コサシスセソタチツテ隶书トナニヌネノハヒフ筆畫ヘホマミムメモヤユ异体字ヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'

let width = 0
let height = 0

const initCanvas = () => {
  if (!canvas.value) return

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  // Адаптация под размер экрана
  width = canvas.value.width = window.innerWidth
  height = canvas.value.height = window.innerHeight

  // Количество столбцов
  const colCount = Math.floor(width / fontSize)

  // Инициализация капель
  drops = new Array(colCount).fill(1)
  
  // Начальные позиции (чтобы не все начинали сверху одновременно)
  for (let i = 0; i < colCount; i++) {
    columns[i] = Math.floor(Math.random() * -50) - 10
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, width, height)
  ctx.font = `${fontSize}px monospace`
}

const draw = () => {
  if (!ctx || !canvas.value) return

  // Полупрозрачный чёрный фон → создаёт след
  ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
  ctx.fillRect(0, 0, width, height)

  ctx.fillStyle = '#752BBD'
  ctx.shadowColor = '#3D1266'
  ctx.shadowBlur = 8

  for (let i = 0; i < drops.length; i++) {
    // Случайный символ
    const text = chars[Math.floor(Math.random() * chars.length)] as string;

    // Координаты символа
    const x = i * fontSize
    const y = drops[i] * fontSize

    // Рисуем символ
    ctx.fillText(text, x, y)

    // Если символ ушёл за экран → начинаем сверху с небольшой задержкой
    if (y > height && Math.random() > 0.975) {
      drops[i] = 0
    }

    const speed = 1.3 + Math.random();   // 0.8–2.0
    drops[i] += speed / 2;
  }

  ctx.shadowBlur = 0  // отключаем свечение для следующего кадра (оптимизация)
  animationFrameId = requestAnimationFrame(draw)
}

const resizeHandler = () => {
  if (!canvas.value) return
  width = canvas.value.width = window.innerWidth
  height = canvas.value.height = window.innerHeight

  // Пересчитываем количество столбцов при изменении размера
  const newColCount = Math.floor(width / fontSize)
  
  // Сохраняем старые капли, если размер не сильно изменился
  if (newColCount !== drops.length) {
    const oldDrops = [...drops]
    drops = new Array(newColCount).fill(1)
    
    for (let i = 0; i < Math.min(newColCount, oldDrops.length); i++) {
      drops[i] = oldDrops[i]
    }
  }
}

onMounted(() => {
  if (!canvas.value) return

  initCanvas()
  window.addEventListener('resize', resizeHandler)
  
  // Запускаем анимацию
  draw()
})

onUnmounted(() => {
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
  window.removeEventListener('resize', resizeHandler)
})
</script>

<style scoped>
.matrix-container {
  position: fixed;
  inset: 0;
  background: #000;
  overflow: hidden;
  z-index: -1;
  pointer-events: none;
}

.matrix-canvas {
  display: block;
}
</style>