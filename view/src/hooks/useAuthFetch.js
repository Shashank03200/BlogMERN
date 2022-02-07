import { useQuery } from "react-query";

import axios from "axios";

function useAuthFetch(reqBody) {
  const performQuery = (reqBody) => {
    return axios({
      method: reqBody.method,
      url: reqBody.url,
      data: reqBody.data,
    });
  };

  const { isLoading, data, error, isError, refetch } = useQuery(
    "react-sum",
    performQuery(reqBody),
    {
      onSuccess: (data) => console.log(data),
      onError: (err) => console.log(err),
      enabled: false,
    }
  );

  return {
    isLoading,
    data,
    isError,
    error,
    refetch,
  };
}

export default useAuthFetch;
