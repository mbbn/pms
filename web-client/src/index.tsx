import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import LandingPage from "./LandingPage";


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
    <LandingPage/>,
);