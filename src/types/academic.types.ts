export interface AcademicSemesterItem {
    code: string;          // Represents the season code, e.g., "01"
    createdAt: string;     // ISO string for the creation date, e.g., "2024-10-29T21:46:22.481Z"
    endMonth: string;      // Long name of the ending month, e.g., "December"
    name: string;          // Name of the season, e.g., "Autumn"
    startMonth: string;    // Long name of the starting month, e.g., "January"
    updatedAt: string;     // ISO string for the last update date, e.g., "2024-10-29T21:46:22.481Z"
    year: string;          // Year of the season, e.g., "2026"
    _id: string;           // Unique identifier, e.g., "672157ae8eb9f0528a7e2ffc"
}


export interface AcademicFacultyItem {
    createdAt: string;
    name: string;
    updatedAt: string;
    _id: string;
}

export interface AcademicDepartmentItem {
    academicFaculty: AcademicFacultyItem;
    createdAt: string;
    name: string;
    updatedAt: string;
    _id: string;
}