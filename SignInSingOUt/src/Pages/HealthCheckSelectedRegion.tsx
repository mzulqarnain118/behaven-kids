import React from 'react';
import TimeOutLogo from '../../src/assets/timeout.png';
import Location from '../../src/assets/location.png';
import './CSS/HealthCheck.css'

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {

  return (
    <>
<div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
                    <h4>&#128198; {new Date().toLocaleDateString()}</h4>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={TimeOutLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
                        {/* <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomName}</h4> */}
                    </div>

                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
                    <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>

                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <img src={Location} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
                        {/* <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{roomPositionName}</h4> */}
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >

                <div
                    className="card"
                    style={{
                        width: "750px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <div className="card-body">
                    <h3 style={{textAlign: "center"}}>Health Check</h3>
                        <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}>
                            <div className="card-body"> 
                                <div>
                                    <span>Temperature: <input type='text' style={{width: "100px"}}></input> F</span>
                                    <form>
                                        <div className='grid-container-For-selected'>
                                            <div>
                                                <input type="checkbox" name="Scratch" value="Scratch"/>
                                                <label htmlFor="vehicle1"> Scratch</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="Dizziness" value="Dizziness"/>
                                                <label htmlFor="Dizziness"> Dizziness</label>
                                            </div>
                                            <div>
                                                <input type="checkbox" name="Bruise" value="Bruise"/>
                                                <label htmlFor="Bruise">Bruise</label>
                                            </div>
                                        </div>
                                        <textarea id="w3review" name="w3review" rows={4} cols={88}></textarea>
                                        
                                    </form>
                                </div>
                            </div> 
                        </div>
                    </div>

                </div>
            </div>
    </>
  );
};

export default HealthCheckSelectedRegion;