import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-flter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get('/')
  getAllTasks(): Task[] {
    return this.taskService.getAllTasks();
  }
  @Get('/filter')
  getFilteredTasks(@Query() taskQuery: GetTaskFilterDto): Task[] {
    return this.taskService.filterTasks(taskQuery.status, taskQuery.search);
  }
  @Post()
  createATask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createATask(
      createTaskDto.title,
      createTaskDto.description,
    );
  }
  @Get(':id')
  getTaskById(@Param('id') id: string): Task[] {
    return this.taskService.getTaskById(id);
  }
  @Delete(':id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.taskService.deleteTasksById(id);
  }
  @Patch(':id/status')
  patchTaskById(
    @Param('id') id: string,
    @Body('status') updateTask: UpdateTaskStatusDto,
  ): Task[] {
    return this.taskService.patchTaskById(id, updateTask.status);
  }
}
