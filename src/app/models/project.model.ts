import { User } from './user.model';


export class Project {

    id: string;
    reference?: string;
    description?: string;
    manager?: User = new User();
    createdAt?: string;
    updatedAt?: string;

}
