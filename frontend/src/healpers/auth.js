import { baseUrl } from "../api/api"

export function getLocal(){
    let response = localStorage.getItem('authToken')
    return response
}

export default async function Login(e){
    let response = await fetch(`${baseUrl}token/`, {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({
                    'email': e.target.username.value, 
                    'password': e.target.password.value
                })
            })

            let data = await response.json()
            
            if(response.status === 200){
                localStorage.setItem('authToken', JSON.stringify(data))
                return data;   
            }
}


