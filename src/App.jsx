import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useStore } from './store';
import AppRouter from './router';
import { makeCSS, DARK, LIGHT } from './theme';
import './i18n';
import { useCloudSync } from './hooks/useCloudSync';

export default function App() {
  const { dark } = useStore();
  
  // Initialize Firebase Real-Time Synchronization
  useCloudSync();


  return (
    <BrowserRouter>
      <style>{makeCSS(dark)}</style>
      <AppRouter />
    </BrowserRouter>
  );
}
