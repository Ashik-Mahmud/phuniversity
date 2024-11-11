import { BaseApi } from "../../api/BaseApi";

const StudentManagementApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({


        getMyOfferedCourses: builder.query({
            query: () => ({
                url: `/offered-courses/my-offered-courses`,
                method: 'GET'
            }),
            providesTags: ['getMyOfferedCourses']
        })
    })
})


export const { useGetMyOfferedCoursesQuery } = StudentManagementApi;