import React, { useState, useEffect } from "react";

const useFetch = (req) => {
  const { url, method, data } = req;
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: { error: false, message: "" }
  });
  useEffect(() => {
    if (!url) return;
    setRes({
      data: null,
      pending: true,
      error: { error: false, message: "" },
      complete: false
    });

    fetch(url, { method: method })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Fehler mit Status", response.status);
        }
      })
      .then((data) => {
        const fetch = async () => {
          await setTimeout(() => {
            console.log("timeout");
            setRes({
              data: data,
              pending: false,
              error: { error: false, message: "" },
              complete: true
            });
          }, 5000);
        };
        fetch();
      })
      .catch((error) => {
        console.log(error.message);
        setRes({
          data: null,
          pending: false,
          error: { error: true, message: error.message },
          complete: false
        });
      });
  }, [url, method]);
  console.log(res);
  const doFetch = () => {};
  return [res, doFetch];
};

////////////////////////////////////////////////////////////

export default function App() {
  const todosApi = "https://jsonplaceholder.typicode.com/todos";
  const [count, setCount] = useState(1);
  const [todo, setTodo] = useFetch({
    method: "GET",
    url: `${todosApi}/${count}`,
    data: ""
  });
  const createTodos = () => {
    setTodo({
      method: "GET",
      url: `${todosApi}/${count}`,
      data: ""
    });
  };

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Next Todo</button>
      <h1>Todo {count}</h1>
      <div className="error">{todo.error.error && todo.error.message}</div>
      <div className="loading">{todo.pending && "Loading... "}</div>
      <div>{todo.complete && todo.data.title}</div>
    </div>
  );
}
