import { ProfileTypesEnum } from './../enumerations/profile-types.enum';


export class User {

    id: string;
    profileType?: ProfileTypesEnum;
    email?: string;
    isActive?: string;
    firstName?: string;
    lastName?: string;
    createdAt?: string;
    updatedAt?: string;

}
