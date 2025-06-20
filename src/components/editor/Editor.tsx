import "./Editor.scss";
import EmotionItem from '../emotionItem/EmotionItem';
import { Button } from '../button/Button';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DiaryType } from "../../util/Types";
import { emotionList } from "../../util/constants";

const getStringedDate:(targetDate:Date)=>string = (targetDate)=>{
    const year = targetDate.getFullYear();
    const month = targetDate.getMonth()+1;
    const date = targetDate.getDate();

    return `${year}-${month < 10 ? "0"+String(month) : month }-${date < 10 ? "0"+String(date) : date}`
}

const Editor = ({initData, onSubmit}:{initData?: DiaryType; onSubmit:(input:DiaryType)=>void}) => {

    const nav = useNavigate();
    const [input, setInput] = useState({
        createdDate: new Date(),
        emotionId: 1,
        content: ""
    });

    const onChangeInput = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const name = e.target.name;
        const value = new Date(e.target.value)
        setInput({
            ...input,
            [name]: value
        })
    }
    const onChangeEmotion = (target:{name:string, value:number})=>{
        setInput({
            ...input,
            emotionId: target.value
        })
    }
    const onChangeTextarea = (e:React.ChangeEvent<HTMLTextAreaElement>)=>{
        setInput({
            ...input,
            content: e.target.value
        })
    }
    
    const onClickSubmitButton = ()=>{
        onSubmit({
            id: 0, // 임시 ID, 실제로는 App.tsx에서 생성됨
            createdDate: input.createdDate.getTime(),
            emotionId: input.emotionId,
            content: input.content
        });
    }

    useEffect(()=>{
        if(initData){
            setInput({
                ...initData,
                createdDate: new Date(initData.createdDate)
            })
        }
    },[initData])

    return (
        <div className="editor">
            <section className="date_section">
                <h4>오늘의 날짜</h4>
                <input type="date" name={"createdDate"} value={getStringedDate(input.createdDate)} onChange={onChangeInput} />
            </section>
            <section className="emotion_section">
                <h4>오늘의 감정</h4>
                <div className="emotion_list_wrapper">
                {
                    emotionList.map(item=>(
                        <EmotionItem {...item} key={item.emotionId} isSelected={item.emotionId === input.emotionId} onClick={()=>{
                            onChangeEmotion({
                                name: "emotionId",
                                value: item.emotionId
                            })
                        }}/>
                    ))
                }
                </div>
            </section>
            <section className="content_section">
                <h4>오늘의 일기</h4>
                <textarea name="content" id="content" placeholder="오늘은 어땠나요?" value={input.content} onChange={onChangeTextarea}></textarea>
            </section>
            <section className="button_section">
                <Button text={"취소하기"} type={"DEFAULT"} onClick={()=>nav(-1)}/>
                <Button text={"작성완료"} type={"POSITIVE"} onClick={onClickSubmitButton}/>
            </section>
        </div>
    )
};

export default Editor;