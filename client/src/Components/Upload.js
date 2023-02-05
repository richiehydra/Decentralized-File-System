import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import "./Upload.css"
function Upload({ State, address }) {


    const [file, setFile] = useState(null);
    const [filename, setFilename] = useState("No Image Detected")

    //Upload Image onto Pinata 
    const handleSubmitButton = async (e) => {
        e.preventDefault();
        if (file) {
            try {

                const Dataform = new FormData();
                Dataform.append("file", file);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: Dataform,
                    headers: {
                        pinata_api_key:
                            " b84fea9643cdf1f60e55",
                        pinata_secret_api_key: "622a8c5a847bcfc0955fa738fc14bee8076abb54ba50dcc477f3ca7abfec2726",
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                const signer = State.contract.connect(State.provider.getSigner());
                await signer.add(address, ImgHash);//Calling Contract Add Function
                 
                alert("Succesfully Uploaded");
                setFilename("No Image Detected");
                setFile(null);
            }
            catch (err) {
                console.log(err);
            }
        }


    }

    //get details about choose File
    const RetrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
          setFile(e.target.files[0]);
        };
       setFilename(e.target.files[0].name);
        e.preventDefault();
      };


    return (
        <div className='top'>
            <form className='form' onSubmit={handleSubmitButton}>
                <label htmlFor='file-upload' className='choose'>
                    Choose Image
                </label>
                <input type="file" id="file-upload" name='data' onChange={RetrieveFile}></input>
                <span className='textArea'>Image:{filename}</span>
                <button type='submit' className='upload' disabled={!file}>Upload Image</button>
            </form>
        </div>
    )
}

export default Upload