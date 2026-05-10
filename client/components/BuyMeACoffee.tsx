import React from 'react';
import { Coffee, ArrowUpRight } from 'lucide-react';
import { getAssetPath } from "@/lib/utils";

const BuyMeACoffee = () => {
  return (
    <div className="my-12 p-8 bg-[#FFDE59] border-4 border-black shadow-[8px_8px_0_0_#000] relative overflow-hidden group">
      {/* Background Decorative Element */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/30 rounded-full blur-2xl group-hover:bg-white/50 transition-all duration-500"></div>
      
      <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
        {/* QR Code Container */}
        <div className="flex-shrink-0 w-40 h-40 bg-white border-4 border-black p-2 shadow-[4px_4px_0_0_#000] transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <img 
            src={getAssetPath("images/qr/qr-code.png")} 
            alt="Buy Me A Coffee QR Code" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Text Content */}
        <div className="text-center md:text-left flex-grow">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white text-xs font-black uppercase tracking-widest mb-4">
            <Coffee className="w-4 h-4" />
            Support My Work
          </div>
          <h3 className="text-3xl font-black text-black mb-2 leading-none uppercase italic">
            Enjoying my work?
          </h3>
          <p className="text-lg font-bold text-black/80 mb-6 max-w-md">
            If you find my designs or code helpful, consider buying me a coffee to fuel more creative projects!
          </p>
          
          <a 
            href="https://buymeacoffee.com/prabhath" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-black px-8 py-4 border-4 border-black font-black text-lg uppercase tracking-tighter shadow-[6px_6px_0_0_#000] hover:shadow-[2px_2px_0_0_#000] hover:translate-x-[4px] hover:translate-y-[4px] transition-all duration-200"
          >
            Buy Me A Coffee
            <ArrowUpRight className="w-6 h-6" />
          </a>
        </div>
      </div>

      {/* Floating Coffee Cup Icon */}
      <div className="absolute right-8 bottom-4 opacity-10 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
        <Coffee className="w-32 h-32 text-black" />
      </div>
    </div>
  );
};

export default BuyMeACoffee;
