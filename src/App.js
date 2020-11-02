import { conforms } from "lodash";
import React, { useState, useEffect } from "react";
import { doFetch } from "./usefetchHttp";

export default function App() {
  const todosApi = "https://jsonplaceholder.typicode.com/todos";
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [todo, postNewTodo] = doFetch();

  const createTodo = () => {
    postNewTodo({
      method: "POST",
      url: todosApi,
      body: { title: title, body: body, userId: 1 },
      config: {
        mode: "cors",
        credentials: "include"
      }
    });
  };

  return (
    <div>
      <h1>New Todo</h1>
      <label>
        Title:{" "}
        <input value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Body: <input value={body} onChange={(e) => setBody(e.target.value)} />
      </label>
      <button onClick={createTodo}>Create Todo</button>
      <div className="new-todo">
        {(todo.pending && "Creating Todo...") ||
          (todo.complete &&
            `Todo with title ${todo.data.title} created with ID ${todo.data.id}`)}
      </div>
    </div>
  );
}
