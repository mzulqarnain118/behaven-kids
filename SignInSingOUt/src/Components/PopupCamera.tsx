import React, { useRef } from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import Webcam from "react-webcam";
import Camera from '../../src/assets/camera.png'


interface PopupTemporaryPin {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
    selectedImage: any | null;
    setSelectedImages: React.Dispatch<React.SetStateAction<any>>;
}

const PopupDatePicker: React.FC<PopupTemporaryPin> = ({ showModel, setShowModel, selectedImage, setSelectedImages }) => {

    if (!open) return null;

    const handleClose = () => {
        setShowModel(false)
    };

    const webcamRef = useRef<Webcam>(null);
    // const [cameraActive, setCameraActive] = useState<boolean>(false);
    const handleCapture = () => {
        if (webcamRef.current) {
             console.log(selectedImage);
            const imageSrc = webcamRef.current.getScreenshot();
            if (imageSrc) {
                fetch(imageSrc)
                    .then((res) => res.blob())
                    .then((blob) => {
                        const file = new File([blob], "photo.png", { type: "image/png" });
                        // setSelectedImage(file);
                        setSelectedImages((prevImages : any) => {
                            const newImages = [...prevImages, file];
                            if (newImages.length > 4) {
                              newImages.shift(); // Remove the first item if there are more than 5 images
                            }
                            return newImages;
                          });
                    })
                    .catch((error) => console.error("Error converting image:", error));
            }
        }
    };

    // const videoConstraints = {
    //     width: 1280, // You can set your preferred dimensions
    //     height: 720,
    //     facingMode: { exact: "environment" }
    // };


    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div className="form-group parentGridContaineritem" style={{ textAlign: "center" }}>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    // videoConstraints={videoConstraints}
                                    style={{ width: "100%", height: "500px" }}
                                />
                                <div style={{ width: "75px", height: "75px", backgroundColor: "DodgerBlue", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, margin: "0 auto" }}>
                                    <button
                                        type="button"
                                        onClick={handleCapture}
                                        style={{ width: "65px", height: "65px", borderRadius: "50%", margin: 0, border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}>

                                        <img src={Camera} style={{ width: "40px", height: "40px" }}></img>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </BootstrapModal.Body>
                    <BootstrapModal.Footer>
                        <Button variant="primary" onClick={handleClose} className="btn btn-danger">
                            Close
                        </Button>
                    </BootstrapModal.Footer>
                </BootstrapModal>
            </div>

        </>

    );
};

export default PopupDatePicker;