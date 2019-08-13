import * as React from 'react';
import { Input, Icon } from 'antd';
import axios from 'src/axios/axios';
import { connect } from 'react-redux';
import { addTodo } from '../../redux/actions';

interface StateType {
  focus: boolean;
  description: string;
}

interface InputProps {
  addTodo: (params: any) => void;
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
      const res = await axios.post('todos', {
        description: this.state.description
      });
      this.props.addTodo(res.data.resource);
    } catch (err) {
      console.log(err);
    }
    this.setState({
      focus: false,
      description: ''
    });
  }
  render() {
    const { focus, description } = this.state;
    const suffix = focus ? (
      <span onMouseDown={() => this.submit()}>
        <Icon type="enter" title="按回车提交" style={{ cursor: 'pointer' }} />
      </span>
    ) : (
      <span />
    );
    return (
      <div className="todoInput">
        <Input
          placeholder="添加新任务"
          onChange={e => this.onChange(e.target.value)}
          onFocus={() => this.isFocus(true)}
          onBlur={() => this.isFocus(false)}
          onPressEnter={() => this.submit()}
          value={description}
          suffix={suffix}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any, ownProps: any) => {
  return { ...ownProps };
};

const mapDispatchToProps = {
  addTodo
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoInput);
