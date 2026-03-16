'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface CompanyNode {
  id: string;
  name: string;
  tagline: string;
  description: string;
  link: string;
  linkLabel: string;
  x: number;
  y: number;
  glowColor: string;
  glowColorRaw: string;
  isCenter?: boolean;
  size: number;
}

const COMPANIES: CompanyNode[] = [
  {
    id: 'center',
    name: 'Prestige Realty',
    tagline: 'Architecture of Luxury',
    description:
      'Redefining premium living with over 20 years of excellence in Chandigarh. Our commitment to quality and innovation forms the foundation of every project we undertake.',
    link: '/about',
    linkLabel: 'Our Legacy',
    x: 50,
    y: 50,
    glowColor: 'rgba(212, 175, 55, 0.35)', // Prestige Gold
    glowColorRaw: '#D4AF37',
    isCenter: true,
    size: 220,
  },
  {
    id: 'residential',
    name: 'Residential Excellence',
    tagline: 'Bespoke Living Spaces',
    description:
      'Curating a portfolio of ultra-luxury apartments, villas, and penthouses. Designed for those who seek the extraordinary in every detail.',
    link: '/properties?category=residential',
    linkLabel: 'View Residences',
    x: 35,
    y: 18,
    glowColor: 'rgba(26, 43, 74, 0.38)', // Prestige Navy
    glowColorRaw: '#1A2B4A',
    size: 175,
  },
  {
    id: 'commercial',
    name: 'Commercial Hubs',
    tagline: 'Business Infrastructure',
    description:
      'State-of-the-art office spaces and retail destinations in prime locations. Providing the infrastructure for modern business success and growth.',
    link: '/properties?category=commercial',
    linkLabel: 'Explore Spaces',
    x: 75,
    y: 20,
    glowColor: 'rgba(176, 141, 87, 0.38)', // Prestige Accent
    glowColorRaw: '#B08D57',
    size: 170,
  },
  {
    id: 'leasing',
    name: 'Premium Leasing',
    tagline: 'Elite Rental Solutions',
    description:
      'Managing an exclusive collection of high-end rental properties. Seamless transitions and world-class management for discerning global clients.',
    link: '/properties?category=leasing',
    linkLabel: 'Available Leases',
    x: 15,
    y: 45,
    glowColor: 'rgba(196, 132, 59, 0.4)', // Prestige Gold Alt
    glowColorRaw: '#C4843B',
    size: 165,
  },
  {
    id: 'development',
    name: 'Strategic Development',
    tagline: 'Envisioning Tomorrow',
    description:
      'Leading urban evolution with sustainability and heritage preservation. Creating master-planned communities that stand the test of time.',
    link: '/services',
    linkLabel: 'Learn More',
    x: 25,
    y: 78,
    glowColor: 'rgba(10, 17, 40, 0.38)', // Navy Dark
    glowColorRaw: '#0A1128',
    size: 168,
  },
  {
    id: 'portfolio',
    name: 'Portfolio Management',
    tagline: 'Asset Excellence',
    description:
      'Dedicated property management services to maintain and enhance value. We treat your property with the same care as our own masterpieces.',
    link: '/services',
    linkLabel: 'Our Services',
    x: 82,
    y: 75,
    glowColor: 'rgba(18, 18, 18, 0.4)', // Dark
    glowColorRaw: '#121212',
    size: 162,
  },
  {
    id: 'advisory',
    name: 'Investment Advisory',
    tagline: 'Wealth Through Realty',
    description:
      'Expert guidance for high-yield real estate investments. Analyzing market trends to ensure your portfolio grows with security and precision.',
    link: '/contact',
    linkLabel: 'Consult Expert',
    x: 52,
    y: 85,
    glowColor: 'rgba(212, 175, 55, 0.38)', // Gold
    glowColorRaw: '#D4AF37',
    size: 160,
  },
];


// Particle type
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  phase: number;
}

