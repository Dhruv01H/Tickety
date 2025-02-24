import React from 'react'
import { assets } from '../../assets/assets'

function Testimonial() {
  return (
    <div className=''>
        <div className="px-12 py-6 mt-10 mb-24 xl:px-60">
      <h2 className="mb-2 text-4xl font-semibold text-center md:text-6xl text-primary">
        Testimonials
      </h2>

      <p className="mb-12 text-base font-light text-center md:text-2xl">
        See what our users say about us
      </p>

      <div className="flex flex-col gap-8 xl:grid xl:grid-cols-10 xl:grid-rows-3">
        <div className="xl:col-span-4 xl:row-span-2 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-[#2E3640] hover:via-[#AB2E58] hover:to-[#D71A57]">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-10">
              <img
                src={assets.img1}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-4"
              />
              
              <h3 className="font-medium sm:text-2xl md:text-3xl xl:font-normal">Abby Campbell</h3>

              <div className="items-center hidden gap-1 md:flex text-primary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg xl:font-light">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              nobis a molestiae, officiis sint delectus illum, dolorum ratione
              minus ut neque animi alias ullam ex voluptate quidem magnam?
              Fugit! <br /> <br /><span className="hidden xl:block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi ab dicta consectetur unde voluptate accusantium suscipit, cupiditate veniam nesciunt nam accusamus illum vero impedit facilis at cumque possimus in ut! <br /> <br />Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt, porro? Dolore, soluta impedit voluptatum doloribus cupiditate qui delectus ad? Velit.</span>
            </p>
          </div>
        </div>  
        
        <div className="xl:col-span-4 xl:row-span-1 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-[#2E3640] hover:via-[#AB2E58] hover:to-[#D71A57]">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-14">
              <img
                src={assets.img2}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-4"
              />
              <h3 className="font-medium sm:text-2xl xl:text-3xl xl:font-normal">Les Mckay</h3>

              <div className="items-center hidden gap-1 md:flex text-primary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
              <i className="ri-star-line"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              nobis a molestiae, officiis sint delectus illum, dolorum ratione
              minus ut neque animi alias ullam ex voluptate quidem magnam?
              Fugit!
            </p>
          </div>
        </div>
        
        <div className="xl:col-span-2 xl:row-span-1 rounded-2xl p-[1.3px] bg-slate-200 hover:bg-gradient-to-br hover:from-[#2E3640] hover:via-[#AB2E58] hover:to-[#D71A57] hover:scale-105 transition-all duration-500">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6">
              <img
                src={assets.img3}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-4"
              />
              <h3 className="font-medium sm:text-2xl">Emily Weeks</h3>

              <div className="items-center hidden gap-1 md:flex xl:hidden text-primary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
              <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              nobis a molestiae, officiis sint delectus illum, dolorum ratione
              minus ut neque animi alias ullam ex voluptate quidem magnam?
              Fugit!
            </p>
          </div>
        </div>
        
        <div className="xl:col-span-3 xl:row-span-2 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-[#2E3640] hover:via-[#AB2E58] hover:to-[#D71A57]">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-8">
              <img
                src={assets.img4}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-4"
              />
              <h3 className="font-medium sm:text-2xl xl:text-3xl xl:font-normal">Johnny Horn</h3>

              <div className="items-center hidden gap-1 md:flex xl:hidden text-primary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
              <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              nobis a molestiae, officiis sint delectus illum, dolorum ratione
              minus ut neque animi alias ullam ex voluptate quidem magnam?
              Fugit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, aspernatur? <br /> <br /> <span className="hidden xl:block">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, totam! Blanditiis, quidem consectetur enim amet cumque nulla rem. Sint, sit doloribus ab consequatur laborum in delectus maxime totam? Qui, debitis?</span>
            </p>
          </div>
        </div>
        
        <div className="xl:col-span-3 xl:row-span-2 rounded-2xl p-[1.3px] bg-slate-200 max-md:hidden hover:scale-105 transition-all duration-500 hover:bg-gradient-to-br hover:from-[#2E3640] hover:via-[#AB2E58] hover:to-[#D71A57]">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-8">
              <img
                src={assets.img5}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-4"
              />
              <h3 className="font-medium sm:text-2xl xl:text-3xl xl:font-normal">Carly Frederick</h3>

              <div className="items-center hidden gap-1 md:flex xl:hidden text-primary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
              <i className="ri-star-half-fill"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat, totam! Blanditiis, quidem consectetur enim amet cumque nulla rem. Sint, sit doloribus ab consequatur laborum in delectus maxime totam? Qui, debitis?<br /> <br /> <span className="hidden xl:block">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              nobis a molestiae, officiis sint delectus illum, dolorum ratione
              minus ut neque animi alias ullam ex voluptate quidem magnam?
              Fugit! Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, aspernatur?</span>
            </p>
          </div>
        </div>

        <div className="xl:col-span-4 xl:row-span-1 rounded-2xl p-[1.3px] bg-slate-200 hover:scale-105 transition-all max-md:hidden duration-500 hover:bg-gradient-to-br hover:from-[#2E3640] hover:via-[#AB2E58] hover:to-[#D71A57]">
          <div className="w-full h-full bg-white rounded-2xl">
            <div className="flex items-center gap-3 p-3 md:justify-around sm:p-6 xl:gap-8">
              <img
                src={assets.img6}
                alt=""
                className="sm:w-20 sm:h-20 w-16 h-16 rounded-[50%] border-primary border-4"
              />
              <h3 className="font-medium sm:text-2xl">Cameron Mccann</h3>

              <div className="items-center hidden gap-1 md:flex text-primary">
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-fill"></i>
              <i className="ri-star-half-fill"></i>
              <i className="ri-star-line"></i>
              </div>
            </div>
            <p className="p-4 text-sm xl:text-lg">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa
              nobis a molestiae, officiis sint delectus illum, dolorum ratione
              minus ut neque animi alias ullam ex voluptate quidem magnam?
              Fugit!
            </p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Testimonial