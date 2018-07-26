import React from "react";
import PropTypes from "prop-types";

/*Expected time in millisecond */
export default class Timer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            minutes: "00:",
            seconds: "00"
        };
        this.computationTime = this.computationTime.bind(this);

    }
    componentWillMount(){
        this.computationTime();
        this.timer = setInterval(_=>{
                this.computationTime();
            },1000);


    }

    computationTime(){
        const {endDate,onTimerComplete} = this.props;
        const computationTime = endDate - new Date().getTime();
        if(computationTime > 0) {
            let timeInSeconds = parseInt(computationTime / 1000);
            let timeInMinutes = parseInt(timeInSeconds / 60);
            timeInSeconds = timeInSeconds - (timeInMinutes * 60);
            timeInMinutes = `${((timeInMinutes / 10) < 1) ? "0" + timeInMinutes : timeInMinutes}:`;
            timeInSeconds = `${((timeInSeconds / 10) < 1) ? "0" + timeInSeconds : timeInSeconds}`;
            this.setState({
                minutes: timeInMinutes,
                seconds: timeInSeconds

            });
        } else {
            clearInterval(this.timer);
            onTimerComplete && onTimerComplete();
            this.setState({
                minutes: "00:",
                seconds: "00"

            });
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer);
    }
    render() {
        const {minutes,seconds} = this.state;
        return <div className="timer">
            Timer -
            <span>{`${minutes}${seconds}`}</span>
        </div>
    }
}

Timer.defaultProps = {
    endDate:0,
    style:{}
};
Timer.propTypes = {
    endDate:PropTypes.number.isRequired,
};

