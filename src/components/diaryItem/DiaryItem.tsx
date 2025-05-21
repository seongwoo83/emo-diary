import "./DiaryItem.scss";
import { getEmotionImage } from "../../util/get-emotion-image";
import { Button } from "../button/Button";
import type { DiaryType } from "../../util/Types";
import { useNavigate } from "react-router-dom";


const DiaryItem = ({id, emotionId, createdDate, content}:DiaryType)=>{
    const nav = useNavigate();

    return(
        <div className="diary_item">
            <div className={`img_section img_section_${emotionId}`}
            onClick={()=>nav(`/diary/${id}`)}
            >
                <img src={getEmotionImage(id)} alt="emotion" />
            </div>
            <div className="info_section"
            onClick={()=>nav(`/diary/${id}`)}>
                <div className="create_date">
                    {
                        new Date(createdDate).toLocaleDateString()
                    }
                </div>
                <div className="content">
                    {content}
                </div>
            </div>
            <div className="button_section">
                <Button text={"수정하기"} type={"DEFAULT"} onClick={()=>nav(`/edit/${id}`)} />
            </div>
        </div>
    )
}

export default DiaryItem;