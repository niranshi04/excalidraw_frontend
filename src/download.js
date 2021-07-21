import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const ViewAndDownload = () => {
    const [fileList, setList] = useState([]);
    const [fileName, setName] = useState([]);
    var setInt;
    useEffect(() => {
        getFiles();
      }, []);

    const getFiles = async () => {
        let response = await axios.get("http://localhost:7900/getFiles");
        console.log(response.data.files);
        if(response.data.success) {
            setList(response.data.files)
        } else {
            console.log(response)
        }
    };

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data) 
        });
        return response; 
    }
      
    const handleDownload = (event) => {
        postData('http://localhost:7900/download',{name : fileName})
            .then(response => {
                console.log(response);
                response.blob().then(blob => {
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = fileName+'.png';
                    a.click();
                });
            });
        event.preventDefault();
    }
    
    return (
        <div className="wrapper">
            <h1> Download Recents</h1>
            <div>
            <form onSubmit={handleDownload}>
            <label>
        FileName:
            <input
                name="fileName"
                type="fileName"
                value={fileName}
                onChange={e => setName(e.target.value)}
            required />
            </label>
            <button type="submit">Download</button>
            </form>
            </div>
            <h3>Copy the filename from given list</h3>
            <div className="file-viewer">
            {
                fileList.map((fileList, index) => {
                    return (
                        <div key={index}>
                            <p>{fileList}</p>
                        </div>
                    );
                })
            }
            </div>
            
        </div>
    );
}

export default ViewAndDownload;