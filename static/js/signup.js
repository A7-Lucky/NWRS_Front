const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500/templates'

// 회원가입 //
async function handleSignup(){
    const SignupData = {
        username : document.getElementById("username").value,
        password : document.getElementById("password").value,
    }

    const response = await fetch(`${backend_base_url}/users/sign-up/`, {
        headers:{
            Accept: "application/json",
            'content-type':'application/json',
        },
        method:'POST',
        body: JSON.stringify(SignupData)
    })

    response_json = await response.json()

    if (response.status == 201) {
        window.location.replace(`${frontend_base_url}/login.html`)
    }
    else {
        // 공백에 대한 alert 추가 필요 //
        alert("이미 사용 중인 아이디입니다.")
    }
}

let id = document.querySelector('#username')
let pw = document.querySelector('#password')

let btn = document.querySelector('#SignupBtn')
let label;

btn.addEventListener('click', () => {
    if (id.value == "") {
        label = id.nextElementSibling
        label.classList.add('warning')
        setTimeout(() => {
            label.classList.remove('warning')
        }, 1500)
    } else if (pw.value == "") {
        label = pw.nextElementSibling
        label.classList.add('warning')
        setTimeout(() => {
            label.classList.remove('warning')
        }, 1500)
    }
})