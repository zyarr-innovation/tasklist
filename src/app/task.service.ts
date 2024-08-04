// task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Task, TaskState } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasksUrl = 'assets/tasks.json';
  private tasks: Task[] = [];

  constructor(private http: HttpClient) {
    
  }

  private loadTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.tasksUrl).pipe(
      map(tasks => tasks.map(task => this.mapTask(task))),
      catchError(error => {
        console.error('Error loading tasks:', error);
        return of([]); // Return an empty array in case of error
      })
    );
  }

  private mapTask(task: any): Task {
    return {
      ...task,
      state: TaskState[task.state as keyof typeof TaskState],
      startDate: new Date(task.startDate),
      endDate: new Date(task.endDate),
      subTasks: task.subTasks ? task.subTasks.map((subTask: any) => this.mapTask(subTask)) : []
    };
  }

  getTasks(): Observable<Task[]> {
    if(! this.tasks.length) {
      return this.loadTasks();
    } else {
      return of(this.tasks);
    }
  }

  getTask(id: number): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  addTask(task: Task): void {
    this.tasks.push(task);
  }

  updateTask(updatedTask: Task): void {
    const index = this.tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = updatedTask;
    }
  }

  deleteTask(id: number): void {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
