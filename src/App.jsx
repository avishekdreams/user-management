import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';
import View from './pages/View';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/view/:id" element={<View />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
