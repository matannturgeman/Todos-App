import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  spinner: {
    display: "flex",
    margin: "0 auto",
    justifyContent: "center",
    alignItems: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
  error: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export const LoadingSpinner = () => {
  const classes = useStyles();
  return (
    <div className={classes.spinner}>
      <CircularProgress />
    </div>
  );
};

export const ErrorAlert = ({ message }) => {
  const classes = useStyles();
  return (
    <div className={classes.error}>
      <Alert severity="error" elevation={6} variant="filled">
        <AlertTitle>Error</AlertTitle>
        {message ? (
          <strong>{message}</strong>
        ) : (
          <strong>Try again later</strong>
        )}
      </Alert>
    </div>
  );
};
