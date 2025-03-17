import React, { useState } from "react";
import accordianData from "./data";

function AccordianItem({ question, ans, isExpanded, onToggle }) {
  return (
    <div
      className={`rounded-xl overflow-hidden transition-all duration-500 hover:bg-gray-100 ${
        isExpanded ? "max-h-96" : "max-h-20"
      }`}
    >
      <div
        onClick={onToggle}
        className="flex items-start justify-between gap-4 p-4 cursor-pointer"
      >
        <h2 className="text-2xl font-medium">{question}</h2>
        <i
          className={`ri-arrow-down-s-line text-3xl transition-all duration-500 ${
            isExpanded ? "rotate-180" : ""
          }`}
        ></i>
      </div>

      <div
        className={`px-5 pb-5 overflow-hidden transition-all duration-500 ${
          isExpanded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div>{ans}</div>
      </div>
    </div>
  );
}

function FaqAccordian() {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <>
      <div className="flex flex-col max-w-lg gap-3 mx-auto">
        {accordianData.map((item) => (
          <AccordianItem
            key={item.id}
            {...item}
            isExpanded={expanded === item.id}
            onToggle={() => toggleExpand(item.id)}
          />
        ))}
      </div>
    </>
  );
}

export default FaqAccordian;
