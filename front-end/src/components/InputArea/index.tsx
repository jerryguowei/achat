import React,  {Component, RefObject} from 'react';
import './index.css'

interface InputAreaProps {
    handleSubmit: Function
}
interface InputAreaState {
    value : string
}
export default class InputArea extends Component<InputAreaProps, InputAreaState> {
    myRef : RefObject<HTMLTextAreaElement>;
    constructor(props: InputAreaProps){
        super(props);
        this.state = {
            value : '',
        }
        this.myRef = React.createRef();
    }

    handleChange = (event : React.ChangeEvent<HTMLTextAreaElement>)  => {
        this.setState({value : event.target.value});
    }
    handleSubmit = () => {
        this.props.handleSubmit(this.state.value);
        this.setState({value : ''});
    }

    onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) =>{
        var code = event.key;
        if(code === "Enter") {
            this.handleSubmit();
            event.preventDefault();
        }
    }
    render() {
        return (<div className="input-wrapper">         
                <textarea 
                    className="input-textarea"
                    placeholder="text"
                    value = {this.state.value}
                    onChange={this.handleChange}
                    onKeyDown={this.onKeyDown}
                    ref={this.myRef}
                > 
                </textarea>
                <button className= "btn on" type="button"
                    disabled = {!this.state.value}
                    onClick = {this.handleSubmit}>
                        Input
                </button>
        </div>)
    }
}