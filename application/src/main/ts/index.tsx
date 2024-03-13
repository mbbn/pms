import {createRoot} from 'react-dom/client';
import App from "./AppEntryPoint";


let ROOT_DIV_ID = '@rootDiv@';
const rootElement = document.getElementById(ROOT_DIV_ID);
// @ts-ignore
const root = createRoot(rootElement);
root.render(<App/>);