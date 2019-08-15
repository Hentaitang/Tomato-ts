import * as React from 'react';
import './Tomatoes.scss';
import TomatoesAction from './TomatoesAction';
import TomatoList from './TomatoList';

class Tomatoes extends React.Component {
  render() {
    return (
      <div className="tomatoes">
        <TomatoesAction />
        <TomatoList />
      </div>
    );
  }
}

export default Tomatoes;
