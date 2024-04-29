import { useState, useEffect } from "react";
import "./CSS/AddParentChildInfo.css";
import "react-international-phone/style.css";
import { backEndCodeURLLocation } from "../config";
import moment from "moment";
import dayjs from 'dayjs';

interface ClientSignInInfo {
    clientID: number;
    firstName: string;
    lastName: string;
    signInTime: string;
    signOutTime: string;
}

const ClientInOutNoShow: React.FC = () => {

    const [clientsWhoAreSignedIn, setClientsWhoAreSignedIn] = useState<ClientSignInInfo[]>([]);
    const [clientsWhoAreSignedOut, setClientsWhoAreSignedOut] = useState<ClientSignInInfo[]>([]);
    const [clientsWhoAreNotSignInAndSignOut, setClientsWhoAreNotSignInAndSignOut] = useState<ClientSignInInfo[]>([]);

    const today = dayjs();

    // Format the date as you need
    const formattedDate = today.format('MM-DD-YYYY');

    useEffect(() => {
        fetchCurrentClientsThatAreSignedIn();
        fetchCurrentClientsThatAreSignedOut();
        //fetchCurrentClientsWhoAreNotSignInAndSignOut();
    }, []);

    const fetchCurrentClientsThatAreSignedIn = async () => {
        try {
            const response = await fetch(
                `${backEndCodeURLLocation}Client/GetCurrentSignInClients`
            );
            if (response.ok) {
                const data = await response.json();
                
                const signedOutClients: ClientSignInInfo[] = [];
                const signedInClients: ClientSignInInfo[] = [];

                data.forEach((item: ClientSignInInfo) => {
                    item.signInTime = moment(item.signInTime, "HH:mm").format("hh:mm A");
                    item.signOutTime = moment(item.signOutTime, "HH:mm").format("hh:mm A");
                    if (item.signOutTime !== "Invalid date") {
                        console.log("out ", item);
                        signedOutClients.push(item);
                    } else {
                        console.log("in ", item);
                        signedInClients.push(item);
                    }
                });

                setClientsWhoAreSignedOut(signedOutClients);
                setClientsWhoAreSignedIn(signedInClients);
            } else {
                console.error("Error fetching schedule:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    const fetchCurrentClientsThatAreSignedOut = async () => {
        try {
            const response = await fetch(
                `${backEndCodeURLLocation}Client/GetClientsWhoAreNotSignInOrSignOut`
            );
            if (response.ok) {
                const data = await response.json();
                data.forEach((item: ClientSignInInfo) => {
                    item.signInTime = moment(item.signInTime, "HH:mm").format("hh:mm A");
                });
                setClientsWhoAreNotSignInAndSignOut(data);
                console.log("data", data);
            } else {
                console.error("Error fetching schedule:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching schedule:", error);
        }
    };

    return (
        <>
            <div className="time-schedule-editor">
                <br />
                <div style={{ textAlign: "center" }}>
                    <h2>{formattedDate}</h2>
                </div>

                <h2>Signed In Clients</h2>
                <table >
                    <thead >
                        <tr >
                            {/* <th>ID</th> */}
                            <th style={{ backgroundColor: "lightgreen", width: "550px"}}>Client Name</th>
                            <th style={{ backgroundColor: "lightgreen", width: "450px" }}>Sign In Time</th>
                            <th style={{ backgroundColor: "lightgreen" }}>Total: {clientsWhoAreSignedIn.length.toString()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientsWhoAreSignedIn.map((item) => (
                            <tr key={item.clientID}>
                                {/* <td>{item.id}</td> */}
                                <td style={{ width: "100px" }}>
                                    {item.firstName} {item.lastName}
                                </td>

                                <td style={{ width: "100px" }}>
                                    {item.signInTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="time-schedule-editor" style={{ marginTop: "50px" }}>
                <h2> Signed Out Clients</h2>
                <table>
                    <thead >
                        <tr style={{ backgroundColor: "lightgreen" }}>
                            {/* <th>ID</th> */}
                            <th style={{ backgroundColor: "lightpink", width: "550px"}}>Client Name</th>
                            <th style={{ backgroundColor: "lightpink", width: "450px" }}>Sign Out Time</th>
                            <th style={{ backgroundColor: "lightpink" }}>Total: {clientsWhoAreSignedOut.length.toString()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientsWhoAreSignedOut.map((item) => (
                            <tr key={item.clientID}>
                                {/* <td>{item.id}</td> */}
                                <td style={{ width: "100px" }}>
                                    {item.firstName} {item.lastName}
                                </td>

                                <td style={{ width: "100px" }}>
                                    {item.signOutTime}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="time-schedule-editor" style={{ marginTop: "50px" }}>
                <h2> Absent Clients</h2>
                <table>
                    <thead >
                        <tr style={{ backgroundColor: "lightgreen" }}>
                            {/* <th>ID</th> */}
                            <th style={{ backgroundColor: "lightgrey", width: "1000px" }}>Client Name</th>
                            <th style={{ backgroundColor: "lightgrey" }}>Total: {clientsWhoAreNotSignInAndSignOut.length.toString()}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientsWhoAreNotSignInAndSignOut.map((item) => (
                            <tr key={item.clientID}>
                                {/* <td>{item.id}</td> */}
                                <td style={{ width: "100px" }}>
                                    {item.firstName} {item.lastName}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ClientInOutNoShow;
