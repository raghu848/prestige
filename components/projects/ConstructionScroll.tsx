'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { Hammer } from 'lucide-react'

const stages = [
  {
    step: "01",
    title: "Site Plot & Preparation",
    desc: "Surveying stakes and alignment strings mark the building footprint on freshly graded soil, preparing the canvas for excavation."
  },
  {
    step: "02",
    title: "Trench Excavation",
    desc: "Foundation trenches are dug around the outline, removing soil to expose stable earth layers for structural support."
  },
  {
    step: "03",
    title: "Foundation Slab Poured",
    desc: "Concrete is poured and cured into a solid, level slab base, complete with integrated structural anchor bolts."
  },
  {
    step: "04",
    title: "Ground Floor Frame",
    desc: "Steel and timber columns rise from the slab, establishing the skeleton of the lower level under light scaffolding."
  },
  {
    step: "05",
    title: "Full Two-Story Frame",
    desc: "Double-story structural framing is completed and roof trusses are placed, fully enclosed by safety scaffolding."
  },
  {
    step: "06",
    title: "Exterior Enclosure",
    desc: "Structural wall panels are installed on both floors, outlining window and door openings while enclosing the interior."
  },
  {
    step: "07",
    title: "Weathertight Roofing",
    desc: "Premium roofing tiles, flashing, and gutter systems are fitted, making the entire residence dry and weathertight."
  },
  {
    step: "08",
    title: "Windows & Glazing",
    desc: "Insulated glazing and entry doors are fitted. The home is now sealed from the elements, revealing raw masonry."
  },
  {
    step: "09",
    title: "Exterior Facade",
    desc: "Smooth facades, stone cladding details, and paint coats are completed, defining the elegant architectural facade."
  },
  {
    step: "10",
    title: "Landscaping Commences",
    desc: "Driveways are paved, lawn beds prepared, turf rolls laid down, and young plants and shrubs are placed."
  },
  {
    step: "11",
    title: "External Lighting & Details",
    desc: "Lawn turf establishes a rich green cover. Outdoor architectural lights and custom fixtures are connected."
  },
  {
    step: "12",
    title: "Pristine Luxury Completed",
    desc: "The architectural masterpiece stands fully finished, surrounded by mature gardens, ready for luxury living."
  }
]

export default function ConstructionScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentFrame, setCurrentFrame] = useState(1)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Map latest (0 to 1) to frame index 1 to 12
    const frame = Math.min(12, Math.max(1, Math.floor(latest * 12) + 1))
    setCurrentFrame(frame)
  })

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-slate-950 text-white w-full">
      {/* Sticky Frame viewport */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-6 sm:px-12 lg:px-16">
        
        {/* Decorative Grid Lines */}
        <div className="absolute inset-0 grid grid-cols-4 pointer-events-none opacity-[0.03] z-0">
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
          <div className="border-r border-white h-full" />
        </div>

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center z-10 relative">
          
          {/* Left Column: Visual Stack */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Header Title */}
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400">
                <Hammer size={18} />
              </div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-zinc-500 font-bold">Construction Timeline</span>
            </div>

            {/* Frame Container */}
            <div className="relative aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-900 border border-white/10 shadow-2xl">
              
              {/* Stacked Images for Preloaded 0ms Flashing Swapping */}
              {Array.from({ length: 12 }).map((_, i) => {
                const frameNum = i + 1
                const isVisible = currentFrame === frameNum
                return (
                  <div
                    key={frameNum}
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isVisible ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                  >
                    <img
                      src={`/images/construction/frame_${frameNum}.png`}
                      alt={stages[i].title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                )
              })}

              {/* Progress Indicator inside image frame */}
              <div className="absolute bottom-4 left-4 z-20 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-bold tracking-wider uppercase">
                Stage {currentFrame} / 12
              </div>
            </div>

          </div>

          {/* Right Column: Text & Descriptions */}
          <div className="lg:col-span-5 flex flex-col justify-center py-4">
            
            {/* Step Number with Frame Animation */}
            <div className="overflow-hidden h-20 mb-2">
              <motion.div
                key={currentFrame}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-7xl font-light font-cormorant-garamond text-amber-500/80 leading-none"
              >
                {stages[currentFrame - 1].step}
              </motion.div>
            </div>

            {/* Stage Title */}
            <div className="overflow-hidden mb-6">
              <motion.h3
                key={currentFrame}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.215, 0.61, 0.355, 1] }}
                className="text-3xl md:text-4xl font-light font-cormorant-garamond tracking-wide"
              >
                {stages[currentFrame - 1].title}
              </motion.h3>
            </div>

            {/* Description */}
            <div className="overflow-hidden min-h-[96px] mb-8">
              <motion.p
                key={currentFrame}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-zinc-400 font-light leading-relaxed text-sm md:text-base"
              >
                {stages[currentFrame - 1].desc}
              </motion.p>
            </div>

            {/* Visual Progress bar */}
            <div className="w-full bg-white/10 h-[2px] rounded-full overflow-hidden">
              <motion.div 
                className="bg-amber-400 h-full origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>

          </div>

        </div>
        
        {/* Scroll Helper */}
        <div className="absolute bottom-6 right-6 lg:right-16 text-[9px] text-zinc-500 uppercase tracking-[0.25em]">
          Scroll to Build
        </div>

      </div>
    </div>
  )
}
