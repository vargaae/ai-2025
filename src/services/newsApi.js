// TODO: CLEANUP getNews-> version A: axios async await , B: Summarizer Lazy Query - it works with button click

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import axios from "axios";
import { useState } from "react";

// const [cachedData, setCachedData] = useState(null);
const newsQuery = "chatgpt";

const getNewsInfo = () => {
  const [cachedData, setCachedData] = useState(null);
  const fetchData = async () => {
    try {
      if (cachedData) {
        // Use cached data if available
        return;
      }

      const response = await axios.get(
        `https://imagedetect-fastapi-2025.onrender.com/news/?query=${newsQuery}`,
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

export default getNewsInfo;

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://imagedetect-fastapi-2025.onrender.com/`,
  }),
  endpoints: (builder) => ({
    getNews: builder.query({
      query: (newsQuery) => `news/?query=${newsQuery}`,
    }),
    // getNews: builder.query({
    //   query: (params) =>
    //     `summarize?url=${encodeURIComponent(params.articleUrl)}&length=3`,
    // }),
  }),
});

export const { useLazyGetNewsQuery } = newsApi;
