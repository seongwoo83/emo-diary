import "./Viewer.scss";
import { getEmotionImage } from "../../util/get-emotion-image";
import { emotionList } from '../../util/constants';

const Viewer = ({content, emotionId}:{content: string; emotionId: number;}) =>{
    const emotionItem = emotionList.find((item)=>String(item.emotionId) === String(emotionId));

    return <div className="viewer">
        <section className="img_section">
            <h4>오늘의 감정</h4>
            <div className={`emotion_img_wrapper emotion_img_wrapper${emotionId}`} >
                <img src={getEmotionImage(emotionId)}/>
                <div>{emotionItem?.emotionName}</div>
            </div>
        </section>
        <section className="content_section">
            <h4>오늘의 일기</h4>
            <div className="contents_wrapper">
                <p>{content}</p>
            </div>
        </section>
    </div>
}

export default Viewer;