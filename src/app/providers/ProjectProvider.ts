import { Injectable } from '@angular/core';
import { ApiProvider } from './ApiProvider';

@Injectable({
  providedIn: 'root'
})

export class ProjectProvider {

  private path: string = 'project'
  private paths: string = 'projects'

  constructor(
    private ApiProvider: ApiProvider
  ) { }

  getById(id) {
    return this.ApiProvider.get(`${this.path}/${id}`);
  }

  getMany(sort, category, skip, limit) {
    return this.ApiProvider.get(`${this.paths}/${sort}/${category}/${skip}/${limit}`);
  }

  getUserProjects(skip, limit) {
    return this.ApiProvider.get(`${this.paths}/user/${skip}/${limit}`);
  }

  post(data) {
    return this.ApiProvider.post(this.path, data);
  }

  put(projectId, data) {
    return this.ApiProvider.put(this.path, {
      projectId,
      data: data
    });
  }

  updateToVip(projectId) {
    return this.ApiProvider.put(`${this.path}/vip`, {
      projectId: projectId
    });
  }

  deletePhotos(projectId, data, update) {
    return this.ApiProvider.post(`${this.path}/delete-photos`, {
      projectId,
      update,
      data: data
    });
  }

}
