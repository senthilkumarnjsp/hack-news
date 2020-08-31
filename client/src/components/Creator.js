import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { TextField, Button, makeStyles } from "@material-ui/core";
import ModalUI from "./utils/ModalUI";
import SelectUI from "./utils/SelectUI";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 120,
  },
  formFields: {
    margin: theme.spacing(1),
  },
}));

const Creator = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState({
    label: "Title",
    value: null,
    error: null,
    helperText: "Give the challenge a title",
  });
  const [description, setDescription] = useState({
    label: "Description",
    value: null,
    error: null,
    helperText: "Give the challenge a description",
  });
  const [tagsChosen, setTagsChosen] = useState({
    label: "Tags",
    value: [],
    error: null,
    helperText: "Give the challenge some tags",
  });

  // List of predefined tags
  const tags = [
    "#React",
    "#Angular",
    "#Vue",
    "#Svelte",
    "#Ember",
    "#JavaScript",
    "#ES6",
    "#Classes",
    "#Components",
    "#CardsLayout",
    "#Router",
    "#Inputs",
    "#CRUD",
    "#Async",
    "#Search",
    "#Education",
    "#Entertainment",
    "#Personal",
  ];

  // Method to handle the title input
  const handleTitleInput = (e) => {
    let titleInput = e.target.value.trim();
    titleInput &&
      setTitle({ ...title, value: titleInput, label: "Title", error: false });
  };

  // Method to handle the description input
  const handleDescriptionInput = (e) => {
    let descriptionInput = e.target.value.trim();
    descriptionInput &&
      setDescription({
        ...description,
        value: descriptionInput,
        label: "Description",
        error: false,
      });
  };

  // Method to handle tags input
  const handleTagsInput = (e) => {
    e.target?.value &&
      setTagsChosen({
        ...tagsChosen,
        value: e.target.value,
        label: "Tags",
        error: false,
      });
  };

  // Method to retrieve token stored in the local storage
  function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key);
      return null;
    }
    return item.token;
  }

  // Method to handle submission of a new challenge
  const handleSubmit = async () => {
    if (title.value && description.value && tagsChosen.value) {
      try {
        const response = await fetch("/api/createChallenge", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getWithExpiry("authToken")}`,
          },
          body: JSON.stringify({
            challenge: {
              title: title.value,
              description: description.value,
              tags: tagsChosen.value,
            },
          }),
        });
        if (response.status === 200) {
          setTitle({ ...title, value: null });
          setDescription({ ...description, value: null });
          setTagsChosen({ ...tagsChosen, value: [] });
          props.toggleModal();
        }
      } catch (error) {
        return (
          <ModalUI open={props.open} handleModal={props.toggleModal}>
            {error.message}
          </ModalUI>
        );
      }
    }
    if (title.value === null) {
      setTitle({ ...title, error: true, helperText: "Cannot be empty" });
    }
    if (description.value === null) {
      setDescription({
        ...description,
        error: true,
        helperText: "Cannot be empty",
      });
    }
    if (tagsChosen.value === null) {
      setTagsChosen({
        ...tagsChosen,
        error: true,
        helperText: "Cannot be empty",
      });
    }
  };

  // Method to check the emptiness of an input field
  const checkIsEmpty = (e, field, setField) => {
    let helpingText = field.helperText;
    if (
      e.target?.value.length === 0 ||
      e.target.value === null ||
      e.target.value === ""
    ) {
      setField({ ...field, helperText: "Cannot be empty", error: true });
    } else {
      setField({ ...field, helperText: helpingText, error: false });
    }
  };

  const children = (
    <div className="creator">
      {/* Creator component to handle new challenge */}
      <TextField
        label={title.label}
        className={classes.formFields}
        variant="outlined"
        onChange={handleTitleInput}
        onBlur={(e) => checkIsEmpty(e, title, setTitle)}
        error={title.error}
        helperText={title.helperText}
      />
      <TextField
        label={description.label}
        multiline
        className={classes.formFields}
        rows={4}
        variant="outlined"
        onChange={handleDescriptionInput}
        onBlur={(e) => checkIsEmpty(e, description, setDescription)}
        error={description.error}
        helperText={description.helperText}
      />

      <SelectUI
        tags={tags}
        tagsChosen={tagsChosen}
        handleTagsInput={handleTagsInput}
        checkEmpty={checkIsEmpty}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Add
      </Button>
    </div>
  );
  return (
    <ModalUI open={props.open} handleModal={props.toggleModal}>
      {children}
    </ModalUI>
  );
};

export default withRouter(Creator);
