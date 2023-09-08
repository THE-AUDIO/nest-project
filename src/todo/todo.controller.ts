import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { Todo } from './entity/todo.entity';
@Controller('todo')
export class TodoController {
    constructor(){
        this.todos = [] // tableau vide 
    }
    todos : Todo[]; // todos reçoit le tableau de Todo
    @Get()
    getTodo(
    ){
        return this.todos
        
    }
    @Post()
    aDDTodo(
        @Body() newTodo: Todo // reponse du body

    ){
        
        if(this.todos.length){ // si la longeur du tableau de todo est > 0 
           newTodo.id = this.todos[this.todos.length -1].id + 1;// on recupere l'id du derniere element d todo et on ajoute 1 pour l'element suivante
        } else {
            newTodo.id = 1;
        }
        this.todos.push(newTodo) // pour ajouter le new todo dans le tableau de todos
        return newTodo
    }
    @Delete()
    deleteTodo(){
        console.log('Suprimer un TODO dans la liste de Todo');
        return 'Delete des TODO'
        
    }
    @Put()
    modifyTodo(){
        console.log('modifier un TODO dans la liste de Todo');
        return 'UPdate TODO'

    }
}
