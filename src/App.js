import React from 'react';
import Card from './components/Card'; // Ajuste o caminho conforme a estrutura do seu projeto
import Navbar from './components/Navbar'; 


function App() {
const navItems = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Cards', href: '#cards' },
    { label: 'Profile', href: '#profile' },
  ];

  return (
    <div className="App">
      <Navbar items={navItems} />
      <Card />
    </div>
  );
}

export default App;