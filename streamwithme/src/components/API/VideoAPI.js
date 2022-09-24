/* 
Hier werden die API-Calls definiert um die Nutzung zu vereinfachen.
*/
export const getVideoStatus = async (roomName) => {
    try {
        let res = await fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+'/status',
            {
                method: "GET",
            }
        )
        return await res.json()
    }
    catch (error) {
        console.log(error)
    }
}
export const changeVideoStatus = async (roomName, id, status) => {
    try {
        fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+'/status',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id,
                    "status": status
                }
                )
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}
export const changeVideoUrl = async (roomName, id, url) => {
    try {
        fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+'/video',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id,
                    "url":  url
                })
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}
export const getVideoUrl = async (roomName) => {
    try {
        let res = await fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+'/video',
            {
                method: "GET",
            }
        )
        return await res.json()
    }
    catch (error) {
        console.log(error)
    }
}
export const changeVideoPosition = async (roomName, id, position) => {
    try {
        fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+'/position',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id,
                    "position":  position
                })
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}
export const getVideoPosition = async (roomName) => {
    try {
        let res = await fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+'/position',
            {
                method: "GET",
            }
        )
        return await res.json()
    }
    catch (error) {
        console.log(error);
    }
}