/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'es6-shim';

const root = createRoot(document.querySelector('#root')!);
root.render(<App />);
