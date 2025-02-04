import React, { useEffect, useState } from "react";
import axios from 'axios';

// TODO: getNews version A: Next async await , B: Summarizer Lazy Query - it works with button click
// A v:
// import { getNewsInfo } from "../../services/newsApi";
// B v:
// import { useLazyGetNewsQuery } from "../../services/newsApi";
import News from "../../components/news/News";

const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;

// const getNewsInfo = async () => {
//   const newsData = await fetch(
//     `https://newsapi.org/v2/everything?apiKey=c6b7a51f201b426c9cfe9c5053d9bd5f&q=ai&pageSize=7`,
//     { next: { revalidate: 30 } }
//   );
//   return newsData.json();
// };

const Blog = () => {
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/everything?apiKey=c6b7a51f201b426c9cfe9c5053d9bd5f&q=artificial_intelligence&pageSize=7`);
        setApiData(response.data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  //   const [getNews, { error, isFetching }] = useLazyGetNewsQuery();
  // const getNews = getNewsInfo().then((response) => {
  //   return response.data;
  //   // console.log(response);
  //   /*
  //     {
  //       status: "ok",
  //       articles: [...]
  //     }
  //   */
  // });

  const newsData = apiData;
  console.log(newsData);
  // const newsData = getNews.articles;

  return (
    <div id="blog">
      BLOG
      {newsData &&
        newsData.map((news) => (
          <News
            key={news.title}
            imgUrl={news.urlToImage}
            date="Sep 26, 2023"
            text={news.title}
          />
        ))}
    </div>
  );
};

export default Blog;
