import React from 'react';
import ReactDOM from 'react-dom';

import './index.less';
import less from './index.module.less';
import stylus from './index.module.styl';
import scss from './index.module.scss';
import css from './index.module.css';

ReactDOM.render(
  <React.StrictMode>
    <div className="title">你好，React-webpack5-template</div>
    <div className={css.css}>css</div>
    <div className={scss.scss}>scss</div>
    <div className={less.font}>less</div>
    <div className={stylus.stylus}>stylus</div>
  </React.StrictMode>,
  document.getElementById('root')
);
