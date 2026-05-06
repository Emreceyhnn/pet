import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#F6B83D",
      contrastText: "#fff",
    },
    secondary: {
      main: "#FFF4DF",
    },
    text: {
      primary: "#262626",
      secondary: "rgba(38, 38, 38, 0.5)",
    },
    background: {
      default: "#F9F9F9",
      paper: "#FFFFFF",
    },
  },
  typography: {
    fontFamily: '"Manrope", sans-serif',
    h1: {
      fontSize: "90px",
      fontWeight: 700,
      lineHeight: "87px",
      letterSpacing: "-0.03em",
    },
    h2: { fontSize: "54px", fontWeight: 700, lineHeight: "1.2" },
    h3: { fontSize: "40px", fontWeight: 700, lineHeight: "1.2" },
    h4: { fontSize: "28px", fontWeight: 700, lineHeight: "1.2" },
    h5: { fontSize: "20px", fontWeight: 700, lineHeight: "1.2" },
    h6: { fontSize: "16px", fontWeight: 700, lineHeight: "1.2" },
    button: {
      textTransform: "none",
      fontWeight: 700,
      fontSize: "16px",
    },
  },
  shape: {
    borderRadius: 30,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          height: "48px",
          padding: "0 24px",
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#e5a52e",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            height: "48px",
            "& fieldset": {
              borderColor: "rgba(38, 38, 38, 0.1)",
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
);
