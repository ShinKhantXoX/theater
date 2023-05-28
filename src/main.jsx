import React from 'react'
import ReactDOM from 'react-dom/client';
import {CssVarsProvider} from '@mui/joy/styles'
import App from './App'
import './index.css'
import theme from "./utilities/theme/theme";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { ThemeProvider } from "@mui/joy";
import { movieApi } from "./features/api/apiSlice";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"
import {store} from "./redux/store";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme}>
        <ApiProvider api={movieApi}>
            <BrowserRouter>
                <Provider store={store}>
                    <ThemeProvider theme={theme}>
                        <App/>
                    </ThemeProvider>
                </Provider>
            </BrowserRouter>
        </ApiProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
