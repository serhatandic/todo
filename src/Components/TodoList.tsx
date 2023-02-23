import { Box } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { config } from "../config";
import Navbar from "./Navbar";
import Todo from "./Todo";

const TodoList = () => {
  const [tasks, setTasks] = useState<
    { title: string; isCompleted: boolean; id: string }[]
  >([]);

  const getTasks = async () => {
    const tasks = await axios.get("https://todo.crudful.com/tasks", {
      headers: { cfAccessKey: config.cfAccessKey },
    });

    setTasks(tasks.data.results);
  };

  const updateTasksFromSubComponent = async (
    id: string,
    title: string,
    isCompleted: boolean
  ) => {
    setTasks((prev) => [{ title, isCompleted, id }, ...prev]);
  };

  useEffect(() => {
    getTasks();
  }, []);
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        gap: "2px",
        align: "center",
      }}
    >
      <Navbar updateTasksFromSubComponent={updateTasksFromSubComponent} />
      {tasks.map((task, key) => (
        <Todo key={key} task={task} setTasks={setTasks} />
      ))}
    </Box>
  );
};

export default TodoList;
