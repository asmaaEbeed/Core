const url = "http://localhost:5000/notifications";

export const getAll = async () => {
    const res = await fetch(url);
    if (res.ok) {
      const fetchedItems = await res.json();
      console.log(fetchedItems);
      return fetchedItems;
    } else {
      return null;
    }
  };