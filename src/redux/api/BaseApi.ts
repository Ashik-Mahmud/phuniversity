import {
    BaseQueryApi,
    BaseQueryFn,
    DefinitionType,
    FetchArgs,
    createApi,
    fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { API_config } from '../../config/api.config';
import { onLogin, onLogout } from '../features/auth/authSlice';
import { RootState } from '../store';

const baseQuery = fetchBaseQuery({
    baseUrl: `${API_config.base_api}`,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).auth.token;

        if (token) {
            headers.set('authorization', `${token}`);
        }

        return headers;
    },
});

const baseQueryWithRefreshToken: BaseQueryFn<
    FetchArgs,
    BaseQueryApi,
    DefinitionType
> = async (args, api, extraOptions): Promise<any> => {

    let result = await baseQuery(args, api, extraOptions);
    const isExpired = (result?.error?.data as any)?.err?.name === 'TokenExpiredError'
    if (isExpired) {
        try {
            const response = await axios.post(`${API_config.base_api}/auth/refresh-token`, {}, { withCredentials: true });
            const data = response?.data?.data;
            if (data?.accessToken) {
                const user = (api.getState() as RootState).auth?.user;
                api.dispatch(onLogin({
                    user,
                    token: data?.accessToken
                }))
                result = await baseQuery(args, api, extraOptions);
            }
        } catch (error) {
            api.dispatch(onLogout())
        }
    }
    return result;
};



export const BaseApi = createApi({
    reducerPath: 'baseApi',
    baseQuery: baseQueryWithRefreshToken,
    tagTypes: ['blogs', 'addBlog', 'getMe', 'AcademicSemester', 'AcademicFaculties', "AcademicDepartments", "semesterRegistration", "allCourses", "getAllFaculties", 'GetAllOfferedCourses', 'getMyOfferedCourses'],
    endpoints: () => ({})
})


