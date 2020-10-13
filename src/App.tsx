import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'

import './App.css'
import routes from './routes';

const App: React.FC = () => (
  <Router>
    {routes}
  </Router>
)

export default App;
