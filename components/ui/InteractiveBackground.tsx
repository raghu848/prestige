'use client'

import React, { useEffect, useRef } from 'react'

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Array<{
      x: number
      y: number
      size: number
      speedY: number
      speedX: number
      alpha: number
      pulseSpeed: number
      pulsePhase: number
      color: string
    }> = []

    const particleCount = 45
    const colors = [
      'rgba(212, 175, 55, 0.45)', // Gold
      'rgba(243, 231, 196, 0.35)', // Cream Gold
      'rgba(176, 141, 87, 0.35)'   // Accent Gold
    ]

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2.2 + 0.4,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.18,
        alpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulsePhase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)]
      })
    }

    const mouse = { x: -1000, y: -1000 }

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    const handleMouseLeave = () => {
      mouse.x = -1000
      mouse.y = -1000
    }

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('resize', handleResize)

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw elegant background gradients (large glowing ambient circles)
      // Circle 1 (amber/gold glow)
      const grad1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.25,
        0,
        width * 0.2,
        height * 0.25,
        Math.max(width, height) * 0.4
      )
      grad1.addColorStop(0, 'rgba(212, 175, 55, 0.035)')
      grad1.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad1
      ctx.fillRect(0, 0, width, height)

      // Circle 2 (blue/navy glow)
      const grad2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.75,
        0,
        width * 0.8,
        height * 0.75,
        Math.max(width, height) * 0.5
      )
      grad2.addColorStop(0, 'rgba(30, 27, 75, 0.12)')
      grad2.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad2
      ctx.fillRect(0, 0, width, height)

      // Circle 3 (accent gold center/right)
      const grad3 = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        0,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.35
      )
      grad3.addColorStop(0, 'rgba(176, 141, 87, 0.025)')
      grad3.addColorStop(1, 'rgba(0, 0, 0, 0)')
      ctx.fillStyle = grad3
      ctx.fillRect(0, 0, width, height)

      // 2. Draw & update particles
      particles.forEach((p) => {
        // Pulse alpha
        p.pulsePhase += p.pulseSpeed
        const currentAlpha = p.alpha * (0.55 + 0.45 * Math.sin(p.pulsePhase))

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color.replace(/[\d.]+\)$/, `${currentAlpha.toFixed(2)})`)
        ctx.fill()

        // Move particle
        p.y += p.speedY
        p.x += p.speedX

        // Interaction with mouse
        if (mouse.x !== -1000) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            const force = (180 - dist) / 180
            // Push away from mouse
            p.x += (dx / dist) * force * 1.6
            p.y += (dy / dist) * force * 1.6
          }
        }

        // Reset if offscreen
        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-0 block w-full h-full"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}
