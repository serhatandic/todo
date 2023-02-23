import { Box, Checkbox } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import AddTodo from "./AddTodo";
import { styled } from "@mui/material/styles";

import { config } from "../config";

const ResponsiveTitle = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingLeft: "5%",
  },
}));

const ResponsiveDeleteIcon = styled(DeleteOutlineIcon)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginRight: "5%",
  },
}));

const TodoList = () => {
  const [tasks, setTasks] = useState<
    { title: string; isCompleted: boolean; id: string }[]
  >([]);

  const updateTaskState = async (
    newTaskTitle: string,
    newTaskIsCompleted: boolean,
    newTaskId: string
  ) => {
    setTasks((prev) => [
      { title: newTaskTitle, isCompleted: newTaskIsCompleted, id: newTaskId },
      ...prev,
    ]);
  };

  const handleFinishTask = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    axios.patch(
      "https://todo.crudful.com/tasks/" + id,
      {
        isCompleted: e.target.checked,
      },
      {
        headers: { cfAccessKey: config.cfAccessKey },
      }
    );
  };

  useEffect(() => {
    const requests = async () => {
      const tasks = await axios.get("https://todo.crudful.com/tasks", {
        headers: { cfAccessKey: config.cfAccessKey },
      });

      setTasks(tasks.data.results);
      console.log(tasks);
    };

    requests();
  }, []);

  const deleteHandler = async (id: string) => {
    axios.delete("https://todo.crudful.com/tasks/" + id, {
      headers: { cfAccessKey: config.cfAccessKey },
    });
  };

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
      <AddTodo updateTaskState={updateTaskState} />
      {tasks.map((task, key) => (
        <ResponsiveTitle
          key={key}
          sx={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0), rgba(219,234,254,1))",
            paddingLeft: "25%",
            fontSize: "1.5rem",
            fontFamily: "Roboto Slab",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <Checkbox
              defaultChecked={task.isCompleted}
              onChange={(e) => {
                handleFinishTask(e, task.id);
              }}
            />
            {task.title}
          </Box>

          <ResponsiveDeleteIcon
            onClick={async () => {
              setTasks((prev) =>
                prev.filter((currTask) => currTask.id !== task.id)
              );
              await deleteHandler(task.id);
            }}
            sx={{ float: "right", marginRight: "33%", fontSize: "3rem" }}
          />
        </ResponsiveTitle>
      ))}
    </Box>
  );
};

export default TodoList;
