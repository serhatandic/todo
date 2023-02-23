import { Box, Checkbox } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { styled } from "@mui/material/styles";
import axios from "axios";
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

const deleteHandler = async (id: string) => {
  axios.delete("https://todo.crudful.com/tasks/" + id, {
    headers: { cfAccessKey: config.cfAccessKey },
  });
};

interface props {
  task: { title: string; isCompleted: boolean; id: string };
  setTasks: React.Dispatch<
    React.SetStateAction<{ title: string; isCompleted: boolean; id: string }[]>
  >;
}

const Todo: React.FC<props> = (props) => {

  const handleFinishTask = async (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    props.setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return { ...task, isCompleted: e.target.checked };
        }
        return task;
      })
    );

    await axios.patch(
      "https://todo.crudful.com/tasks/" + id,
      {
        isCompleted: e.target.checked,
      },
      {
        headers: { cfAccessKey: config.cfAccessKey },
      }
    );
  };

  return (
    <ResponsiveTitle
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
          checked={props.task.isCompleted}
          onChange={(e) => {
            handleFinishTask(e, props.task.id);
          }}
        />
        {props.task.title}
      </Box>

      <ResponsiveDeleteIcon
        onClick={async () => {
          props.setTasks((prev) =>
            prev.filter((currTask) => currTask.id !== props.task.id)
          );
          await deleteHandler(props.task.id);
        }}
        sx={{ float: "right", marginRight: "33%", fontSize: "3rem" }}
      />
    </ResponsiveTitle>
  );
};

export default Todo;
