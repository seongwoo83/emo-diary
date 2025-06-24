import Header from "../../components/header/Header";
import { Button } from "../../components/button/Button";
import Editor from "../../components/editor/Editor";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { DiaryDispatchContext } from "../../App";
import type { DiaryType } from "../../util/Types";
import usePageTitle from "../../hooks/usePageTitle";

const New = () => {
    const nav = useNavigate();
    usePageTitle("새 일기 쓰기");

    const { onCreate } = useContext(DiaryDispatchContext);
    
    const onSubmit = (input:DiaryType)=>{
        onCreate(input);
        nav("/", {replace: true});
    }

    return (
        <>
            <Header
                title={"새 일기 쓰기"}
                leftChild={
                    <Button
                        text={"< 뒤로가기"}
                        type={"DEFAULT"}
                        onClick={() => nav(-1)}/>
                } style={{marginRight: "auto"}}/>
            <Editor onSubmit={onSubmit}/>
        </>
    )
}

export default New;