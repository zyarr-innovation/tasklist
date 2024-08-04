// task.model.ts
export interface Task {
    id: number;
    name: string;
    description: string;
    state: TaskState;
    startDate: Date;
    endDate: Date;
    assignedTo: string;
    expanded: boolean;
    subTasks?: Task[]
  }
  
  export enum TaskState {
    NotStarted,
    InProgress,
    Completed,
    Discarded
  }
  