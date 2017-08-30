import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './views/Layout';
import './components/SemanticUI/dist/semantic.min.css'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
