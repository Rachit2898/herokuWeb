import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import ToastService from "react-material-toast";
import DialogTitle from "@mui/material/DialogTitle";
import "./UseScreen.css";
import postModules from "../services/post";

const FormDialog = (props) => {
  const toast = ToastService.new({
    place: "topRight",
    duration: 3,
    maxCount: 5,
  });

  const apiFailureToast = (message) => {
    toast.error(message ? message : "apiConstant.API_FAILURE");
  };

  const apiSuccessToast = (msg) => {
    toast.success(msg ? msg : "apiConstant.API_SUCCESS");
  };
  const parseResponse = (promise) => {
    return promise
      .then((data) => {
        return [null, data];
      })
      .catch((err) => [err]);
  };

  const [post, setPost] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePost = async (e) => {
    e.preventDefault();
    const data = {
      body: post,
    };
    console.log(data);

    const response = await parseResponse(postModules.createPost(data));
    console.log(response);
    if (response[1].successCode == 200) {
      apiSuccessToast("Success", response.message);
      window.location.reload();
    } else {
      apiFailureToast("Failed");
    }
  };

  return (
    <div>
      <button onClick={handleClickOpen} className="btn-post" type="button">
        {" "}
        <p> start a post</p>
      </button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <b>Write a post</b>
        </DialogTitle>
        <DialogContent className="DialogContent">
          <textarea
            className="form-control"
            onChange={(e) => {
              setPost(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <button className="cancel_button" onClick={handleClose}>
            Cancel
          </button>
          <button className="post_button" onClick={handlePost}>
            Post
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FormDialog;
