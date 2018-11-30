import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
//import {loadAllMessages} from './redux/actions';
import axios from 'axios';
import {loadAllMessages} from './redux/actions';

//axios.defaults.withCredentials = true;
class Message extends Component {
    render() {
        return (
            <div className="message">
                {this.props.content}
            </div>
        )
    }
}

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.sendSomeData = this.sendSomeData.bind(this);
        this.updateMessage = this.updateMessage.bind(this);
        this.state = {
            content: null, //Initial content
            messageValue: '',
        };
    }

    updateMessage(e) {
        this.setState({
            messageValue: e.target.value,
        })
    }

    sendSomeData() {
        axios(
            {
                method: 'POST',
                url: '/api/sendmessage',
                data:
            }
        )
    }

    componentDidMount() {
        //this is the url of where your spark
        //load up initial messages
        axios.get('/api/messages')
        .then((res) => {
            console.log(res.data)
            this.props.loadAllMessages(res.data);
        }).catch((e) => {
            //this is an async catch
            console.log(e);
        })
    }

    render() {
        return (
            <div className="content-area">
            {this.state.content}
                <div classname="messages">
                {
                    //JSON.stringify(this.props.messages)
                    this.props.messages.map((messageData, i) => <Message key={i} content={messageData}/>)
                }
                </div>
                <input value={this.state.messageValue} onChange={this.updateMessage}/>
                <button onClick={this.sendSomeData}>Send Some Post Data</button>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        messages : state.testReducer.messages,
    };
};


const mapDispatchToProps = {loadAllMessages};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomePage);