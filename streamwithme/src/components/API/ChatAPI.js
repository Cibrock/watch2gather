export const sendMessage = async (id, roomName, message) => {
    try {
        fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+ '/chat',
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "user": id,
                    "message": message
                })
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}

export const getChat = async (roomName, start) => {
    try {
        fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+ '/chat',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "start": start
                })
            }
        )
    }
    catch (error) {
        console.log(error)
    }
}