
export type preRequisiteCourseItem = {
    course: string,
    isDeleted: boolean
}

export interface ICourseItem {
    code: number;
    credits: number;
    isDeleted: boolean;
    preRequisiteCourses: preRequisiteCourseItem[]
    prefix: string
    title: string;
    _id: string
}