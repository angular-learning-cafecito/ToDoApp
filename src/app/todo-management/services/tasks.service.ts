import { Injectable } from '@angular/core';
import {BaseService} from '../../shared/services/base.service.service';
import {Task} from '../models/task.entity';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends  BaseService<Task>{

  constructor() {
    super();
    this.resourceEndpoint="/tasks"
  }
}
