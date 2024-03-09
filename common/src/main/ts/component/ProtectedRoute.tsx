import * as React from 'react';
import { Navigate } from "react-router-dom";
import {useAuth} from "@common/hooks/AuthProvider";

interface ProtectedRouteProps {
    children: React.ReactElement;
}

export default class ProtectedRoute extends React.Component<ProtectedRouteProps, any> {

    render() {
        const {children} = this.props;
        const {user} = useAuth();
        if(!user){
            // user is not authenticated
            return <Navigate to="/login" />;
        }
        return children;
    }
}