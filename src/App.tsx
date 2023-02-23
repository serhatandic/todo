import React, { useEffect } from "react";

import TodoList from "./Components/TodoList";
import AddTodo from "./Components/AddTodo";

function App() {
  useEffect(() => {
    //requests();
  }, []);
  return (
    <div className="App">
      <TodoList />
    </div>
  );
}

export default App;
