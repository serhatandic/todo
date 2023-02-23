import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useState } from "react";
import AddTodoModal from "./AddTodoModal";

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

interface props {
  updateTasksFromSubComponent: (
    id: string,
    title: string,
    isCompleted: boolean
  ) => void;
}

const Navbar: React.FC<props> = (props) => {
  const [open, setOpen] = useState<boolean>(false);

  const modalCloseHandler = () => {
    setOpen(false);
  };

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
      <AddTodoModal
        open={open}
        modalCloseHandler={modalCloseHandler}
        updateTasksFromSubComponent={props.updateTasksFromSubComponent}
      />
    </>
  );
};

export default Navbar;
