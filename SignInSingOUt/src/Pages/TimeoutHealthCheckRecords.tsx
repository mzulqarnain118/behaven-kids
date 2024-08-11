import React, { useState, useEffect } from "react";
import { backEndCodeURLLocation } from "../config";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Dayjs } from 'dayjs';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

interface SdPClientIdAndFullName {
  clientID: number;
  clientFullName: string;
}

const TimeoutHealthCheckRecords: React.FC = () => {
  const [selectedClients, setSelectedClients] = useState<number[]>([]);
  const [clientInfo, setClientInfo] = useState<SdPClientIdAndFullName[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [selectFromDate, setSelectFromDate] = useState<Dayjs | null>(null);
  const [selectToDate, setSelectToDate] = useState<Dayjs | null>(null);

  useEffect(() => {
    const getAllClients = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found in localStorage");
        }

        const url = `${backEndCodeURLLocation}Client/GetSDPClientInformation?locationID=${"OHCU"}`;

        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch data. Response status: ${response.status}`
          );
        }

        const data = await response.json();

        setClientInfo(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getAllClients();
  }, []);

  const handleChange = (event: SelectChangeEvent<number[]>) => {
    const {
      target: { value },
    } = event;

    if (typeof value === 'string') {
      const newValue = value.split(',').map(Number);
      setSelectedClients(newValue);
      setSelectAll(newValue.length === clientInfo.length);
    } else {
      if (value.includes(-1)) {
        if (selectAll) {
          setSelectedClients([]);
          setSelectAll(false);
        } else {
          setSelectedClients(clientInfo.map(client => client.clientID));
          setSelectAll(true);
        }
      } else {
        setSelectedClients(value);
        setSelectAll(value.length === clientInfo.length);
      }
    }
  };

  const handleSubmit = () => {
    if (selectedClients.length === 0) {
      // setError(true);
    } else {
      // setError(false);
      // Submit the form data
      console.log("Selected Clients:", selectedClients);
      console.log("From Date:", selectFromDate);
      console.log("To Date:", selectToDate);
    }
  };

  return (
    <>
      <div>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-checkbox-label" sx={{ fontSize: '1.25rem' }}>Names</InputLabel>
          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={selectedClients}
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => {
              return clientInfo
                .filter(client => selected.includes(client.clientID))
                .map(client => client.clientFullName)
                .join(', ');
            }}
            MenuProps={MenuProps}
          >
            <MenuItem value={-1}>
              <Checkbox checked={selectAll} />
              <ListItemText primary="All" />
            </MenuItem>
            {clientInfo.map((client) => (
              <MenuItem key={client.clientID} value={client.clientID}>
                <Checkbox checked={selectedClients.includes(client.clientID)} />
                <ListItemText primary={client.clientFullName} />
              </MenuItem>
            ))}
          </Select>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="From Date" value={selectFromDate} onChange={(newValue) => setSelectFromDate(newValue)} />
            <DatePicker label="To Date" value={selectToDate} onChange={(newValue) => setSelectToDate(newValue)} />
          </LocalizationProvider>
          <Button variant="contained" size="large" onClick={handleSubmit}>
            Submit
          </Button>
        </FormControl>
      </div>
    </>
  );
};

export default TimeoutHealthCheckRecords;
