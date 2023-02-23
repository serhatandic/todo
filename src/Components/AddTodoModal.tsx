import { Box, Modal } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddTodoFields from "./AddTodoFields";

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

interface props {
  updateTasksFromSubComponent: (
    id: string,
    title: string,
    isCompleted: boolean
  ) => void;

  open: boolean;

  modalCloseHandler: () => void;
}

const AddTodoModal: React.FC<props> = (props) => {
  return (
    <Modal
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
      open={props.open}
      onClose={props.modalCloseHandler}
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
        <AddTodoFields
          updateTasksFromSubComponent={props.updateTasksFromSubComponent}
        />
      </ResponsiveAddTask>
    </Modal>
  );
};

export default AddTodoModal;
