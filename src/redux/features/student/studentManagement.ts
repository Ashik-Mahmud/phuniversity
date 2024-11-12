import { BaseApi } from "../../api/BaseApi";

const StudentManagementApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({


        getMyOfferedCourses: builder.query({
            query: () => ({
                url: `/offered-courses/my-offered-courses`,
                method: 'GET'
            }),
            providesTags: ['getMyOfferedCourses']
        }),

        enrollOfferCourse: builder.mutation({
            query: (body) => ({
                url: `/enrolled-courses/create-enrolled-course`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['GetAllOfferedCourses', 'getMyOfferedCourses']
        }),
    })
})


export const { useGetMyOfferedCoursesQuery, useEnrollOfferCourseMutation } = StudentManagementApi;