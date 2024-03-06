import default_image from "../../assets/default_image.svg";
import ai from "../../assets/ai.png";
import "./creator.css";

import React, { useRef, useState } from "react";

const Creator = () => {
  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  
  const imageGeneratorRequest = async () => {
    const openai_api_key = import.meta.env.VITE_OPENAI_API_KEY;
    if (inputRef.current.value === "") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer" + openai_api_key,
          "User-Agent": "Chrome",
        },
        body: JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n: 1,
          size: "512x512",
        }),
      }
    );
    let generate = await response.json();
    let data_array = generate.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  };

  return (
    <div className="ai__imagegenerator section__padding" id="imagegenerator">
      <div className="ai__header-content">
        <h1 className="gradient__text">
          Let&apos;s Generate a Painting with OpenAI
        </h1>
        <p>
          The Images API provides method for interacting with images: Creating
          images from scratch based on a text prompt (DALL·E 3, DALL·E 2)
        </p>

        <div className="ai__header-content__input">
          <input
            type="text"
            ref={inputRef}
            placeholder="Describe what you want to generate"
          />
          <button
            type="button"
            onClick={() => {
              imageGeneratorRequest();
            }}
          >
            Generate
          </button>
        </div>
      </div>

      <div className="ai__generator-img-loading">
        <div className="ai__generator-image">
          <img
            src={image_url === "/" ? default_image : image_url}
            alt="AI Image Generator"
          />
        </div>
        <div className="ai__generator-loading">
          <div
            className={
              loading
                ? "ai__generator-loading-bar-full"
                : "ai__generator-loading-bar"
            }
          ></div>
          <div
            className={
              loading
                ? "ai__generator-loading-text"
                : "ai__generator-display-none"
            }
          >
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Creator;
