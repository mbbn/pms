import * as React from "react";
import UserModel from "@common/model/UserModel";
import useLocalStorage from "@common/hooks/useLocalStorage";
import {useEffect} from "react";
import UserService from "@common/service/UserService";

interface AuthProps {
    children: any;
}

interface AuthContextProps {
    currentUser?: UserModel;
    isAdmin: () => boolean;
    isAuthorize?: (authorize: string) => boolean;
    login?: (data:any) => Promise<void>;
    logout?: () => void;
}
const AuthContext = React.createContext<AuthContextProps>({
    isAdmin: () => false
});
export const AuthProvider = ({  children }:AuthProps) => {
    const [currentUser, setCurrentUser] = useLocalStorage("user", null);
    useEffect(() => {
        const userService = new UserService();
        userService.currentUser().then(currentUser => {
            setCurrentUser(currentUser);
        });
        return ()=> {
        };
    }, []);
    // const navigate = useNavigate();

    const isAdmin = () => {
        return false;
    }

    const isAuthorize = (authority: string) => {
        if(currentUser && currentUser.authorities){
            for (let auth of currentUser.authorities) {
                if (authority === auth.authority) {
                    return true;
                }
            }
        }
        return false;
    }

    // call this function when you want to authenticate the user
    const login = async (data:any) => {
        setCurrentUser(data);
        // navigate("/profile");
    };

    // call this function to sign out logged in user
    const logout = () => {
        setCurrentUser(null);
        // navigate("/", { replace: true });
    };

    const value = React.useMemo(
        () => ({
            currentUser,
            isAdmin,
            isAuthorize,
            login,
            logout,
        }),
        [setCurrentUser]
    );
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = () => {
    return React.useContext<AuthContextProps>(AuthContext);
};