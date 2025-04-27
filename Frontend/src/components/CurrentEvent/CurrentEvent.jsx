import React from 'react'
import { events } from "./data";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function CurrentEvent() {
  return (
    <>
         <div className="flex flex-col items-center justify-center gap-3 px-4 text-center sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
                <motion.h2
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.6 }}
                  className="text-3xl font-medium md:text-4xl lg:text-5xl"
                >
                  Grab a chance to witness <br className="hidden max-sm:block" />{" "}
                  ongoing events
                </motion.h2>
        
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.6, delay: 0.5 }}
                  className="text-xl max-sm:hidden"
                >
                  Book tickets for the ongoing events
                </motion.p>
                <div className="w-full mt-2 border-b border-gray-200"></div>
              </div>
        
              <div className="px-4 py-6 mb-20 sm:px-14 md:px-20 lg:px-28 xl:px-32 2xl:px-40">
                <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
                  {events.map((event) => (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      viewport={{ once: true }}
                      key={event.id}
                      className="relative overflow-hidden rounded-lg group"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="object-cover w-full transition duration-500 transform h-96 group-hover:scale-105"
                      />
                      <div className="absolute bottom-0 left-0 flex justify-center w-3/5 p-3 space-x-2 transition duration-500 transform translate-y-full bg-frost group-hover:-translate-y-16">
                        <p className="text-2xl font-medium transition duration-300 hover:text-secondary">
                          {event.title}
                        </p>
                        <div className="absolute bottom-0 right-0 flex justify-end transition duration-300 transform translate-y-full group-hover:-translate-y-14">
                          <button
                            onClick={() => navigate("/charlie")}
                            className="px-5 py-2.5 bg-black text-frost hover:bg-primary transition duration-500 cursor-pointer"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
    </>
  )
}

export default CurrentEvent