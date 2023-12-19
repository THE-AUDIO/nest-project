import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { getPaginatedDto } from './dto/get-paginated.dto';
import { AddTodoDto } from './dto/add-Todo.dto';
import { TodoService } from './todo.service';
import { STATUS_CODES } from 'http';
import { UpperCaseAndFusionPipe } from 'src/pipes/upper-case-and-fusion/upper-case-and-fusion.pipe';
@Controller('todo')
export class TodoController {
    constructor(private todoService : TodoService){
    }


    @Get()
    getTodo(
        @Query() myQueryParams : getPaginatedDto,
    ){
        return this.todoService.getAlltodo();
    }

    @Get('/ :id')
    getTodoById(
        @Param('id')  id : number
    ){
        return this.todoService.getTodoViaId(+id)
    }

    @Post()
    aDDTodo(@Body() newTodo : AddTodoDto){
        return this.todoService.AddTodo(newTodo)
    }

    @Delete(':id')
    deleteTodo(
        @Param('id', new ParseIntPipe({
            errorHttpStatusCode: HttpStatus.NOT_FOUND
        })) id ,
    ){
        
       console.log(typeof id);  
       return this.todoService.eraseTodo(id)
    }


    @Put(':id')
    modifyTodo(
        @Param('id') id,
        @Body() newTodo : Partial<AddTodoDto>
    ){  
       
        return this.todoService.UpdDateTodo(+id, newTodo);
    }
    @Post('pipe')
    testPipe(
        @Param('data', UpperCaseAndFusionPipe) paramDate,
        @Body() Data,
    ){
            return Data
    }
}
