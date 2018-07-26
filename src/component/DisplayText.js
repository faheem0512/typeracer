import React,{Component} from "react";

export default class DisplayText extends Component {
    render(){
        const {selectedText,unselectedText,currentTextCount,error} = this.props;
        return <div>
            <span className="selected-text">{selectedText}</span>
            <span className={`current-text ${error?"error":""}`}>{unselectedText.substring(0,currentTextCount)}</span>
            <span className="unselected-text">{unselectedText.substring(currentTextCount)}</span>
        </div>
    }
}