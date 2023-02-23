import { Box, Modal, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import NewTodoDetails from "./NewTodoDetails";

const ResponsiveAddTask = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: "50%",
    height: "25%",
  },
  [theme.breakpoints.up("lg")]: {
    width: "50%",
    height: "18%",
  },
}));

const ResponsiveHeader = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    paddingLeft: "5%",
  },
}));

const ResponsiveAddCircleOutlineIcon = styled(AddCircleOutlineIcon)(
  ({ theme }) => ({
    [theme.breakpoints.down("md")]: {
      marginRight: "5%",
    },
  })
);

interface updateTaskState {
  updateTaskState: (
    newTaskTitle: string,
    newTaskIsCompleted: boolean,
    newTaskId: string
  ) => void;
}

const AddTodo: React.FC<updateTaskState> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          background:
            "linear-gradient(to bottom right, hsla(240,5%,96%,0), hsla(240,5%,96%,1))",
          alignItems: "center",
        }}
      >
        <ResponsiveHeader
          sx={{ color: "#4b5563", paddingLeft: "25%", fontSize: "3rem" }}
        >
          Tasks
        </ResponsiveHeader>
        <ResponsiveAddCircleOutlineIcon
          sx={{ marginRight: "25%", fontSize: "3rem" }}
          onClick={() => {
            setOpen(true);
          }}
        />
      </Box>
      <Modal
        sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ResponsiveAddTask
          sx={{
            background: "white",
            backgroundColor: "white",
            borderStyle: "solid",
            borderColor: "#192b33",
            position: "relative",
            width: "70%",
            height: "35%",
          }}
        >
          <NewTodoDetails updateTaskState={props.updateTaskState}/>
        </ResponsiveAddTask>
      </Modal>
    </>
  );
};

export default AddTodo;
