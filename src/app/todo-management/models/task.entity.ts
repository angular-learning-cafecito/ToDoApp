export class Task {
  id: number;
  content:string;
  status: TaskStatus;

  constructor(task:{
    id?: number,
    content?:string,
    status?:TaskStatus;
  }) {
    this.id = task.id || 0;
    this.content = task.content || '';
    this.status = task.status || TaskStatus.Ideas;

  }
}

export enum TaskStatus{
  Ideas = 'IDEAS',
  Research='RESEARCH',
  Todo= 'TODO',
  Done = 'DONE',
}
