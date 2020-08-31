import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import ModalUI from "./utils/ModalUI";

const SortBy = () => {
  const [open, setOpen] = useState(false);

  const handleModal = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <Button
        variant="contained"
        fullWidth
        color="secondary"
        onClick={handleModal}
      >
        Sort by &nbsp;<i className="medium material-icons">sort</i>
      </Button>
      {open && <ModalUI open={open} handleModal={handleModal} />}
    </>
  );
};

export default SortBy;
