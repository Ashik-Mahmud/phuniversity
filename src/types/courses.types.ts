
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


export interface IOfferedCourseItem {
    _id: string;
    academicDepartment: string;
    academicFaculty: string;
    academicSemester: string;
    course: string;
    createdAt: string;  // ISO string for timestamp
    updatedAt: string;  // ISO string for timestamp
    days: string[];  // Array of days (e.g., ['Sat', 'Sun'])
    endTime: string;  // Time in HH:mm format
    faculty: string;
    maxCapacity: number;
    section: number;
    semesterRegistration: string;
    startTime: string;  // Time in HH:mm format
};
