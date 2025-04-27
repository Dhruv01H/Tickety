import React from 'react'
import { assets } from '../../assets/assets'
import { CurrentEvent, UpcomingEvent } from '../../components/component_index'
import { motion } from 'framer-motion'

function Event() {
  return (
    <>
        <div
        className="w-full h-[60vh] flex flex-col text-white items-center justify-center bg-no-repeat bg-cover p-6 md:p-12 mb-2"
        style={{ backgroundImage: `url(${assets.posterBanner})` }}
      >
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
          className="text-6xl font-semibold"
        >
          Events
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5 }}
          className="font-semibold sm:text-2xl"
        >
          Catch up to the latest events now!
        </motion.p>
      </div>
      <div className="mb-20 border-t-[14px] border-black border-dashed" />

      <CurrentEvent />
      <UpcomingEvent />
    </>
  )
}

export default Event