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
import { jwtDecode } from "jwt-decode";


interface PopupTemporaryPin {
    showModel: boolean;
    setShowModel: React.Dispatch<React.SetStateAction<any>>;
}

interface DecodedToken {
    StaffID: string;
    LocationID: string;
  }

const PopupDatePicker: React.FC<PopupTemporaryPin> = ({ showModel, setShowModel }) => {

    const [selectManualDate, setSelectManualDate] = useState<Dayjs | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didUserCheckAClient, setDidUserCheckAClient] = useState(false);
    const [excelOrPDF, setExcelOrPDF] = useState<string>("");
    const [sdpAbaorBoth, setSdpAbaorBoth] = useState<string>("");

    if (!open) return null;

    const handleClose = () => {
        setShowModel(false)
    };

    useEffect(() => {

    }, [excelOrPDF]);

    const DownloadPDF = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            setIsSubmitting(true);
            setDidUserCheckAClient(true);
            e.preventDefault();
            const token = localStorage.getItem("token");
            if (!token) {
                return;
            }
            
            const decoded = jwtDecode(token) as DecodedToken;
            const getLocationID = decoded.LocationID;
            const response = await axios.get(
                `${backEndCodeURLLocation}SignIn/ConvertExcelToPDF?getDate=${selectManualDate}&locationID=${getLocationID}&whichFileType=${excelOrPDF}&whichProgramType=${sdpAbaorBoth}`,
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

            if (excelOrPDF === "Excel")
            {
                a.download = "converted.xlsx";
            }
            else
            {
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
            setShowModel(false);
        } catch (error) {
            console.error("Error downloading PDF:", error);
        }
    };

    return (
        <>
            <div>
                <BootstrapModal dialogClassName="custom-modal" show={showModel} onHide={handleClose} centered size="lg">
                    <BootstrapModal.Header closeButton>
                        <BootstrapModal.Title style={{ fontSize: "30px" }}>Choose A Date </BootstrapModal.Title>
                    </BootstrapModal.Header>
                    <BootstrapModal.Body className="d-flex justify-content-center align-items-center">
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: "23px" }}>
                            <form onSubmit={DownloadPDF} style={{ display: 'flex' }}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']} >
                                        <DatePicker value={selectManualDate} onChange={(newValue) => setSelectManualDate(newValue)} slotProps={{ textField: { required: true, size: 'medium' } }} />
                                    </DemoContainer>
                                </LocalizationProvider>
                                <div style={{ marginTop: "10px", marginLeft: "40px" }}>
                                    <fieldset >
                                        <div>
                                            <input type="radio" id="PDF" name="format" value="PDF" required onClick={() => setExcelOrPDF(_prev => _prev = "PDF")}/>
                                            <label htmlFor="PDF" style={{ marginLeft: "3px" }} >PDF</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="Excel" name="format" value="Excel" required onClick={() => setExcelOrPDF(_prev => _prev ="Excel")}/>
                                            <label htmlFor="Excel" style={{ marginLeft: "3px" }} >Excel</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <div style={{ marginTop: "10px", marginLeft: "40px" }}>
                                    <fieldset >
                                        <div>
                                            <input type="radio" id="SDP" name="programType" value="SDP" required onClick={() => setSdpAbaorBoth(_prev => _prev = "SDP")}/>
                                            <label htmlFor="SDP" style={{ marginLeft: "3px" }} >SDP</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="ABA" name="programType" value="ABA" required onClick={() => setSdpAbaorBoth(_prev => _prev ="ABA")}/>
                                            <label htmlFor="ABA" style={{ marginLeft: "3px" }} >ABA</label>
                                        </div>
                                        <div>
                                            <input type="radio" id="Both" name="programType" value="Both" required onClick={() => setSdpAbaorBoth(_prev => _prev ="Both")}/>
                                            <label htmlFor="Both" style={{ marginLeft: "3px" }} >Both</label>
                                        </div>
                                    </fieldset>
                                </div>
                                <button className="btn btn-primary" type="submit" style={{ marginLeft: "40px", marginTop: "8px", height: "75px", width: "140px", fontSize: "30px" }} disabled={didUserCheckAClient}> {isSubmitting ? "Submitting..." : "Submit"} </button>
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