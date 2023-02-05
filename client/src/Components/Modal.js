
import "./Modal.css";
const Modal = ({ setmodalOpen, State, address }) => {

  //Sharing the Image with Others
  const sharing = async () => {
    const gotaddress = document.querySelector(".address").value;
    console.log("hii");
    console.log(address)
    await State.contract.connect(State.signer).allow(gotaddress);
    console.log("hii");
    setmodalOpen(false);
  };
 
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          
          <div className="footer">
            <button
              onClick={() => {
                setmodalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Modal;