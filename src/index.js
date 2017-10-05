import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Layout from './views/Layout/Layout';
import './components/SemanticUI/dist/semantic.min.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Layout />, document.getElementById('root'));
registerServiceWorker();
