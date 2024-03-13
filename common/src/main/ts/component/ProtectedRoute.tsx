import * as React from 'react';
import { Navigate } from "react-router-dom";
import {useAuth} from "@common/provider/AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export default class ProtectedRoute extends React.Component<ProtectedRouteProps, any> {

    render() {
        const {children} = this.props;
        const {currentUser} = useAuth();
        if(!currentUser){
            // user is not authenticated
            return <Navigate to="/login" />;
        }
        return children;
    }
}