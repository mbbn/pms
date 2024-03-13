import * as React from 'react';
import {AuthProvider} from "@common/provider/AuthProvider";
import {AppProvider} from "@common/entrypoint/BaseEntryPoint";

const App = () => {
    let messagesJson = require('../../../build/messages.json');
    return <AuthProvider>
        <AppProvider messagesJson={messagesJson}/>
    </AuthProvider>;
};
export default App

