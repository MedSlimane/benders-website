import Image from "next/image"
const Hero = () => {
  return (
      <section className='relative overflow-hidden w-full h-screen bg-midnight-navy'>
          {/* navbar*/}
          <nav className='flex justify-between items-center p-4 w-full m-5'>
            <div className='flex items-center gap-8 p-2'>
                <Image src="/Benders-logo/png/1@2x.png" alt='Benders Logo' width={100} height={100} />
            </div>
          </nav>

          <div className="flex items-center justify-between h-[calc(100vh-88px)] px-16">
             
              <div className="flex-1 text-white">
                  <h1 className="text-6xl font-gilroy font-bold mb-6">
                      Bending Creativity,
                      <br />
                      Into Growth
                  </h1>
                  <p className="text-xl font-neue-montreal mb-8">
                      Transforming ideas into digital reality
                  </p>
                  <button className="bg-electric-blue text-white px-8 py-3 rounded font-gilroy">
                      Learn More
                  </button>
              </div>
              <div className="flex-1 mt-10">
                  <Image 
                      src="/bender-man/bender-man.png" 
                      alt="Hero Image"
                      width={600}
                      height={600}
                      className="object-cover"
                  />
              </div>
          </div>
      </section>
  )
}

export default Hero