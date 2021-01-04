import axios from "axios";

import React, { Component } from "react";
import styles from "./Import.module.css";

class Import extends Component {
    state = {
        selectedFile: null,
    };

    onFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    onFileUpload = () => {
        if (this.state.selectedFile == null) {
            return;
        }
        if (!this.state.selectedFile.type == "json") {
            // TODO IMPLEMENT
        }
        const formData = new FormData();
        formData.append(
            "myFile",
            this.state.selectedFile,
            this.state.selectedFile.name
        );
        console.log(this.state.selectedFile);

        //axios.post("api/uploadfile", formData);     // TODO call php server
    };

    fileData = () => {
        if (!this.state.selectedFile) {
            return (
                <div class="center">
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
                <input style={{ padding: "16px 160px" }} type="file" onChange={this.onFileChange}/>
                <div> </div>
                <button className={styles.uploadButton} onClick={this.onFileUpload}>Import</button>{this.fileData()}
            </div>
        );
    }
}

export default Import;
