import { useState, useCallback } from "react";

const cache = new Map();
const defaultOptions = {
  cacheKey: "",
  refetch: false,
};

export const useAsync = (defaultData) => {
  const [data, setData] = useState({
    data: defaultData ?? null,
    error: null,
    loading: false,
  });

  const run = useCallback(async (asyncFn, options = {}) => {
    try {
      const { cacheKey, refetch } = { ...defaultOptions, ...options };
      const result = { data: null, error: null, loading: false };
      if (!refetch && cacheKey && cache.has(cacheKey)) {
        const res = cache.get(cacheKey);
        result.data = res;
      } else {
        setData({ data: null, error: null, loading: true });
        const res = await asyncFn();
        result.data = res;
        cacheKey && cache.set(cacheKey, res);
      }
      setData(result);
      return result;
    } catch (error) {
      const result = { data: null, error: error, loading: false };
      setData(result);
      return result;
    }
  }, []);

  return {
    ...data,
    run,
  };
};

export default useAsync;
