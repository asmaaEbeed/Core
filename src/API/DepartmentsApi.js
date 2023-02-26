const url = "http://localhost:5000/departments";

export const getAll = async () => {
  const res = await fetch(url);
  if (res.ok) {
    const fetchedDept = await res.json();
    console.log(fetchedDept);
    return fetchedDept;
  } else {
    return null;
  }
};

export const getOne = async (id) => {
  const res = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (res.ok) {
    const resJson = await res.json();
    console.log(resJson);
    return resJson;
  } else {
    return null;
  }
};

export const addDeptartment = async (body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const newDept = await res.json();
      return newDept;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};
export const updateDepartment = async (dept, newDeptData) => {
  try {
    const res = await fetch(`${url}/${dept.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDeptData),
    });
    if (res.ok) {
      const deptUpdated = await res.json();
      return deptUpdated;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteDepartment = async (id) => {
  const res = await fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  if (res.ok) {
    return res.json();
  } else {
    return null;
  }
};
