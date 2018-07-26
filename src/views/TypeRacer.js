import React, {Component} from "react";
import {connect} from "react-redux";
import {fetchData,removeData} from "../store/action";
import uuid from "uuid";
import {removeHtmlTags} from "../Utility";
import {TIMER} from "../Config";
import DisplayText from "../component/DisplayText";
import InputText from "../component/InputText";
import Timer from "../component/Timer";
import RaceComplete from "./RaceComplete";

class TypeRacer extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedText:"",
            currentText:"",
            currentTextCount:0,
            currentInputtedText:"",
            unselectedText:"",
            error:"",
            errors:0,
            totalWordsTyped:0
        };
        this.fetchRandomText = this.fetchRandomText.bind(this);
        this.onInputValueChange = this.onInputValueChange.bind(this);
        this.onRaceComplete = this.onRaceComplete.bind(this);
    }
    componentWillMount(){
        this.fetchRandomText();
    }
    fetchRandomText(){
        const {fetchData,uniqueId} = this.props;
        fetchData({
            uniqueId
        });

    }
    onRaceComplete(){
        this.setState({
            raceComplete:true
        });
    }
    onInputValueChange({target:{value}}){
        let {currentText,selectedText,unselectedText,endDate,errors,totalWordsTyped} = this.state;
        totalWordsTyped +=1;
        if(currentText === value){
            selectedText = selectedText + currentText;
            unselectedText = unselectedText.substring(currentText.length);
            if(!unselectedText){
                /*when full text is typed*/
                this.onRaceComplete();
                return;
            }
            const _firstIndexOfSpace = unselectedText.indexOf(" ");
            currentText = unselectedText.substring(0, _firstIndexOfSpace + 1);
            this.setState({
                selectedText,
                unselectedText,
                currentText,
                currentInputtedText:"",
                currentTextCount:0,
                totalWordsTyped,
                error:false
            });
        } else {
            let error;
            if(currentText.substring(0,value.length) === value){
                error = false;
            } else {
                errors += 1;
                error = true;
            }
            this.setState({
                error,
                errors,
                totalWordsTyped,
                currentInputtedText:value,
                currentTextCount:value.length
            });
        }
        if(!endDate){
            this.setState({
                endDate: new Date().getTime() + TIMER
            });
        }


    }

    componentWillUnmount() {
        const {removeData,uniqueId} = this.props;
        removeData({
            uniqueId
        });
    }

    componentWillReceiveProps(nextProps){
        if(!this.props.data || (this.props.data !== nextProps.data)){
            if(nextProps.data){
                const _finalString = removeHtmlTags(nextProps.data["text_out"]);
                const _firstIndexOfSpace = _finalString.indexOf(" ");
                this.setState({
                    unselectedText:_finalString,
                    currentText: _finalString.substring(0, _firstIndexOfSpace + 1)

                });
            }

        }

    }

    render(){
        const {dataProps={},data} = this.props;
        const {selectedText,unselectedText,currentInputtedText,currentTextCount,error,endDate,raceComplete,totalWordsTyped,errors} = this.state;
        if(dataProps.showLoading){
            return <div>Loading...</div>
        }  else if(data) {
            return <div className="typeracer-container">
                {endDate?<Timer endDate={endDate} onTimerComplete={this.onRaceComplete} />:<div className="timer">{raceComplete?"Race is over":"Timer: 00:00"}</div>}
                {raceComplete?<RaceComplete totalWordsTyped={totalWordsTyped} errors={errors} />: <div className="typeracer-container">
                    <DisplayText
                        selectedText={selectedText}
                        unselectedText={unselectedText}
                        currentTextCount={currentTextCount}
                        error={error}
                    />
                    <br/>
                    <InputText
                        value={currentInputtedText}
                        onChange={this.onInputValueChange}
                    />
                </div>}

            </div>;
        } else {
            return null;
        }

    }
}

TypeRacer = connect((state,ownProps)=>{
    let mapStateToProps = {};
    const dataState = state.data || {};
    if(dataState[ownProps.uniqueId]){
        mapStateToProps.dataProps = dataState[ownProps.uniqueId];
        mapStateToProps.data = dataState[ownProps.uniqueId]["data"]
    }
    return mapStateToProps;

},{
    fetchData,
    removeData
})(TypeRacer);

export default class TypeRacerWrapper extends Component {
    componentWillMount(){
        this.uniqueId = uuid.v4();
    }
    render(){
        return <TypeRacer {...this.props} uniqueId={this.uniqueId} />
    }

}