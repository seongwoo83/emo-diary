import "./DiaryList.scss";
import { Button } from "../button/Button";
import DiaryItem from '../diaryItem/DiaryItem';
import type { DiaryType } from "../../util/Types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DiaryList = ({data}:{data:DiaryType[]})=>{
    const nav = useNavigate();
    const [sortType, setSortType] = useState('latest');
    const onChangeSortType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortType(e.target.value);
    }
    const getSortedData:()=>DiaryType[] = ()=>{
        return [...data].sort((a:DiaryType, b:DiaryType)=>{
            if(sortType === 'oldest'){
                return a.createdDate - b.createdDate;
            }else{
                return b.createdDate - a.createdDate;
            }
        });
    }

    const sortedData = getSortedData();

    return (
        <div className="diary_list">
            <div className="menu_bar">
                <select name="listFilter" id="listFilter" onChange={onChangeSortType}>
                    <option value={"latest"}>최신순</option>
                    <option value={"oldest"}>오래된순</option>
                </select>
                <Button type={"POSITIVE"} text={"새 일기 쓰기"} onClick={()=>nav(`/new`)}/>
            </div>
            <div className="list_wrapper">
                {
                    sortedData.map((item:DiaryType)=>{
                        return <DiaryItem key={item.id} {...item}/>
                    })
                }
            </div>
        </div>
    )
}

export default DiaryList;