import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import '../assets/css/Contents.scoped.scss'

const Navigation = lazy(() => import('../components/Navigation'))
const BookList = lazy(() => import('../views/BookList'))


const ContentsRouter = () => {
    return (
      <>
          <Suspense fallback={null}>
            <div style={{marginLeft : '60px', top: 0}}>
              <Navigation />
              <Routes>
                <Route path="/" element={<BookList />} />
              </Routes>
            </div>
          </Suspense>
      </>
    )
  }
  
  export default ContentsRouter