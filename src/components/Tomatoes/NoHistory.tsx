import * as React from 'react';
import { Icon } from 'antd';
import './NoHistory.scss';

function NoHistory() {
  return (
    <div className="NoHistory">
      <Icon type="history" />
      <span>没有记录</span>
    </div>
  );
}

export default NoHistory;
