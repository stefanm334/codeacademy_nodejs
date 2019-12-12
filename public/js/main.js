var email = $(".email")
var password = $("#password")
var button = $(".button-submit")
var wrapper = $(".wrapper")


button.on("click", async () => {
    try {
        var result = await login(email.val(), password.val())
        console.log(result)
        if (result.data.errors != undefined && result.data.errors.length > 0) {
            result.data.errors.forEach(error => {
                var popupDiv = $("<div>").html(error.msg).css("width", "100%")
                wrapper.append(popupDiv)

            })

        }
        var token = result.data
        if (token.length > 300) {
            localStorage.setItem('token', JSON.stringify(token))
            window.location.replace("http://localhost:3000/home.html");
        }

    } catch (error) {
        console.log(error)
    }

})


login = async (email, password) => {
    try {
        var result = await axios({
            method: 'post',
            url: '/api/login',
            data: {
                Email: email,
                Password: password
            }
        });
        return result
    } catch (error) {
        result = error.response
        return result
    }


}