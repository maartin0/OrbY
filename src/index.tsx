import './style.css';

import './renderer';

import Overlay from './overlay';

import React from 'react';
import { createRoot } from 'react-dom/client';

const root: HTMLDivElement = document.createElement('div');
document.body.append(root);
createRoot(root).render(<Overlay />);

console.log('Ready!');
