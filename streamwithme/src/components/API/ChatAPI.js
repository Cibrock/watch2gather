/* 
Hier werden die API-Calls definiert um die Nutzung zu vereinfachen.
Da stehts alle Chatnachrichten angezeigt werden, ist getChat vereinfacht.
*/
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

export const getChat = async (roomName) => {
    try {
        let res = await fetch('https://gruppe10.toni-barth.com/rooms/'+roomName+ '/chat',
            {
                method: "GET"
            })
        return await res.json();
    }
    catch (error) {
        console.log(error)
    }
}