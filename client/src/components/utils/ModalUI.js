import React from "react";
import { Modal, Fade } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ModalUI = (props) => {
  const classes = useStyles();
  return (
    <Modal
      open={props.open}
      onClose={props.handleModal}
      className={classes.modal}
      closeAfterTransition
    >
      {/* Modal component for generic popover purpose - Reusable one */}
      <Fade in={props.open}>
        <div className={classes.paper}>
          <p id="transition-modal-description">
            {props.children ? props.children : "Testing"}
          </p>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalUI;
