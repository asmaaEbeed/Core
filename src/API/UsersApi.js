const url = "http://localhost:5000/users";

export const getAll = async () => {
  const res = await fetch(url);
  if (res.ok) {
    const fetchedUser = await res.json();
    console.log(fetchedUser);
    return fetchedUser;
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

export const addOne = async (body) => {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        const newOne = await res.json();
        return newOne;
      } else {
        return null;
      }
    } catch (e) {
      console.log(e.message);
    }
};

export const updateOne = async (user, newData) => {
  try {
    const res = await fetch(`${url}/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });
    if (res.ok) {
      const itemUpdated = await res.json();
      return itemUpdated;
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