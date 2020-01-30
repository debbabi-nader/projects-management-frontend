import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { getJsonPatchOperations } from './../utils/json-patch.util';

import { Task } from './../models/task.model';

import { API_BASE_URL, API_ENDPOINTS } from './../constants/server-urls.constant';
import { FETCHING_JSON_REQUESTS_HTTP_OPTIONS, MUTATING_JSON_REQUESTS_HTTP_OPTIONS, MUTATING_JSON_PATCH_REQUESTS_HTTP_OPTIONS } from './../constants/http-options.constant';


@Injectable()
export class TaskService {

    constructor(
        private http: HttpClient
    ) {}

    getTasksByProjectId(id: string): Observable<Task> {

        const URL = API_BASE_URL + API_ENDPOINTS.TASKS_RESOURCE_ENDPOINTS.TASKS_BY_PROJECT_ENDPOINT + '/' + id;

        return this.http.get<Task>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    getTaskById(id: string): Observable<Task> {

        const URL = API_BASE_URL + API_ENDPOINTS.TASKS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.get<Task>(URL, FETCHING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    createTask(task: Task): Observable<Task> {

        const URL = API_BASE_URL + API_ENDPOINTS.TASKS_RESOURCE_ENDPOINTS.BASE_ENDPOINT;

        return this.http.post<Task>(URL, task, MUTATING_JSON_REQUESTS_HTTP_OPTIONS);

    }

    partialUpdateTask(id: string, changes: {}): Observable<Task> {

        const URL = API_BASE_URL + API_ENDPOINTS.TASKS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.patch<Task>(URL, getJsonPatchOperations(changes), MUTATING_JSON_PATCH_REQUESTS_HTTP_OPTIONS);

    }

    deleteTask(id: string): Observable<void> {

        const URL = API_BASE_URL + API_ENDPOINTS.TASKS_RESOURCE_ENDPOINTS.BASE_ENDPOINT + '/' + id;

        return this.http.delete<void>(URL);

    }

}
