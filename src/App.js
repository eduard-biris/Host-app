import React, { lazy, Suspense } from 'react';
import './App.css';

const Header = lazy(() => import('MicroFrontendsApp/Button'));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<div>Loading Microfrontends...</div>}>
        <Header />
      </Suspense>
      <div className="container">Host app</div>
    </div>
  );
}

export default App;