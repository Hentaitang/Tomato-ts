import TodoInput from './todoInput';
import TodoItem from './todoItem';
import * as React from 'react';
import axios from 'src/axios/axios';

interface TodoProps {
  todoList: any[];
  addTodoList: (params: any) => void;
  updateTodos: (id: number, params: any) => void;
  changeEditing: (id: number) => void;
}

class Todos extends React.Component<TodoProps> {
  constructor(props: TodoProps) {
    super(props);
    this.addTodo = this.addTodo.bind(this);
  }
  async addTodo(description: string) {
    try {
      const res = await axios.post('todos', {
        description
      });
      this.props.addTodoList(res.data.resource);
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { todoList, updateTodos, changeEditing } = this.props;
    return (
      <div>
        <TodoInput addTodo={this.addTodo} />
        {todoList.map(n => {
          return (
            <TodoItem
              {...n}
              key={n.id}
              updateTodos={updateTodos}
              changeEditing={changeEditing}
            />
          );
        })}
      </div>
    );
  }
}

export default Todos;
