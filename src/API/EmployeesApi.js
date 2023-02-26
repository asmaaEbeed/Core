const url = "http://localhost:5000/employees";

export const getAll = async () => {
  const res = await fetch(url);
  if (res.ok) {
    const fetchedEmployees = await res.json();
    console.log(fetchedEmployees);
    return fetchedEmployees;
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

export const addItem = async (body) => {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const newDataAdded = await res.json();
      console.log(newDataAdded);
      return newDataAdded;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const updateOne = async (emp, newEmpData) => {
  try {
    const res = await fetch(`${url}/${emp.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmpData),
    });
    if (res.ok) {
      const empUpdated = await res.json();
      return empUpdated;
    } else {
      return null;
    }
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteItem = async (id) => {
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