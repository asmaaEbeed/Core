const url = "http://localhost:5000/roles";

export const getAll = async () => {
    const res = await fetch(url);
    if (res.ok) {
      const fetchedRoles= await res.json();
      console.log(fetchedRoles);
      return fetchedRoles;
    } else {
      return null;
    }
  };