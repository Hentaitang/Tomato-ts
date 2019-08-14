import * as React from 'react';
import { Checkbox, Icon } from 'antd';
import className from 'classnames';
import axios from '../../axios/axios';
import { connect } from 'react-redux';
import { updateTodos, changeEditing } from '../../redux/actions';

interface TodoItemProps {
  id: number;
  edit: boolean;
  description: string;
  completed: boolean;
  updateTodos: (payload: any) => void;
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

  async update(id: number, params: any) {
    try {
      const res = await axios.put(`todos/${id}`, params);
      this.props.updateTodos(res.data.resource);
    } catch (err) {
      console.log(err);
    }
  }

  async updateDescription(e: any) {
    if (e.keyCode === 13 && this.state.inputValue) {
      this.update(this.props.id, {
        description: this.state.inputValue
      });
    }
  }

  render() {
    const { description, completed, id, edit } = this.props;
    const { inputValue } = this.state;

    const Text = (
      <span className="text" onDoubleClick={() => this.props.changeEditing(id)}>
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
            onClick={() => this.update(id, { deleted: true })}
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
          onChange={e => this.update(id, { completed: e.target.checked })}
          checked={completed}
        />
        {edit ? Editing : Text}
      </div>
    );
  }
}

const mapDispatchToProps = {
  updateTodos,
  changeEditing
};

export default connect(
  null,
  mapDispatchToProps
)(TodoItem);
