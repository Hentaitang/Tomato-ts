import TodoInput from './todoInput';
import TodoItem from './todoItem';
import * as React from 'react';
import axios from 'src/axios/axios';

interface TodoProps {
  todoList: any[];
  addTodoList: any;
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
    const { todoList } = this.props;
    return (
      <div>
        <TodoInput addTodo={this.addTodo} />
        {todoList.map(n => {
          return <TodoItem {...n} key={n.id} />;
        })}
      </div>
    );
  }
}

export default Todos;
