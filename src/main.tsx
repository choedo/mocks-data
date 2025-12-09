import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ReactQueryProvider from '@/provider/ReactQueryProvider.tsx';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ReactQueryProvider>
      <App />
    </ReactQueryProvider>
  </BrowserRouter>
);
