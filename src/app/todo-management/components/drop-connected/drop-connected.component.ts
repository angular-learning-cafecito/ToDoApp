import {Component, inject, OnInit} from '@angular/core';
import {TasksService} from '../../services/tasks.service';
import {Task, TaskStatus} from '../../models/task.entity';
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-drop-connected',
  standalone: true,
  imports: [
    CdkDropList,
    NgForOf,
    CdkDrag
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
  //TODO: the last task shows an error
  drop(event: CdkDragDrop<Task[]>) {
    console.log(event);
    // Si se mueve dentro de la misma lista
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Guardar el elemento que se va a mover antes de transferirlo
      const movedTask = event.previousContainer.data[event.previousIndex];

      console.log(`Se movió de ${event.previousContainer.data[0].status} a ${event.container.data[0].status} el elemento ${movedTask.content}`);
      console.log("Moved Task Id:", movedTask.id);
      console.log({ event });
      console.log(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);

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
}
