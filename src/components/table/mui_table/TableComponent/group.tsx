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
  DataGridPro,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowId,
  GridRowModel,
  GridRowEditStopReasons,
  GridColumnGroup,
  GridEventListener,
} from "@mui/x-data-grid-pro";
// import ArchiDropDownMenu from "@/components/base/ArchiDropDownMenu";

let serialNumber = 1;
const generateId = () => {
  return serialNumber++;
};

const initialRows: GridRowsProp = [
  {
    id: generateId(),
    project: "Project 1",
    ttotal: 100,
    tpaid: 90,
    tpayable: 0,
    tdue: 10,
    bptotal: 100,
    bppaid: 90,
    bppayable: 0,
    bpdue: 10,
    ewtotal: 100,
    ewpaid: 90,
    ewpayable: 0,
    ewdue: 10,
    itotal: 100,
    ipaid: 90,
    ipayable: 0,
    idue: 10,
    sctotal: 100,
    scpaid: 90,
    scpayable: 0,
    scdue: 10,
  },
  {
    id: generateId(),
    project: "Project 2",
    ttotal: 100,
    tpaid: 90,
    tpayable: 0,
    tdue: 10,
    bptotal: 100,
    bppaid: 90,
    bppayable: 0,
    bpdue: 10,
    ewtotal: 100,
    ewpaid: 90,
    ewpayable: 0,
    ewdue: 10,
    itotal: 100,
    ipaid: 90,
    ipayable: 0,
    idue: 10,
    sctotal: 100,
    scpaid: 90,
    scpayable: 0,
    scdue: 10,
  },
  {
    id: generateId(),
    project: "Project 3",
    ttotal: 100,
    tpaid: 90,
    tpayable: 0,
    tdue: 10,
    bptotal: 100,
    bppaid: 90,
    bppayable: 0,
    bpdue: 10,
    ewtotal: 100,
    ewpaid: 90,
    ewpayable: 0,
    ewdue: 10,
    itotal: 100,
    ipaid: 90,
    ipayable: 0,
    idue: 10,
    sctotal: 100,
    scpaid: 90,
    scpayable: 0,
    scdue: 10,
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
        total: { ttotal: 0, tpaid: 0, tpayable: 0, tdue: 0 },
        basePrice: { bptotal: 0, bppaid: 0, bppayable: 0, bpdue: 0 },
        extraWork: { ewtotal: 0, ewpaid: 0, ewpayable: 0, ewdue: 0 },
        inflation: { itotal: 0, ipaid: 0, ipayable: 0, idue: 0 },
        serviceCharges: { sctotal: 0, scpaid: 0, scpayable: 0, scdue: 0 },
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
    //  Total
    {
      field: "ttotal",
      headerName: "Total",
      width: 62,

      editable: true,
    },
    {
      field: "tpaid",
      headerName: "Paid",
      width: 62,

      editable: true,
    },
    {
      field: "tpayable",
      headerName: "Payable",
      width: 62,

      editable: true,
    },
    {
      field: "tdue",
      headerName: "Due",
      width: 62,

      editable: true,
    },

    // Base Price

    {
      field: "bptotal",
      headerName: "Total",
      width: 62,

      editable: true,
    },
    {
      field: "bppaid",
      headerName: "Paid",
      width: 62,

      editable: true,
    },
    {
      field: "bppayable",
      headerName: "Payable",
      width: 62,

      editable: true,
    },
    {
      field: "bpdue",
      headerName: "Due",
      width: 62,

      editable: true,
    },

    // Extra Work
    {
      field: "ewtotal",
      headerName: "Total",
      width: 62,

      editable: true,
    },
    {
      field: "ewpaid",
      headerName: "Paid",
      width: 62,

      editable: true,
    },
    {
      field: "ewpayable",
      headerName: "Payable",
      width: 62,

      editable: true,
    },
    {
      field: "ewdue",
      headerName: "Due",
      width: 62,

      editable: true,
    },

    // Inflation
    {
      field: "itotal",
      headerName: "Total",
      width: 62,

      editable: true,
    },
    {
      field: "ipaid",
      headerName: "Paid",
      width: 62,

      editable: true,
    },
    {
      field: "ipayable",
      headerName: "Payable",
      width: 62,

      editable: true,
    },
    {
      field: "idue",
      headerName: "Due",
      width: 62,

      editable: true,
    },

    // Service Charges

    {
      field: "sctotal",
      headerName: "Total",
      width: 62,

      editable: true,
    },
    {
      field: "scpaid",
      headerName: "Paid",
      width: 62,

      editable: true,
    },
    {
      field: "scpayable",
      headerName: "Payable",
      width: 62,

      editable: true,
    },
    {
      field: "scdue",
      headerName: "Due",
      width: 62,

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

  const columnGroupingModel: GridColumnGroup[] = [
    {
      groupId: "total",
      headerName: "Total",
      children: [
        { field: "ttotal" },
        { field: "tpaid" },
        { field: "tpayable" },
        { field: "tdue" },
      ],
    },
    {
      groupId: "basePrice",
      headerName: "Base Price",
      children: [
        { field: "bptotal" },
        { field: "bppaid" },
        { field: "bppayable" },
        { field: "bpdue" },
      ],
    },
    {
      groupId: "extraWork",
      headerName: "Extra Work",
      children: [
        { field: "ewtotal" },
        { field: "ewpaid" },
        { field: "ewpayable" },
        { field: "ewdue" },
      ],
    },
    {
      groupId: "inflation",
      headerName: "Inflation",
      children: [
        { field: "itotal" },
        { field: "ipaid" },
        { field: "ipayable" },
        { field: "idue" },
      ],
    },
    {
      groupId: "serviceCharges",
      headerName: "Service Charges",
      children: [
        { field: "sctotal" },
        { field: "scpaid" },
        { field: "scpayable" },
        { field: "scdue" },
      ],
    },
  ];

  return (
    <Box
      sx={{
        height: "auto",
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
        <DataGridPro
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
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
        />
      </div>
    </Box>
  );
}
