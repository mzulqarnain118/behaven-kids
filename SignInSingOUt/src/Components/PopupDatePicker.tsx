import React, { useState } from "react";
import "./animation.scss";
import Button from "react-bootstrap/Button";
import BootstrapModal from "react-bootstrap/Modal";
import { backEndCodeURLLocation } from "../config";
import axios from "axios";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';


interface PopupTemporaryPin {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
}

const PopupDatePicker: React.FC<PopupTemporaryPin> = ({ showModel, setShowModel }) => {

    const [selectManualSignInTime, setSelectManualSignInTime] = useState<Dayjs | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didUserCheckAClient, setDidUserCheckAClient] = useState(false);

    if (!open) return null;

    const handleClose = () => {
        setShowModel(false)
    };

    const DownloadPDF = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setIsSubmitting(true);
            setDidUserCheckAClient(true);
            e.preventDefault();
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${backEndCodeURLLocation}SignIn/ConvertExcelToPDF?getDate=${selectManualSignInTime}`,
                {
                    responseType: "blob", // Specify response type as blob
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Create a temporary URL for the blob
            const url = window.URL.createObjectURL(new Blob([response.data]));

            // Create an anchor element to trigger the download
            const a = document.createElement("a");
            a.href = url;
            a.download = "converted.pdf";

            // Append the anchor element to the body and click it
            document.body.appendChild(a);
            a.click();

            // Remove the anchor element after download
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setIsSubmitting(false)
            setDidUserCheckAClient(false);
            setShowModel(false);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered>
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title style={{ fontSize: "30px" }}>Choose A Date </BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <form onSubmit={DownloadPDF} style={{ display: 'flex' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker  value={selectManualSignInTime} onChange={(newValue) => setSelectManualSignInTime(newValue)} slotProps={{textField: {required: true}}}/>
                                    </DemoContainer>
                                </LocalizationProvider>
                                <button className="btn btn-primary" type="submit" style={{marginLeft: "15px", marginTop: "8px", height: "55px", width: "125px" }} disabled={didUserCheckAClient}> {isSubmitting ? "Submitting..." : "Submit"} </button>
                            </form>
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