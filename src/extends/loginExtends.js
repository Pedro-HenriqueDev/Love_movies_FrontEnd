import axios from 'axios'

export const AutoLogin = () => {
    let token = document.cookie.split("=")
    let header = {
        headers: {
            Authorization: `Bearer ${token[1]}`
        }
    }
    const url = new URL(window.location.href)

    axios.get(process.env.VUE_APP_URL_APIUSER + "profile", header).then(res => {
        if (res.status == 200) {
            window.location.href = `${url.origin}/#/movies/1`
        }
    })
}