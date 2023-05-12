import axios from 'axios'

export const AutoLogin = {
    created() {
        let token = document.cookie.split("=")
        let header = {
            headers: {
                Authorization: `Bearer ${token[1]}`
            }
        }

        axios.get(process.env.VUE_APP_URL_APIUSER + "profile", header).then(res => {
            if(res.status == 200) {
                this.$router.push({ path: '/movies/1'})
            }
        }).catch(err => {
            console.log(err)
        })
    }
}