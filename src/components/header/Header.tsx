import type { JSX } from "react";
import "./Header.scss"

const Header = ({title, leftChild, rightChild}:{title:string; leftChild: JSX.Element; rightChild: JSX.Element}) =>{
    return(
        <header className="header">
            <div className="header_left">{leftChild}</div>
            <div className="header_center">{title}</div>
            <div className="header_right">{rightChild}</div>
        </header>
    )
}

export default Header;