import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { Grid } from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { registerUser } from "../../services/user.service";
import { useDispatch, useSelector } from "react-redux";
import {
  clearPreviousLogedUser,
  setLoginUserAction,
} from "../../store/actions/authActions";
import Avatar from "@material-ui/core/Avatar";
import AddBoxIcon from "@material-ui/icons/AddBox";

const pushTimeout = 2000;

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
    width: "100%",
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

const RegisterForm = (props) => {
  const { history } = props;
  const classes = useStyles();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const dispatch = useDispatch();
  const { loginUser } = useSelector((state) => state.authReducer);

  useEffect(() => {
    if (success) setError(false);
  }, [success]);

  useEffect(() => {
    if (error) setSuccess(false);
  }, [error]);

  // handle onSubmit save new user to DB
  const onSubmit = async (userData) => {
    try {
      userData.age = Number(userData.age);
      const data = await registerUser(userData);
      setSuccess(data.user);
      if (data?.user) {
        dispatch(setLoginUserAction(data.user));
        setTimeout(() => history.push("/todos"), pushTimeout);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const signOut = (e) => {
    dispatch(clearPreviousLogedUser());
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      {/* Register header */}
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AddBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
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
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
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
          <TextField
            variant="outlined"
            margin="normal"
            inputRef={register}
            required
            fullWidth
            id="age"
            label="Age"
            name="age"
            type="number"
            InputProps={{ inputProps: { min: 0, max: 120 } }}
            autoComplete="age"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Register
          </Button>
          <Grid container>
            <Grid item>
              {loginUser ? (
                <Link to="/sign-in" onClick={signOut} variant="body2">
                  Connect from other user? Sign Out
                </Link>
              ) : (
                <Link to="/sign-in" variant="body2">
                  Already have an account? Sign In
                </Link>
              )}
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

        {/* Succes alert if register success */}
        <div className={classes.alert}>
          {success && (
            <Alert
              severity="success"
              onClose={() => {
                setError(false);
                setSuccess(false);
              }}
            >
              {success.username + " registered"}
            </Alert>
          )}
        </div>
      </div>
    </Container>
  );
};

export default RegisterForm;
