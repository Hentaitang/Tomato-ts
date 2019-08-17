import * as React from 'react';
import './StastisticsSvg.scss';
import _ from 'lodash';
import { format } from 'date-fns';

interface SvgProps {
  list: any[];
  width: number;
}

class StastisticsSvg extends React.Component<SvgProps> {
  get groupTime() {
    return _.groupBy(this.props.list, l => {
      return l.completed_at
        ? format(l.completed_at, 'YYYY-MM-DD')
        : format(l.ended_at, 'YYYY-MM-DD');
    });
  }
  get filterTime() {
    return Object.keys(this.groupTime).sort(
      (a, b) => Date.parse(a) - Date.parse(b)
    );
  }
  get polygon() {
    const endDate = new Date().getTime();
    const startDate = this.filterTime[0];
    const xRange = endDate - Date.parse(startDate);
    const yRange = this.props.list.length;
    let finishY;
    let totalCount = 0;
    if (startDate) {
      const pointArr = this.filterTime.map(t => {
        totalCount += this.groupTime[t].length;
        const x =
          ((Date.parse(t) - Date.parse(startDate)) / xRange) * this.props.width;
        const y = (1 - totalCount / yRange) * 60;
        finishY = y;
        return `${x},${y}`;
      });
      if (this.filterTime.length > 1) {
        return `0,60 ${pointArr.join(' ')} ${this.props.width},${finishY} ${
          this.props.width
        },60`;
      } else {
        return `0,60 ${this.props.width},${finishY} ${this.props.width},60`;
      }
    } else {
      return `0,60 ${this.props.width},60`;
    }
  }
  render() {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        className="stastisticsSvg"
      >
        <polygon
          points={this.polygon}
          fill="rgba(215,78,78,0.1)"
          stroke="rgba(215,78,78,0.5)"
          strokeWidth="1"
        />
      </svg>
    );
  }
}

export default StastisticsSvg;
