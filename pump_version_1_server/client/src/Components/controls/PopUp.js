import { Dialog, DialogContent, DialogTitle, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Controls from "./Controls"
const useStyles = makeStyles(theme => ({
  dialogWrapper: {
    padding: theme.spacing(2),
    position: "absolute",
    top: theme.spacing(5)
  },
  dialogTitle: {
    paddingRight: "0px"
  }
}))
export default function PopUp(props) {
  const { title, children, openPopup, setOpenPopup } = props
  const classes = useStyles()
  return (
    <div>
      <Dialog open={openPopup} maxWidth="md" classes={{ paper: classes.dialogWrapper }}>
        <DialogTitle className={classes.dialogTitle}>
          <div style={{ display: "flex" }}>
            <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <Controls.Button color="secondary" text="X"></Controls.Button>
          </div>
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </div>
  )
}
