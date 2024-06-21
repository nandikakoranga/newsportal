import { useState, useEffect } from "react";
import axios from "axios";

const useNewsData = (category, searchTerm) => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNewsData() {
      try {
        setLoading(true);

        const apiKey = process.env.REACT_APP_GNEWS_API_KEY;
        const apiUrl = "https://gnews.io/api/v4/top-headlines";
        const params = {
          token: apiKey,
          topic: category || undefined,
          q: searchTerm || undefined,
        };

        const response = await axios.get(apiUrl, { params });

        setNewsData(response.data.articles);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    fetchNewsData();
  }, [category, searchTerm]);

  return { newsData, loading, error };
};

export default useNewsData;