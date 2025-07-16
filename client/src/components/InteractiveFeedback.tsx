import { useEffect, useState } from 'react';

const InteractiveFeedback = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handlePointerDown = () => setIsInteracting(true);
    const handlePointerUp = () => setIsInteracting(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Interactive hint */}
      <div 
        className="fixed text-white/80 text-sm bg-black/20 px-3 py-1 rounded-full backdrop-blur-sm transition-opacity duration-300"
        style={{
          left: cursorPos.x + 15,
          top: cursorPos.y - 10,
          opacity: document.body.style.cursor === 'pointer' ? 1 : 0
        }}
      >
        Click to interact!
      </div>
      
      {/* Click ripple effect */}
      {isInteracting && (
        <div 
          className="fixed w-8 h-8 border-2 border-white/50 rounded-full animate-ping"
          style={{
            left: cursorPos.x - 16,
            top: cursorPos.y - 16
          }}
        />
      )}
    </div>
  );
};

export default InteractiveFeedback;