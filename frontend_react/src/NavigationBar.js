import { Avatar, IconButton } from '@material-ui/core';
import { AttachFile, InsertEmoticon, SearchOutlined, SettingsInputAntenna } from '@material-ui/icons';
import MoreVert from '@material-ui/icons/MoreVert';
import React, {useEffect, useState} from "react";
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';
import "./Chat.css"


function Chat() {
    const [input, setInput] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);


    const onChange = (e) => {
        // setImage(e.target.files[0]);
    }

    const onClick = async() => {
        // const formData = new FormData();
        // formData.append('file', img);
        // const res = await axios.post('/api/upload', formData);
        // console.log(res);
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        console.log("event.target.files[0]:",event.target.files[0]);
    }

    const handleFileUpload = () => {
        const formData = new FormData();

        formData.append("userfile", selectedFile, selectedFile.name);

        axios.post('api/uploadfile', formData)
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        });
    };


    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar/>
                <div className="chat__headerInfo">
                    <h3>Room name</h3> 
                    <p>Last seen at...</p>
                </div>
            </div>
            <div className="chat__body">
                
            </div>
        </div>
    );
}

export default Chat
