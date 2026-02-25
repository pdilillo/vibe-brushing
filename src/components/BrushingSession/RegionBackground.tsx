import { useEffect, useState, useMemo } from 'react';
import { getRegionData } from '../../data/regions';
import type { Region } from '../../types';

interface RegionBackgroundProps {
  region: Region;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  y: number;
  size: number;
  speed: number;
  delay: number;
  drift: number;
}

const REGION_BACKGROUNDS: Record<Region, string> = {
  grassland: '/creatures/bg-grassland.png',
  coastal: '/creatures/bg-coastal.png',
  lava: '/creatures/bg-lava.png',
  city: '/creatures/bg-city.png',
  sky: '/creatures/bg-sky.png',
};

export function RegionBackground({ region }: RegionBackgroundProps) {
  const regionData = getRegionData(region);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [imageLoaded, setImageLoaded] = useState(false);

  const backgroundImage = REGION_BACKGROUNDS[region];

  const gradientStyle = useMemo(() => {
    const { colors } = regionData;
    
    switch (region) {
      case 'grassland':
        return {
          background: `linear-gradient(180deg, 
            #87CEEB 0%, 
            #98D8C8 30%, 
            ${colors.secondary} 60%, 
            ${colors.primary} 100%)`,
        };
      case 'coastal':
        return {
          background: `linear-gradient(180deg, 
            #87CEEB 0%, 
            ${colors.secondary} 40%, 
            ${colors.primary} 70%, 
            #1E3A5F 100%)`,
        };
      case 'lava':
        return {
          background: `linear-gradient(180deg, 
            #1C1917 0%, 
            #292524 30%, 
            ${colors.secondary} 70%, 
            ${colors.primary} 100%)`,
        };
      case 'city':
        return {
          background: `linear-gradient(180deg, 
            #0F0B1A 0%, 
            #1E1433 30%, 
            ${colors.primary}40 70%, 
            ${colors.secondary}60 100%)`,
        };
      case 'sky':
        return {
          background: `linear-gradient(180deg, 
            #1E3A5F 0%, 
            ${colors.secondary} 30%, 
            ${colors.primary} 60%, 
            #FEF9C3 100%)`,
        };
      default:
        return { background: colors.background };
    }
  }, [region, regionData]);

  useEffect(() => {
    setImageLoaded(false);
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [backgroundImage]);

  useEffect(() => {
    const newParticles: Particle[] = [];
    const particleCount = 12;
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        emoji: regionData.particles[i % regionData.particles.length],
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 0.8 + Math.random() * 0.8,
        speed: 15 + Math.random() * 20,
        delay: Math.random() * 10,
        drift: (Math.random() - 0.5) * 30,
      });
    }
    
    setParticles(newParticles);
  }, [region, regionData.particles]);

  return (
    <div 
      className="absolute inset-0 overflow-hidden transition-all duration-1000"
      style={gradientStyle}
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: imageLoaded ? 1 : 0,
        }}
      />
      
      {/* Overlay for better contrast with UI elements */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.3) 100%)',
        }}
      />

      {region === 'lava' && (
        <div className="absolute inset-0">
          <div 
            className="absolute bottom-0 left-0 right-0 h-1/3 opacity-60"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, #EF4444 50%, #FCD34D 100%)',
              animation: 'pulse 2s ease-in-out infinite',
            }}
          />
          <div 
            className="absolute bottom-0 left-1/4 w-1/2 h-1/4 opacity-40 rounded-t-full"
            style={{
              background: 'radial-gradient(ellipse at bottom, #FBBF24 0%, transparent 70%)',
              animation: 'pulse 3s ease-in-out infinite',
            }}
          />
        </div>
      )}

      {region === 'city' && (
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 bg-gradient-to-t from-purple-900 to-transparent"
              style={{
                left: `${i * 14 + Math.random() * 5}%`,
                width: `${3 + Math.random() * 4}%`,
                height: `${20 + Math.random() * 40}%`,
                opacity: 0.6,
              }}
            >
              {[...Array(Math.floor(Math.random() * 5) + 2)].map((_, j) => (
                <div
                  key={j}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + j * 15 + Math.random() * 10}%`,
                    backgroundColor: ['#22D3EE', '#E879F9', '#FBBF24'][Math.floor(Math.random() * 3)],
                    animation: `pulse ${1 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {region === 'sky' && (
        <div className="absolute inset-0">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white/30"
              style={{
                left: `${i * 25 - 10 + Math.random() * 20}%`,
                top: `${60 + Math.random() * 30}%`,
                width: `${15 + Math.random() * 20}%`,
                height: `${8 + Math.random() * 8}%`,
                animation: `float ${8 + Math.random() * 4}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      )}

      {region === 'coastal' && (
        <div className="absolute bottom-0 left-0 right-0 h-1/4">
          <div 
            className="absolute inset-0 opacity-50"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, #0EA5E9 100%)',
            }}
          />
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute bottom-0 left-0 right-0 h-2 bg-white/30 rounded-full"
              style={{
                transform: `translateY(${i * -8}px)`,
                animation: `wave ${3 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}

      {region === 'grassland' && (
        <div className="absolute bottom-0 left-0 right-0 h-1/6">
          <svg viewBox="0 0 100 20" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0 20 Q 10 10, 20 15 T 40 12 T 60 16 T 80 10 T 100 14 L 100 20 Z"
              fill="#22C55E"
              opacity="0.8"
            />
            <path
              d="M0 20 Q 15 15, 25 18 T 50 14 T 75 17 T 100 12 L 100 20 Z"
              fill="#16A34A"
              opacity="0.6"
            />
          </svg>
        </div>
      )}

      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute pointer-events-none select-none"
          style={{
            left: `${particle.x}%`,
            fontSize: `${particle.size}rem`,
            animation: `floatParticle ${particle.speed}s linear infinite`,
            animationDelay: `${particle.delay}s`,
            '--drift': `${particle.drift}px`,
          } as React.CSSProperties}
        >
          {particle.emoji}
        </div>
      ))}

      <style>{`
        @keyframes floatParticle {
          0% {
            transform: translateY(100vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(-20vh) translateX(var(--drift));
            opacity: 0;
          }
        }
        
        @keyframes wave {
          0%, 100% {
            transform: translateX(-5%) scaleY(1);
          }
          50% {
            transform: translateX(5%) scaleY(1.2);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
}
