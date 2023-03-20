import {createAsyncThunk} from "@reduxjs/toolkit";

import {instance} from "../../../utils/axios";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (data: any, {rejectWithValue}) => {
        try {
            const user = await instance.post('auth/login', data)
            sessionStorage.setItem('token',user.data.token)
            sessionStorage.setItem('name',user.data.user.firstName)
            return user.data
        } catch (error:any) {
            if(error.response && error.response.data.message){
                return rejectWithValue(error.response.data.message)
            }else{
                return rejectWithValue(error.message)
            }
        }
    }
)

export const registerUser=createAsyncThunk(
    'auth/register',
    async (data: any, {rejectWithValue}) => {
    try {
        const user = await instance.post('auth/register', data)
        sessionStorage.setItem('token',user.data.token)
        sessionStorage.setItem('name',user.data.user.firstName)
        return user.data
    } catch (error:any) {
        if(error.response && error.response.data.message){
            return rejectWithValue(error.response.data.message)
        }else{
            return rejectWithValue(error.message)
        }
    }
})
