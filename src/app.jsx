import React from 'react'
import { Statistic, Row, Col } from 'antd'
import _ from 'lodash'
import moment from 'moment'

import './App.less';

const { Countdown } = Statistic;

const App = () => {
  const deadline = moment.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

  const onFinish = () => {
    const a = {}
    console.log('finished!');
    _.set(a, 'finish', true)
  }

  return (
    <div className="container">
      <Row gutter={16} className="time">
        <Col span={12}>
          <Countdown title="Countdown" value={deadline} onFinish={onFinish} />
        </Col>
        <Col span={12}>
          <Countdown title="Million Seconds" value={deadline} format="HH:mm:ss:SSS"/>
        </Col>
        <Col span={24} style={{ marginTop: 32 }}>
          <Countdown title="Day Level" value={deadline} format="D 天 H 时 m 分 s 秒" />
        </Col>
      </Row>
    </div>
  )
}

export default App
