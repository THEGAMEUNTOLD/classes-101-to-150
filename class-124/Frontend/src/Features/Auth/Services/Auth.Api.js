import axios from 'axios';

const Api = axios.create({
    baseURL: "http://localhost:3000",
    withCredentials: true,
})


export async function register(email,username,password) {
    try {
        const response = await Api.post('/api/auth/register', {
            email,
            username,
            password
        });
        return response.data;
    }
    catch (error) {        
        console.error('Registration error:', error);
        throw error;
    }  
}

export async function login(email, password) {
    try {
        const response = await Api.post('/api/auth/login', {
            email,
            password
        });
        return response.data;
    }
    catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

export async function getMe(){
    try {
        const response = await Api.get('/api/auth/me');
        return response.data;
    }   
    catch (error) {
        console.error('GetMe error:', error);
        throw error;
    }
}