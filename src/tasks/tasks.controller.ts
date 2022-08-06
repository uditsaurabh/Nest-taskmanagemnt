import { TasksService } from './tasks.service';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Post()
  createATask(
    @Body('title') title: string,
    @Body('description') description: string,
  ) {
    return this.taskService.createATask(title, description);
  }
}
