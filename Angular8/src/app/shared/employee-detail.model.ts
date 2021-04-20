export class EmployeeDetail {
    ID: number;
    Name: string;
    LastName: string;
    Age: number;
    Sex: ESex;
    BirthDate: Date;
}

export enum ESex { 
    none = 0,
    male = 1,
    female = 2,
    notbinary = 3
}

export const sexName = {
    [ESex.none]: "Select your sex",
    [ESex.female]: "Female",
    [ESex.male]: "Male",
    [ESex.notbinary]: "Not binary"
}

