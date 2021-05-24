import { useCallback } from 'react';

import axios from 'axios';

const useFetch = () => {
  const request = useCallback(async (url, config) => {
    let response = null;
    let json = null;
    let error = false;

    try {
      response = await axios(url, config);
      json = response.data;
    } catch (err) {
      error = err;
    }

    return { response, json, error };
  }, []);

  return { request };
};

export default useFetch;
