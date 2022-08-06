import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 1,
      title: 'Play football',
      description: 'Go to stadium and play football',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  createATask(title: string, description: string): Task {
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }
}
