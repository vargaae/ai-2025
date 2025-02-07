import Article from "../../components/article/Article";
import { blog01, blog02, blog03, blog04, blog05 } from "./imports";
import "./blog.css";
import { useState } from "react";

const Blog = () => {
  const [cashedData, setCashedData] = useState(null);
  const newsQuery = "chatgpt";

  const getNewsData = async () => {
    const response = await fetch(
      `https://imagedetect-fastapi-2025.onrender.com/news/?query=${newsQuery}`
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error("News API fetch failed:", error));

    const jsonData = await response.json();
    setCashedData(jsonData);
  };

  return (
    <div className="ai__blog section__padding" id="blog">
      <div className="ai__blog-heading">
        <h1 className="gradient__text">
          A lot is happening, <br /> What about GPT models?
          <button onClick={getNewsData}>Search News</button>
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
        </div>
      </div>
    </div>
  );
};

export default Blog;
