import * as React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { format } from 'date-fns';
import './TomatoList.scss';
import NoHistory from './NoHistory';

interface TomatoListProps {
  tomatoList: any[];
}

function InnerTomatoes(props: any) {
  return (
    <div className="todoItem">
      {props.tomatoes.map((t: any) => {
        return (
          <div key={t.id}>
            <span className="time">
              {format(t.created_at, 'H:mm')} - {format(t.ended_at, 'H:mm')}
            </span>
            <span className="description">{t.description}</span>
          </div>
        );
      })}
    </div>
  );
}

class TomatoList extends React.Component<TomatoListProps> {
  constructor(props: TomatoListProps) {
    super(props);
  }
  get completeTomatoes() {
    const completeTomatoes = this.props.tomatoList.filter(
      t => t.description && !t.aborted && t.ended_at
    );

    const group = _.groupBy(completeTomatoes, c => {
      return format(Date.parse(c.created_at), 'YYYY-MM-DD');
    });

    return group;
  }

  get showDate() {
    return Object.keys(this.completeTomatoes)
      .sort((a, b) => Date.parse(b) - Date.parse(a))
      .slice(0, 3);
  }
  render() {
    return (
      <div className="tomatoList">
        {this.showDate.length ? (
          this.showDate.map(t => {
            return (
              <div key={t} className="tomatoDate">
                <div className="title">
                  <span className="titleDate">{format(t, 'M月DD日')}</span>
                  <span className="titleCompleted">
                    完成了{this.completeTomatoes[t].length}个老干妈
                  </span>
                </div>
                <InnerTomatoes
                  tomatoes={this.completeTomatoes[t].slice(0, 3)}
                />
              </div>
            );
          })
        ) : (
          <NoHistory />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    tomatoList: state.Tomatoes
  };
};

export default connect(
  mapStateToProps,
  null
)(TomatoList);
