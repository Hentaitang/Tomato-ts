import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import className from 'classnames';

interface TodoItemProps {
  id: number;
  edit: boolean;
  description: string;
  completed: boolean;
  updateTodos: (id: number, params: any) => void;
  changeEditing: (id: number) => void;
}
interface StateType {
  inputValue: string;
}
class TodoItem extends React.Component<TodoItemProps, StateType> {
  constructor(props: TodoItemProps) {
    super(props);
    this.state = {
      inputValue: this.props.description
    };
  }
  async updateDescription(e: any) {
    if (e.keyCode === 13 && this.state.inputValue) {
      await this.props.updateTodos(this.props.id, {
        description: this.state.inputValue
      });
    }
  }
  render() {
    const {
      description,
      completed,
      updateTodos,
      id,
      edit,
      changeEditing
    } = this.props;
    const { inputValue } = this.state;

    const Text = (
      <span className="text" onDoubleClick={() => changeEditing(id)}>
        {description}
      </span>
    );

    const Editing = (
      <div className="editing">
        <input
          type="text"
          value={inputValue}
          onKeyUp={e => this.updateDescription(e)}
          onChange={e =>
            this.setState({ ...this.state, inputValue: e.target.value })
          }
        />
        <div className="iconWrapper">
          <Icon
            type="enter"
            title="按回车键提交"
            onClick={() => this.updateDescription({ keyCode: 13 })}
          />
          <Icon
            type="delete"
            theme="filled"
            title="删除"
            onClick={() => updateTodos(id, { deleted: true })}
          />
        </div>
      </div>
    );
    const itemCLass = className({
      todoItem: true,
      edited: edit,
      completed
    });
    return (
      <div className={itemCLass}>
        <Checkbox
          onChange={e => updateTodos(id, { completed: e.target.checked })}
          checked={completed}
        />
        {edit ? Editing : Text}
      </div>
    );
  }
}

export default TodoItem;
