import { useEffect, useState } from "react";

const useFetch = (func) => {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: { error: false, message: "" }
  });
  const [{ url, method, body, config }, setReq] = useState({});

  useEffect(() => {
    if (!url) return;
    setRes({
      data: null,
      pending: true,
      error: { error: false, message: "" },
      complete: false
    });
    console.log("fetch", method, url, JSON.stringify(body), config);
    fetch(url, {
      method: method,
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      config
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          return response.json();
        } else {
          throw new Error("Fehler mit Status", response.status);
        }
      })
      .then((resp) => {
        console.log("res", resp);
        const fetch = async (resp) => {
          await setRes({
            data: resp,
            pending: false,
            error: { error: false, message: "" },
            complete: true
          });
        };
        fetch(resp);
      })
      .catch((error) => {
        setRes({
          data: null,
          pending: false,
          error: { error: true, message: error.message },
          complete: false
        });
      });
  }, [url, method, body, config]);

  return [res, (...args) => setReq(func(...args))];
};

export const doFetch = () => {
  /* eslint-disable react-hooks/rules-of-hooks */
  return useFetch((data) => ({
    url: data.url,
    method: data.method,
    body: data.body,
    config: data.config
  }));
};
