import React from 'react';
import { Popup } from 'reactjs-popup';
import './PopupCongrats.css';
import 'reactjs-popup/dist/index.css';

interface ModalContentProps {
  close: () => void; // Define the type for the close function
}

const ModalContent: React.FC<ModalContentProps> = ({ close }) => {
  const handleClose = () => {
    console.log('modal closed');
    close();
  };

  return (
    <div className="modal2">
      <div className="header2">Modal Title</div>
      <div className="content2" style={{color: "black"}}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
        Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
        delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
        <br />
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
        commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
        explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
      </div>
      <div className="actions2">
        <button className="button2" onClick={handleClose}>
          Close Modal
        </button>
      </div>
    </div>
  );
};

const CongratulationsPopup: React.FC = () => {
  return (
    <Popup trigger={<button className="button">Open Modal</button>} modal nested>
      <ModalContent close={() => {}} />
    </Popup>
  );
};

export default CongratulationsPopup;
