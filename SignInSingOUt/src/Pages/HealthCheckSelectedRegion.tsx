import React, { useState, useEffect } from "react";
import ChildLogo from '../../src/assets/child.png';
import StaffLogo from '../../src/assets/person.png';
import './CSS/HealthCheck.css'
import { backEndCodeURLLocation } from "../config";
import PopupCamera from "../Components/PopupCamera";
import Camera from '../../src/assets/camera.png';
import { jwtDecode } from "jwt-decode";
import { useLocation, useNavigate } from "react-router-dom";
import Select from 'react-select';


interface OptionType {
  label: string;
  value: string;
}

const bodyParts: OptionType[] = [
  { value: 'head', label: 'Head' },
  { value: 'left_shoulder', label: 'Left Shoulder' },
  { value: 'right_shoulder', label: 'Right Shoulder' },
  { value: 'left_arm', label: 'Left Arm' },
  { value: 'right_arm', label: 'Right Arm' },
  { value: 'left_hand', label: 'Left Hand' },
  { value: 'right_hand', label: 'Right Hand' },
  { value: 'left_leg', label: 'Left Leg' },
  { value: 'right_leg', label: 'Right Leg' },
  { value: 'left_foot', label: 'Left Foot' },
  { value: 'right_foot', label: 'Right Foot' },
  { value: 'torso', label: 'Torso' },
  // { value: 'chest', label: 'Chest' },
  // { value: 'stomach', label: 'Stomach' },
];

const frontOrBack: OptionType[] = [
  { value: 'front', label: 'Front' },
  { value: 'back', label: 'Back' },
];

