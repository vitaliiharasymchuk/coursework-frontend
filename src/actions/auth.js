import { AUTH } from '../constants/actionTypes';
import * as api from '../api/index.js'



export const signin = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signIn(formData);

        dispatch({ type: AUTH, data });

        //console.log(data);

        history.push(`/${data.result.role}`);

    } catch (error) {
        return error.response?.data.message;
    }
}





export const signup = (formData, history) => async (dispatch) => {
    try {

        const { data } = await api.signUp(formData);

        dispatch({ type: AUTH, data });

        //console.log(data);

        history.push(`/${data.result.role}`);

    } catch (error) {
        return error.response?.data.message;
    }
}
