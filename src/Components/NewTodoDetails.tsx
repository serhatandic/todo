import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { config } from "../config";


interface updateTaskState {
  updateTaskState: (newTaskTitle: string, newTaskIsCompleted: boolean, id:string) => void;
}

const NewTodoDetails: React.FC<updateTaskState> = (props) => {
  const [newTask, setNewTask] = useState<string>("");

  const addNewTaskHandler = (e: React.MouseEvent<HTMLButtonElement>) => {

    axios.post(
      "https://todo.crudful.com/tasks",
      {
        title: newTask,
        isCompleted: false,
      },
      {
        headers: { cfAccessKey: config.cfAccessKey },
      }
    );
  };

  return (
    <Box>
      <TextField
        label="Create Task"
        size="small"
        sx={{ marginLeft: "5%", marginTop: "15px", width: "90%" }}
        onChange={(e) => {
          setNewTask(e.target.value);
        }}
      />
      <Button
        sx={{ marginLeft: "5%", marginTop: "5px", width: "90%" }}
        variant="contained"
        onClick={(e) => {
          addNewTaskHandler(e);
          props.updateTaskState(newTask, false, "mockID");
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default NewTodoDetails;
