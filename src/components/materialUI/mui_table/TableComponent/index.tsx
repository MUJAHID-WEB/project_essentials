"use client";

import * as React from "react";
import { useState } from "react";
import "@/styles/globals.css";
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
} from "@mui/x-data-grid";
// import ArchiDropDownMenu from "@/components/base/ArchiDropDownMenu";

let serialNumber = 1;
const generateId = () => {
  return serialNumber++;
};

const initialRows: GridRowsProp = [
  {
    id: generateId(),
    project: "Project 1",
    total: { total: 100, paid: 90, payable: 0, due: 10 },
    basePrice: { total: 100, paid: 90, payable: 0, due: 10 },
    extraWork: { total: 100, paid: 90, payable: 0, due: 10 },
    inflation: { total: 100, paid: 90, payable: 0, due: 10 },
    serviceCharges: { total: 100, paid: 90, payable: 0, due: 10 },
  },
  {
    id: generateId(),
    project: "Project 2",
    total: { total: 100, paid: 90, payable: 0, due: 10 },
    basePrice: { total: 100, paid: 90, payable: 0, due: 10 },
    extraWork: { total: 100, paid: 90, payable: 0, due: 10 },
    inflation: { total: 100, paid: 90, payable: 0, due: 10 },
    serviceCharges: { total: 100, paid: 90, payable: 0, due: 10 },
  },
  {
    id: generateId(),
    project: "Project 3",
    total: { total: 100, paid: 90, payable: 0, due: 10 },
    basePrice: { total: 100, paid: 90, payable: 0, due: 10 },
    extraWork: { total: 100, paid: 90, payable: 0, due: 10 },
    inflation: { total: 100, paid: 90, payable: 0, due: 10 },
    serviceCharges: { total: 100, paid: 90, payable: 0, due: 10 },
  },
  {
    id: generateId(),
    project: "Project 4",
    total: { total: 100, paid: 90, payable: 0, due: 10 },
    basePrice: { total: 100, paid: 90, payable: 0, due: 10 },
    extraWork: { total: 100, paid: 90, payable: 0, due: 10 },
    inflation: { total: 100, paid: 90, payable: 0, due: 10 },
    serviceCharges: { total: 100, paid: 90, payable: 0, due: 10 },
  },
];

interface EditToolbarProps {
  setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = generateId();
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        project: "",
        total: { total: 0, paid: 0, payable: 0, due: 0 },
        basePrice: { total: 0, paid: 0, payable: 0, due: 0 },
        extraWork: { total: 0, paid: 0, payable: 0, due: 0 },
        inflation: { total: 0, paid: 0, payable: 0, due: 0 },
        serviceCharges: { total: 0, paid: 0, payable: 0, due: 0 },
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "project" },
    }));
  };

  const [dropDownLineChartFilter, setDropDownLineChartFilter] =
    useState("This Week");

  return (
    <div className="flex flex-row justify-between m-3">
      <GridToolbarContainer>
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
          Add Receivable
        </Button>
      </GridToolbarContainer>
      <div>
        {/* <ArchiDropDownMenu
          label={dropDownLineChartFilter}
          onChangeFilter={(value) => setDropDownLineChartFilter(value)}
          dropDownItems={[
            { label: "This Week" },
            { label: "This Month" },
            { label: "Today" },
          ]}
        /> */}
      </div>
    </div>
  );
}

export default function TableComponent() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>(
    {}
  );

  const handleRowEditStop: GridEventListener<"rowEditStop"> = (
    params,
    event
  ) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
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
    { field: "id", headerName: "No.", width: 50 },
    { field: "project", headerName: "Project", width: 180, editable: true },
    {
      field: "total",
      // headerName: "Total",
      renderHeader: () => (
        <div className="flex flex-col items-center">
            <div className="text-sm font-bold">Total</div>
          <div className="text-sm">Total / Paid / Payable / Due</div>
        </div>
      ),
      width: 220,
      cellClassName: "h-5",
      valueGetter: (params) => {
        const { total, paid, payable, due } = params.value;
        return `${total} / ${paid} / ${payable} / ${due}`;
      },
      editable: true,
    },
    {
      field: "basePrice",
      //headerName: "Base Price",
      renderHeader: () => (
        <div className="flex flex-col items-center">
            <div className="text-sm font-bold">Base Price</div>
          <div className="text-sm">Total / Paid / Payable / Due</div>
        </div>
      ),
      width: 220,
      valueGetter: (params) => {
        const { total, paid, payable, due } = params.value;
        return `${total} / ${paid} / ${payable} / ${due}`;
      },
      editable: true,
    },
    {
      field: "extraWork",
     // headerName: "Extra Work",
      renderHeader: () => (
        <div className="flex flex-col items-center">
            <div className="text-sm font-bold">Extra Work</div>
          <div className="text-sm">Total / Paid / Payable / Due</div>
        </div>
      ),
      
      width: 220,
      valueGetter: (params) => {
        const { total, paid, payable, due } = params.value;
        return `${total} / ${paid} / ${payable} / ${due}`;
      },
      editable: true,
    },
    {
      field: "inflation",
    //  headerName: "Inflation",
      renderHeader: () => (
        <div className="flex flex-col items-center">
            <div className="text-sm font-bold">Inflation</div>
          <div className="text-sm">Total / Paid / Payable / Due</div>
        </div>
      ),
      width: 220,
      valueGetter: (params) => {
        const { total, paid, payable, due } = params.value;
        return `${total} / ${paid} / ${payable} / ${due}`;
      },
      editable: true,
    },
    {
      field: "serviceCharges",
    //  headerName: "Service Charges",
      renderHeader: () => (
        <div className="flex flex-col justify-center items-center">
            <div className="text-sm font-bold">Service Charges</div>
          <div className="text-sm">Total / Paid / Payable / Due</div>
        </div>
      ),
      width: 220,
      valueGetter: (params) => {
        const { total, paid, payable, due } = params.value;
        return `${total} / ${paid} / ${payable} / ${due}`;
      },
      editable: true,
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              key="save"
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              key="cancel"
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
            key="edit"
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            key="delete"
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
        height: 'auto',
        backgroundColor: "white",
        borderRadius: 2,
        padding: 3,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
     
        <div className="bg-white shadow">
          <DataGrid
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={handleRowModesModelChange}
            onRowEditStop={handleRowEditStop}
            processRowUpdate={processRowUpdate}
            rowHeight={60}
            slots={{
              toolbar: EditToolbar,
            }}
            slotProps={{
              toolbar: { setRows, setRowModesModel },
            }}
          />
        </div>
 
    </Box>
  );
}
