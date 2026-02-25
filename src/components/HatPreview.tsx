interface HatPreviewProps {
  hatId: string;
  size: number;
}

export function HatPreview({ hatId, size }: HatPreviewProps) {
  const width = size;
  const height = size * 0.95;

  switch (hatId) {
    case 'crown':
      return renderSlimeCrown(width, height, hatId);
    case 'party':
      return renderMothParty(width, height, hatId);
    case 'wizard':
      return renderDragonWizard(width, height, hatId);
    case 'cowboy':
      return renderTurtleCowboy(width, height, hatId);
    case 'chef':
      return renderCrabChef(width, height, hatId);
    case 'astronaut':
      return renderFishAstronaut(width, height, hatId);
    case 'pirate':
      return renderBirdPirate(width, height, hatId);
    case 'princess':
      return renderBunnyPrincess(width, height, hatId);
    case 'unicorn-horn':
      return renderCatUnicorn(width, height, hatId);
    case 'dragon-horns':
      return renderDragonPet(width, height, hatId);
    default:
      return renderSlimeCrown(width, height, hatId);
  }
}

function renderSlimeCrown(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id={`slimeBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FE86A" />
          <stop offset="40%" stopColor="#4CD137" />
          <stop offset="100%" stopColor="#2D8F1F" />
        </linearGradient>
        <linearGradient id={`slimeHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#BFFFB0" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FE86A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4CD137" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`crownGold-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE55C" />
          <stop offset="30%" stopColor="#FFD700" />
          <stop offset="70%" stopColor="#DAA520" />
          <stop offset="100%" stopColor="#B8860B" />
        </linearGradient>
      </defs>
      
      <ellipse cx="50" cy="68" rx="40" ry="24" fill={`url(#slimeBody-${hatId})`} />
      <ellipse cx="38" cy="58" rx="18" ry="10" fill={`url(#slimeHighlight-${hatId})`} />
      
      <ellipse cx="18" cy="75" rx="7" ry="12" fill={`url(#slimeBody-${hatId})`} opacity="0.9" />
      <ellipse cx="82" cy="72" rx="6" ry="10" fill={`url(#slimeBody-${hatId})`} opacity="0.9" />
      <ellipse cx="35" cy="80" rx="5" ry="8" fill={`url(#slimeBody-${hatId})`} opacity="0.85" />
      
      <path d="M18 48 L18 28 L28 38 L38 18 L50 32 L62 18 L72 38 L82 28 L82 48 Z" 
        fill={`url(#crownGold-${hatId})`} stroke="#B8860B" strokeWidth="1.5" />
      
      <circle cx="38" cy="24" r="5" fill="#DC143C" stroke="#8B0000" strokeWidth="1" />
      <ellipse cx="36" cy="22" rx="2" ry="1.5" fill="#FF6B6B" opacity="0.7" />
      <circle cx="62" cy="24" r="5" fill="#4169E1" stroke="#00008B" strokeWidth="1" />
      <ellipse cx="60" cy="22" rx="2" ry="1.5" fill="#87CEEB" opacity="0.7" />
      <circle cx="50" cy="36" r="4" fill="#32CD32" stroke="#006400" strokeWidth="1" />
      
      <rect x="20" y="44" width="60" height="6" rx="1" fill={`url(#crownGold-${hatId})`} stroke="#B8860B" strokeWidth="0.5" />
      
      <ellipse cx="38" cy="62" rx="8" ry="9" fill="white" />
      <ellipse cx="62" cy="62" rx="8" ry="9" fill="white" />
      <ellipse cx="40" cy="63" rx="4" ry="5" fill="#1a1a1a" />
      <ellipse cx="64" cy="63" rx="4" ry="5" fill="#1a1a1a" />
      <ellipse cx="41" cy="61" rx="1.5" ry="2" fill="white" />
      <ellipse cx="65" cy="61" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="26" cy="68" rx="6" ry="3" fill="#FF9EC4" opacity="0.4" />
      <ellipse cx="74" cy="68" rx="6" ry="3" fill="#FF9EC4" opacity="0.4" />
      
      <path d="M 44 74 Q 50 80 56 74" fill="none" stroke="#1F5F14" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function renderMothParty(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id={`mothBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5B8D0" />
          <stop offset="50%" stopColor="#E88CB8" />
          <stop offset="100%" stopColor="#C76A9F" />
        </linearGradient>
        <linearGradient id={`mothHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE4EE" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F5B8D0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E88CB8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`wingGradient-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#87CEEB" />
          <stop offset="50%" stopColor="#5BA3C6" />
          <stop offset="100%" stopColor="#4A90B0" />
        </linearGradient>
        <linearGradient id={`partyHat-${hatId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6B6B" />
          <stop offset="20%" stopColor="#4ECDC4" />
          <stop offset="40%" stopColor="#FFE66D" />
          <stop offset="60%" stopColor="#95E1D3" />
          <stop offset="80%" stopColor="#DDA0DD" />
          <stop offset="100%" stopColor="#FF6B6B" />
        </linearGradient>
      </defs>
      
      <ellipse cx="22" cy="55" rx="20" ry="25" fill={`url(#wingGradient-${hatId})`} opacity="0.9" />
      <ellipse cx="20" cy="50" rx="10" ry="12" fill={`url(#mothHighlight-${hatId})`} />
      <circle cx="18" cy="45" r="5" fill="#E88CB8" opacity="0.7" />
      <ellipse cx="78" cy="55" rx="20" ry="25" fill={`url(#wingGradient-${hatId})`} opacity="0.9" />
      <ellipse cx="80" cy="50" rx="10" ry="12" fill={`url(#mothHighlight-${hatId})`} />
      <circle cx="82" cy="45" r="5" fill="#E88CB8" opacity="0.7" />
      
      <polygon points="50,8 28,50 72,50" fill={`url(#partyHat-${hatId})`} stroke="#333" strokeWidth="1.5" />
      <line x1="36" y1="42" x2="51" y2="15" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      <line x1="50" y1="42" x2="50" y2="18" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      <line x1="64" y1="42" x2="52" y2="15" stroke="rgba(0,0,0,0.15)" strokeWidth="2" />
      
      <circle cx="50" cy="8" r="9" fill="#FFD700" />
      <circle cx="50" cy="8" r="8" fill="#FFEC8B" />
      <ellipse cx="47" cy="5" rx="3" ry="2" fill="#FFF8DC" opacity="0.8" />
      
      <ellipse cx="50" cy="65" rx="22" ry="24" fill={`url(#mothBody-${hatId})`} />
      <ellipse cx="42" cy="58" rx="12" ry="10" fill={`url(#mothHighlight-${hatId})`} />
      
      <path d="M 40 48 Q 32 35 30 28" fill="none" stroke="#C76A9F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 60 48 Q 68 35 70 28" fill="none" stroke="#C76A9F" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="26" r="5" fill="#87CEEB" stroke="#5BA3C6" strokeWidth="1" />
      <circle cx="70" cy="26" r="5" fill="#87CEEB" stroke="#5BA3C6" strokeWidth="1" />
      
      <ellipse cx="42" cy="60" rx="7" ry="8" fill="white" />
      <ellipse cx="58" cy="60" rx="7" ry="8" fill="white" />
      <ellipse cx="43" cy="61" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="59" cy="61" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="44" cy="59" rx="1.5" ry="2" fill="white" />
      <ellipse cx="60" cy="59" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="32" cy="66" rx="5" ry="3" fill="#FF9EC4" opacity="0.5" />
      <ellipse cx="68" cy="66" rx="5" ry="3" fill="#FF9EC4" opacity="0.5" />
      
      <path d="M 45 73 Q 50 78 55 73" fill="none" stroke="#8B4060" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function renderDragonWizard(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 100 98" fill="none">
      <defs>
        <linearGradient id={`dragonBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB347" />
          <stop offset="50%" stopColor="#F59E3D" />
          <stop offset="100%" stopColor="#D4782D" />
        </linearGradient>
        <linearGradient id={`dragonHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFD699" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFB347" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#F59E3D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`wizardHatGrad-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5B2C8A" />
          <stop offset="50%" stopColor="#4B0082" />
          <stop offset="100%" stopColor="#2E0854" />
        </linearGradient>
      </defs>
      
      <polygon points="50,5 18,72 82,72" fill={`url(#wizardHatGrad-${hatId})`} stroke="#2E0854" strokeWidth="1.5" />
      
      <rect x="22" y="65" width="56" height="8" rx="1" fill="#2E0854" />
      
      <polygon points="50,18 48,24 42,24 47,28 45,34 50,30 55,34 53,28 58,24 52,24" fill="#FFD700" opacity="0.7" />
      <polygon points="32,42 30,46 26,46 29,49 28,53 32,50 36,53 35,49 38,46 34,46" fill="#ADD8E6" opacity="0.5" />
      <polygon points="68,38 66,42 62,42 65,45 64,49 68,46 72,49 71,45 74,42 70,42" fill="#ADD8E6" opacity="0.5" />
      
      <ellipse cx="50" cy="82" rx="28" ry="16" fill={`url(#dragonBody-${hatId})`} />
      <ellipse cx="42" cy="78" rx="15" ry="10" fill={`url(#dragonHighlight-${hatId})`} />
      
      <path d="M 26 72 L 16 55 L 30 68" fill="#D4782D" stroke="#A85C20" strokeWidth="1" />
      <path d="M 74 72 L 84 55 L 70 68" fill="#D4782D" stroke="#A85C20" strokeWidth="1" />
      
      <path d="M 22 80 Q 8 72 12 82 Q 5 86 16 84" fill="#E8923A" stroke="#C87028" strokeWidth="1" />
      <path d="M 78 80 Q 92 72 88 82 Q 95 86 84 84" fill="#E8923A" stroke="#C87028" strokeWidth="1" />
      
      <ellipse cx="40" cy="78" rx="6" ry="7" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
      <ellipse cx="60" cy="78" rx="6" ry="7" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
      <ellipse cx="40" cy="78" rx="2" ry="5" fill="#2C1810" />
      <ellipse cx="60" cy="78" rx="2" ry="5" fill="#2C1810" />
      <ellipse cx="39" cy="76" rx="1" ry="1.5" fill="white" />
      <ellipse cx="59" cy="76" rx="1" ry="1.5" fill="white" />
      
      <ellipse cx="46" cy="86" rx="2" ry="1.5" fill="#A85C20" />
      <ellipse cx="54" cy="86" rx="2" ry="1.5" fill="#A85C20" />
      
      <ellipse cx="30" cy="82" rx="5" ry="2.5" fill="#FF9EC4" opacity="0.4" />
      <ellipse cx="70" cy="82" rx="5" ry="2.5" fill="#FF9EC4" opacity="0.4" />
      
      <path d="M 44 90 Q 50 94 56 90" fill="none" stroke="#A85C20" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function renderTurtleCowboy(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 120 90" fill="none">
      <defs>
        <linearGradient id={`turtleBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FDBDA" />
          <stop offset="50%" stopColor="#5BC0BE" />
          <stop offset="100%" stopColor="#3A9E9D" />
        </linearGradient>
        <linearGradient id={`turtleHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8F0EF" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FDBDA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC0BE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`shellBrown-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#A67B5B" />
          <stop offset="50%" stopColor="#8B5A2B" />
          <stop offset="100%" stopColor="#6B4423" />
        </linearGradient>
        <linearGradient id={`shellPattern-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7FDBDA" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#3A9E9D" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      
      <ellipse cx="60" cy="58" rx="56" ry="14" fill={`url(#shellBrown-${hatId})`} stroke="#5D3A1A" strokeWidth="1.5" />
      
      <path d="M 15 58 Q 25 52 35 58" fill="none" stroke={`url(#shellPattern-${hatId})`} strokeWidth="2" />
      <path d="M 45 55 Q 55 48 65 55" fill="none" stroke={`url(#shellPattern-${hatId})`} strokeWidth="2" />
      <path d="M 75 58 Q 85 52 95 58" fill="none" stroke={`url(#shellPattern-${hatId})`} strokeWidth="2" />
      
      <path d="M 28 58 Q 28 22 60 18 Q 92 22 92 58" fill={`url(#shellBrown-${hatId})`} stroke="#5D3A1A" strokeWidth="1.5" />
      
      <path d="M 48 38 L 55 32 L 65 32 L 72 38 L 72 48 L 65 54 L 55 54 L 48 48 Z" 
        fill={`url(#shellPattern-${hatId})`} stroke="#6B4423" strokeWidth="1" />
      
      <rect x="32" y="52" width="56" height="7" fill="#1a0f05" />
      
      <circle cx="48" cy="55.5" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="0.5" />
      <circle cx="72" cy="55.5" r="3" fill="#FFD700" stroke="#DAA520" strokeWidth="0.5" />
      
      <ellipse cx="60" cy="75" rx="20" ry="14" fill={`url(#turtleBody-${hatId})`} />
      <ellipse cx="52" cy="70" rx="10" ry="7" fill={`url(#turtleHighlight-${hatId})`} />
      
      <ellipse cx="52" cy="72" rx="5" ry="6" fill="white" />
      <ellipse cx="68" cy="72" rx="5" ry="6" fill="white" />
      <ellipse cx="53" cy="73" rx="3" ry="4" fill="#2C1810" />
      <ellipse cx="69" cy="73" rx="3" ry="4" fill="#2C1810" />
      <ellipse cx="54" cy="71" rx="1" ry="1.5" fill="white" />
      <ellipse cx="70" cy="71" rx="1" ry="1.5" fill="white" />
      
      <ellipse cx="44" cy="77" rx="4" ry="2" fill="#FF9EC4" opacity="0.4" />
      <ellipse cx="76" cy="77" rx="4" ry="2" fill="#FF9EC4" opacity="0.4" />
      
      <path d="M 55 80 Q 60 84 65 80" fill="none" stroke="#2A7F7E" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="38" cy="82" rx="6" ry="5" fill={`url(#turtleBody-${hatId})`} stroke="#3A9E9D" strokeWidth="0.5" />
      <ellipse cx="82" cy="82" rx="6" ry="5" fill={`url(#turtleBody-${hatId})`} stroke="#3A9E9D" strokeWidth="0.5" />
    </svg>
  );
}

function renderCrabChef(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id={`crabBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FF7F7F" />
          <stop offset="50%" stopColor="#E65C5C" />
          <stop offset="100%" stopColor="#C44040" />
        </linearGradient>
        <linearGradient id={`crabHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFB3B3" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FF7F7F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E65C5C" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`chefHat-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="50%" stopColor="#F5F5F5" />
          <stop offset="100%" stopColor="#E0E0E0" />
        </linearGradient>
      </defs>
      
      <circle cx="50" cy="20" r="17" fill={`url(#chefHat-${hatId})`} stroke="#CCC" strokeWidth="0.8" />
      <ellipse cx="44" cy="15" rx="7" ry="5" fill="white" opacity="0.7" />
      <circle cx="32" cy="27" r="14" fill={`url(#chefHat-${hatId})`} stroke="#CCC" strokeWidth="0.8" />
      <circle cx="68" cy="27" r="14" fill={`url(#chefHat-${hatId})`} stroke="#CCC" strokeWidth="0.8" />
      <circle cx="24" cy="42" r="11" fill={`url(#chefHat-${hatId})`} stroke="#CCC" strokeWidth="0.8" />
      <circle cx="76" cy="42" r="11" fill={`url(#chefHat-${hatId})`} stroke="#CCC" strokeWidth="0.8" />
      
      <rect x="20" y="50" width="60" height="9" rx="1" fill={`url(#chefHat-${hatId})`} stroke="#CCC" strokeWidth="0.8" />
      <line x1="20" y1="54" x2="80" y2="54" stroke="#DDD" strokeWidth="1.5" />
      
      <ellipse cx="50" cy="72" rx="30" ry="20" fill={`url(#crabBody-${hatId})`} />
      <ellipse cx="40" cy="65" rx="15" ry="10" fill={`url(#crabHighlight-${hatId})`} />
      
      <ellipse cx="12" cy="65" rx="10" ry="8" fill={`url(#crabBody-${hatId})`} stroke="#C44040" strokeWidth="1" />
      <path d="M 2 60 Q -5 52 2 62 Q -5 72 2 68" fill={`url(#crabBody-${hatId})`} stroke="#C44040" strokeWidth="1" />
      <ellipse cx="88" cy="65" rx="10" ry="8" fill={`url(#crabBody-${hatId})`} stroke="#C44040" strokeWidth="1" />
      <path d="M 98 60 Q 105 52 98 62 Q 105 72 98 68" fill={`url(#crabBody-${hatId})`} stroke="#C44040" strokeWidth="1" />
      
      <line x1="40" y1="58" x2="36" y2="44" stroke="#C44040" strokeWidth="3" strokeLinecap="round" />
      <line x1="60" y1="58" x2="64" y2="44" stroke="#C44040" strokeWidth="3" strokeLinecap="round" />
      
      <circle cx="36" cy="42" r="6" fill="#FFE5B4" stroke="#DAA520" strokeWidth="0.5" />
      <circle cx="64" cy="42" r="6" fill="#FFE5B4" stroke="#DAA520" strokeWidth="0.5" />
      <circle cx="37" cy="42" r="3" fill="#2C1810" />
      <circle cx="65" cy="42" r="3" fill="#2C1810" />
      <circle cx="38" cy="41" r="1" fill="white" />
      <circle cx="66" cy="41" r="1" fill="white" />
      
      <ellipse cx="35" cy="74" rx="5" ry="3" fill="#FF9EC4" opacity="0.4" />
      <ellipse cx="65" cy="74" rx="5" ry="3" fill="#FF9EC4" opacity="0.4" />
      
      <path d="M 43 80 Q 50 86 57 80" fill="none" stroke="#8B3030" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function renderFishAstronaut(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height * 1.05} viewBox="0 0 100 100" fill="none">
      <defs>
        <linearGradient id={`fishBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7DD3E8" />
          <stop offset="50%" stopColor="#5BC0DE" />
          <stop offset="100%" stopColor="#3AA8C5" />
        </linearGradient>
        <linearGradient id={`fishHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8E8F2" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7DD3E8" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC0DE" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`helmetMetal-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#E8E8E8" />
          <stop offset="30%" stopColor="#D0D0D0" />
          <stop offset="70%" stopColor="#A8A8A8" />
          <stop offset="100%" stopColor="#888888" />
        </linearGradient>
        <linearGradient id={`visorGlass-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E0FFFF" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#87CEEB" stopOpacity="0.5" />
          <stop offset="70%" stopColor="#5BC0DE" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#4AA8C0" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      
      <ellipse cx="50" cy="52" rx="44" ry="40" fill={`url(#helmetMetal-${hatId})`} stroke="#666" strokeWidth="2.5" />
      <ellipse cx="35" cy="38" rx="15" ry="12" fill="white" opacity="0.3" />
      
      <ellipse cx="50" cy="54" rx="32" ry="28" fill={`url(#visorGlass-${hatId})`} stroke="#555" strokeWidth="1.5" />
      <ellipse cx="38" cy="45" rx="12" ry="8" fill="white" opacity="0.4" />
      
      <rect x="43" y="8" width="14" height="10" rx="2" fill="#666" stroke="#555" strokeWidth="0.5" />
      <rect x="46" y="4" width="8" height="6" rx="1" fill="#555" />
      <circle cx="50" cy="5" r="4" fill="#882222" />
      
      <ellipse cx="50" cy="58" rx="24" ry="18" fill={`url(#fishBody-${hatId})`} />
      <ellipse cx="42" cy="52" rx="12" ry="8" fill={`url(#fishHighlight-${hatId})`} />
      
      <path d="M 74 58 L 86 48 L 86 68 Z" fill="#5BC0DE" stroke="#3AA8C5" strokeWidth="1" />
      <path d="M 50 42 Q 56 34 62 42" fill="#5BC0DE" stroke="#3AA8C5" strokeWidth="0.8" />
      
      <ellipse cx="40" cy="55" rx="6" ry="7" fill="white" />
      <ellipse cx="55" cy="55" rx="6" ry="7" fill="white" />
      <ellipse cx="41" cy="56" rx="3.5" ry="4.5" fill="#2C1810" />
      <ellipse cx="56" cy="56" rx="3.5" ry="4.5" fill="#2C1810" />
      <ellipse cx="42" cy="54" rx="1.5" ry="2" fill="white" />
      <ellipse cx="57" cy="54" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="32" cy="62" rx="4" ry="2.5" fill="#FF9EC4" opacity="0.4" />
      
      <path d="M 42 66 Q 48 71 54 66" fill="none" stroke="#2A7F8F" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function renderBirdPirate(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 100 95" fill="none">
      <defs>
        <linearGradient id={`birdBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB5A0" />
          <stop offset="50%" stopColor="#FF9580" />
          <stop offset="100%" stopColor="#E87060" />
        </linearGradient>
        <linearGradient id={`birdHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE0D5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FFB5A0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#FF9580" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`pirateHat-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#2C2C2C" />
          <stop offset="50%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#0D0D0D" />
        </linearGradient>
      </defs>
      
      <path d="M 10 58 Q 10 26 50 18 Q 90 26 90 58 Z" fill={`url(#pirateHat-${hatId})`} stroke="#333" strokeWidth="1.5" />
      
      <path d="M 6 56 Q 50 66 94 56" fill="none" stroke="#DAA520" strokeWidth="3" />
      <path d="M 6 56 Q 50 64 94 56" fill="none" stroke="#FFD700" strokeWidth="1.5" />
      
      <g transform="translate(38, 32)">
        <ellipse cx="12" cy="10" rx="9" ry="8" fill="#F5F5F5" stroke="#DDD" strokeWidth="0.8" />
        <circle cx="8" cy="9" r="2.5" fill="#1a1a1a" />
        <circle cx="16" cy="9" r="2.5" fill="#1a1a1a" />
        <ellipse cx="12" cy="14" rx="2" ry="1" fill="#1a1a1a" />
        <line x1="3" y1="18" x2="21" y2="4" stroke="#F5F5F5" strokeWidth="2.5" />
        <line x1="3" y1="4" x2="21" y2="18" stroke="#F5F5F5" strokeWidth="2.5" />
      </g>
      
      <ellipse cx="50" cy="75" rx="24" ry="18" fill={`url(#birdBody-${hatId})`} />
      <ellipse cx="40" cy="68" rx="12" ry="8" fill={`url(#birdHighlight-${hatId})`} />
      
      <path d="M 26 72 Q 14 66 16 76 Q 8 82 20 78" fill="#FF9580" stroke="#E87060" strokeWidth="1" />
      <path d="M 74 72 Q 86 66 84 76 Q 92 82 80 78" fill="#FF9580" stroke="#E87060" strokeWidth="1" />
      
      <ellipse cx="60" cy="72" rx="7" ry="8" fill="white" />
      <ellipse cx="61" cy="73" rx="4" ry="5" fill="#2C1810" />
      <ellipse cx="62" cy="71" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="40" cy="72" rx="8" ry="9" fill="#1a1a1a" stroke="#333" strokeWidth="0.8" />
      <line x1="35" y1="65" x2="55" y2="58" stroke="#1a1a1a" strokeWidth="2" />
      
      <path d="M 50 80 L 44 88 L 56 88 Z" fill="#FF8C00" stroke="#E67300" strokeWidth="0.8" />
      
      <ellipse cx="68" cy="78" rx="4" ry="2.5" fill="#FF9EC4" opacity="0.4" />
      
      <path d="M 46 58 Q 50 50 56 58" fill="#FF9580" stroke="#E87060" strokeWidth="0.8" />
    </svg>
  );
}

function renderBunnyPrincess(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height * 0.85} viewBox="0 0 100 80" fill="none">
      <defs>
        <linearGradient id={`bunnyBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F5E6EA" />
          <stop offset="50%" stopColor="#E8D4DC" />
          <stop offset="100%" stopColor="#D4BCC6" />
        </linearGradient>
        <linearGradient id={`bunnyHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFF5F8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#F5E6EA" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#E8D4DC" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`bunnyInner-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB5C5" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FF9EB5" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`tiaraSilver-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#F0F0F0" />
          <stop offset="30%" stopColor="#D8D8D8" />
          <stop offset="70%" stopColor="#B8B8B8" />
          <stop offset="100%" stopColor="#989898" />
        </linearGradient>
      </defs>
      
      <ellipse cx="28" cy="22" rx="11" ry="26" fill={`url(#bunnyBody-${hatId})`} stroke="#C4A8B4" strokeWidth="1" />
      <ellipse cx="28" cy="20" rx="6" ry="18" fill={`url(#bunnyInner-${hatId})`} />
      <ellipse cx="72" cy="22" rx="11" ry="26" fill={`url(#bunnyBody-${hatId})`} stroke="#C4A8B4" strokeWidth="1" />
      <ellipse cx="72" cy="20" rx="6" ry="18" fill={`url(#bunnyInner-${hatId})`} />
      
      <path d="M 14 38 L 20 22 L 28 30 L 38 10 L 50 26 L 62 10 L 72 30 L 80 22 L 86 38 Z" 
        fill={`url(#tiaraSilver-${hatId})`} stroke="#888" strokeWidth="1" />
      
      <circle cx="38" cy="16" r="5" fill="#FF69B4" stroke="#FF1493" strokeWidth="0.8" />
      <ellipse cx="36" cy="14" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.8" />
      <circle cx="62" cy="16" r="5" fill="#FF69B4" stroke="#FF1493" strokeWidth="0.8" />
      <ellipse cx="60" cy="14" rx="2" ry="1.5" fill="#FFB6C1" opacity="0.8" />
      <circle cx="50" cy="28" r="4" fill="#87CEEB" stroke="#4169E1" strokeWidth="0.8" />
      <circle cx="22" cy="26" r="3" fill="#98FB98" stroke="#228B22" strokeWidth="0.5" />
      <circle cx="78" cy="26" r="3" fill="#98FB98" stroke="#228B22" strokeWidth="0.5" />
      
      <ellipse cx="50" cy="58" rx="28" ry="22" fill={`url(#bunnyBody-${hatId})`} />
      <ellipse cx="40" cy="50" rx="14" ry="10" fill={`url(#bunnyHighlight-${hatId})`} />
      
      <ellipse cx="38" cy="54" rx="7" ry="8" fill="white" />
      <ellipse cx="62" cy="54" rx="7" ry="8" fill="white" />
      <ellipse cx="39" cy="55" rx="4" ry="5" fill="#6B4C5A" />
      <ellipse cx="63" cy="55" rx="4" ry="5" fill="#6B4C5A" />
      <ellipse cx="40" cy="53" rx="1.5" ry="2" fill="white" />
      <ellipse cx="64" cy="53" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="50" cy="62" rx="4" ry="3" fill="#FFB5C5" stroke="#E8A0B0" strokeWidth="0.5" />
      
      <path d="M 46 66 Q 50 70 54 66" fill="none" stroke="#A08090" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="28" cy="60" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
      <ellipse cx="72" cy="60" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
    </svg>
  );
}

function renderCatUnicorn(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width * 0.85} height={height * 1.1} viewBox="0 0 85 105" fill="none">
      <defs>
        <linearGradient id={`catBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#C8C8E0" />
          <stop offset="50%" stopColor="#A8A8C8" />
          <stop offset="100%" stopColor="#8888A8" />
        </linearGradient>
        <linearGradient id={`catHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8E8F5" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#C8C8E0" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#A8A8C8" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`catEarInner-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFB5C5" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#E8A0B0" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id={`magicHornGrad-${hatId}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#FFB6C1" />
          <stop offset="20%" stopColor="#DDA0DD" />
          <stop offset="40%" stopColor="#87CEEB" />
          <stop offset="60%" stopColor="#98FB98" />
          <stop offset="80%" stopColor="#FFFACD" />
          <stop offset="100%" stopColor="#FFD700" />
        </linearGradient>
      </defs>
      
      <path d="M 18 50 L 8 22 L 28 42" fill={`url(#catBody-${hatId})`} stroke="#8888A8" strokeWidth="1" />
      <path d="M 67 50 L 77 22 L 57 42" fill={`url(#catBody-${hatId})`} stroke="#8888A8" strokeWidth="1" />
      <path d="M 17 48 L 10 26 L 25 42" fill={`url(#catEarInner-${hatId})`} />
      <path d="M 68 48 L 75 26 L 60 42" fill={`url(#catEarInner-${hatId})`} />
      
      <polygon points="42.5,5 34,60 51,60" fill={`url(#magicHornGrad-${hatId})`} stroke="#DDA0DD" strokeWidth="1.5" />
      
      <path d="M 37 52 Q 42.5 48 48 52" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M 38 42 Q 42.5 38 47 42" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M 39 32 Q 42.5 28 46 32" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M 40 22 Q 42.5 18 45 22" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      
      <circle cx="42.5" cy="8" r="5" fill="#FFD700" opacity="0.5" />
      
      <ellipse cx="42.5" cy="75" rx="30" ry="26" fill={`url(#catBody-${hatId})`} />
      <ellipse cx="32" cy="66" rx="15" ry="12" fill={`url(#catHighlight-${hatId})`} />
      
      <ellipse cx="30" cy="72" rx="7" ry="8" fill="white" />
      <ellipse cx="55" cy="72" rx="7" ry="8" fill="white" />
      <ellipse cx="31" cy="73" rx="4" ry="5" fill="#6B5B8A" />
      <ellipse cx="56" cy="73" rx="4" ry="5" fill="#6B5B8A" />
      <ellipse cx="32" cy="71" rx="1.5" ry="2" fill="white" />
      <ellipse cx="57" cy="71" rx="1.5" ry="2" fill="white" />
      
      <ellipse cx="42.5" cy="80" rx="3" ry="2.5" fill="#FFB5C5" stroke="#E8A0B0" strokeWidth="0.5" />
      
      <line x1="8" y1="78" x2="26" y2="80" stroke="#A8A8C8" strokeWidth="0.8" />
      <line x1="8" y1="82" x2="26" y2="82" stroke="#A8A8C8" strokeWidth="0.8" />
      <line x1="8" y1="86" x2="26" y2="84" stroke="#A8A8C8" strokeWidth="0.8" />
      <line x1="77" y1="78" x2="59" y2="80" stroke="#A8A8C8" strokeWidth="0.8" />
      <line x1="77" y1="82" x2="59" y2="82" stroke="#A8A8C8" strokeWidth="0.8" />
      <line x1="77" y1="86" x2="59" y2="84" stroke="#A8A8C8" strokeWidth="0.8" />
      
      <path d="M 37 86 Q 42.5 91 48 86" fill="none" stroke="#7A6A8A" strokeWidth="1.5" strokeLinecap="round" />
      
      <ellipse cx="18" cy="80" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
      <ellipse cx="67" cy="80" rx="5" ry="3" fill="#FFB5C5" opacity="0.5" />
    </svg>
  );
}

function renderDragonPet(width: number, height: number, hatId: string): JSX.Element {
  return (
    <svg width={width} height={height} viewBox="0 0 120 90" fill="none">
      <defs>
        <linearGradient id={`dragonPetBody-${hatId}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#7FD87F" />
          <stop offset="50%" stopColor="#5BC85B" />
          <stop offset="100%" stopColor="#3DA83D" />
        </linearGradient>
        <linearGradient id={`dragonPetHighlight-${hatId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#B8F5B8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#7FD87F" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5BC85B" stopOpacity="0" />
        </linearGradient>
        <linearGradient id={`hornDark-${hatId}`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#3D5C3D" />
          <stop offset="40%" stopColor="#4A704A" />
          <stop offset="70%" stopColor="#5A8A5A" />
          <stop offset="100%" stopColor="#6BA06B" />
        </linearGradient>
      </defs>
      
      <path d="M 28 72 Q 10 42 30 10 Q 38 28 42 72 Z" fill={`url(#hornDark-${hatId})`} stroke="#2D4A2D" strokeWidth="1.5" />
      <path d="M 92 72 Q 110 42 90 10 Q 82 28 78 72 Z" fill={`url(#hornDark-${hatId})`} stroke="#2D4A2D" strokeWidth="1.5" />
      
      <path d="M 29 52 Q 35 47 40 52" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
      <path d="M 28 38 Q 34 33 40 38" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
      <path d="M 29 26 Q 32 22 35 26" fill="none" stroke="#8BC88B" strokeWidth="1.2" />
      <path d="M 80 52 Q 85 47 91 52" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
      <path d="M 80 38 Q 86 33 92 38" fill="none" stroke="#8BC88B" strokeWidth="1.5" />
      <path d="M 85 26 Q 88 22 91 26" fill="none" stroke="#8BC88B" strokeWidth="1.2" />
      
      <ellipse cx="35" cy="72" rx="14" ry="7" fill={`url(#hornDark-${hatId})`} stroke="#2D4A2D" strokeWidth="1" />
      <ellipse cx="85" cy="72" rx="14" ry="7" fill={`url(#hornDark-${hatId})`} stroke="#2D4A2D" strokeWidth="1" />
      
      <rect x="38" y="66" width="44" height="12" fill={`url(#hornDark-${hatId})`} stroke="#2D4A2D" strokeWidth="1" />
      <rect x="38" y="66" width="44" height="4" fill="#5A8A5A" opacity="0.4" />
      
      <ellipse cx="60" cy="72" rx="22" ry="12" fill={`url(#dragonPetBody-${hatId})`} />
      <ellipse cx="52" cy="68" rx="10" ry="6" fill={`url(#dragonPetHighlight-${hatId})`} />
      
      <ellipse cx="52" cy="70" rx="5" ry="6" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
      <ellipse cx="68" cy="70" rx="5" ry="6" fill="#FFFACD" stroke="#DAA520" strokeWidth="0.5" />
      <ellipse cx="52" cy="70" rx="2" ry="4" fill="#2C1810" />
      <ellipse cx="68" cy="70" rx="2" ry="4" fill="#2C1810" />
      <ellipse cx="51" cy="68" rx="1" ry="1.5" fill="white" />
      <ellipse cx="67" cy="68" rx="1" ry="1.5" fill="white" />
      
      <ellipse cx="57" cy="76" rx="2" ry="1.5" fill="#2D5A2D" />
      <ellipse cx="63" cy="76" rx="2" ry="1.5" fill="#2D5A2D" />
      
      <ellipse cx="45" cy="74" rx="4" ry="2" fill="#FFB5C5" opacity="0.4" />
      <ellipse cx="75" cy="74" rx="4" ry="2" fill="#FFB5C5" opacity="0.4" />
      
      <path d="M 55 80 Q 60 84 65 80" fill="none" stroke="#2D5A2D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
