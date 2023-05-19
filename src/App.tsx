import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css';
const BookList = lazy(() => import('./views/BookList'))
const Navigation = lazy(() => import('./components/Navigation'))
const SideBar = lazy(() => import('./components/SideBar'))

function App() {

  return (
    <Suspense fallback={null}>
      <SideBar />
      <Navigation />
      <Routes>
        <Route path="/" element={<BookList />} />
      </Routes>
    </Suspense>
  );
}

export default App;
