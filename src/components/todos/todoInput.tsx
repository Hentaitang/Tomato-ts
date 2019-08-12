import * as React from 'react';
import { Input, Icon, Tooltip } from 'antd';

interface StateType {
  focus: boolean;
  description: string;
}

interface InputProps {
  addTodo: any;
}

class TodoInput extends React.Component<InputProps, StateType> {
  constructor(props: any) {
    super(props);
    this.state = {
      focus: false,
      description: ''
    };
  }
  onChange(value: string) {
    const state = this.state;
    this.setState({ ...state, description: value });
  }
  isFocus(type: boolean) {
    const state = this.state;
    this.setState({ ...state, focus: type });
  }
  async submit() {
    try {
      await this.props.addTodo(this.state.description);
      this.setState({
        focus: false,
        description: ''
      });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { focus, description } = this.state;
    const suffix = focus ? (
      <Tooltip title="按回车提交" placement="bottom">
        <span onMouseDown={() => this.submit()}>
          <Icon type="enter" style={{ cursor: 'pointer' }} />
        </span>
      </Tooltip>
    ) : (
      <span />
    );
    return (
      <Input
        placeholder="添加新任务"
        onChange={e => this.onChange(e.target.value)}
        onFocus={() => this.isFocus(true)}
        onBlur={() => this.isFocus(false)}
        onPressEnter={() => this.submit()}
        value={description}
        suffix={suffix}
      />
    );
  }
}

export default TodoInput;
