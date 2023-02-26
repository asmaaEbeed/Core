const url = "http://localhost:5000/companies";

export const getAll = () => fetch(url).then((res) => {return res.json()});

export const getOne = async (id) => {
  const res = await fetch(`${url}/${id}`, {
    method: "GET",
    headers: {
      'Content-type': "application/json"
    }
  })
  if(res.ok) {
    const resJson = await res.json();
    console.log(resJson);
    return resJson
  } else {
    return null
  }
}
export const deleteCompany = (id) =>
  fetch(`${url}/${id}`, {
    method: "DELETE",
    headers: {
        'Content-type': "application/json"
      }
  }).then((res) => {console.log(res); res.json()});

export const addCompany = (body) => 
fetch(url, {
    method: "POST",
    headers: {
        'Content-type': "application/json"
      },
      body: JSON.stringify(body),
  })
  // .then((res) => {console.log("res post"); console.log(res); res.json()});

  export const updateCompany = (company, newCoData) =>
  
    fetch(`${url}/${company.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newCoData)
  })
