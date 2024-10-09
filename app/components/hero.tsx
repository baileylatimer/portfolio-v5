import React from 'react';
import Stars from '~/components/svg-stars';
import SvgCaFlag from '~/components/svg-ca-flag';
import SvgTarget from '~/components/svg-target';
import SvgGrid from '~/components/svg-grid';
import CustomButton from '~/components/custom-button';

const HERO_IMAGE_PATH = '/images/horse-hero--min.jpg';

interface HeroProps {
  bottomElementsScale?: number;
}

export default function Hero({ bottomElementsScale = 1 }: HeroProps) {
  const starWidth = 340 * bottomElementsScale;
  const starHeight = 71 * bottomElementsScale;
  const flagWidth = 143 * bottomElementsScale;
  const flagHeight = 44 * bottomElementsScale;

  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{backgroundImage: `url(${HERO_IMAGE_PATH})`}}
      />
      <div className="absolute inset-0 bg-black bg-opacity-20" style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px),
                          repeating-linear-gradient(90deg, transparent, transparent 39px, rgba(255,255,255,0.1) 39px, rgba(255,255,255,0.1) 40px)`
      }} />
      
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-[120px] bg-gradient-to-t from-black to-transparent" />
      
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <SvgTarget />
      </div>

      {/* Grid SVG */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <SvgGrid />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <CustomButton onClick={() => console.log("Let's talk clicked")}>
          LET'S TALK
        </CustomButton>
      </div>
      {/* Bottom elements */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
        <Stars width={starWidth} height={starHeight} color="#FF0000"/>
        <SvgCaFlag width={flagWidth} height={flagHeight} />
        <div className="scale-x-[-1]">
          <Stars width={starWidth} height={starHeight} color="#FF0000"/>
        </div>
      </div>
    </div>
  );
}