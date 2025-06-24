import './App.css'
import { createContext, useEffect, useReducer, useRef, useState } from 'react'
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
function reducer(state: DiaryType[], action: Action): DiaryType[] {
  switch(action.type){
    case "INIT" : 
      return action.data;
    case "CREATE" : {
      const createState = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(createState));
      return createState;
    }
    case "UPDATE" : {
      const updateState = state.map(item => item.id === action.data.id ? action.data : item);
      localStorage.setItem("diary", JSON.stringify(updateState));
      return updateState;
    }
    case "DELETE" : {
      const deleteState = state.filter(item => item.id !== action.data.id);
      localStorage.setItem("diary", JSON.stringify(deleteState));
      return deleteState;
    }
    default :
      return state;
  }
}

export const DiaryStateContext = createContext<DiaryType[]>([]);
export const DiaryDispatchContext = createContext<{
    onCreate: (input: Omit<DiaryType, "id">) => void;
    onUpdate: (input: DiaryType) => void;
    onDelete: (id: number) => void;
}>({
    onCreate: () => {},
    onUpdate: () => {},
    onDelete: () => {}
});



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  useEffect(()=>{
    const storedData = localStorage.getItem("diary");
    if(!storedData){
      setIsLoading(false);
      return;
    }
    const parsedData:DiaryType[] = JSON.parse(storedData);
    let maxId = 0;

    if(!Array.isArray(parsedData)){
      setIsLoading(false);
      return;
    }

    parsedData.forEach((item:DiaryType)=>{
      if(item.id > maxId){
        maxId = item.id
      }
    })

    idRef.current = maxId + 1;

    dispatch({
      type: "INIT",
      data: parsedData
    })
    setIsLoading(false);

  }, []);


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
    {
      isLoading ? <div>로딩중입니다...</div> : 
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
    }
    </>
  )
}

export default App
