import { useState, useEffect } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  
  const loadingTexts = [
    'Loading...',
    'Preparing...',
    'Optimizing...',
    'Finalizing...',
    'Ready!'
  ];

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + Math.random() * 15 + 5, 100);
        
        // Update loading text based on progress
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        setCurrentText(loadingTexts[Math.min(textIndex, loadingTexts.length - 1)]);
        
        // Complete loading when reaching 100%
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadingComplete();
          }, 800); // Small delay to show 100% completion
        }
        
        return newProgress;
      });
    }, 200);

    return () => {
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-50 bg-[#FCF9F8] flex items-center justify-center">
      {/* Main loading container */}
      <div className="text-center">
        
        {/* Progress Section */}
        <div className="w-80 max-w-sm mx-auto">
          {/* Progress Bar Container */}
          <div className="bg-white border-3 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] p-4 mb-4">
            <div className="mb-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-black">Loading Progress</span>
                <span className="text-sm font-bold text-black">{Math.round(progress)}%</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 border-2 border-black rounded-[10px] overflow-hidden">
                <div 
                  className="h-3 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-all duration-300 ease-out rounded-[6px]"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            
            {/* Loading Text */}
            <div className="h-6 flex items-center justify-center">
              <p className="text-sm text-gray-700 font-medium animate-pulse">
                {currentText}
              </p>
            </div>
          </div>

          {/* Loading Animation Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((dot) => (
              <div
                key={dot}
                className="w-3 h-3 bg-black rounded-full animate-bounce border border-gray-300"
                style={{
                  animationDelay: `${dot * 0.2}s`,
                  animationDuration: '1s'
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-200 border-2 border-black rounded-[12px] shadow-[4px_4px_0_0_#000] opacity-20 animate-pulse"></div>
      <div className="absolute top-20 right-16 w-12 h-12 bg-pink-200 border-2 border-black rounded-full shadow-[3px_3px_0_0_#000] opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-20 left-20 w-20 h-8 bg-green-200 border-2 border-black rounded-[10px] shadow-[4px_4px_0_0_#000] opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-16 right-10 w-14 h-14 bg-blue-200 border-2 border-black rounded-[15px] shadow-[4px_4px_0_0_#000] opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default LoadingScreen;