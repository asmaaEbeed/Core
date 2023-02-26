import React, { useRef }  from 'react';
import MUIDataTable from "mui-datatables";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const Table = ({columns, data, options, title}) => {
    const componentRef = useRef();

    const getMuiTheme = () =>
    createTheme({
      components: {
        MUIDataTableSelectCell: {
          styleOverrides: {
            headerCell: {
              backgroundColor: "#EFFDFF",
            },
          },
        },
        MUIDataTableHeadCell: {
          styleOverrides: {
            root: {
              backgroundColor: "#EFFDFF",
            },
          },
        },
        MuiCheckbox: {
          styleOverrides: {
            root: {
              backgroundColor: "#fff",
            },
          },
        },
        MuiPaper: {
          styleOverrides: {
            root: {
              boxShadow: "none",
              padding: "15px",
            },
          },
        }, //MuiPopover-paper

        MUIDataTable: {
          styleOverrides: {
            responsiveBase: {
              border: "1px solid #A1D1D8",
              borderRadius: "15px",
            },
          },
        },
        MuiPopover: {
          styleOverrides: {
            paper: {
              boxShadow: "0 3px 5px 0 #ddd !important",
            },
          },
        },
       
        MUIDataTableFilter: {
          styleOverrides: {
            root: {
            },
            resetLink: {
              backgroundColor: "#ddd",
              borderRadius: "30px",
            },
          },
        }, //MuiButtonBase-root-MuiIconButton-root
        MUIDataTableToolbar: {
          styleOverrides: {
            icon: {
              backgroundColor: "#EFFDFF",
              margin: "0 3px !important",
              borderWidth: '0 0 1px 2px !important',
              borderStyle: 'solid !important',
              borderColor: '#A1D1D8',
              boxShadow:' 2px 2px 6px #ccc inset'
            },
            filterPaper: {
              padding: "0 !important",
              boxShadow: "0 3px 5px 0 #ddd !important",
            }
          },
        },
      },
    });
  
  return (
    <div>
        <ThemeProvider theme={getMuiTheme()}>
        <MUIDataTable
          title={title}
          ref={componentRef}
          data={data}
          columns={columns}
          options={options}
        />
      </ThemeProvider>
    </div>
  )
}

export default Table