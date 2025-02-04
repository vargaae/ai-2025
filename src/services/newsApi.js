// TODO: CLEANUP getNews-> version A: axios async await , B: Summarizer Lazy Query - it works with button click

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import axios from "axios";
import { useState } from "react";

  // const [cachedData, setCachedData] = useState(null);
  const newsApiKey = import.meta.env.VITE_NEWS_API_KEY;
  const newsQuery = "chatgpt";

export const getNewsInfo = () => {
    const [cachedData, setCachedData] = useState(null);
  const fetchData = async () => {
    try {
      if (cachedData) {
        // Use cached data if available
        return;
      }

      const response = await axios.get(
        `https://newsapi.org/v2/everything?apiKey=${newsApiKey}&q=${newsQuery}&pageSize=5`,
        {
          headers: {
            // 'Access-Control-Allow-Origin': true,
          },
        }
      );
      setCachedData(response.data); // Handle the response
    } catch (error) {
      console.error(
        "Error fetching data from 'https://newsapi.org/v2/':",
        error
      );
    }
  };
  fetchData();
};

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://newsapi.org/v2/`,
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => `everything?apiKey=${newsApiKey}&q=ai&pageSize=7`,
    }),
    // getNews: builder.query({
    //   query: (params) =>
    //     `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    // }),
  }),
});

export const { useLazyGetNewsQuery } = newsApi;
