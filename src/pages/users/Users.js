import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import ActionMenu from "../../components/table/ActionMenu";
import * as UsersApi from "../../API/UsersApi";
import Main from '../../components/layout/Main';
import { Link } from "react-router-dom";

const Users = () => {

  const [rowsSelected, setRowsSelected] = useState([]);
  const [usersData, setUsersData] = useState([]);

    useEffect(() => {
    getUsers();
  },[]);
  const getUsers = async () => {
    const allUsersData = await UsersApi.getAll();
    setUsersData(allUsersData);
  }

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

  const columns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "personal_name",
      label: "User Name",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
      
    },
    {
      name: "phone",
      label: "Phone",
      options: {
        filter: true,
        sort: true,
        sortThirdClickReset: true,
      },
      
    },
    {
      name: "creationDate",
      label: "Join Date",
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
          toView="/users"
          toEdit="/users/edit"
        />
          );
        },
      },
    },
    
  ];

  const options = {
    customToolbar: () => (
    <Link
      className="bg-cyan-light text-center rounded-full py-2 px-4 text-md-xs m-2 font-semibold hover:shadow-sm hover:shadow-slate-400"
      type="button"
      to="/users/add-user"
    >
      Add New User +
    </Link>
    ),
    filterType: "dropdown",
    responsive: "standard",
    selectableRows: "multiple",
    // selectableRowsOnClick: true,
    rowsSelected: rowsSelected,
    onRowSelectionChange: (rowsSelectedData, allRows, rowsSelected) => {
      console.log(rowsSelectedData, allRows, rowsSelected);
      setRowsSelected(rowsSelected);
    },
    rowsPerPageOptions:[5, 10, 15, 30, { value: usersData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        UsersApi.deleteOne(usersData[row].id).then( res => {
          getUsers();
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
      <Table columns={columns} data={usersData} options={options} title="Users List" />
    </Main>
  )
}

export default Users