export default function ConstellationSection() {
  const [hoveredNode, setHoveredNode] = useState<CompanyNode | null>(null);
  const [activeNode, setActiveNode] = useState<CompanyNode | null>(null);
  const [cardPos, setCardPos] = useState({ x: 0, y: 0 });
  const [cardVisible, setCardVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 28 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.25 + 0.05,
      speed: Math.random() * 0.3 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }))
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number>(0);

  // Mount animation
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Animation loop
  useEffect(() => {
    let last = performance.now();
    const loop = (now: number) => {
      const delta = (now - last) / 1000;
      last = now;
      setTime((prev) => prev + delta * 0.4);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const updateCardPos = useCallback(
    (mx: number, my: number, card: HTMLDivElement | null, container: DOMRect) => {
      if (!card) return;
      const cw = card.offsetWidth || 340;
      const ch = card.offsetHeight || 240;
      const pad = 24;
      let x = mx + 28;
      let y = my + 28;
      if (x + cw > container.width - pad) x = mx - cw - 28;
      if (y + ch > container.height - pad) y = my - ch - 28;
      if (x < pad) x = pad;
      if (y < pad) y = pad;
      setCardPos({ x, y });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setMousePos({ x: mx, y: my });
      if (hoveredNode) {
        updateCardPos(mx, my, cardRef.current, rect);
      }
    },
    [hoveredNode, updateCardPos]
  );

  const handleNodeEnter = useCallback(
    (node: CompanyNode, e: React.MouseEvent) => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
      setHoveredNode(node);
      setActiveNode(node);
      setCardVisible(true);
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      updateCardPos(mx, my, cardRef.current, rect);
    },
    [updateCardPos]
  );

  const handleNodeLeave = useCallback(() => {
    setCardVisible(false);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredNode(null);
      setActiveNode(null);
    }, 300);
  }, []);

  // Line animation progress for each connection
  const getLineOpacity = (nodeId: string) => {
    if (!hoveredNode) return 0.18;
    if (hoveredNode.id === 'center' || hoveredNode.id === nodeId) return 0.65;
    return 0.08;
  };

  const getLineDash = (nodeId: string) => {
    if (hoveredNode?.id === nodeId || hoveredNode?.id === 'center') {
      return `3,4`;
    }
    return `2,5`;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Jost:wght@200;300;400;500&display=swap');

        .constellation-section {
          font-family: 'Jost', sans-serif;
        }

        .node-name {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          font-size: 13px;
          letter-spacing: 0.06em;
          color: #1a1613;
          white-space: nowrap;
          line-height: 1.3;
          transition: opacity 0.5s ease, transform 0.5s ease;
          text-align: center;
          pointer-events: none;
          user-select: none;
        }

        .card-title {
          font-family: 'Cormorant Garamond', Georgia, serif;
          font-weight: 400;
          color: #1a1613;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .card-tagline {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 10px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #9a8f85;
        }

        .card-desc {
          font-family: 'Jost', sans-serif;
          font-weight: 300;
          font-size: 14px;
          line-height: 1.7;
          color: #5c544e;
        }

        .card-link {
          font-family: 'Jost', sans-serif;
          font-weight: 400;
          font-size: 10.5px;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #1a1613;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          position: relative;
          cursor: pointer;
        }

        .card-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          right: 0;
          height: 1px;
          background: #1a1613;
          transform: scaleX(0.3);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .card-link:hover::after {
          transform: scaleX(1);
        }

        .node-dot-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid currentColor;
          animation: ringPulse 3s ease-in-out infinite;
        }

        @keyframes ringPulse {
          0% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }

        @keyframes glowBreath {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.06); opacity: 0.85; }
        }

        @keyframes nodeEntrance {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.4); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }

        @keyframes cardSlideIn {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes lineDrawIn {
          from { stroke-dashoffset: 200; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes particleDrift {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }

        .hover-card {
          animation: cardSlideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .section-label {
          font-family: 'Jost', sans-serif;
          font-weight: 200;
          font-size: 10px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: #b0a89e;
        }
      `}</style>

      <section
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="constellation-section relative w-full overflow-hidden select-none"
        style={{
          height: '100svh',
          minHeight: '600px',
          backgroundColor: '#f2ede7',
          cursor: hoveredNode ? 'none' : 'default',
        }}
      >
        {/* Grain texture */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" style={{ zIndex: 1 }}>
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(210,200,188,0.22) 100%)',
            zIndex: 2,
          }}
        />

        {/* Top label */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            zIndex: 10,
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(-12px)',
            transition: 'all 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <span className="section-label">The Group</span>
          <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to bottom, #b0a89e, transparent)' }} />
        </div>

        {/* Floating ambient particles */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
          {mounted && particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y + Math.sin(time * p.speed + p.phase) * 2}%`,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: '#8a7e74',
                opacity: p.opacity * (0.7 + 0.3 * Math.sin(time * 0.5 + p.phase)),
                transition: 'none',
              }}
            />
          ))}
        </div>

        {/* SVG Connections */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ zIndex: 4 }}
        >
          <defs>
            {COMPANIES.filter((c) => !c.isCenter).map((c) => (
              <linearGradient
                key={`grad-${c.id}`}
                id={`lineGrad-${c.id}`}
                x1={`${c.x}%`}
                y1={`${c.y}%`}
                x2="50%"
                y2="50%"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor={c.glowColorRaw} stopOpacity="0.6" />
                <stop offset="100%" stopColor="#F5D250" stopOpacity="0.6" />
              </linearGradient>
            ))}
          </defs>

          {COMPANIES.filter((c) => !c.isCenter).map((c) => (
            <g key={`conn-${c.id}`}>
              {/* Base dashed line */}
              <line
                x1={`${c.x}%`}
                y1={`${c.y}%`}
                x2="50%"
                y2="50%"
                stroke="#c4b8ac"
                strokeWidth="0.12"
                strokeDasharray={getLineDash(c.id)}
                strokeOpacity={getLineOpacity(c.id)}
                style={{ transition: 'stroke-opacity 0.5s ease, stroke-dasharray 0.5s ease' }}
              />
              {/* Glow line on hover */}
              {(hoveredNode?.id === c.id || hoveredNode?.id === 'center') && (
                <line
                  x1={`${c.x}%`}
                  y1={`${c.y}%`}
                  x2="50%"
                  y2="50%"
                  stroke={`url(#lineGrad-${c.id})`}
                  strokeWidth="0.18"
                  strokeOpacity="0.5"
                />
              )}
            </g>
          ))}
        </svg>

        {/* Nodes */}
        {COMPANIES.map((node, index) => {
          const phase = index * (Math.PI * 2 / COMPANIES.length);
          const floatX = Math.sin(time * 0.6 + phase) * (node.isCenter ? 4 : 8);
          const floatY = Math.cos(time * 0.45 + phase * 1.3) * (node.isCenter ? 4 : 8);
          const isHovered = hoveredNode?.id === node.id;
          const isRelated = hoveredNode?.id === 'center' || (hoveredNode && !node.isCenter);

          return (
            <div
              key={node.id}
              className="absolute"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: `translate(-50%, -50%) translate(${floatX}px, ${floatY}px)`,
                zIndex: 5,
                opacity: mounted ? 1 : 0,
                transition: mounted ? 'none' : 'opacity 0.8s ease',
                animationDelay: `${index * 0.12}s`,
              }}
            >
              {/* Glow blob */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: `${node.size}px`,
                  height: `${node.size}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${node.glowColor} 0%, transparent 70%)`,
                  left: `${-node.size / 2}px`,
                  top: `${-node.size / 2}px`,
                  filter: 'blur(18px)',
                  transform: isHovered ? 'scale(1.35)' : 'scale(1)',
                  opacity: isHovered ? 1 : 0.7,
                  transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease',
                  animation: `glowBreath ${3.5 + index * 0.4}s ${index * 0.3}s ease-in-out infinite`,
                }}
              />

              {/* Second inner glow */}
              <div
                className="absolute pointer-events-none"
                style={{
                  width: `${node.size * 0.5}px`,
                  height: `${node.size * 0.5}px`,
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${node.glowColor.replace('0.3', '0.5').replace('0.4', '0.6').replace('0.38', '0.55')} 0%, transparent 70%)`,
                  left: `${-node.size * 0.25}px`,
                  top: `${-node.size * 0.25}px`,
                  filter: 'blur(8px)',
                  opacity: isHovered ? 1 : 0.5,
                  transition: 'opacity 0.5s ease',
                }}
              />

              {/* Interaction zone */}
              <div
                className="absolute rounded-full"
                style={{
                  width: '80px',
                  height: '80px',
                  left: '-40px',
                  top: '-40px',
                  cursor: 'pointer',
                  zIndex: 20,
                }}
                onMouseEnter={(e) => handleNodeEnter(node, e)}
                onMouseLeave={handleNodeLeave}
              />

              {/* Node dot */}
              <div
                className="relative flex items-center justify-center"
                style={{ zIndex: 15 }}
              >
                {/* Pulse ring */}
                {isHovered && (
                  <div
                    className="absolute rounded-full"
                    style={{
                      width: '24px',
                      height: '24px',
                      left: '-12px',
                      top: '-12px',
                      color: node.glowColorRaw,
                      border: `1px solid ${node.glowColorRaw}`,
                      animation: 'ringPulse 1.4s ease-out infinite',
                    }}
                  />
                )}

                {/* Center ring (static) */}
                <div
                  className="absolute rounded-full"
                  style={{
                    width: isHovered ? '18px' : '12px',
                    height: isHovered ? '18px' : '12px',
                    left: isHovered ? '-9px' : '-6px',
                    top: isHovered ? '-9px' : '-6px',
                    border: `1px solid ${node.glowColorRaw}`,
                    opacity: isHovered ? 0.7 : 0.3,
                    transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
                  }}
                />

                {/* Core dot */}
                <div
                  style={{
                    width: isHovered ? '8px' : '6px',
                    height: isHovered ? '8px' : '6px',
                    backgroundColor: isHovered ? node.glowColorRaw : '#1a1613',
                    borderRadius: '50%',
                    transition: 'all 0.3s cubic-bezier(0.16,1,0.3,1)',
                    boxShadow: isHovered ? `0 0 12px ${node.glowColorRaw}` : 'none',
                  }}
                />
              </div>

              {/* Label */}
              <div
                className="node-name absolute"
                style={{
                  top: node.isCenter ? '20px' : '16px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  opacity: isHovered ? 1 : hoveredNode && !isHovered ? 0.3 : 0.75,
                  transition: 'opacity 0.45s ease',
                  maxWidth: '130px',
                }}
              >
                {node.name.split(' ').map((word, wi) => (
                  <span key={wi} style={{ display: 'block' }}>{word}</span>
                ))}
              </div>
            </div>
          );
        })}

        {/* Custom cursor */}
        {hoveredNode && (
          <div
            className="absolute pointer-events-none"
            style={{
              left: mousePos.x,
              top: mousePos.y,
              zIndex: 50,
              transform: 'translate(-50%, -50%)',
              transition: 'left 0.05s linear, top 0.05s linear',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: `1.5px solid ${hoveredNode.glowColorRaw}`,
                opacity: 0.8,
              }}
            />
          </div>
        )}

        {/* Hover Card */}
        <div
          ref={cardRef}
          className={`absolute pointer-events-none ${cardVisible ? 'hover-card' : ''}`}
          style={{
            left: `${cardPos.x}px`,
            top: `${cardPos.y}px`,
            width: hoveredNode?.isCenter ? '400px' : '320px',
            zIndex: 40,
            opacity: cardVisible ? 1 : 0,
            transition: cardVisible ? 'none' : 'opacity 0.2s ease',
            pointerEvents: 'none',
          }}
        >
          {activeNode && (
            <div
              style={{
                background: 'rgba(247, 243, 238, 0.96)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(190,180,168,0.5)',
                borderRadius: '3px',
                padding: activeNode.isCenter ? '36px' : '28px',
                boxShadow:
                  '0 4px 24px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.8)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Color accent top bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: `linear-gradient(90deg, ${activeNode.glowColorRaw}88, ${activeNode.glowColorRaw}22)`,
                }}
              />

              {/* Inner glow */}
              <div
                style={{
                  position: 'absolute',
                  top: '-40px',
                  right: '-40px',
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${activeNode.glowColor} 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                  pointerEvents: 'none',
                  opacity: 0.6,
                }}
              />

              <div style={{ position: 'relative' }}>
                <p className="card-tagline mb-2">{activeNode.tagline}</p>

                <h3
                  className="card-title mb-4"
                  style={{ fontSize: activeNode.isCenter ? '32px' : '26px' }}
                >
                  {activeNode.name}
                </h3>

                <div
                  style={{
                    width: '28px',
                    height: '1px',
                    background: `linear-gradient(90deg, ${activeNode.glowColorRaw}, transparent)`,
                    marginBottom: '16px',
                  }}
                />

                <p className="card-desc mb-6">{activeNode.description}</p>

                <a href={activeNode.link} className="card-link" style={{ pointerEvents: 'auto' }}>
                  {activeNode.linkLabel}
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path
                      d="M1 5H13M9 1L13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Bottom label */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
          style={{
            zIndex: 10,
            opacity: mounted ? (hoveredNode ? 0 : 0.6) : 0,
            transition: 'all 0.6s ease',
          }}
        >
          <div style={{ width: '1px', height: '28px', background: 'linear-gradient(to top, #b0a89e, transparent)' }} />
          <span className="section-label">Hover to explore</span>
        </div>
      </section>
    </>
  );
}