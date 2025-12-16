import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ReactQueryProvider from '@/provider/react-query-provider';
import { BrowserRouter } from 'react-router';
import ModalProvider from '@/provider/modal-provider.tsx';
import SessionProvider from '@/provider/session-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ReactQueryProvider>
      <SessionProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </SessionProvider>
    </ReactQueryProvider>
  </BrowserRouter>
);
