import React, { useState, useEffect } from "react";
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


interface PopupTimeOutRoomSession {
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<any>>;
}

const PopupTimeOutRoomSession: React.FC<PopupTimeOutRoomSession> = ({ showModal, setShowModal }) => {

    const [selectManualDate, setSelectManualDate] = useState<Dayjs | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didUserCheckAClient, setDidUserCheckAClient] = useState(false);
    const [excelOrPDF, setExcelOrPDF] = useState<string>("");

    if (!open) return null;

    const handleClose = () => {
        setShowModal(false)
    };

    useEffect(() => {

    }, [excelOrPDF]);

    const DownloadPDF = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setIsSubmitting(true);
            setDidUserCheckAClient(true);
            e.preventDefault();
            const token = localStorage.getItem("token");
            const response = await axios.get(
                `${backEndCodeURLLocation}SignIn/ConvertExcelToPDF?getDate=${selectManualDate}&whichFileType=${excelOrPDF}`,
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

            if (excelOrPDF === "Excel") {
                a.download = "converted.xlsx";
            }
            else {
                a.download = "converted.pdf";
            }

            // Append the anchor element to the body and click it
            document.body.appendChild(a);
            a.click();

            // Remove the anchor element after download
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
            setIsSubmitting(false)
            setDidUserCheckAClient(false);
            setShowModal(false);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModal} onHide={handleClose} centered>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginTop: "10px", marginLeft: "10px" }}>
                                <div style={{ textAlign: 'center' }}>
                                    <h4>Do you want to finish this</h4>
                                    <h4>Time Out Room Session.</h4>
                                </div>
                                <div style={{ marginTop: "40px"}}>
                                    <button className="btn btn-success" type="submit" style={{marginTop: "8px", height: "55px", width: "125px", fontSize: "20px" }} disabled={didUserCheckAClient}> {isSubmitting ? "Submitting..." : "Yes"} </button>
                                    <button className="btn btn-danger" type="submit" style={{ marginLeft: "35px", marginTop: "8px", height: "55px", width: "125px", fontSize: "20px" }}> No </button>
                                </div>
                            </div>
                        </div>
                    </BootstrapModal.Body>
                </BootstrapModal>
            </div>

        </>

    );
};

export default PopupTimeOutRoomSession;