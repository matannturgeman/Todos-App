import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import ListAltIcon from "@material-ui/icons/ListAlt";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { signInUser } from "../../services/user.service";
import { useDispatch } from "react-redux";
import { setLoginUserAction } from "../../store/actions/authActions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    marginTop: "15px",
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const SignInForm = (props) => {
  const { history } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);

  // handle onSubmit save loged user to localStorage & redux-store
  const onSubmit = async (data) => {
    try {
      const response = await signInUser(data);
      dispatch(setLoginUserAction(response.data));
      setError(false);
      history.push("/todos");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {/*Login header */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <ListAltIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        {/* form */}
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </form>

        {/* Error alert if error */}
        <div className={classes.alert}>
          {error && (
            <Alert severity="error" onClose={() => setError(false)}>
              {error}
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
};

export default SignInForm;
