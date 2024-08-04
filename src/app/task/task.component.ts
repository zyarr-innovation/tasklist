// task.component.ts
import { Component, Input } from '@angular/core';
import { Task, TaskState } from '../task.model';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  getTaskStateClass(state: TaskState) {
    switch(state) {
      case TaskState.NotStarted:
        return 'not-started';
      case TaskState.InProgress:
        return 'in-progress';
      case TaskState.Completed:
        return 'completed';
      case TaskState.Discarded:
        return 'discarded';
      default:
        return '';
    }
  }
}
