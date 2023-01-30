import React from 'react';
import ReactDOM from 'react-dom/client';
import { FauxLotto } from './components/FauxLotto';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FauxLotto />
  </React.StrictMode>
);
