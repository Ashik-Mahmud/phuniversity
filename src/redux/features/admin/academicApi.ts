import { AcademicDepartmentItem, AcademicFacultyItem, AcademicSemesterItem } from "@/types/academic.types";
import { TResponseRedux } from "@/types/global.types";
import { BaseApi } from "../../api/BaseApi";
const AcademicApi = BaseApi.injectEndpoints({
    endpoints: (builder) => ({

        createAcademicSemester: builder.mutation(({
            query: (body) => ({
                url: `/academic-semesters/create-academic-semester`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['AcademicSemester']
        })),

        getAllAcademicSemesters: builder.query({
            query: (params) => ({
                url: `/academic-semesters`,
                method: 'GET',
                params
            }),
            transformResponse(response: TResponseRedux<AcademicSemesterItem[]>) {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            providesTags: ['AcademicSemester']
        }),

        getSingleAcademicSemester: builder.query({
            query: (body) => ({
                url: `/academic-semesters/${body.id}`,
                method: 'GET',
            })
        }),


        createAcademicDepartment: builder.mutation(({
            query: (body) => ({
                url: `/academic-departments/create-academic-department`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['AcademicDepartments']
        })),

        getAllAcademicDepartments: builder.query({
            query: (params) => ({
                url: `/academic-departments`,
                method: 'GET',
                params
            }),
            transformResponse(response: TResponseRedux<AcademicDepartmentItem[]>) {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            providesTags: ['AcademicDepartments']
        }),

        getSingleAcademicDepartment: builder.query({
            query: (body) => ({
                url: `/academic-departments/${body.id}`,
                method: 'GET',
            })
        }),

        createAcademicFaculty: builder.mutation(({
            query: (body) => ({
                url: `/academic-faculties/create-academic-faculty`,
                method: 'POST',
                body
            }),
            invalidatesTags: ['AcademicFaculties']
        })),

        getAllAcademicFaculties: builder.query({
            query: (params) => ({
                url: `/academic-faculties`,
                method: 'GET',
                params
            }),
            transformResponse(response: TResponseRedux<AcademicFacultyItem[]>) {
                return {
                    data: response.data,
                    meta: response.meta
                }
            },
            providesTags: ['AcademicFaculties']
        }),

        getSingleAcademicFaculty: builder.query({
            query: (body) => ({
                url: `/academic-faculties/${body.id}`,
                method: 'GET',
            })
        }),


    })
})


export const { useCreateAcademicSemesterMutation, useCreateAcademicDepartmentMutation, useCreateAcademicFacultyMutation, useGetAllAcademicDepartmentsQuery, useGetAllAcademicFacultiesQuery, useGetAllAcademicSemestersQuery, useGetSingleAcademicDepartmentQuery, useGetSingleAcademicFacultyQuery, useGetSingleAcademicSemesterQuery } = AcademicApi;