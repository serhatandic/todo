import React, { useEffect } from "react";

import TodoList from "./Components/TodoList";

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
