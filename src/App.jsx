import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="flex items-center gap-2 text-xl font-bold text-blue-600">
        <span className="bg-blue-600 text-white px-2 py-1 rounded">eT</span>
        <span>eTuitionBd</span>
      </div>
    </>
  );
}

export default App;
