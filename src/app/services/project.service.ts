import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { getJsonPatchOperations } from './../utils/json-patch.util';

import { Project } from './../models/project.model';

import { API_BASE_URL, API_ENDPOINTS } from './../constants/server-urls.constant';
import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS, MUTATING_JSON_REQUESTS_HTTP_OPTIONS, MUTATING_JSON_PATCH_REQUESTS_HTTP_OPTIONS } from './../constants/http-options.constant';


@Injectable()
export class ProjectService {

    constructor(
        private http: HttpClient
    ) {}

    getProjectsByManagerId(id: string): Observable<Project> {

        const URL = API_BASE_URL + API_ENDPOINTS.PROJECTS_RESOURCE_ENDPOINTS.PROJECTS_BY_MANAGER_ENDPOINT + '/' + id;

        return this.http.get<Project>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    getProjectById(id: string): Observable<Project> {

        const URL = API_BASE_URL + API_ENDPOINTS.PROJECTS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.get<Project>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    createProject(project: Project): Observable<Project> {

        const URL = API_BASE_URL + API_ENDPOINTS.PROJECTS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        return this.http.post<Project>(URL, project, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    partialUpdateProject(id: string, changes: {}): Observable<Project> {

        const URL = API_BASE_URL + API_ENDPOINTS.PROJECTS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.patch<Project>(URL, getJsonPatchOperations(changes), MUTATING_JSON_PATCH_REQUESTS_HTTP_OPTIONS);

    }

    deleteProject(id: string): Observable<void> {

        const URL = API_BASE_URL + API_ENDPOINTS.PROJECTS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.delete<void>(URL);

    }

}
