import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/Layout';
import { css } from './theme/dist/semantic.min.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
