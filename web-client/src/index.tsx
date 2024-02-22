import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LandingPage from "./view/LandingPage";
import {Route, BrowserRouter, Routes} from "react-router-dom";
import SignUpPage from "./view/SignUpPage";
import SignInPage from "./view/SignInPage";
import i18n from "./i18n/i18n";


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);
const {language, dir} = i18n;

document.dir = dir(language);

root.render(
    <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<LandingPage/>}/>
            <Route path={"/signUp"} element={<SignUpPage/>}/>
            <Route path={"/signIn"} element={<SignInPage/>}/>
        </Routes>
    </BrowserRouter>
);