import {Component, inject, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Task, TaskStatus} from '../../models/task.entity';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgForOf, NgIf} from '@angular/common';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-drop-connected',
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag,
    MatButton,
    MatIcon,
    MatMiniFabButton,
    NgIf,
    MatFormField,
    MatInput,
    FormsModule
  ],
  templateUrl: './drop-connected.component.html',
  styleUrl: './drop-connected.component.css'
})
export class DropConnectedComponent implements OnInit{
  tasks:Task[] = [];
  ideas:Task[] = [];
  research:Task[]= [];
  todo:Task[]=[];
  done:Task[]= [];
  editingTaskId:number | null = null;
  originalTaskContent: string | null = null;

  taskService: TasksService = inject(TasksService);
  getTasks(){
    this.taskService.getAll().subscribe((response:any)=>{
      this.tasks=response
      this.ideas =response.filter((item:any)=>{
        return item.status === TaskStatus.Ideas
      })
      this.research = response.filter((item:any)=>{
        return item.status === TaskStatus.Research
      })
      this.done = response.filter((item:any)=>{
        return item.status === TaskStatus.Done
      })
      this.todo= response.filter((item:any)=>{
        return item.status === TaskStatus.Todo
      })
    })
  }
  ngOnInit(): void {
    this.getTasks();
  }

  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    // Si se mueve dentro de la misma lista
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Guardar el elemento que se va a mover antes de transferirlo
      const movedTask = event.previousContainer.data[event.previousIndex];

      // Transferir el elemento de una lista a otra
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Verificar si el task fue movido correctamente
      console.log("Task ID después de la transferencia:", movedTask.id);

      let newStatus: TaskStatus;

      console.log("ContainerId: ", event.container.id);

      switch (event.container.id) {
        case 'ideasList':
          newStatus = TaskStatus.Ideas;
          break;
        case 'researchList':
          newStatus = TaskStatus.Research;
          break;
        case 'doneList':
          newStatus = TaskStatus.Done;
          break;
        case 'todoList':
          newStatus = TaskStatus.Todo;
          break;
        default:
          return;
      }

      // Actualizar el estado del task
      movedTask.status = newStatus;
      this.taskService.update(movedTask.id, movedTask).subscribe((response: any) => {
        console.log(`Task ${movedTask.id} is Updated`, response);
      });
    }
  }

  editTask(taskId:number){
    this.editingTaskId = taskId;
    const task = this.tasks.find(item=> item.id === taskId);
    if(task){
      this.originalTaskContent = task.content;
    }
  }

  isEditing(taskId:number){
    return this.editingTaskId === taskId;
  }
  cancelEdit(){
    if(this.editingTaskId!==null){
      const task = this.tasks.find(item=>item.id===this.editingTaskId);
      if(task && this.originalTaskContent!==null){
        task.content = this.originalTaskContent;
      }
    }
    this.editingTaskId = null;
    this.originalTaskContent = null;
  }
  saveTask(task:Task){
    this.editingTaskId = null;

    this.taskService.update(task.id,task).subscribe((response:any)=>{
      console.log(`task ${task.id} was updated: `,response);
    })
  }
}
