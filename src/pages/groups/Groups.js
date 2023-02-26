import React, { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import Main from "../../components/layout/Main";
import ActionMenu from "../../components/table/ActionMenu";
import * as GroupsApi from "../../API/GroupsApi";
import { Link } from "react-router-dom";

const Groups = () => {
  const [rowsSelected, setRowsSelected] = useState([]);
  const [groupsData, setGroupsData] = useState([]);

    useEffect(() => {
    getGroups();
  },[])
  

  const getGroups = async () => {
    const allGroupsData = await GroupsApi.getAll();
    setGroupsData(allGroupsData);
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
      },
    },
    {
      name: "groupName",
      label: "Group",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "groupManager",
      label: "Group Lead",
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: "NoOfMembers",
      label: "No. of members",
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
          return (
            <ActionMenu
          handleClick={toggleActionsWrapper}
          row={tableMeta.rowData}
          toView="/groups"
          toEdit="/groups/edit"
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
      to="/groups/add-group"
    >
      Add New Group +
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
    rowsPerPageOptions:[5, 10, 15, 30, { value: groupsData.length, label: 'All' }],
    onRowsDelete: (rowsDeleted, newData) => new Promise((resolve, reject) => {
      rowsSelected.map( row => (
        GroupsApi.deleteOne(groupsData[row].id).then( res => {
          getGroups();
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
      
    <Table columns={columns} data={groupsData} options={options} title="Groups List" />

    </Main>
  )
}

export default Groups