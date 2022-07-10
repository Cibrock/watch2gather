export const getVideoStatus = async (roomName) => {
    try {
        let res = await fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+'/status',
            {
                method: "GET",
            }
        )
        return await res.json()
    }
    catch (error) {
        console.log(error.message)
    }
}
export const changeVideoStatus = async (roomName, id, status) => {
    try {
        fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+'/status',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id,
                    "status":  status
                })
            }
        )
    }
    catch (error) {
        console.log(error.message)
    }
}
export const changeVideoUrl = async (roomName, id, url) => {
    try {
        fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+'/video',
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
        console.log(error.message)
    }
}
export const getVideoUrl = async (roomName) => {
    try {
        let res = await fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+'/video',
            {
                method: "GET",
            }
        )
        return await res.json()
    }
    catch (error) {
        console.log(error.message)
    }
}
export const changeVideoPosition = async (roomName, id, position) => {
    try {
        fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+'/position',
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
        console.log(error.message)
    }
}
export const getVideoPosition = async (roomName) => {
    try {
        let res = await fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+'/position',
            {
                method: "GET",
            }
        )
        return await res.json()
    }
    catch (error) {
        console.log(error.message)
    }
}