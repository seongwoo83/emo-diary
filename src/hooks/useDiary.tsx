import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";
import type { DiaryType } from "../util/Types";
import { useNavigate } from "react-router-dom";

const useDiary = (id:number)=>{
    const nav = useNavigate();
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState<DiaryType>({
        id: 0,
        content: "",
        createdDate: 0,
        emotionId: 0
    });


    useEffect(()=>{
        const currentDiaryItem = data.find((item) => String(item.id) === String(id));
        if(!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.");
            nav("/", {replace: true});
        }else{
            setCurDiaryItem(currentDiaryItem);
        }
    }, [id])

    return curDiaryItem;
}

export default useDiary;