// Define the component
const HealthCheckSelectedRegion: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { preSelectedBodyPartArea, clientID, clientFullName, staffFullName, preSelectedBackOrFront } = location.state || {};



  useEffect(() => {
    if (clientID === undefined) {
      navigate("/cbsAddOrTransferClientsToRooms", { replace: true });
    }
  });

  const [selectedImages, setSelectedImages] = useState<(File | null)[]>([]);
  const [showModel, setShowModel] = useState<boolean>(false);
  const [canStaffSubmit, setCanStaffSubmit] = useState<boolean>(false);
  const [canStaffUseCamera, setCanStaffUseCamera] = useState<boolean>(false);
  const [isBodyPartSelectionAvailable, setIsBodyPartSelectionAvailable] = useState<boolean>(false);
  const [isBodySelectedRegionAvailable, setIsBodySelectedRegionAvailable] = useState<boolean>(true);
  const [isClearButtonVisible, setIsClearButtonVisible] = useState<boolean>(false);
  const [isNonBodyPartSelectionAvailable, setIsNonBodyPartSelectionAvailable] = useState<boolean>(true);
  const [isFrontAndBackDisabled, setIsFrontAndBackDisabled] = useState<boolean>(true);
  const [isTempInputDisabled, setIsTempInputDisabled] = useState<boolean>(true);
  const [clientTemperature, setClientTemperature] = useState<string>();
  const [isOtherForSelectedRegionDisabled, setIsOtherForSelectedRegionDisabled] = useState<boolean>(true);
  const [isOtherForNonBodyPartDisabled, setIsOtherForNonBodyPartDisabled] = useState<boolean>(true);
  const [otherForSelectedRegion, setOtherForSelectedRegion] = useState<string>();
  const [otherForNonBodyPart, setOtherForNonBodyPart] = useState<string>();
  const [description, setDescription] = useState<string>();
  const preSelectedBodyPartOption = bodyParts.find(option => option.value === preSelectedBodyPartArea) || null;
  const preSelectedFrontOrBack = frontOrBack.find(option => option.value === preSelectedBackOrFront) || null;
  const [selectedBodyPart, setSelectedBodyPart] = useState<OptionType | null>(preSelectedBodyPartOption);
  const [selectedFrontOrBack, setSelectedFrontOrBack] = useState<OptionType | null>(preSelectedFrontOrBack);
  const [symptoms, setSymptoms] = useState({
    scratch: false,
    bruise: false,
    rash: false,
    swelling: false,
    drySkin: false,
    lethargic: false,
    nausea: false,
    tattoo: false,
    pourHygiene: false,
    dirtyDiapers: false,
    previousDayClothes: false,
    temp: false,
    otherForSelectedRegion: false,
    otherForNonBodyPart: false,
  });

  useEffect(() => {
    if (isBodyPartSelectionAvailable === true)
    {
      if ((symptoms.scratch || symptoms.bruise || symptoms.rash || symptoms.swelling || symptoms.drySkin || symptoms.otherForSelectedRegion) === true) {
        if (symptoms.otherForSelectedRegion === true)
        {
            setIsOtherForSelectedRegionDisabled(false);
        }
        return;
      } else  {
        if (symptoms.otherForSelectedRegion === false)
          {
              setIsOtherForSelectedRegionDisabled(true);
          }
      }
    }

    if (isNonBodyPartSelectionAvailable === true)
    {
        if ((symptoms.lethargic || symptoms.nausea || symptoms.pourHygiene || symptoms.dirtyDiapers || symptoms.tattoo || symptoms.previousDayClothes || symptoms.temp || symptoms.otherForNonBodyPart) === true) {

          if (symptoms.temp === true)
          {
            setIsTempInputDisabled(false);
          }
          if (symptoms.otherForNonBodyPart === true)
          {
              setIsOtherForNonBodyPartDisabled(false);
          }
         

          setIsBodySelectedRegionAvailable(false);
          setCanStaffSubmit(true);
          setCanStaffUseCamera(true);
        } 
        else if ((symptoms.lethargic && symptoms.nausea && symptoms.pourHygiene && symptoms.dirtyDiapers && symptoms.tattoo && symptoms.previousDayClothes && symptoms.temp && symptoms.otherForNonBodyPart) === false) {
          // setIsBodySelectedRegionAvailable(false);
          // setCanStaffSubmit(true);
          setCanStaffUseCamera(false);
          setCanStaffSubmit(false);
          setIsBodySelectedRegionAvailable(true);
          setIsTempInputDisabled(true);
          
       
        }
        if (symptoms.otherForNonBodyPart === false)
          {
            setIsOtherForNonBodyPartDisabled(true);
          }
    }
  }, [symptoms]);

  useEffect(() => {
    if (isTempInputDisabled === true)
      setClientTemperature("");

    if (isOtherForSelectedRegionDisabled === true)
      setOtherForSelectedRegion("");

    if (isOtherForNonBodyPartDisabled === true)
      setOtherForNonBodyPart("");

  }, [isTempInputDisabled, isOtherForSelectedRegionDisabled, isOtherForNonBodyPartDisabled]);

  useEffect(() => {

    if (preSelectedFrontOrBack !== null)
    {
        setIsFrontAndBackDisabled(false);
    }

    if (selectedBodyPart !== null && selectedFrontOrBack !== null) {
      setIsBodyPartSelectionAvailable(true);
      setIsNonBodyPartSelectionAvailable(false);
      setIsClearButtonVisible(true);
      setCanStaffSubmit(true);
      setCanStaffUseCamera(true);
    }
    else if (selectedBodyPart !== null ) {
      setIsNonBodyPartSelectionAvailable(false);
      setIsClearButtonVisible(true);
      setIsBodyPartSelectionAvailable(false);
      setCanStaffSubmit(false);
      setIsFrontAndBackDisabled(false);
      setSymptoms(prevSymptoms => ({
        ...prevSymptoms,
        scratch: false,
        bruise: false,
        rash: false,
        swelling: false,
        drySkin: false,
        otherForSelectedRegion: false,
        otherForNonBodyPart: false,
      }));
    }
    else {
      setIsNonBodyPartSelectionAvailable(true);
      setIsFrontAndBackDisabled(true);
      
    }


  }, [selectedBodyPart, selectedFrontOrBack]);


  const handleCheckboxChangeForBodyPart = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setSymptoms({
      ...symptoms,
      [name]: checked
    });
  };

  const handleCheckboxChangeForNonBodyPart = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsBodySelectedRegionAvailable(false);
    const { name, checked } = e.target;
    setSymptoms({
      ...symptoms,
      [name]: checked
    });

    if (symptoms.temp === false)
      setIsTempInputDisabled(true);
  };

  const clearSelectedRegion = () => {
    setSymptoms(prevSymptoms => ({
      ...prevSymptoms,
      scratch: false,
      bruise: false,
      rash: false,
      swelling: false,
      drySkin: false,
    }));
    setIsNonBodyPartSelectionAvailable(true);
    setSelectedBodyPart(null);
    setSelectedFrontOrBack(null);
    setIsBodyPartSelectionAvailable(false);
    setIsClearButtonVisible(false);
    setOtherForSelectedRegion("");
  };
  // const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = event.target.files;
  //   if (files && files.length > 0) {
  //     setSelectedImage(files[0]);
  //   }
  // };

  // const videoConstraints = {
  //   facingMode: { exact: "environment" }
  // };

  const uploadImage = () => {

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please Login");
      navigate("/", { replace: true });
      return;
    }
    const decoded = jwtDecode(token);
    const staffID = (decoded as any).StaffID;

    const formData = new FormData();
    if (selectedImages) {
      formData.append('ImageOne', selectedImages[0] || "");
      formData.append('ImageTwo', selectedImages[1] || "");
      formData.append('ImageThree', selectedImages[2] || "");
      formData.append('ImageFour', selectedImages[3] || "");
    }

    if (selectedBodyPart) {
      formData.append('SelectedBodyPart', selectedBodyPart.value);
    }
    if (selectedFrontOrBack) {
      formData.append('FrontOrBack', selectedFrontOrBack.value);
    }

    formData.append('ClientID', clientID);
    formData.append('StaffID', staffID);
    formData.append('Temperature', clientTemperature || "");
    formData.append('ProvidedSymptoms.Scratch', String(symptoms.scratch));
    formData.append('ProvidedSymptoms.Bruise', String(symptoms.bruise));
    formData.append('ProvidedSymptoms.Rash', String(symptoms.rash));
    formData.append('ProvidedSymptoms.Swelling', String(symptoms.swelling));
    formData.append('ProvidedSymptoms.Lethargic', String(symptoms.lethargic));
    formData.append('ProvidedSymptoms.Nausea', String(symptoms.nausea));
    formData.append('ProvidedSymptoms.DrySkin', String(symptoms.drySkin));
    formData.append('ProvidedSymptoms.Tattoo', String(symptoms.tattoo));
    formData.append('ProvidedSymptoms.PourHygiene', String(symptoms.pourHygiene));
    formData.append('ProvidedSymptoms.DirtyDiapers', String(symptoms.dirtyDiapers));
    formData.append('ProvidedSymptoms.PreviousDayClothes', String(symptoms.previousDayClothes));

    formData.append('Other', otherForSelectedRegion || "");
    formData.append('Description', description || "");


    fetch(`${backEndCodeURLLocation}HealthCheck/SubmitClientHealthInfo`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('this error:', error);
      });

    navigate("/cbsAddOrTransferClientsToRooms", { replace: true });
  };

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px" }}>
          <h4>&#128198; {new Date().toLocaleDateString()}</h4>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={ChildLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{clientFullName}</h4>
          </div>

        </div>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", marginTop: "25px", marginLeft: "150px" }}>
          <h4> &#128336; {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>

          <div style={{ display: "flex", flexDirection: "row" }}>
            <img src={StaffLogo} style={{ width: "30px", height: "30px", marginTop: "15px" }} />
            <h4 style={{ marginTop: "15px", marginLeft: "10px" }}>{staffFullName}</h4>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="card"
          style={{
            width: "750px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="card-body">
            {/* <div className="card" style={{ width: "700px", alignItems: "start", minHeight: "150px" }}> */}
            {/* <div className="card-body"> */}


            <div style={{ marginTop: "15px" }}>
              <form>
                <div style={{ opacity: isBodySelectedRegionAvailable === true ? 1 : 0.5, pointerEvents: isBodySelectedRegionAvailable === true ? 'auto' : 'none' }}>
                  <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <label style={{ marginRight: "15px", fontSize: "25px" }}>Selected Region</label>
                    <Select
                      options={bodyParts}
                      onChange={(selectedOption) => setSelectedBodyPart(selectedOption)}
                      placeholder="Select a body part"
                      value={selectedBodyPart}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: 190, // Set the desired width
                        }),
                        control: (provided) => ({
                          ...provided,
                          width: 190, // Set the desired width
                        }),
                      }}
                    />
                    <span style={{ marginLeft: "15px" }}> </span>
                    <Select
                      options={frontOrBack}
                      onChange={(selectedOption) => setSelectedFrontOrBack(selectedOption)}
                      placeholder="Front or Back"
                      value={selectedFrontOrBack}
                      isDisabled={isFrontAndBackDisabled}
                      styles={{
                        container: (provided) => ({
                          ...provided,
                          width: 160, // Set the desired width
                        }),
                        control: (provided) => ({
                          ...provided,
                          width: 160, // Set the desired width
                        }),
                      }}
                    />
                    <button onClick={() => clearSelectedRegion()} type="button" className="btn btn-danger" style={{width: "100px", height: "40px", fontSize: "18px", marginLeft: "20px", visibility: isClearButtonVisible === true ? "visible" : "hidden"}}> Clear</button>
                  </div>
                  <div className='grid-container-For-selected' style={{ marginTop: "20px", opacity: isBodyPartSelectionAvailable === true ? 1 : 0.2, pointerEvents: isBodyPartSelectionAvailable === true ? 'auto' : 'none' }} >
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="scratch" type="checkbox" name="scratch" checked={symptoms.scratch} onChange={handleCheckboxChangeForBodyPart} className="checkBoxSize" />
                      <label htmlFor="scratch" style={{ marginLeft: "15px" }}> Scratch</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="bruise" type="checkbox" name="bruise" checked={symptoms.bruise} onChange={handleCheckboxChangeForBodyPart} className="checkBoxSize" />
                      <label htmlFor="bruise" style={{ marginLeft: "15px" }}>Bruise</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="rash" type="checkbox" name="rash" checked={symptoms.rash} onChange={handleCheckboxChangeForBodyPart} className="checkBoxSize" />
                      <label htmlFor="rash" style={{ marginLeft: "15px" }}>Rash</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="swelling" type="checkbox" name="swelling" checked={symptoms.swelling} onChange={handleCheckboxChangeForBodyPart} className="checkBoxSize" />
                      <label htmlFor="swelling" style={{ marginLeft: "15px" }}>Swelling</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="drySkin" type="checkbox" name="drySkin" checked={symptoms.drySkin} onChange={handleCheckboxChangeForBodyPart} className="checkBoxSize" />
                      <label htmlFor="drySkin" style={{ marginLeft: "15px" }}>Dry Skin</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="otherForSelectedRegion" type="checkbox" name="otherForSelectedRegion" onChange={handleCheckboxChangeForBodyPart} className="checkBoxSize" checked={symptoms.otherForSelectedRegion} />
                      <label htmlFor="otherForSelectedRegion" style={{ marginLeft: "15px" }}>Other</label>
                      <input type="text" style={{ width: "150px", marginLeft: "20px" }} onChange={(event) => setOtherForSelectedRegion(event.target.value)} value={otherForSelectedRegion} disabled={isOtherForSelectedRegionDisabled}></input>
                    </div>
                  </div>
                </div>

                <hr style={{ marginTop: "35px" }} />
                <div style={{ opacity: isNonBodyPartSelectionAvailable === true ? 1 : 0.5, pointerEvents: isNonBodyPartSelectionAvailable === true ? 'auto' : 'none' }} >

                  <div className='grid-container-For-selected' style={{ marginTop: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="lethargic" type="checkbox" name="lethargic" checked={symptoms.lethargic} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <label htmlFor="lethargic" style={{ marginLeft: "15px" }}> Lethargic</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="nausea" type="checkbox" name="nausea" checked={symptoms.nausea} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <label htmlFor="nausea" style={{ marginLeft: "15px" }}>Nausea</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="pourHygiene" type="checkbox" name="pourHygiene" checked={symptoms.pourHygiene} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <label htmlFor="pourHygiene" style={{ marginLeft: "15px" }}>Poor Hygiene</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="dirtyDiapers" type="checkbox" name="dirtyDiapers" checked={symptoms.dirtyDiapers} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <label htmlFor="dirtyDiapers" style={{ marginLeft: "15px" }}>Dirty Diaper</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="tattoo" type="checkbox" name="tattoo" checked={symptoms.tattoo} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <label htmlFor="tattoo" style={{ marginLeft: "15px" }}>Tattoo</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="previousDayClothes" type="checkbox" name="previousDayClothes" checked={symptoms.previousDayClothes} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <label htmlFor="previousDayClothes" style={{ marginLeft: "15px" }}>Previous Day Clothes</label>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="temp" type="checkbox" name="temp" checked={symptoms.temp} onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" />
                      <span style={{ marginLeft: "15px" }}>Temp:
                        <input onChange={(event) => setClientTemperature(event.target.value)} value={clientTemperature} type='number' style={{ width: "75px", height: "35px", textAlign: "center", marginLeft: "10px" }} disabled={isTempInputDisabled}></input>
                        <span style={{ marginLeft: "10px" }}>&#8457;</span>
                      </span>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                      <input id="otherForNonBodyPart" type="checkbox" name="otherForNonBodyPart" onChange={handleCheckboxChangeForNonBodyPart} className="checkBoxSize" checked={symptoms.otherForNonBodyPart} />
                      <label htmlFor="otherForNonBodyPart" style={{ marginLeft: "15px" }}>Other</label>
                      <input type="text" style={{ width: "150px", marginLeft: "20px" }} onChange={(event) => setOtherForNonBodyPart(event.target.value)} value={otherForNonBodyPart} disabled={isOtherForNonBodyPartDisabled}></input>
                    </div>
                  </div>
                </div>
                <hr style={{ marginTop: "35px" }} />
                <textarea placeholder="Description" id="w3review" name="w3review" style={{ width: "640px", height: "100px", marginTop: "25px", fontSize: "20px" }} onChange={(event) => setDescription(event.target.value)}></textarea>


                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", marginTop: "15px" }}>
                  <button
                    type="button"
                    onClick={() => setShowModel(true)}
                    style={{ borderRadius: "25px", opacity: canStaffUseCamera === true ? "1" : ".2" }}
                  >
                    <img src={Camera}></img>
                  </button>
                  {selectedImages.map((file, index) => (
                    <div key={index} style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                      {file && <img src={URL.createObjectURL(file)} alt={`Selected ${index}`} style={{ border: "1px", width: "105px", height: "105px", borderRadius: "25px", marginLeft: "25px" }} />}
                    </div>
                  ))}
                </div>
                <div style={{ width: "100%", textAlign: "center", marginTop: "25px" }} >
                  <button disabled={!canStaffSubmit} style={{ width: "150px", height: "60px", fontSize: "25px" }} className="btn btn-primary" type="button" onClick={uploadImage}>Submit</button>
                </div>

              </form>
            </div>
            {/* </div> */}
            {/* </div> */}

          </div>

        </div>

      </div>
      <PopupCamera showModel={showModel} setShowModel={setShowModel} selectedImage={selectedImages} setSelectedImages={setSelectedImages} />
    </>
  );
};

export default HealthCheckSelectedRegion;