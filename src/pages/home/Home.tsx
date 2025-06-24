import Header from "../../components/header/Header";
import { Button } from "../../components/button/Button";
import DiaryList from "../../components/diaryList/DiaryList";
import { useState, useContext } from "react";
import { DiaryStateContext } from "../../App";
import type { DiaryType } from "../../util/Types";
import usePageTitle from "../../hooks/usePageTitle";

const getMonthlyData = (pivotDate:Date, data:DiaryType[])=>{
    const beginTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth(), 1, 0, 0, 0);
    const endTime = new Date(pivotDate.getFullYear(), pivotDate.getMonth()+1, 0, 23, 59, 59)   // Date객체에서 0일로 설정하면 해당날짜의 전 달의 마지막날을 선택

    return data.filter((item) => Number(beginTime) <= item.createdDate && item.createdDate <= Number(endTime));
}

const Home = () =>{
    const data = useContext(DiaryStateContext);
    usePageTitle("Emo-Diary");

    const [pivotDate, setPivotDate] = useState(new Date());
    const monthlyData = getMonthlyData(pivotDate, data);


    const onIncreaseMonth = ()=>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = ()=>{
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    return(
        <>
            <Header title={
                `${pivotDate.getFullYear()} - ${String(pivotDate.getMonth()+1).length === 1 ? "0"+String(pivotDate.getMonth()+1) : pivotDate.getMonth()+1}`
            } leftChild={<Button text={"<"} type={"DEFAULT"}onClick={onDecreaseMonth}/>} rightChild={<Button text={">"} type={"DEFAULT"}onClick={onIncreaseMonth}/>} />
            <DiaryList data={monthlyData}/>
        </>
    )
}

export default Home;