import * as React from 'react';
import './Tomatoes.scss';
import TomatoesAction from './TomatoesAction';

class Tomatoes extends React.Component {
  render() {
    return (
      <div className="tomatoes">
        <TomatoesAction />
      </div>
    );
  }
}

export default Tomatoes;
