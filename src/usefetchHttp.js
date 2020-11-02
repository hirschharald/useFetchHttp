import { useEffect, useState } from "react";

export const useFetch = (req) => {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  console.log(req.url);
  useEffect(() => {
    setRes({
      data: null,
      pending: true,
      error: false,
      complete: false
    });

    fetch(req.url, { method: req.method })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setRes({
          data: data,
          pending: false,
          error: true,
          complete: true
        });
      })
      .catch((error) => {
        setRes({
          data: null,
          pending: true,
          error: true,
          complete: false
        });
      });
  }, [req.url]);
  return res;
};
