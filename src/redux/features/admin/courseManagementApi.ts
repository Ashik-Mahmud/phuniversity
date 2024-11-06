import { AcademicSemesterRegistrationItem } from "@/types/academic.types";
import { TResponseRedux } from "@/types/global.types";
import { BaseApi } from "../../api/BaseApi";

const courseManagementApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({


        createSemesterRegistration: builder.mutation({
            query: (body) => ({
                url: `/semester-registrations/create-semester-registration`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['semesterRegistration']
        }),

        updateSemesterRegistrationStatus: builder.mutation({
            query: (args) => ({
                url: `/semester-registrations/${args.id}`,
                method: 'PATCH',
                body: args.body,
            }),
            invalidatesTags: ['semesterRegistration']
        }),


        getAllSemesterRegistration: builder.query({
            query: (params) => ({
                url: "/semester-registrations",
                method: 'GET',
                params
            }),
            transformResponse: (response: TResponseRedux<AcademicSemesterRegistrationItem[]>) => {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            providesTags: ['semesterRegistration']
        }),



        createCourse: builder.mutation({
            query: (body) => ({
                url: `/courses/create-course`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ["allCourses"]
        }),

        getAllCourses: builder.query({
            query: (params) => ({
                url: `/courses`,
                method: 'GET',
                params,
            }),
            providesTags: ['allCourses']
        }),

        getSingleCourse: builder.query({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'GET',

            })
        }),

        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE',

            })
        }),


        updateCourse: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.id}`,
                method: 'PATCH',
                body: data.body
            })
        }),

        assignFaculty: builder.mutation({
            query: (data) => ({
                url: `/courses/${data.id}/assign-faculties`,
                method: 'PUT',
                body: data.body
            })
        }),


        getCourseFaculties: builder.query({
            query: (data) => ({
                url: `/courses/${data.id}/get-faculties`,
                method: 'GET',
                params: data.params,
            })
        }),

        removeFaculties: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}/remove-faculties`,
                method: 'DELETE',

            })
        }),
    })
})


export const { useCreateCourseMutation, useAssignFacultyMutation, useCreateSemesterRegistrationMutation, useDeleteCourseMutation, useGetAllCoursesQuery, useGetAllSemesterRegistrationQuery, useGetCourseFacultiesQuery, useGetSingleCourseQuery, useUpdateSemesterRegistrationStatusMutation } = courseManagementApi;