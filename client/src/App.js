import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import AppPages from "./routes/AppPages";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import { loadUserFromTokenAction } from "./store/actions/authActions";
import "./App.css";

function App() {
  const { isLoading } = useSelector((state) => state.authReducer);
  const dispatch = useDispatch();

  const loadConnectedUser = () => {
    dispatch(loadUserFromTokenAction());
  };

  useEffect(() => {
    loadConnectedUser();
  }, []);

  return (
    <div className="App">
      <Router>
        <NavigationBar />
        {!isLoading && <AppPages />}
      </Router>
    </div>
  );
}

export default App;
