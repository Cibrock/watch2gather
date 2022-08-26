export const sendMessage = async (roomName, id, message) => {
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
        let res = await fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+ '/chat',
            {
                method: "GET",
                // headers: {
                //     "Content-Type": "application/json"
                // },
                // body: JSON.stringify({
                //     "start": start
                // })
            }
            
        )
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
}