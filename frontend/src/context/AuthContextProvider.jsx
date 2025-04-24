import { Children, createContext, useEffect, useReducer } from "react";
 
const INITIAL_STATE={
    user : JSON.parse(localStorage.getItem('token')) || null,
    isAuthenticated : false,
    error :  null
}

export const AuthContext=createContext();

function AuthReducer(state,action){
    switch (action.type) {
        case "loginsuccess":
            return{
                user : action.payload, isAuthenticated : true ,error:null
            }
        case "loginfailed":
            return{
                user: null,isAuthenticated: false, error:action.payload
            }
        case "logout":
            return{
                user : null,isAuthenticated: false, error: null
            }
        default:
            return state;
    }
}

function AuthContextProvider({children}) {
    const [state,dispatch]= useReducer(AuthReducer,INITIAL_STATE);
    
    useEffect(()=>{
        localStorage.setItem('token',JSON.stringify(state.user))
    },[state.user])

    return(
        <AuthContext.Provider value={{user : state.user, isAuthenticated : state.isAuthenticated ,error : state.error, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider;