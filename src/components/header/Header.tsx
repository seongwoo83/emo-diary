import type { JSX } from "react";
import "./Header.scss"

const Header = ({title, leftChild, rightChild, style}:{title:string; leftChild: JSX.Element; rightChild?: JSX.Element; style?:React.CSSProperties}) =>{
    return(
        <header className="header">
            <div className="header_left" style={style}>{leftChild}</div>
            <div className="header_center">{title}</div>
            <div className="header_right">{rightChild}</div>
        </header>
    )
}

export default Header;