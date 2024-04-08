import * as React from 'react';
import {AuthProvider} from "@common/provider/AuthProvider";
import {AppProvider} from "@common/entrypoint/BaseEntryPoint";
import ViewName from "./ViewName";

const App = () => {
    let messagesJson = require('../../../build/messages.json');
    return <AuthProvider>
        <AppProvider firstViewName={ViewName.ABOUT_US} messagesJson={messagesJson}/>
    </AuthProvider>;
};
export default App

