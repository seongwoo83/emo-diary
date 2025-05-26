import { getEmotionImage } from '../../util/get-emotion-image';
import "./EmotionItem.scss"

const EmotionItem = ({emotionId, emotionName, isSelected, onClick} : {emotionId: number; emotionName: string; isSelected: boolean; onClick:()=>void})=>{
    return (
        <div className={`emotion_item ${isSelected ? `selected emotion_item_on_${emotionId}` : ""}`} onClick={onClick}>
            <img className='emotion_img' src={getEmotionImage(emotionId)} alt={emotionName} />
            <div className='emotion_name'>{emotionName}</div>
        </div>
    )
}

export default EmotionItem;