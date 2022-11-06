const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500/templates'

// 로그인 //
async function handleLogin(){
    const LoginData = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
    }
    console.log(username, password)

    const response = await fetch(`${backend_base_url}/users/api/token/`, {
        headers:{
            Accept: "application/json",
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify(LoginData)
    })

    response_json = await response.json()

    if (response.status == 200) {
        localStorage.setItem("access", response_json.access);
        localStorage.setItem("refresh", response_json.refresh);

        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c){
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        localStorage.setItem("payload", jsonPayload);

        window.location.replace(`${frontend_base_url}/index.html`)
    }
    else {
        alert("잘못된 로그인입니다.", response.status)
    }
}

let id = $('#username');
let pw = $('#password');

let btn = $('#LoginBtn');

$(btn).on('click', function () {
    if ($(id).val() == "") {
        $(id).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning');
        },1500);
    }
    else if ($(pw).val() == "") {
        $(pw).next('label').addClass('warning');
        setTimeout(function() {
            $('label').removeClass('warning');
        },1500);
    }
})