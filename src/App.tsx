import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'

import routes from './routes';

const App: React.FC = () => (
  <Router>
    <ul>
      <li><Link to='/'>主页</Link></li>
      <li><Link to='/auth'>认证页</Link></li>
    </ul>
    {routes}
  </Router>
)

export default App;
