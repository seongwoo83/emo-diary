import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Diary from './pages/diary/Diary'
import New from './pages/new/New'
import NotFound from './pages/404/NotFound'
import { Button } from './components/button/Button'
import Header from './components/header/Header'
/**
  1. "/": 모든 일기를 조회하는 Home페이지
  2. "/new": 새로운 일기를 작성하는 New페이지
  3. "/diary": 일기를 상세히 조회하는 Diary페이지
*/
function App() {


  
  return (
    <>
      <Header />
      <Button text="긍정" type="POSITIVE" onClick={()=>{}}/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
