import { useParams, useNavigate } from "react-router-dom";
import Editor from "../../components/editor/Editor";
import Header from "../../components/header/Header";
import { Button } from "../../components/button/Button";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../../App";
import type { DiaryType } from "../../util/Types";

const Edit = () => {
    const params = useParams();
    const nav = useNavigate();
    const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
    const data = useContext(DiaryStateContext);
    const [curDiaryItem, setCurDiaryItem] = useState<DiaryType>({
        id: 0,
        content: "",
        createdDate: 0,
        emotionId: 0
    });

    const onClickDelete = ()=>{
        if(window.confirm("삭제하시겠습니까?")){
            onDelete(Number(params.id));
            nav("/", {replace: true});
        }else{
            return;
        }
    }
    
    const onSubmit = (input:DiaryType)=>{
        if(window.confirm("수정하시겠습니까?")){
            onUpdate({id: Number(params.id), createdDate: new Date(input.createdDate).getTime(), emotionId: input.emotionId, content: input.content});
            nav("/", {replace: true});
        }else{
            return;
        }
    }

    useEffect(()=>{
        const currentDiaryItem = data.find((item) => String(item.id) === String(params.id));
        if(!currentDiaryItem){
            window.alert("존재하지 않는 일기입니다.");
            nav("/", {replace: true});
        }else{
            setCurDiaryItem(currentDiaryItem);
        }
    }, [params.id])


    return (
        <div>
            <Header title={"일기 수정하기"}
            leftChild={<Button text={"< 뒤로가기"} type={"DEFAULT"} onClick={()=>{
                nav(-1);
            }}/>}
            rightChild={<Button text={"삭제하기"} type={"NEGATIVE"} onClick={onClickDelete}/>}
            />
            <Editor
                initData={curDiaryItem}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default Edit;