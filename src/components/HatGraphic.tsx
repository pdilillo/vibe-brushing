import type { Hat } from '../types';

interface FacePosition {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
}

interface HatGraphicProps {
  hat: Hat;
  facePosition: FacePosition | null;
  containerWidth: number;
  containerHeight: number;
  videoWidth: number;
  videoHeight: number;
}

export function HatGraphic({ 
  hat, 
  facePosition, 
  containerWidth, 
  containerHeight,
  videoWidth,
  videoHeight 
}: HatGraphicProps) {
  const defaultHatSize = Math.min(containerWidth * 0.3, 80);
  
  if (!facePosition || containerWidth === 0 || containerHeight === 0 || videoWidth === 0 || videoHeight === 0) {
    return (
      <div 
        className="absolute animate-float"
        style={{
          left: '50%',
          top: '10%',
          transform: 'translateX(-50%)',
        }}
      >
        {renderHatSVG(hat.id, defaultHatSize)}
      </div>
    );
  }

  const scaleX = containerWidth / videoWidth;
  const scaleY = containerHeight / videoHeight;
  
  const minHatWidth = 60;
  const maxHatWidth = containerWidth * 0.35;
  const scaledFaceWidth = facePosition.width * scaleX;
  const hatWidth = Math.max(minHatWidth, Math.min(maxHatWidth, scaledFaceWidth * 0.7));
  
  const mirroredX = videoWidth - facePosition.x;
  const hatX = Math.max(hatWidth / 2, Math.min(containerWidth - hatWidth / 2, mirroredX * scaleX));
  
  const hatY = Math.max(5, Math.min(containerHeight * 0.4, facePosition.y * scaleY));

  console.log('[HatGraphic] Position:', { 
    faceX: facePosition.x.toFixed(0), 
    faceY: facePosition.y.toFixed(0),
    faceW: facePosition.width.toFixed(0),
    hatX: hatX.toFixed(0), 
    hatY: hatY.toFixed(0),
    hatW: hatWidth.toFixed(0)
  });

  return (
    <div 
      className="absolute"
      style={{
        left: `${hatX}px`,
        top: `${hatY}px`,
        transform: 'translateX(-50%)',
        filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))',
        transition: 'left 80ms ease-out, top 80ms ease-out',
      }}
    >
      {renderHatSVG(hat.id, hatWidth)}
    </div>
  );
}

