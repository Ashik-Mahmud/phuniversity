type Name = {
    firstName: string;
    middleName?: string;
    lastName: string;
    _id: string;
};

export type IFaculty = {
    id: string;
    fullName: string;
    gender: string;
    dateOfBirth: string; // ISO date string format
    bloodGroup: string;
    contactNo: string;
    emergencyContactNo: string;
    email: string;
    designation: string;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    isDeleted: boolean;
    name: Name;
    user: string; // ID reference to user
    _id: string;
};
