export function getFromLS(key) {
    let ls = {}
    if (global.localStorage) {
        try {
            ls = JSON.parse(global.localStorage.getItem("dashboard")) || {}
        } catch (e) {
            /*Ignore*/
        }
    }
    return ls[key]
}

export function saveToLS(key, value) {
    if (global.localStorage) {
        global.localStorage.setItem(
            "dashboard",
            JSON.stringify({
                [key]: value
            })
        )
    }
}