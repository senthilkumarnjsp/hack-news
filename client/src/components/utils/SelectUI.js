import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function MultipleSelect({
  tags,
  tagsChosen,
  handleTagsInput,
  checkEmpty,
}) {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl} error={tagsChosen.error}>
      {/* Select component to choose the list of tags related to the challenge */}
      <InputLabel id="demo-mutiple-checkbox-label">
        {tagsChosen.label}
      </InputLabel>
      <Select
        labelId="demo-mutiple-checkbox-label"
        id="demo-mutiple-checkbox"
        multiple
        variant="outlined"
        value={tagsChosen.value}
        onChange={handleTagsInput}
        onBlur={(e) => checkEmpty(e, tagsChosen, handleTagsInput)}
        helperText={tagsChosen.helperText}
        input={<Input />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip key={value} label={value} className={classes.chip} />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {tags.map((tag) => (
          <MenuItem key={tag} value={tag}>
            <Checkbox checked={tagsChosen.value.indexOf(tag) > -1} />
            <ListItemText primary={tag} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
