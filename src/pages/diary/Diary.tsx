import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";
import { Button } from "../../components/button/Button";
import Viewer from "../../components/viewer/Viewer";
import useDiary from "../../hooks/useDiary";
import { getStringedDate } from "../../util/getStringedDate";
import usePageTitle from "../../hooks/usePageTitle";

const Diary = () =>{
    const nav = useNavigate();
    const params = useParams();
    usePageTitle(`${params.id}번 일기`);

    const curDiaryItem = useDiary(Number(params.id));
    
    if(!curDiaryItem){
        return <div>데이터 로딩중..</div>
    }
    
    const {content, createdDate, emotionId} = curDiaryItem;

    const title = getStringedDate(new Date(createdDate))

    return <div>
        <Header
            title={`${title} 기록`}
            leftChild={<Button text={"< 뒤로가기"} type={"DEFAULT"} onClick={()=>nav(-1)}/>}
            rightChild={<Button text={"수정하기"} type={"DEFAULT"} onClick={()=>nav(`/edit/${params.id}`)}/>}
        />
        <Viewer emotionId={emotionId}content={content}/>
    </div>
}

export default Diary;