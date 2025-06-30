'use client'

import { useLogoSlider } from './useLogoSlider'
import Image from 'next/image'

export default function LogoCarousel() {
  useLogoSlider()
  
  return (
    <section className=" ">
     

 <div className="logos">
        <div className="logos-slide">
          <div className="slide-item">
            <Image src="/logos/3m.svg" alt="3M" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/barstool-store.svg" alt="Barstool Store" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/budweiser.svg" alt="Budweiser" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/buzzfeed.svg" alt="Buzzfeed" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/forbes.svg" alt="Forbes" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/macys.svg" alt="Macys" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/menshealth.svg" alt="Men's Health" width={120} height={35} className="logo-image" />
          </div>
          <div className="slide-item">
            <Image src="/logos/mrbeast.svg" alt="MrBeast" width={120} height={35} className="logo-image" />
          </div>
        </div>
      </div>
    </section>
  );
} 