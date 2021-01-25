import React, { Component } from "react";
import styles from "./Import.module.css";

class Import extends Component {
    constructor(props) {
        super(props);
          this.state = {
            selectedFile: null
          }
       
      }

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleFileRead = (fileToRead) =>{
        let reader = new FileReader();
        reader.onload = function(event) {
            const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: event.target.result
          };
          fetch('http://localhost:8888/web-project-2020-FMI/backend/services/import.php', requestOptions)
            .then(response=>{
                if(response.ok){
                    alert("Successful Import");
                }else{
                    alert("Exception during Import");
                }
            });
        };
        
        reader.readAsText(fileToRead);
    }

    onFileUpload = () => {
        if (this.state.selectedFile == null) {
            return;
        }
        if (!this.state.selectedFile.type == "json") {
            return;
        }
        this.handleFileRead(this.state.selectedFile);
    };

    fileData = () => {
        if (!this.state.selectedFile) {
            return (
                <div className="center">
                    <h4> Choose before Pressing the Import button </h4>{" "}
                </div>
            );
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <h1> Import Configuration </h1>
                <div></div>
                <input style={{ padding: "16px 160px", width:"100%"}} type="file" onChange={this.onFileChange}/>
                <div> </div>
                <button className={styles.uploadButton} onClick={this.onFileUpload}>Import</button>{this.fileData()}
            </div>
        );
    }
}

export default Import;
