import { SetUser } from "../../App"

export const createUser = async (_name) => {
    try {
        let res = await fetch('https://gruppe10.toni-barth.com/users/',
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: _name
                })
            }
        )
        let json = await res.json()
        SetUser(json.id)
    }
    catch (error) {
        console.log(error)
    }
}
export const getUsers = async () => {
    try {
        let res = await fetch('https://gruppe10.toni-barth.com/users/',
            {
                method: "GET",
            })
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
}
export const deleteUser = (userId) => {
    try {
         fetch('https://gruppe10.toni-barth.com/users/' + userId,
            {
                method: "DELETE"
            })
    }
    catch (error) {
        console.log(error)
    }
}