import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Main from "../../components/layout/Main";
import ActionMenu from "../../components/table/ActionMenu";
import { getAll, deleteDepartment } from "../../API/DepartmentsApi";
import { Link } from "react-router-dom";

const Departments = () => {
  const [rowsSelected, setRowsSelected] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);

    useEffect(() => {
    getDepartments();
  },[])
  

  const getDepartments = async () => {
    const allDeptData = await getAll();
    setDepartmentData(allDeptData);
  }

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
      name: "departmentName",
      label: "Department",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "status",
      label: "Status",
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
      name: "departmentMngr",
      label: "Dept. Manager",
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
          return (
            <ActionMenu
          handleClick={toggleActionsWrapper}
          row={tableMeta.rowData}
          toView="/departments"
          toEdit="/departments/edit"
        />
          );
        },
      },
    },
  ];



  const options = {
    customToolbar: () => (<Link
      className="bg-cyan-light rounded-full py-2 px-4 text-md-xs m-2 w-48 font-semibold hover:shadow-sm hover:shadow-slate-400"
      type="button"
      to="/departments/add-department"
    >
      Add New Department +
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
    rowsPerPageOptions:[5, 10, 15, 30, { value: departmentData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        deleteDepartment(departmentData[row].id).then( res => {
          getDepartments();
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
      <Table columns={columns} data={departmentData} options={options} title="Departments List" />
    </Main>
  );
};

export default Departments;
