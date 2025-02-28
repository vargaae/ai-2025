import { useEffect, useState } from "react";
import axios from "axios";
import Article from "../../components/article/Article";
import News from "../../components/news/News";
import { blog01, blog02, blog03, blog04, blog05 } from "./imports";
import { loader } from "../../assets";
import "./blog.css";

const Blog = () => {
  const [cachedData, setCachedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const newsQuery = "chatgpt";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (cachedData) {
          // Use cached data if available
          return;
        }

        const response = await axios.get(
          `https://imagedetect-fastapi-2025.onrender.com/news/?q=${newsQuery}`,
          {
            headers: {
              "Access-Control-Allow-Origin": true,
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

  const getNewsData = async () => {
    if (cachedData) {
      // Use cached data if available
      return;
    }
    const response = await fetch(
      `https://imagedetect-fastapi-2025.onrender.com/news/?query=${newsQuery}`
    )
      .then((response) => response.json())
      .then((data) => setCachedData(data))
      .catch((error) => console.error("News API fetch failed:", error));
  };
  const newsData = cachedData;
  return (
    <div className="ai__blog section__padding" id="blog">
      <div className="ai__blog-heading">
        <h1 className="gradient__text">
          <button onClick={getNewsData}>
            A lot is happening, <br /> What's the News about GPT models?
          </button>
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
            newsData?.slice(0, 4).map((news) =>
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
