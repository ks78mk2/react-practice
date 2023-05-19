import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import './assets/css/App.css'
import ContentsRouter from './routers/ContentsRouter';
const SideBar = lazy(() => import('./components/SideBar'))

function App() {

  return (
    <Suspense fallback={null}>
      <SideBar />
      <Routes>
        <Route path="/" element={<ContentsRouter />} />
      </Routes>
    </Suspense>
  );
}

export default App;
