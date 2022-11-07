let username = document.querySelector('#username')
let password = document.querySelector('#password')
let btn = document.querySelector('#LoginBtn')

btn.addEventListener('click', () => {
    // 아이디 정규식 (4~12자의 영문 대소문자와 숫자)
    var userCheck= RegExp(/^[a-zA-Z0-9]{4,12}$/); 
    // 패스워드 정규식 (영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자)
    var passwdCheck = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^*()\-_=+\\\|\[\]{};:\'",.<>\/?]).{8,16}$/);
    
    // 아이디 공백 및 유효성 검사
    if (username.value == ''){
        alert('아이디를 입력해주세요!')
        username.focus();
        return false;
    }
    else if(!userCheck.test(username.value)){
        alert("아이디는 4~12자의 영문 대소문자와 숫자로만 입력해주세요!");
        username.focus();
        return false;
    }
    // 비밀번호 공백 및 유효성 검사
    if (password.value == ''){
        alert('비밀번호를 입력해주세요!')
        password.focus();
        return false;
    }
    else if(!passwdCheck.test(password.value)){
        alert("비밀번호는 영문 대문자와 소문자, 숫자, 특수문자를 하나 이상 포함하여 8~16자로 입력해주세요!");
        password.focus();
    }
})
