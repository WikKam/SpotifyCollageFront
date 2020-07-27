const api = "http://localhost:8080";


const fetchData = async (path, token, isImage=false) => {
    const response = await fetch(api + path,{
    headers: {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow",
    })
    if(!response.ok){
      if(response.status === 401){
        return 'unauthorised';
      }
      else return 'error';
    }
    const data = isImage? await response.blob() : await response.json();
    console.log(data);
    return data;
}

export default fetchData;