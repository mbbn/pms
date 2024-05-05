import * as React from 'react';
import {AuthProvider} from "@common/provider/AuthProvider";
import {AppProvider} from "@common/entrypoint/BaseEntryPoint";
import {View} from "@common/provider/RouteProvider";
import {SettingsView} from "@common/view/SettingsView";
import {CategoryView} from "./view/CategoryView";
import {HomeView} from "./view/HomeView";

const App = () => {
    const messagesJson = require('../../../build/messages.json');
    const views: View[] = [
        {path: '/', component: HomeView},
        {path: '/settings', component: SettingsView},
        {path: '/category', component: CategoryView}
    ];
    return <AuthProvider>
        <AppProvider views={views} messagesJson={messagesJson}/>
    </AuthProvider>;
};
export default App

