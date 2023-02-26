import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/layout/Main";
import Table from "../../components/table/Table";
import ActionMenu from "../../components/table/ActionMenu";
import { getAll, deleteCompany } from "../../API/CompaniesApi";

const Company = () => {
  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "companyName",
      label: "Company Name",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "companyType",
      label: "Company Type",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "creationDate",
      label: "Creation Date",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          // Here you can render a more complex display.
          // You're given access to tableMeta, which has
          // the rowData (as well as the original object data).
          // See the console for a detailed look at this object.
          return (
            <ActionMenu
          handleClick={toggleActionsWrapper}
          row={tableMeta.rowData}
          toView="/company"
          toEdit="/company/edit"
        />
          );
        },
      },
    },
  ];

  

  const [rowsSelected, setRowsSelected] = useState([]);
  const [companiesData, setCompaniesData] = useState([]);
  // const url = "http://localhost:5000/companies";


  useEffect(() => {
    getCompanies();
  },[companiesData])
  const getCompanies = () => {
    getAll().then(res => setCompaniesData(res))
  }

  const options = {
    customToolbar: () => (<Link
      className="bg-cyan-light rounded-full py-2 px-4 text-md-xs m-2 w-44 font-semibold hover:shadow-sm hover:shadow-slate-400"
      type="button"
      to="/company/add-company"
    >
      Add New Company +
    </Link>),
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "multiple",
    // selectableRowsOnClick: true,
    rowsSelected: rowsSelected,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      console.log(rowsSelectedData, allRows, rowsSelected);
      setRowsSelected(rowsSelected);
    },
    rowsPerPageOptions:[5, 10, 15, 30, { value: companiesData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        // fetch(url + "/" + companiesData[row].id, {
        //   method: "DELETE",
        //   headers: {
        //     'Content-type': "application/json"
        //   },
        //   // body: JSON.stringify(newData)
        // }).then(resp=>resp.json()).then( resp => {
        //   getCompanies();
        //   resolve();
        // })
        deleteCompany(companiesData[row].id).then( res => {
          getCompanies();
          resolve();
        })
      ))
      setRowsSelected([]);
    }),
    downloadOptions: {
      filename: 'Companies.csv',
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    }

  };


  const toggleActionsWrapper = (targetActionsMenu) => {
    let actionDivs = document.querySelectorAll(".export-drop-menu");
    actionDivs = Array.from(actionDivs);
    actionDivs = actionDivs.filter((item) => {
      return item !== targetActionsMenu;
    });

    actionDivs.forEach((item) => {
      item.classList.add("hidden");
    });
  };

  return (
    <Main>
      
      <Table columns={columns} data={companiesData} options={options} title="Companies List" />
      
    </Main>
  );
};

export default Company;
