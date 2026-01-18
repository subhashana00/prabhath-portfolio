import React from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { getAssetPath } from "@/lib/utils";
import { Sparkles, ArrowUpRight } from "lucide-react";

const DesignCarousel = () => {
  const items = [
    {
      id: 8,
      image: getAssetPath("images/projects/fest_1.png"),
      name: "UI Design",
      desc: "Creative UI/UX design exploration.",
      link: "#",
      type: "landscape"
    },
    {
      id: 1,
      image: getAssetPath("images/projects/poster-design1-1.jpg"),
      name: "Poster Design",
      desc: "Creative poster visualization.",
      link: "#",
      type: "portrait"
    },
    {
      id: 2,
      image: getAssetPath("images/projects/poster-design2-1.jpg"),
      name: "Event Poster",
      desc: "Modern event promotion design.",
      link: "#",
      type: "portrait"
    },
    {
      id: 3,
      image: getAssetPath("images/projects/poster-design3-1.jpg"),
      name: "Artistic Poster",
      desc: "Abstract artistic composition.",
      link: "#",
      type: "portrait"
    },
    {
      id: 4,
      image: getAssetPath("images/projects/banner-design2-1.jpg"),
      name: "Web Banner",
      desc: "Digital marketing banner layout.",
      link: "#",
      type: "landscape"
    },
    {
      id: 5,
      image: getAssetPath("images/projects/magazine-cover-1.jpg"),
      name: "Magazine Cover",
      desc: "Editorial layout and typography.",
      link: "#",
      type: "portrait"
    },
    {
      id: 6,
      image: getAssetPath("images/projects/banner-design-1.jpg"),
      name: "Promo Banner",
      desc: "Advertising campaign visual.",
      link: "#",
      type: "landscape"
    },
    {
      id: 7,
      image: getAssetPath("images/projects/typographic-poster-1.jpg"),
      name: "Typography",
      desc: "Experimental typographic design.",
      link: "#",
      type: "portrait"
    }
  ];

  return (
    <section className="py-20 bg-[#FCF9F8] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, black 1px, transparent 0)', backgroundSize: '40px 40px' }}>
      </div>
      
      <div className="container mx-auto px-4 max-w-[1600px] relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-300 border-2 border-black rounded-full mb-4 shadow-[4px_4px_0_0_#000]">
              <Sparkles className="w-4 h-4 text-black" />
              <span className="text-xs font-bold uppercase tracking-wider">Visual Playground</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-black">
              GRAPHIC & UI DESIGNS
            </h2>
          </div>
          
          <div className="hidden md:block h-[2px] flex-grow bg-black mx-8 opacity-20"></div>
          
          <p className="text-gray-600 font-medium max-w-xs text-sm md:text-right">
            A collection of creative experiments, UI component explorations, and graphic design works.
          </p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full select-none"
        >
          <CarouselContent className="-ml-4 pb-8">
            {items.map((item) => (
              <CarouselItem 
                key={item.id} 
                className={`pl-4 ${
                  item.type === 'landscape' 
                    ? 'md:basis-1/2 lg:basis-2/3' 
                    : 'basis-4/5 md:basis-1/3 lg:basis-1/4'
                }`}
              >
                <div className="group relative h-[400px] md:h-[500px] w-full transform transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-black translate-x-3 translate-y-3 rounded-[20px] transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"></div>
                  
                  <Card className="h-full w-full border-3 border-black rounded-[20px] overflow-hidden bg-white relative z-10 p-0 hover:rounded-[20px]">
                    <CardContent className="p-0 h-full w-full relative overflow-hidden">
                      {/* Image */}
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 md:p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <div className="bg-white text-black px-4 py-2 inline-flex items-center gap-2 rounded-lg border-2 border-black shadow-[4px_4px_0_0_#000] mb-2">
                             <span className="font-bold uppercase tracking-widest text-xs md:text-sm">{item.name}</span>
                             <ArrowUpRight className="w-4 h-4" />
                          </div>
                          <p className="text-white font-medium text-sm md:text-base drop-shadow-md backdrop-blur-sm bg-black/20 p-2 rounded-lg inline-block">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <div className="flex justify-end gap-2 mt-4 pr-2">
            <CarouselPrevious className="static translate-y-0 h-12 w-12 border-2 border-black bg-white hover:bg-black hover:text-white rounded-full shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-1" />
            <CarouselNext className="static translate-y-0 h-12 w-12 border-2 border-black bg-white hover:bg-black hover:text-white rounded-full shadow-[4px_4px_0_0_#000] transition-transform hover:-translate-y-1" />
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default DesignCarousel;
