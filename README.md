# useFetchHttp
custom hook for generating  get  and post Http Requests with fetch

# define
  import { doFetch } from "./usefetchHttp"; // custom hook
  const [todo, postNewTodo] = doFetch();
  const [todolist, getTodos] = doFetch();

# Sample Get
const createTodo = () => {
    postNewTodo({
      method: "POST",
      url: "https://jsonplaceholder.typicode.com/todos",
      body: { title: title, body: body, userId: 1 },
      config: {
        mode: "cors",
        credentials: "include"
      }
    });
  };
# Sample Post
  const listTodos = () => {
    getTodos({
      method: "GET",
      url: "https://jsonplaceholder.typicode.com/todos",
      config: {
        mode: "cors",
        credentials: "include"
      }
    });
  };
