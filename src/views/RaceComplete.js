import React from "react";
import {TIMER} from "../Config";

export default ({errors,totalWordsTyped})=>{
    return <div className="race-complete-modal">
                <div>Words Per Minute : {parseInt(totalWordsTyped/(TIMER/60000))}</div>
                <div>Accuracy : {((totalWordsTyped-errors)/totalWordsTyped)*100}%</div>
    </div>
}