import { Project } from './project.model';


export class Task {

    id: string;
    reference?: string;
    project?: Project = new Project();
    createdAt?: string;
    updatedAt?: string;

}
