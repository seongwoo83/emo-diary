import './App.css'
import { Route, Routes, Link, useNavigate } from 'react-router-dom'
import Home from './pages/home/Home'
import Diary from './pages/diary/Diary'
import New from './pages/new/New'
import NotFound from './pages/404/NotFound'
/**
  1. "/": 모든 일기를 조회하는 Home페이지
  2. "/new": 새로운 일기를 작성하는 New페이지
  3. "/diary": 일기를 상세히 조회하는 Diary페이지
*/
function App() {

  const nav = useNavigate();

  const onClickButton = ()=>{
    nav("/new")
  }

  return (
    <>
      <div>
        <Link to={"/"}>Home</Link>
        <Link to={"/new"}>New</Link>
        <Link to={"/diary"}>Diary</Link>
      </div>
      <button onClick={onClickButton}>New페이지로 이동</button>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/new' element={<New />} />
        <Route path='/diary' element={<Diary />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
