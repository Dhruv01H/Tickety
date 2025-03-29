import React from "react";
import { cast } from "./data";

function CastAndStory() {
  return (
    <>
      <div className="max-w-6xl p-6 mx-auto mb-10">
        <h2 className="mb-6 text-2xl font-bold">Top Cast</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
          {cast.map((actor, index) => (
            <div key={index} className="flex flex-col items-center space-x-4 max-sm:flex-row min-lg:flex-row">
              <img
                src={actor.image}
                alt={actor.name}
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h3 className="font-bold">{actor.name}</h3>
                <p className="text-sm text-gray-600">as {actor.role}</p>
              </div>
            </div>
          ))}
        </div>
        <h2 className="mt-10 mb-4 text-2xl font-bold">Story Line</h2>
        <p className="text-gray-700">
          In a small town where everyone knows everyone, a peculiar incident
          starts a chain of events that leads to a child’s disappearance, which
          begins to tear at the fabric of an otherwise-peaceful community. Dark
          government agencies and seemingly malevolent supernatural forces
          converge on the town, while a few of the locals begin to understand
          that more is going on than meets the eye.
        </p>
      </div>
    </>
  );
}

export default CastAndStory;
