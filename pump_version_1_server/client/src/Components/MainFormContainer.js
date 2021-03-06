import React from "react"
import Container from "@material-ui/core/Container"
import { makeStyles } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}))
const MainFormContainer = ({ children, ...props }) => {
  const styles = useStyles()
  return (
    <Container className={styles.root} component="main" maxWidth="xs" {...props}>
      {
        children //passing all the children and props to the container
      }
    </Container>
  )
}

export default MainFormContainer
