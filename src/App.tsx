import './App.css'
import { createContext, useReducer, useRef } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/home/Home'
import Diary from './pages/diary/Diary'
import New from './pages/new/New'
import Edit from './pages/edit/Edit'
import NotFound from './pages/404/NotFound'
import type { DiaryType, Action } from './util/Types'
/**
  1. "/": 모든 일기를 조회하는 Home페이지
  2. "/new": 새로운 일기를 작성하는 New페이지
  3. "/diary": 일기를 상세히 조회하는 Diary페이지
  4. "/edit": 일기를 수정하거나 작성하는 Edit페이지
*/
const mockData:DiaryType[]=[
  {
    id: 1,
    createdDate: new Date("2025-05-21").getTime(),
    emotionId: 1,
    content: "1번 일기 내용"
  },
  {
    id: 2,
    createdDate: new Date("2025-05-20").getTime(),
    emotionId: 2,
    content: "2번 일기 내용"
  },
  {
    id: 3,
    createdDate: new Date("2025-04-17").getTime(),
    emotionId: 3,
    content: "3번 일기 내용"
  }
]

function reducer(state: DiaryType[], action:Action){
  if (!action.data) return state;
  switch(action.type){
    case "CREATE" :   
      return [action.data ,...state];
    case "UPDATE" : 
      return state.map(item=> item.id === action.data.id ? action.data : item);
    case "DELETE" : 
      return state.filter(item=> item.id !== action.data.id);
    default : 
      return state;
  }
}

export const DiaryStateContext = createContext(mockData);
export const DiaryDispatchContext = createContext({});



function App() {

  const [data, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);


  // 새로운 일기를 추가하는 기능
  const onCreate = ({createdDate, emotionId, content}:Omit<DiaryType, "id">)=>{
    dispatch({
      type: "CREATE",
      data:{
        id: idRef.current++,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 기존 일기를 수정하는 기능
  const onUpdate = ({id, createdDate, emotionId, content}: DiaryType)=>{
    dispatch({
      type:"UPDATE",
      data:{
        id,
        createdDate,
        emotionId,
        content
      }
    })
  }

  // 일기를 삭제하는 기능
  const onDelete = (id:number)=>{
    dispatch({
      type: "DELETE",
      data:{
        id,
        createdDate: new Date().getTime(),
        emotionId: 1,
        content: ""
      }
    })
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value={{
          onCreate,
          onUpdate,
          onDelete
        }}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/new' element={<New />} />
            <Route path='/diary/:id' element={<Diary />} />
            <Route path='/edit/:id' element={<Edit />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  )
}

export default App
