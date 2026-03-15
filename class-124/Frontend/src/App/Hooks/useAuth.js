import { useDispatch } from 'react-redux';
import { register, login, getMe } from "../../Features/Auth/Services/Auth.Api"
import { setUser, setError, SetLoading } from '../../Features/Auth/Auth.slice';

export function useAuth() {

    const dispatch = useDispatch()

    async function handleRegister(email, username, password) {
        try {
            dispatch(SetLoading(true))
            const data = await register(email, username, password)
        }
        catch (error) {
            dispatch(setError(error.response.data.message))
        }
        finally {
            dispatch(SetLoading(false))
        }
    }

    async function handleLogin(email, password) {
        try {
            dispatch(SetLoading(true))
            const data = await login({ email, password })
        }
        catch (error) {
            dispatch(setError(error.response.data.message))
        }
        finally {
            dispatch(SetLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(SetLoading(true))
            const data = await getMe()
            dispatch(setUser(data))
        }
        catch (error) {
            dispatch(setError(error.response.data.message))
        }
        finally {
            dispatch(SetLoading(false))
        }
    }

    return { handleRegister, handleLogin, handleGetMe };
}
