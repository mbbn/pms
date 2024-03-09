import * as React from "react";
import { useNavigate } from "react-router-dom";
import UserModel from "@common/model/UserModel";
import useLocalStorage from "@common/hooks/useLocalStorage";

interface AuthProviderProps {
    currentUser: UserModel;
    children: any;
}

interface AuthContextValueType {
    user?: UserModel;
    login?: (data) => Promise<void>;
    logout?: () => void;
}


const AuthContext = React.createContext<AuthContextValueType>({});
export const AuthProvider = ({ currentUser, children }:AuthProviderProps) => {
    const [user, setUser] = useLocalStorage("user", currentUser);
    // const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = async (data) => {
        setUser(data);
        // navigate("/profile");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setUser(null);
        // navigate("/", { replace: true });
    };

    const value = React.useMemo(
        () => ({
            user,
            login,
            logout,
        }),
        [user]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return React.useContext(AuthContext);
};