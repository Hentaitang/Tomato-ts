import * as React from 'react';
import { Checkbox } from 'antd';

interface TodoItemProps {
  description: string;
  completed: boolean;
}
interface StateType {
  isEdit: boolean;
}
class TodoItem extends React.Component<TodoItemProps, StateType> {
  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      isEdit: false
    };
  }
  editing() {
    this.setState({ isEdit: true });
  }
  changeValue() {
    console.log(2);
  }
  onChange(e: any) {
    console.log(`checked = ${e.target.checked}`);
  }
  render() {
    const { description, completed } = this.props;
    const { isEdit } = this.state;
    return (
      <div>
        <Checkbox onChange={this.onChange} checked={completed} />
        {isEdit ? (
          <input type="text" value={description} onChange={this.changeValue} />
        ) : (
          <span onDoubleClick={() => this.editing()}>{description}</span>
        )}
      </div>
    );
  }
}

export default TodoItem;
