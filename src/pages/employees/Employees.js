import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Main from "../../components/layout/Main";
import ActionMenu from "../../components/table/ActionMenu";
import { getAll, deleteItem } from "../../API/EmployeesApi";
import { Link } from "react-router-dom";

const Employees = () => {
  const [rowsSelected, setRowsSelected] = useState([]);
  const [employeesData, setEmployeesData] = useState([]);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = async () => {
    const allEmployeesData = await getAll();
    setEmployeesData(allEmployeesData);
  };

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true
      },
    },
    {
      name: "name",
      label: "Name",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true
      },
    },
    {
      name: "company",
      label: "Company",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true
      },
    },
    {
        name: "role",
        label: "Job Title",
        options: {
            filter: true,
            sort: true,
            sortThirdClickReset: true,
        }
    },
    {
        name: "phone",
        label: "Phone",
        options: {
            filter: true,
            sort: true,
            sortThirdClickReset: true,
        }
    },
    {
      name: "creationDate",
      label: "Creation Date",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "action",
      label: "Action",
      options: {
        customBodyRender: (value, tableMeta, updateValue) => {
          return (
            <ActionMenu
              handleClick={toggleActionsWrapper}
              row={tableMeta.rowData}
              toView="/employees"
              toEdit="/employees/edit"
            />
          );
        },
      },
    },
  ];

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

  const options = {
    customToolbar: () => (<Link
      className="bg-cyan-light rounded-full py-2 px-4 text-md-xs m-2 w-48 font-semibold hover:shadow-sm hover:shadow-slate-400 text-center"
      type="button"
      to="/employees/add-employee"
    >
      Add New Employee +
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
    rowsPerPageOptions:[5, 10, 15, 30, { value: employeesData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        deleteItem(employeesData[row].id).then( res => {
          getEmployees();
          resolve();
        })
      ))
      setRowsSelected([]);
    }),
    downloadOptions: {
      filename: 'Departments.csv',
      separator: ',',
      filterOptions: {
        useDisplayedColumnsOnly: true,
        useDisplayedRowsOnly: true
      }
    }

  };
  return (
    <Main>
      <Table columns={columns} data={employeesData} options={options} title="Departments List" />
    </Main>
  );
};

export default Employees;
