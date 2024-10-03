import { create } from 'zustand'
import axios from 'axios'
import toast from 'react-hot-toast';

export const authUser = create((set)=>({
user:null,
isSigningUp:false,
isLoggingOut:false,
isAuthChecking: true,
isLogging:false,
SignUp: async (credentials) => {
    set({isSigningUp:true});
    try {
        const response = await axios.post('/api/v1/auth/signup', credentials);
        set({user:response.data.user, isSigningUp:false});
        toast.success('Account Created Successfully');
    } catch (error) {
        console.log(error.message);
        toast.error(error.response.data.message || "An error occoured");
        set({isSigningUp:false, user:null});
    }
},
Login: async (credentials) => {
    set({isLogging:true})
try {
    const response = await axios.post('/api/v1/auth/login', credentials);
    set({user:response.data.user, isLogging:false});
        toast.success('Logged In Successfully');
} catch (error) {
    console.log(error.message);
    set({isLogging:false, user:null});
    toast.error(error.response.data.message);
}
},
Logout: async () => {
try {
    set({isLoggingOut:true});
    await axios.post('/api/v1/auth/logout');
    set({user:null, isLoggingOut:false});
    toast.success('Logged Out Successfully');
} catch (error) {
    console.log(error.message);
    set({user:null, isLoggingOut:false});
    toast.error(error.response.data.message || "An error occoured");
}
},
AuthCheck : async () => {
    set({isAuthChecking:true})
    try {
        const response = await axios.get('/api/v1/auth/check');
        set({user:response.data.user, isAuthChecking:false});
    } catch (error) {
        console.log(error.message);
        set({user:null, isAuthChecking:false});
    }
}
}))