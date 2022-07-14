export const createRoom = async () => {
    try {
        let res = await fetch('https://gruppe15.toni-barth.com/rooms/',
            {
                method: "POST",
            }
        )
        let json = await res.json()
        return json.name
    }
    catch (error) {
        console.log(error)
    }
}
export const joinRoom = async (roomName, id) => {
    try {
        fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+ '/users',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id
                })
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}
export const getRoomUsers = async (roomName) => {
    try {
        let res = await fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+ '/users',
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
export const leaveRoom = async (roomName, id) => {
    try {
        fetch('https://gruppe15.toni-barth.com/rooms/'+roomName+ '/users',
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id
                })
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}

export const getRooms = async () => {
    try {
        let res = await fetch('https://gruppe15.toni-barth.com/rooms/',
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
