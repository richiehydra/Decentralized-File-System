import { useState } from "react";
import "./Display.css";
const Display = ({ State, address }) => {
  const [data, setData] = useState("");


  //get data from input check if other address/own address than call contract function display() to display the assets
  const getdata = async () => {
    let dataArray;
    const Otheraddress = document.querySelector(".address").value;
    console.log(Otheraddress)
    try {
      if (Otheraddress) {
        console.log(Otheraddress)
        dataArray = await State.contract.connect(address).display(Otheraddress);
        console.log(dataArray);
      } else {
        console.log(address)
        dataArray = await State.contract.connect(address).display(address);
      }
    } catch (e) {
      alert("You don't have access");
    }
    const isEmpty = Object.keys(dataArray).length === 0;

    if (!isEmpty) {
      const str = dataArray.toString();
      const str_array = str.split(",");
      // console.log(str);
      // console.log(str_array);
      const images = str_array.map((item, i) => {
        return (
          <a href={item} key={i} target="_blank">
            <img
              key={i}
              src={`https://gateway.pinata.cloud/ipfs/${item.substring(6)}`}
              alt="new"
              className="image-list"
            ></img>
          </a>
        );
      });
      setData(images);
    } else {
      alert("No image to display");
    }
  };



  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getdata}>
        Get Data
      </button>
    </>
  );
};
export default Display;