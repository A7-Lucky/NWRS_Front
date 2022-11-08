// 회원가입
async function handleSignup() {
    // 아이디 정규식 (4~12자의 영문 대소문자와 숫자)
    var userCheck = RegExp(/^[a-zA-Z0-9]{4,12}$/);
    // 패스워드 정규식 (영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자)
    var passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);
    
    let username = document.querySelector('#username');
    let password = document.querySelector('#password');
    let password2 = document.querySelector('#password2');

    // 아이디 유효성 검사
    if (username.value == '') {
        alert('아이디를 입력해주세요!')
        username.focus();
        return false;
    }
    else if(!userCheck.test(username.value)) {
        alert("아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요!");
        username.focus();
        return false;
    }
    
    // 비밀번호 공백 검증
    if (password.value == '') {
        alert('비밀번호를 입력해주세요!')
        password.focus();
        return false;
    }
    // 비밀번호 유효성 검사
    else if (!passwdCheck.test(password.value)) {
        alert("비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!");
        password.focus();
        return false;
    }
    // 비밀번호 재확인 공백 검증
    else if (password2.value == '') {
        alert('비밀번호 재확인을 해주세요!')
        password2.focus();
        return false;
    }
    // 비밀번호와 비밀번호 재확인 일치 여부 검증
    else if (password.value != password2.value) {
        alert('비밀번호가 일치하지 않습니다!')
        password2.focus();
        return false;
    }
    // 아이디 비밀번호 값 중복 검증
    else if (username.value == password.value) {
        alert('아이디와 비밀번호는 같을 수 없습니다!')
        password.focus();
        return false;
    }
    const form_username = document.getElementById('username').value
    const form_password = document.getElementById('password').value
    const form_profile_img = document.getElementById('profile_img').files[0]
    const form_introduce = document.getElementById('introduce').value
    const form_favorite = document.getElementById('favorite').value

    const formData = new FormData()
    formData.append("username", form_username)
    formData.append("password", form_password)
    if (profile_img != undefined) {
    formData.append("profile_img", form_profile_img)
    }
    formData.append("introduce", form_introduce)
    formData.append("favorite", form_favorite)
    
    const response = await fetch(`${backend_base_url}/users/sign-up/`, {
        headers: {},
        method: 'POST',
        body: formData
        
    })
    
    if (response.status == 201) {
        alert('가입 완료!')
        window.location.replace(`${frontend_base_url}/login.html`)
    } else if (response.status == 400){
        alert('이미 가입된 유저입니다!')
        window.location.reload()
    }
}