import { userState } from "../../App"
/* 
Hier werden die API-Calls definiert um die Nutzung zu vereinfachen.
Außerdem wird der userState von create und delete gemanaged.
*/
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
        if (userState.get() !== false) deleteUser(userState.get());
        userState.set(json.id);
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
        userState.set(false);
    }
    catch (error) {
        console.log(error)
    }
}