// task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Task, TaskState } from '../task.model';
import { TaskService } from '../task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-list',
  templateUrl: './tasklist.component.html',
  styleUrls: ['./tasklist.component.css']
})
export class TaskListComponent implements OnInit {
  tasks!: Observable<Task[]>;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  toggle(task: Task): void {
    task.expanded = !task.expanded;
  }
}
