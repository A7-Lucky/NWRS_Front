window.onload = () => {
    console.log('로딩 완료')
}
// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000/'
const frontend_base_url = 'http://127.0.0.1:5500/'

async function handleSignup() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const profile_img = document.getElementById('profile_img').files[0]
    const introduce = document.getElementById('introduce').value
    const favorite = document.getElementById('favorite').value
    
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    formData.append("profile_img", profile_img)
    formData.append("introduce", introduce)
    formData.append("favorite", favorite)
    
    const response = await fetch('http://127.0.0.1:8000/users/sign-up/', {
        headers: {
        },
        method: 'POST',
        body: formData
    })
    console.log(response)

    if (response.status == 201) {
        alert('가입 완료!')
        window.location.replace(`${frontend_base_url}login.html`)
    }
}

async function handleLogin() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    
    const response = await fetch('http://127.0.0.1:8000/users/api/token/', {
        headers: {
            'content-type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
            'username': username,
            'password': password
        })
    })
    const response_json = await response.json()
    console.log(response_json)

    localStorage.setItem('access', response_json.access);
    localStorage.setItem('refresh', response_json.refresh);
}