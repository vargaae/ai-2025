import { Link } from "react-router-dom";
import "./news.css";


const News = ({ imgUrl, isoDate, text, articleUrl }) => {
  const date = new Date(isoDate);
  const timeZoneMatch = isoDate.match(/([+-]\d{2}:\d{2})$/);
  const timeZone = timeZoneMatch ? `${timeZoneMatch[1]}` : "UTC";
  
  const formattedStartTime = date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: timeZone,
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  return (
    <Link to={articleUrl} target="_blank">
      <div className="ai__blog-container_article">
        <div className="ai__blog-container_article-image">
          <img src={imgUrl} alt="blog_image" />
        </div>
        <div className="ai__blog-container_article-content">
          <div>
            <p>{formattedStartTime}</p>
            <h3>{text}</h3>
          </div>
          <p>Read Full Article</p>
        </div>
      </div>
    </Link>
  );
};

export default News;
