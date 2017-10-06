import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';
import Layout from './views/Layout/Layout';
import './index.css';


ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
