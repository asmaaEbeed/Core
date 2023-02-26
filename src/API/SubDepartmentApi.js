const url = "http://localhost:5000/sub-departments";

export const getAll = async () => {
  const res = await fetch(url);
  if (res.ok) {
    const fetchedSubDept = await res.json();
    console.log(fetchedSubDept)
    console.log(fetchedSubDept[0].id)
    return fetchedSubDept;
  } else {
    return null;
  }
};