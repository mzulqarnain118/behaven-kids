import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowsProp,
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridSlots,
} from "@mui/x-data-grid";
import useStore from "./store/useStore";

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => () => {
    handlePopup(true, "Client Information", "client");
    setRows((oldRows) => [
      ...oldRows,
      { id: 1, name: "", age: "", isNew: true },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [1]: { mode: GridRowModes.Edit, fieldToFocus: "name" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
    </GridToolbarContainer>
  );
}

export default function FullFeaturedCrudGrid() {
  const { formData, handlePopup } = useStore();

  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  React.useEffect(() => {
    setRows((old) => [...old, formData]);
  }, [formData]);
  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    handlePopup(true, "Client Information", "client");

    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => () => {
    setRows(rows.filter((row) => row.id !== id));
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    {
      field: "firstName",
      headerName: "First Name",
      width: 105,
      editable: true,
    },
    { field: "lastName", headerName: "Last Name", width: 105, editable: true },
    {
      field: "gender",
      headerName: "Gender",
      type: "string",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "ssn",
      headerName: "SSN",
      type: "number",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "code",
      headerName: "Code",
      type: "number",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "maritalStatus",
      headerName: "Marital Status",
      type: "string",
      width: 130,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "status",
      headerName: "Active Status",
      type: "string",
      width: 110,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "address1",
      headerName: "Address1",
      type: "string",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "address2",
      headerName: "Address2",
      type: "string",
      width: 100,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "city",
      headerName: "City",
      type: "string",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "state",
      headerName: "State",
      type: "string",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "zipCode",
      headerName: "Zip Code",
      type: "string",
      width: 105,
      align: "left",
      headerAlign: "left",
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 105,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}
