import React, { useState } from 'react'
import axios from 'axios'
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
function AddMovie() {
  const [movieData, setMovieData] = useState({
    show_name: "",
    show_description: "",
    show_image_url: "",
    duration: "",
    languages: []
  });

  const languageOptions = [
    "English", "Hindi", "Spanish", "French", "Japanese", 
    "Korean", "Chinese", "German", "Italian", "Russian"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleLanguageChange = (language) => {
    if (movieData.languages.includes(language)) {
      setMovieData({
        ...movieData,
        languages: movieData.languages.filter(lang => lang !== language)
      });
    } else {
      setMovieData({
        ...movieData,
        languages: [...movieData.languages, language]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting movie data:", movieData);
    const formData = new FormData();
    console.log("Form data:", formData);
    const obj = Object.fromEntries(formData.entries());
    console.log("Object:", obj);
    try{
    const eventData = {
        name: movieData.name,
        show_name: movieData.show_name,
        show_description: movieData.show_description,
        show_image_url: movieData.show_image_url,
        duration: parseInt(movieData.duration),
        language: movieData.languages.join(", ") // Join languages with comma separator
    };
    const response = await axios.post(
      "http://localhost:8080/api/events/add",
    eventData,
  {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Response:", response.data);
    toast.success("Movie added successfully!", {
      position: "top-right",
      autoClose: 3000,
    });
    setTimeout(() => {
      navigate("/admin/movies");
    }, 3000);

} catch (error) {
    console.error("Error:", error.response?.data || error.message);
    toast.error("Movie addition failed. Please try again.", {
      position: "top-right",
      autoClose: 3000,
    });
  } 
    // Add API call to submit data here
  };

  return (
    <div className="p-6">
      <h1 className="mb-8 text-4xl font-bold text-primary">Add New Movie</h1>
      
      <form onSubmit={handleSubmit} className="max-w-3xl">
        <div className="mb-6">
          <label htmlFor="name" className="block mb-2 font-medium text-gray-700">
            Movie Title
          </label>
          <input
            type="text"
            id="name"
            name="show_name"
            value={movieData.name}
            onChange={handleChange}
            className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter movie title"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="description" className="block mb-2 font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="show_description"
            value={movieData.description}
            onChange={handleChange}
            className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm resize-none h-36 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter movie description"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="imageUrl" className="block mb-2 font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            name="show_image_url"
            value={movieData.imageUrl}
            onChange={handleChange}
            className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="https://example.com/movie-poster.jpg"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="duration" className="block mb-2 font-medium text-gray-700">
            Duration (minutes)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={movieData.duration}
            onChange={handleChange}
            className="w-full p-4 text-gray-800 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="120"
            required
            min="1"
          />
        </div>

        <div className="mb-8">
          <label className="block mb-3 font-medium text-gray-700">
            Languages
          </label>
          <div className="flex flex-wrap gap-3">
            {languageOptions.map((language) => (
              <button
                type="button"
                key={language}
                onClick={() => handleLanguageChange(language)}
                className={`px-5 py-2.5 cursor-pointer rounded-full text-sm font-medium transition-all duration-200 ${
                  movieData.languages.includes(language)
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200"
                }`}
              >
                {language}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-4 mt-10">
          <button
            type="submit"
            className="px-8 py-3.5 cursor-pointer font-medium text-white transition-colors duration-200 rounded-md bg-primary hover:bg-pink-600 shadow-md"
          >
            Add Movie
          </button>
          <button
            type="button"
            onClick={() => setMovieData({
              name: "",
              description: "",
              imageUrl: "",
              duration: "",
              languages: []
            })}
            className="px-8 py-3.5 font-medium cursor-pointer text-gray-800 transition-colors duration-200 rounded-md hover:bg-gray-400"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddMovie