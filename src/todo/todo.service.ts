import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
import { AddTodoDto } from './dto/add-Todo.dto';

@Injectable()
export class TodoService {
   todos : Todo[]= []

   getAlltodo():Todo[]{
    return this.todos;
   };


   getTodoViaId(id : number):Todo{
    const myTodo = this.todos.find(actualTodo => actualTodo.id === +id)
        if(myTodo){
            return myTodo
        } else{
            throw new NotFoundException(`le todo de id = ${id} est introuvable`)
        }    
   };


   UpdDateTodo(id:number,newTodo: Partial<AddTodoDto>){
    const todo = this.getTodoViaId(id);
    (todo)? todo.name = newTodo.name: newTodo.name;
    (todo)? todo.description = newTodo.description: newTodo.description;
    (todo)? todo.status = newTodo.status: newTodo.status;


    return todo;
   };



   eraseTodo(id: number){
    const todos = this.todos

    // ici je vais recuperer l'index  d'un todo via son Id 
    const index = todos.findIndex(elementOftodos => elementOftodos.id === +id);
    if(index>=0){
        // ici on supprime le  todo par un methode splice 
        todos.splice(index,1)
    } else{
        throw new NotFoundException(`le todo d'id ${id} est n'existe pas`)
    }
    return {
        message:`le todo d'id ${id} a été supprimer avec succée`,
        count : '1'
    }
    
   };


   AddTodo(newTodo : AddTodoDto):Todo{
    const todos = this.todos
        const todo = new Todo();
        const {name,description,status} = newTodo;
        todo.description = description;
        todo.name = name;
        todo.status = status;
        if(todos.length){
            todo.id = todos[todos.length - 1].id +1;
        } else{
            todo.id = 1
        }
        const id = todo.id
        const toDo ={
            name,
            description,
            status,
            id,
            createDate : new Date,
     

        }
        todos.push(toDo);
        return toDo
   }

}
