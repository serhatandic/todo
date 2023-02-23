import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { config } from "../config";

interface props {
  updateTasksFromSubComponent: (
    id: string,
    title: string,
    isCompleted: boolean
  ) => void;
}

const AddTodoFields: React.FC<props> = (props) => {
  const [newTask, setNewTask] = useState<string>("");

  const addNewTaskHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const response = (
      await axios.post(
        "https://todo.crudful.com/tasks",
        {
          title: newTask,
          isCompleted: false,
        },
        {
          headers: { cfAccessKey: config.cfAccessKey },
        }
      )
    ).data;
    props.updateTasksFromSubComponent(
      response.id,
      response.title,
      response.isCompleted
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
        }}
      >
        Add
      </Button>
    </Box>
  );
};

export default AddTodoFields;
