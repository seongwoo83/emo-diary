import "./Button.scss"
import type { ButtonType } from "./../../util/Types"

export const Button = ({text, type, onClick}:{text:string, type:ButtonType, onClick: ()=>void})=>{
    return (
        <button className={`Button Button_${type}`} onClick={onClick} value={type}>{text}</button>
    )
}