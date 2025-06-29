

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 gradient-primary opacity-95"></div>
        
        {/* Content */}
        <div className="relative z-10 px-6 py-24 mx-auto max-w-7xl sm:py-32 lg:px-8">
          <div className="text-center">
            <h1 className="font-neue-montreal text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              BENDERS
              <span className="block text-mint-cyan">Digital Innovation</span>
            </h1>
            
            <p className="font-gilroy mt-6 text-lg leading-8 text-blue-lightest max-w-2xl mx-auto sm:text-xl">
              Creating dynamic digital experiences with modern design and cutting-edge technology. 
              We bend the rules of what&apos;s possible.
            </p>
            
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="font-neue-montreal rounded-lg bg-mint-cyan px-6 py-3 text-base font-semibold text-midnight-navy shadow-sm hover:bg-teal-light transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mint-cyan">
                Get Started
              </button>
              <button className="font-gilroy text-base font-semibold leading-7 text-white hover:text-mint-cyan transition-colors">
                Learn more <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Colors Showcase */}
      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-neue-montreal text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Brand Identity
            </h2>
            <p className="font-gilroy mt-4 text-lg text-foreground/70">
              Our color palette and typography system
            </p>
          </div>
          
          {/* Color Palette */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-16">
            <div className="text-center">
              <div className="w-full h-24 bg-electric-blue rounded-lg mb-3 shadow-lg"></div>
              <p className="font-neue-montreal text-sm font-medium text-foreground">Electric Blue</p>
              <p className="font-gilroy text-xs text-foreground/60">#0055ff</p>
            </div>
            
            <div className="text-center">
              <div className="w-full h-24 bg-royal-navy rounded-lg mb-3 shadow-lg"></div>
              <p className="font-neue-montreal text-sm font-medium text-foreground">Royal Navy</p>
              <p className="font-gilroy text-xs text-foreground/60">#030d54</p>
            </div>
            
            <div className="text-center">
              <div className="w-full h-24 bg-midnight-navy rounded-lg mb-3 shadow-lg"></div>
              <p className="font-neue-montreal text-sm font-medium text-foreground">Midnight Navy</p>
              <p className="font-gilroy text-xs text-foreground/60">#04082e</p>
            </div>
            
            <div className="text-center">
              <div className="w-full h-24 bg-mint-cyan rounded-lg mb-3 shadow-lg"></div>
              <p className="font-neue-montreal text-sm font-medium text-foreground">Mint Cyan</p>
              <p className="font-gilroy text-xs text-foreground/60">#2de6c7</p>
            </div>
            
            <div className="text-center">
              <div className="w-full h-24 bg-blue-medium rounded-lg mb-3 shadow-lg"></div>
              <p className="font-neue-montreal text-sm font-medium text-foreground">Blue Medium</p>
              <p className="font-gilroy text-xs text-foreground/60">#1e8bff</p>
            </div>
          </div>

          {/* Typography Showcase */}
          <div className="space-y-8">
            <div>
              <h3 className="font-neue-montreal text-2xl font-bold text-foreground mb-4">Typography System</h3>
            </div>
            
            <div className="bg-blue-lightest p-6 rounded-lg">
              <h4 className="font-neue-montreal text-xl font-bold text-royal-navy mb-4">Neue Montreal - Display Font</h4>
              <div className="space-y-2">
                <p className="font-neue-montreal text-3xl font-light text-royal-navy">Light Weight</p>
                <p className="font-neue-montreal text-3xl font-normal text-royal-navy">Regular Weight</p>
                <p className="font-neue-montreal text-3xl font-medium text-royal-navy">Medium Weight</p>
                <p className="font-neue-montreal text-3xl font-bold text-royal-navy">Bold Weight</p>
              </div>
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="font-gilroy text-xl font-bold text-royal-navy mb-4">Gilroy - Primary Typeface</h4>
              <div className="space-y-2">
                <p className="font-gilroy text-lg text-gray-800">Regular text for body content and descriptions</p>
                <p className="font-gilroy text-lg font-medium text-gray-800">Medium weight for emphasis and subheadings</p>
                <p className="font-gilroy text-lg font-bold text-gray-800">Bold weight for strong statements</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gradient Showcase */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-neue-montreal text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Brand Gradients
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="gradient-primary p-8 rounded-lg text-center">
              <h3 className="font-neue-montreal text-2xl font-bold text-white mb-4">Primary Gradient</h3>
              <p className="font-gilroy text-blue-lightest">Electric Blue to Royal Navy</p>
            </div>
            
            <div className="gradient-secondary p-8 rounded-lg text-center">
              <h3 className="font-neue-montreal text-2xl font-bold text-midnight-navy mb-4">Secondary Gradient</h3>
              <p className="font-gilroy text-midnight-navy">Mint Cyan to Teal Medium</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
