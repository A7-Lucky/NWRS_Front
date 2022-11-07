// 전역 변수 //
const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500/templates'

// 회원가입
async function handleSignup() {
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value
    const profile_img = document.getElementById('profile_img').files[0]
    const introduce = document.getElementById('introduce').value
    const favorite = document.getElementById('favorite').value
    
    const formData = new FormData()
    formData.append("username", username)
    formData.append("password", password)
    
    if (profile_img != undefined){
        formData.append('profile_img', profile_img)
    }
    
    formData.append("introduce", introduce)
    formData.append("favorite", favorite)
    
    const response = await fetch(`${backend_base_url}/users/sign-up/`, {
        headers: {
        },
        method: 'POST',
        body: formData
    })
    console.log(response)

    if (response.status == 201) {
        alert('가입 완료!')
        window.location.replace(`${frontend_base_url}/login.html`)
    }
}
