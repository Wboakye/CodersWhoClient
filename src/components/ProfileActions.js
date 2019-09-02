import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles({
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});

export default function ProfileActions(props) {
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [text, setText] = React.useState([]);
  const [header, setHeader] = React.useState("");

  const handleClickOpen = (text, header) => {
    setHeader(header);
    setText(text);
    setOpen(true);
    setScroll("paper");
  };

  function handleClose() {
    setOpen(false);
  }

  const classes = useStyles();
  // const sampleFollowers = [
  //   "Tim",
  //   "Joe",
  //   "Bob",
  //   "Salle",
  //   "James",
  //   "Tom",
  //   "Sandra",
  //   "Jake",
  //   "Michael",
  //   "Mitch",
  //   "Danny",
  //   "Lisa",
  //   "Rashad",
  //   "Tim",
  //   "Joe",
  //   "Bob",
  //   "Salle",
  //   "James",
  //   "Tom",
  //   "Sandra",
  //   "Jake",
  //   "Michael",
  //   "Mitch",
  //   "Danny",
  //   "Lisa",
  //   "Rashad",
  //   "Tim",
  //   "Joe",
  //   "Bob",
  //   "Salle",
  //   "James",
  //   "Tom",
  //   "Sandra",
  //   "Jake",
  //   "Michael",
  //   "Mitch",
  //   "Danny",
  //   "Lisa",
  //   "Rashad",
  //   "Tim",
  //   "Joe",
  //   "Bob",
  //   "Salle",
  //   "James",
  //   "Tom",
  //   "Sandra",
  //   "Jake",
  //   "Michael",
  //   "Mitch",
  //   "Danny",
  //   "Lisa",
  //   "Rashad",
  //   "Tim",
  //   "Joe",
  //   "Bob",
  //   "Salle",
  //   "James",
  //   "Tom",
  //   "Sandra",
  //   "Jake",
  //   "Michael",
  //   "Mitch",
  //   "Danny",
  //   "Lisa",
  //   "Rashad",
  //   "Tim",
  //   "Joe",
  //   "Bob",
  //   "Salle",
  //   "James",
  //   "Tom",
  //   "Sandra",
  //   "Jake",
  //   "Michael",
  //   "Mitch",
  //   "Danny",
  //   "Lisa",
  //   "Rashad"
  // ];

  return (
    <div className="mb-3">
      <Card className={classes.card}>
        <CardContent>
          <div className="row">
            <div className="col text-center">
              <Button
                onClick={() => {
                  handleClickOpen(props.actionsInfo.followers, "Followers");
                }}
              >
                {props.actionsInfo.followers.length}
              </Button>
              <div>Followers</div>
            </div>
            <div className="col text-center">
              <Button
                onClick={() => {
                  handleClickOpen(props.actionsInfo.following, "Following");
                }}
              >
                {props.actionsInfo.following.length}
              </Button>
              <div>Following</div>
            </div>
            <div className="col text-center">
              <Button
                onClick={() => {
                  handleClickOpen(props.actionsInfo.groups, "Groups");
                }}
              >
                {props.actionsInfo.groups.length}
              </Button>
              <div>Groups</div>
            </div>
          </div>
        </CardContent>
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          maxWidth="xs"
          fullWidth={true}
        >
          <DialogTitle id="scroll-dialog-title">{header}</DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText>
              {text.map((item, index) => (
                <div key={index}>
                  <div className="py-3">{item}</div>
                  <Divider />
                </div>
              ))}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </div>
  );
}
