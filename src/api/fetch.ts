const api = import.meta.env.VITE_API_URL;


export default async function fetchData<T>(path: string, token: string, parse?: (response: Response) => Promise<T>): Promise<T> {
    const response = await fetch(api + path, {
    headers: {
      'Authorization': 'Bearer ' + token,
      'Access-Control-Allow-Origin': '*'
    },
    redirect: "follow",
    })
    if(!response.ok){
      if(response.status === 401){
        throw new Error('Unauthorised')
      }
      else throw new Error(response.status.toString());
    }
    const data = await (parse ? parse(response) : response.json());
    return data;
}