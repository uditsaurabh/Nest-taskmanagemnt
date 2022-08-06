import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = ['Task1', 'Task2'];

  getAllTasks() {
    return this.tasks;
  }
}