function renderHatSVG(hatId: string, size: number): JSX.Element {
  const width = size;
  const height = size * 0.8;

  switch (hatId) {
    case 'crown':
      return (
        <svg width={width} height={height} viewBox="0 0 100 80" fill="none">
          <defs>
            <linearGradient id="crownGold" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" />
              <stop offset="50%" stopColor="#FFA500" />
              <stop offset="100%" stopColor="#B8860B" />
            </linearGradient>
            <linearGradient id="crownShine" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFF8DC" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFD700" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path 
            d="M5 70 L5 35 L20 50 L35 20 L50 45 L65 20 L80 50 L95 35 L95 70 Z" 
            fill="url(#crownGold)"
            stroke="#B8860B"
            strokeWidth="2"
          />
          <path 
            d="M5 70 L5 35 L20 50 L35 20 L50 45" 
            fill="url(#crownShine)"
          />
          <circle cx="35" cy="28" r="6" fill="#E31C1C" stroke="#8B0000" strokeWidth="1" />
          <circle cx="50" cy="50" r="5" fill="#4169E1" stroke="#00008B" strokeWidth="1" />
          <circle cx="65" cy="28" r="6" fill="#32CD32" stroke="#006400" strokeWidth="1" />
          <ellipse cx="50" cy="72" rx="42" ry="6" fill="#B8860B" />
          <rect x="8" y="65" width="84" height="10" fill="url(#crownGold)" stroke="#B8860B" strokeWidth="1" />
        </svg>
      );

    case 'party':
      return (
        <svg width={width} height={height} viewBox="0 0 100 80" fill="none">
          <defs>
            <linearGradient id="partyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="25%" stopColor="#4ECDC4" />
              <stop offset="50%" stopColor="#FFE66D" />
              <stop offset="75%" stopColor="#95E1D3" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>
          <polygon 
            points="50,5 20,75 80,75" 
            fill="url(#partyGradient)"
            stroke="#333"
            strokeWidth="2"
          />
          <line x1="30" y1="60" x2="55" y2="20" stroke="#333" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="45" y1="60" x2="50" y2="30" stroke="#333" strokeWidth="2" strokeDasharray="4,4" />
          <line x1="60" y1="60" x2="52" y2="25" stroke="#333" strokeWidth="2" strokeDasharray="4,4" />
          <circle cx="50" cy="5" r="8" fill="#FFD700" stroke="#FFA500" strokeWidth="2" />
          <ellipse cx="50" cy="75" rx="30" ry="5" fill="#8B4513" opacity="0.5" />
        </svg>
      );

    case 'wizard':
      return (
        <svg width={width} height={height} viewBox="0 0 100 90" fill="none">
          <defs>
            <linearGradient id="wizardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4B0082" />
              <stop offset="100%" stopColor="#191970" />
            </linearGradient>
          </defs>
          <polygon 
            points="50,5 15,85 85,85" 
            fill="url(#wizardGradient)"
            stroke="#2E0854"
            strokeWidth="2"
          />
          <polygon points="50,20 45,35 55,35" fill="#FFD700" />
          <polygon points="50,40 42,55 58,55" fill="#FFD700" />
          <polygon points="50,58 38,75 62,75" fill="#FFD700" />
          <circle cx="50" cy="32" r="3" fill="#ADD8E6" opacity="0.7" />
          <circle cx="40" cy="55" r="2" fill="#ADD8E6" opacity="0.7" />
          <circle cx="60" cy="50" r="2.5" fill="#ADD8E6" opacity="0.7" />
          <circle cx="35" cy="70" r="2" fill="#ADD8E6" opacity="0.7" />
          <circle cx="65" cy="68" r="2" fill="#ADD8E6" opacity="0.7" />
        </svg>
      );

    case 'cowboy':
      return (
        <svg width={width} height={height} viewBox="0 0 120 80" fill="none">
          <defs>
            <linearGradient id="cowboyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#D2691E" />
              <stop offset="100%" stopColor="#8B4513" />
            </linearGradient>
          </defs>
          <ellipse cx="60" cy="65" rx="58" ry="12" fill="url(#cowboyGradient)" stroke="#5D3A1A" strokeWidth="2" />
          <path 
            d="M25 65 Q25 30 60 25 Q95 30 95 65" 
            fill="url(#cowboyGradient)"
            stroke="#5D3A1A"
            strokeWidth="2"
          />
          <ellipse cx="60" cy="58" rx="35" ry="8" fill="#5D3A1A" />
          <rect x="30" y="50" width="60" height="8" fill="#1a0f05" />
          <circle cx="45" cy="54" r="3" fill="#FFD700" />
          <circle cx="75" cy="54" r="3" fill="#FFD700" />
        </svg>
      );

    case 'chef':
      return (
        <svg width={width} height={height} viewBox="0 0 100 80" fill="none">
          <defs>
            <linearGradient id="chefGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E8E8E8" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="20" r="18" fill="url(#chefGradient)" stroke="#CCC" strokeWidth="1" />
          <circle cx="30" cy="28" r="15" fill="url(#chefGradient)" stroke="#CCC" strokeWidth="1" />
          <circle cx="70" cy="28" r="15" fill="url(#chefGradient)" stroke="#CCC" strokeWidth="1" />
          <circle cx="25" cy="45" r="12" fill="url(#chefGradient)" stroke="#CCC" strokeWidth="1" />
          <circle cx="75" cy="45" r="12" fill="url(#chefGradient)" stroke="#CCC" strokeWidth="1" />
          <rect x="20" y="55" width="60" height="15" rx="2" fill="url(#chefGradient)" stroke="#CCC" strokeWidth="1" />
          <line x1="20" y1="62" x2="80" y2="62" stroke="#DDD" strokeWidth="2" />
        </svg>
      );

    case 'astronaut':
      return (
        <svg width={width} height={height * 1.2} viewBox="0 0 100 100" fill="none">
          <defs>
            <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#F5F5F5" />
              <stop offset="100%" stopColor="#A0A0A0" />
            </linearGradient>
            <linearGradient id="visorGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="55" rx="45" ry="40" fill="url(#helmetGradient)" stroke="#666" strokeWidth="3" />
          <ellipse cx="50" cy="58" rx="32" ry="28" fill="url(#visorGradient)" stroke="#333" strokeWidth="2" />
          <ellipse cx="40" cy="50" rx="8" ry="5" fill="white" opacity="0.4" />
          <rect x="42" y="8" width="16" height="12" rx="3" fill="#666" />
          <rect x="45" y="5" width="10" height="8" rx="2" fill="#444" />
        </svg>
      );

    case 'pirate':
      return (
        <svg width={width} height={height} viewBox="0 0 100 80" fill="none">
          <defs>
            <linearGradient id="pirateGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>
          </defs>
          <path 
            d="M10 70 Q10 35 50 25 Q90 35 90 70 Z" 
            fill="url(#pirateGradient)"
            stroke="#333"
            strokeWidth="2"
          />
          <path 
            d="M5 68 Q50 78 95 68" 
            fill="none"
            stroke="#FFD700"
            strokeWidth="4"
          />
          <g transform="translate(35, 35)">
            <ellipse cx="15" cy="15" rx="12" ry="10" fill="none" stroke="#FFF" strokeWidth="2" />
            <line x1="8" y1="8" x2="22" y2="22" stroke="#FFF" strokeWidth="2" />
            <line x1="22" y1="8" x2="8" y2="22" stroke="#FFF" strokeWidth="2" />
          </g>
        </svg>
      );

    case 'princess':
      return (
        <svg width={width} height={height * 0.6} viewBox="0 0 100 50" fill="none">
          <defs>
            <linearGradient id="tiaraGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#E8E8E8" />
              <stop offset="50%" stopColor="#C0C0C0" />
              <stop offset="100%" stopColor="#A8A8A8" />
            </linearGradient>
          </defs>
          <path 
            d="M5 45 L15 20 L25 35 L35 10 L50 30 L65 10 L75 35 L85 20 L95 45 Z" 
            fill="url(#tiaraGradient)"
            stroke="#888"
            strokeWidth="2"
          />
          <circle cx="35" cy="15" r="5" fill="#FF69B4" stroke="#FF1493" strokeWidth="1" />
          <circle cx="50" cy="32" r="4" fill="#87CEEB" stroke="#4169E1" strokeWidth="1" />
          <circle cx="65" cy="15" r="5" fill="#FF69B4" stroke="#FF1493" strokeWidth="1" />
          <circle cx="15" cy="25" r="3" fill="#98FB98" stroke="#228B22" strokeWidth="1" />
          <circle cx="85" cy="25" r="3" fill="#98FB98" stroke="#228B22" strokeWidth="1" />
          <ellipse cx="50" cy="46" rx="45" ry="4" fill="#888" opacity="0.5" />
        </svg>
      );

    case 'unicorn-horn':
      return (
        <svg width={width * 0.6} height={height * 1.2} viewBox="0 0 60 100" fill="none">
          <defs>
            <linearGradient id="hornGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#FFB6C1" />
              <stop offset="25%" stopColor="#DDA0DD" />
              <stop offset="50%" stopColor="#87CEEB" />
              <stop offset="75%" stopColor="#98FB98" />
              <stop offset="100%" stopColor="#FFD700" />
            </linearGradient>
          </defs>
          <polygon 
            points="30,5 20,95 40,95" 
            fill="url(#hornGradient)"
            stroke="#DDA0DD"
            strokeWidth="2"
          />
          <path d="M25 85 Q30 80 35 85" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          <path d="M26 70 Q30 65 34 70" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          <path d="M27 55 Q30 50 33 55" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          <path d="M28 40 Q30 35 32 40" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          <path d="M29 25 Q30 20 31 25" fill="none" stroke="#FFF" strokeWidth="2" opacity="0.6" />
          <circle cx="30" cy="8" r="6" fill="#FFD700">
            <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
          </circle>
        </svg>
      );

    case 'dragon-horns':
      return (
        <svg width={width} height={height} viewBox="0 0 120 80" fill="none">
          <defs>
            <linearGradient id="dragonHornGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#2F4F4F" />
              <stop offset="50%" stopColor="#556B2F" />
              <stop offset="100%" stopColor="#228B22" />
            </linearGradient>
          </defs>
          <path 
            d="M20 75 Q5 40 25 10 Q30 25 35 75 Z" 
            fill="url(#dragonHornGradient)"
            stroke="#1a1a1a"
            strokeWidth="2"
          />
          <path 
            d="M100 75 Q115 40 95 10 Q90 25 85 75 Z" 
            fill="url(#dragonHornGradient)"
            stroke="#1a1a1a"
            strokeWidth="2"
          />
          <ellipse cx="27" cy="75" rx="15" ry="5" fill="#2F4F4F" />
          <ellipse cx="93" cy="75" rx="15" ry="5" fill="#2F4F4F" />
          <path d="M22 55 Q27 50 32 55" fill="none" stroke="#6B8E23" strokeWidth="2" />
          <path d="M20 40 Q27 35 34 40" fill="none" stroke="#6B8E23" strokeWidth="2" />
          <path d="M88 55 Q93 50 98 55" fill="none" stroke="#6B8E23" strokeWidth="2" />
          <path d="M86 40 Q93 35 100 40" fill="none" stroke="#6B8E23" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg width={width} height={height} viewBox="0 0 100 80" fill="none">
          <defs>
            <linearGradient id="defaultHatGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#333" />
              <stop offset="100%" stopColor="#111" />
            </linearGradient>
          </defs>
          <ellipse cx="50" cy="65" rx="45" ry="10" fill="url(#defaultHatGradient)" stroke="#000" strokeWidth="2" />
          <path 
            d="M25 65 Q25 30 50 25 Q75 30 75 65" 
            fill="url(#defaultHatGradient)"
            stroke="#000"
            strokeWidth="2"
          />
          <rect x="20" y="58" width="60" height="8" fill="#444" />
        </svg>
      );
  }
}
