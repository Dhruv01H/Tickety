import React, { useState } from "react";
import { FaqAccordian } from "../../components/component_index"

function FAQ() {

  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a043e90a-2d7e-48ae-9ba2-29cfad5dded0");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      toast.success("Form Submitted Successfully");
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      toast.error("Error submitting form");
      console.log("Error", data);
      setResult(data.message);
    }
  };
  
  return (
    <>
      <div className="bg-[url('./faq.jpg')] bg-no-repeat bg-cover min-h-[50vh] w-full flex flex-col items-center justify-center text-frost mb-3">
        <h2 className="p-3 text-5xl font-medium md:text-6xl md:-mt-16 md:mb-2">FAQ's</h2>
        <p className="px-3 text-sm text-center md:max-w-4xl md:text-lg">
          Get all of your questions answered at one place. Fell free to fill out
          the form for better and personalized solutions to your questions.
        </p>
      </div>
      <div className="mb-20 border-t-[14px] border-black border-dashed" />

      <div className="flex flex-col py-6 mb-24 xl:px-60 lg:flex-row gap-x-14 gap-y-8">
        <div className="p-5 lg:rounded-lg md:px-10 lg:shadow-lg basis-1/2 max-lg:border-b-2 max-lg:border-gray-400">
          <form onSubmit={onSubmit} className="w-full">
            <h4 className="text-lg font-medium text-primary">FAQ's</h4>
            <h3 className="mb-5 text-5xl">
              All Your Questions Have Answers Here!
            </h3>

            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="fullname">Name</label>
              <input
                type="text"
                name="fullname"
                id="fullname"
                className="h-10 px-3 border border-gray-500 rounded-md outline-none focus:border-2 focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="mail">Email</label>
              <input
                type="email"
                name="mail"
                id="mail"
                className="h-10 px-3 border border-gray-500 rounded-md outline-none focus:border-2 focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-3 mb-5">
              <label htmlFor="question">Question</label>
              <textarea
                name="question"
                id="question"
                className="h-32 px-3 py-2 border border-gray-500 rounded-md outline-none focus:border-2 focus:border-primary"
              />
            </div>

            <button
              type="submit"
              className="px-3 py-1.5 text-lg text-frost font-medium rounded-lg bg-dark hover:bg-primary hover:scale-105 transition duration-500 cursor-pointer"
            >
              Submit
            </button>
          </form>
        </div>

        <hr className="hidden lg:block w-[2px] h-[560px] bg-primary" />

        <div className="basis">
          <FaqAccordian />
        </div>
      </div>
    </>
  );
}

export default FAQ;
