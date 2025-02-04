import React, { useEffect, useState } from "react";
import axios from "axios";

import Article from "../../components/article/Article";
import News from "../../components/news/News";
import { blog01, blog02, blog03, blog04, blog05 } from "./imports";
import { loader } from "../../assets";
import "./blog.css";

const Blog = () => {
  const [cachedData, setCachedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
  // const newsQuery = "chatgpt";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (cachedData) {
          // Use cached data if available
          return;
        }

        const response = await axios.get(
          `https://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=chatgpt&pageSize=5`,
          {
            headers: {
              // 'Access-Control-Allow-Origin': true,
            },
          }
        );
        setCachedData(response.data.articles); // Handle the response
      } catch (error) {
        console.error(
          "Error fetching data from 'https://newsapi.org/v2/':",
          error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const newsData = cachedData;

  return (
    <div className="ai__blog section__padding" id="blog">
      <div className="ai__blog-heading">
        <h1 className="gradient__text">
          A lot is happening, <br /> What about GPT models?
        </h1>
      </div>
      <div className="ai__blog-container">
        <div className="ai__blog-container_groupA">
          <Article
            imgUrl={blog01}
            date="Jan 27, 2025"
            text="New Open Source DeepSeek V3 Language Model Making Waves? GPT-4o and Open AI is the future? Let us explore how it is?"
            articleUrl="https://hackaday.com/2025/01/27/new-open-source-deepseek-v3-language-model-making-waves/"
          />
        </div>
        <div className="ai__blog-container_groupB">
          {loading ? (
            <div>
              <img
                src={loader}
                alt="loader"
                className="w-25 h-25 object-contain"
              />
              Loading...
            </div>
          ) : (
            newsData &&
            newsData.map((news) =>
              news.title ? (
                <News
                  key={news.title}
                  imgUrl={news.urlToImage}
                  date={news.publishedAt}
                  text={news.title}
                  articleUrl={news.url}
                />
              ) : (
                <>
                  <Article
                    imgUrl={blog02}
                    date="Sep 26, 2023"
                    text="GPT-4 and Open  AI is the future. Let us exlore how it is?"
                  />
                  <Article
                    imgUrl={blog03}
                    date="Sep 26, 2023"
                    text="GPT-4 and Open  AI is the future. Let us exlore how it is?"
                  />
                  <Article
                    imgUrl={blog04}
                    date="Sep 26, 2023"
                    text="GPT-4 and Open  AI is the future. Let us exlore how it is?"
                  />
                  <Article
                    imgUrl={blog05}
                    date="Sep 26, 2023"
                    text="GPT-4 and Open  AI is the future. Let us exlore how it is?"
                  />
                </>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
