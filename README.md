## useFetchHttp
custom hook for generating  get  and post Http Requests with fetch

## import hook

```js
  import { doFetch } from "./usefetchHttp"; // custom hook
```
##  Basic Get

```js
const [todolist, getTodos] = doFetch();

const getTodoList = () => {
  getTodos({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/todos",
  });
};
```
##  Get with options
```js
const [todolist, getTodos] = doFetch();

const getTodoList = () => {
  getTodos({
    method: "GET",
    url: "https://jsonplaceholder.typicode.com/todos",
    config: {
      mode: "cors",
      credentials: "include"
    }
  });
};
```
## Sample Post
```js
const [todo, postNewTodo] = doFetch();

const postTodo = () => {
  postNewTodo({
    method: "POST",
    url: "https://jsonplaceholder.typicode.com/todos",
    body: {title: "blabla", body: "this is a todo", user_id: 1},
    config: {
      mode: "cors",
      credentials: "include"
    }
  });
};
```
