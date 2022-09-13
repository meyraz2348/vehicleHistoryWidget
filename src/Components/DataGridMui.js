import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Container } from "@mui/system";

const DataGridMui = (props) => {
  let rows = []; /* this array is o/p userSearchedRego vehicles */
  const [fullVehicleArray, setFullVehicleArray] = useState([]);
  useEffect(() => {
    const vehicleData = async () => {
      const response = await fetch("http://localhost:3000/vehicles");
      const responseData = await response.json();
      console.log(responseData);
      setFullVehicleArray(responseData);
    };
    vehicleData();
  }, [fullVehicleArray]);
  if (props.searchValue) {
    for (const key in fullVehicleArray) {
      console.log(fullVehicleArray[key].rego);
      if (
        props.searchValue.toLowerCase() ===
          fullVehicleArray[key].rego.toLowerCase() ||
        props.searchValue.toLowerCase() ===
          fullVehicleArray[key].driverName.toLowerCase()
      ) {
        rows.push({
          /**ACTUAL PUSH LOGIN FOR REALTIME DATA**/
          id: fullVehicleArray[key].id,
          driverName: fullVehicleArray[key].driverName,
          rego: fullVehicleArray[key].rego,
          contractStartDate: fullVehicleArray[key].contractStartDate,
          contractEndDate: fullVehicleArray[key].contractEndDate,
          status: fullVehicleArray[key].status,
        });
      }
    }
  } else {
    /* this is not mandatory we can even remove this one This code actually o/p details of all the cars in the dataBase */
    rows = fullVehicleArray.map((key, index) => {
      return {
        id: index,
        driverName: key.driverName,
        rego: key.rego,
        contractStartDate: key.contractStartDate,
        contractEndDate: key.contractEndDate,
        status: key.status,
      };
    });
  }

  const columns = [
    /* MUi columns to show the data */
    { field: "id", headerName: "SrNo", width: 60 },

    {
      field: "driverName",
      headerName: "Driver Name",
      width: 160,
      editable: false,
    },
    {
      field: "rego",
      headerName: "Registration",
      type: "string",
      width: 120,
      editable: false,
    },
    {
      field: "contractStartDate",
      headerName: "Contarct Start Date",
      type: "date",
      width: 160,
      editable: false,
    },
    {
      field: "contractEndDate",
      headerName: "Contract End Date",
      type: "date",
      width: 160,
      editable: false,
    },

    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 120,
      cellClassName: "super-app-theme--cell",
      // valueGetter: (params) =>
      //   `${params.row.firstName || ""} ${params.row.lastName || ""}`,
    },
  ];

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        border: "1px solid red",
      }}
    >
      <Box
        sx={{
          height: 400,
          width: "88%",
          "& .super-app.positive": {
            backgroundColor: "#d47483",
            color: "#1a3e72",
            fontWeight: "600",
          },
        }}
      >
        <DataGrid
          rows={rows}
          initialState={{
            sorting: {
              sortModel: [{ field: "contractEndDate", sort: "desc" }],
            },
          }}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
    </Container>
  );
};

export default DataGridMui;
