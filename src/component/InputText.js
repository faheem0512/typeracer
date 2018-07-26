import React,{Component} from "react";

export default class InputText extends Component {
    render(){
        const {value,onChange} = this.props;
        return <input type="text" value={value} onChange={onChange}/>
    }
}