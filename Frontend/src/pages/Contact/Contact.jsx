import React, { useState } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const toastDisplay = (message, status) => {
    if (status) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_key: "d783ff2b-1002-4356-b7ba-533a93d5b4a0",
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      }),
    });

    const result = await response.json();

    if (result.success) {
      toastDisplay("Form Submitted Successfully", true);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } else {
      toastDisplay("Error in submitting the form", false);
      setError(true);
    }
  };

  return (
    <>
      <div className="bg-[url('./contact.jpg')] w-full bg-cover bg-no-repeat h-[60vh] flex flex-col items-center justify-center text-frost">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2 }}
          className="p-3 text-4xl font-medium md:text-6xl md:-mt-16 md:mb-2"
        >
          Contact Us
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="px-3 text-sm text-center md:text-lg"
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis,
          modi molestias
          <br /> et sapiente praesentium quaerat?
        </motion.p>
      </div>

      <div className="relative flex items-center justify-center p-3 mt-10 mb-10 text-frost md:mb-80">
        {success && (
          <p className="text-green-500">
            Thanks for your message! We'll get back to you soon.
          </p>
        )}
        {error && (
          <p className="text-red-500">
            Something went wrong. Please try again later.
          </p>
        )}

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="w-full max-w-lg p-8 bg-gray-800 rounded-2xl md:max-w-5xl md:absolute md:-top-52"
        >
          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="firstName" className="block mb-2 text-gray-300">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Bonnie"
                className="w-full px-4 py-2 bg-gray-700 border-none rounded-md outline-none text-frost focus:outline-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block mb-2 text-gray-300">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Green"
                className="w-full px-4 py-2 bg-gray-700 border-none rounded-md outline-none text-frost focus:outline-primary"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-2">
            <div>
              <label htmlFor="email" className="block mb-2 text-gray-300">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@flowbite.com"
                className="w-full px-4 py-2 bg-gray-700 border-none rounded-md outline-none text-frost focus:outline-primary"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block mb-2 text-gray-300">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+12 345 6789"
                className="w-full px-4 py-2 bg-gray-700 border-none rounded-md outline-none text-frost focus:outline-primary"
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="message" className="block mb-2 text-gray-300">
              Your Message
            </label>
            <textarea
              id="message"
              rows="4"
              value={formData.message}
              onChange={handleChange}
              placeholder="Leave a comment..."
              className="w-full px-4 py-2 bg-gray-700 border-none rounded-md outline-none text-frost focus:outline-primary"
              required
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              className="px-4 py-2 transition-all duration-500 rounded-md text-frost bg-primary hover:scale-105"
            >
              Send message
            </button>
          </div>
        </motion.form>
      </div>

      <div className="grid grid-cols-1 px-12 py-6 xl:px-60 md:grid-cols-2 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 1 * 0.2,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center p-10"
        >
          <i className="p-4 mb-3 text-4xl text-frost ri-mail-line rounded-xl bg-primary"></i>
          <h3 className="mb-2 text-2xl font-medium">Email us:</h3>
          <p className="mb-2 text-center">
            Email us for general queries, including marketing <br /> and
            partnership opportunities.
          </p>
          <p className="cursor-pointer hover:underline hover:text-primary">
            hello@docappoint.com
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 2 * 0.2,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center p-10"
        >
          <i className="p-4 mb-3 text-4xl text-frost ri-phone-line rounded-xl bg-primary"></i>
          <h3 className="mb-2 text-2xl font-medium">Call us:</h3>
          <p className="mb-2 text-center">
            Call us to speak to a member of our team. We <br /> are always happy
            to help.
          </p>
          <p className="cursor-pointer hover:underline hover:text-primary">
            +91 1234567890
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 3 * 0.2,
          }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col items-center justify-center p-10"
        >
          <i className="p-4 mb-3 text-4xl text-frost ri-map-pin-line rounded-xl bg-primary"></i>
          <h3 className="mb-2 text-2xl font-medium">Location</h3>
          <p className="mb-2 text-center">
            Loacte us on the map globally so that you can <br /> solve your
            issues physically.
          </p>
          <p className="cursor-pointer hover:underline hover:text-primary">
            loaction link
          </p>
        </motion.div>
      </div>
    </>
  );
}

export default Contact;
