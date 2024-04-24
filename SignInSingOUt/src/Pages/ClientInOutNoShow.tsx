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
                    item.signInTime = moment(item.signInTime, "HH:mm").format("HH:mm A");
                    item.signOutTime = moment(item.signOutTime, "HH:mm").format("HH:mm A");
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
                    item.signInTime = moment(item.signInTime, "HH:mm").format("HH:mm A");
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
                            <th style={{ backgroundColor: "lightgreen" }}>Client Name</th>
                            <th style={{ backgroundColor: "lightgreen" }}>Sign In Time</th>
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
                            <th style={{ backgroundColor: "lightpink" }}>Client Name</th>
                            <th style={{ backgroundColor: "lightpink" }}>Signed Out Time</th>
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
                                    {item.signInTime}
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
                            <th style={{ backgroundColor: "lightgrey" }}>Client Name</th>
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
