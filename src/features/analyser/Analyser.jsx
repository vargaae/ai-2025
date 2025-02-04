import "./analyser.scss";
import React, { useState } from "react";
import axios from "axios";

import { loader } from "../../assets";

import { images } from "./data";

const Analyser = () => {
  const [input, setInput] = useState("");
  const [imageUrl, setImageUrl] = useState("/");
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Képfeltöltés kezelése és API hívás
  const onImageSubmit = async () => {
    if (!input) return;
    setImageUrl(input);
    setError("");

    try {
      setLoading(true);

      // if (predictions) {
      //   // Use cached data if available
      //   return;
      // }

      const response = await axios.post(
        "https://imagedetect-fastapi-2025.onrender.com/predict",
        {
          image_url: input, // FastAPI-nak megfelelő formátum
        }
      );
      if (response.data?.predictions) {
        const concepts = response.data.predictions || [];
        setPredictions(concepts);
      }
    } catch (error) {
      console.error("Error fetching data from Clarifai API:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Thumbnail kiválasztás
  const onClickThumb = (img) => {
    setInput(img);
    setImageUrl(img);
  };

  return (
    <div className="ai__features section__padding">
      <div className="ai__features-container">
        {images &&
          images.map((img) => (
            <div
              className="thumb-container"
              key={img.id}
              onClick={() => onClickThumb(img.img)}
            >
              <a target="_blank" rel="noreferrer">
                <div className="thumbnail">
                  <div className="thumbnail__container">
                    <div
                      className="thumbnail__img"
                      style={{ backgroundImage: `url(${img.img})` }}
                    >
                      <div className="thumbnail__content">
                        <h1 className="thumbnail__caption">{img.title}</h1>
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          ))}
      </div>

      <div className="ai__features-heading">
        <h1 className="gradient__text">
          The Future is Now. Let&#39;s use AI for analysing.
        </h1>

        {/* 🔹 Kép megjelenítése */}
        <img
          id="inputimage"
          className="p-img"
          alt="Analyzed"
          src={
            imageUrl === "/"
              ? "https://www.surveycto.com/wp-content/plugins/phastpress/phast.php/c2VydmljZT1pbWFnZXMmc3JjPWh0dHBzJTNBJTJGJTJGd3d3LnN1cnZleWN0by5jb20lMkZ3cC1jb250ZW50JTJGdXBsb2FkcyUyRjIwMjMlMkYxMSUyRmRhdGEtY29sbGVjdGlvbi10b29sc19maW5hbF9oZWFkZXIucG5nJmNhY2hlTWFya2VyPTE3MDA1OTY1MTEtNDk2NTI0JnRva2VuPTdmOTNkOGYzNDU5ZDQ2YjY.q.png"
              : imageUrl
          }
          style={{ height: 300, width: "auto", padding: 10 }}
        />

        {/* 🔹 URL bevitel és elemzés indítása */}
        <div>
          <p className="f3">
            {
              "Choose a demo image or Paste your image's URL here and AI will analyse it:"
            }
          </p>
          <div className="ai__header-content__input">
            <button onClick={onImageSubmit} className="action_btn">
              Analyse
            </button>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste the URL of an image"
              value={input}
            />
          </div>
        </div>
      </div>

      {/* 🔹 API válasz megjelenítése */}
      <div className="ai__features-heading">
        <div className="i center">
          <div className="details">
            <div className="console">Clarifai API</div>
            <div id="customers">
              <div className="ai-analysis__table">
                <div className="ai-analysis__table__leftcolumn">
                  PROBABILITY
                </div>
                <div className="ai-analysis__table__rightcolumn">
                  PREDICTED CONCEPT
                </div>
              </div>
              <div className="ai-analysis__predictions-table">
                {loading ? (
                   <>
                   <div
                   className="ai-analysis__predictions-table-row"
                 >
                   <div className="ai-analysis__table__leftcolumn">
                   <span>{">"} </span>
                    Loading Predictions...
                   </div>
                   <div className="ai-analysis__table__rightcolumn">
                   </div>
                  </div>
                    <img
                    src={loader}
                    alt="loader"
                    className="w-25 h-25 object-contain"
                    />
                    </>
                ) : predictions && predictions?.length ? (
                  predictions
                    ?.filter((item) => item?.value > 0.91)
                    .map((item) => (
                      <div
                        className="ai-analysis__predictions-table-row"
                        key={item.name}
                      >
                        <div className="ai-analysis__table__leftcolumn">
                          <span>{">"} </span>
                          {Math.round(item.value * 100)}%
                        </div>
                        <div className="ai-analysis__table__rightcolumn">
                          {item.name}
                        </div>
                      </div>
                    ))
                ) : (
                  <div className="warning red" key={predictions?.length}>
                    Choose a Demo Image or Paste an URL of the image that you
                    want to analyse and then click the Analyse button
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="image-concepts">
            <a href={imageUrl} target="blank"></a>
          </div>
          <div id="wgpt4"></div>
        </div>
      </div>
    </div>
  );
};

export default Analyser;
