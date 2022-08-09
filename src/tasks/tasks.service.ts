import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Task, TaskStatus } from './task.model';
@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: '1',
      title: 'Play football',
      description: 'Go to stadium and play football',
      status: TaskStatus.OPEN,
    },
    {
      id: '2',
      title: 'Play Basketball',
      description: 'play basketball',
      status: TaskStatus.OPEN,
    },
    {
      id: '3',
      title: 'Play Cricket',
      description: 'play Cricket',
      status: TaskStatus.IN_PROGRESS,
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
  getTaskById(taskId: string): Task[] {
    const res = this.tasks.filter(({ id }) => id === taskId);
    if (res.length === 0) {
      throw new NotFoundException();
    }
    return res;
  }
  deleteTasksById(taskId: string): Task[] {
    this.tasks = this.tasks.filter(({ id }) => id !== taskId);
    return this.tasks;
  }
  patchTaskById(taskId: string, taskStatus: TaskStatus): Task[] {
    let found = false;
    this.tasks = this.tasks.map(({ id, ...rest }) => {
      if (id === taskId) {
        found = true;
        return { ...rest, id, status: taskStatus };
      }
      return { id, ...rest };
    });
    if (found) {
      return this.tasks;
    } else {
      new NotFoundException();
    }
  }
  filterTasks(taskStatus?: TaskStatus, search?: string): Task[] {
    const res: Task[] = this.tasks.filter(
      ({ title, description, status, ...rest }) => {
        if (
          status === taskStatus ||
          title.includes(search) ||
          description.includes(search)
        ) {
          return { title, description, status, ...rest };
        }
      },
    );
    return res;
  }
}
