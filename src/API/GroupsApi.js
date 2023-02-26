const url = "http://localhost:5000/groups";

export const getAll = async () => {
    const res = await fetch(url);
    if (res.ok) {
      const fetchedGroups = await res.json();
      console.log(fetchedGroups);
      return fetchedGroups;
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

  export const addGroup = async (body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const newGroup = await res.json();
        console.log(newGroup);
        return newGroup;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  export const updateGroup = async (group, newGroupData) => {
    try {
      const res = await fetch(`${url}/${group.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGroupData),
      });
      if (res.ok) {
        const groupUpdated = await res.json();
        return groupUpdated;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

export const deleteOne = async (id) => {
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
}