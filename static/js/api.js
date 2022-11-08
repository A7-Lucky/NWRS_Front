// 전역 변수 //
const backend_base_url = "http://127.0.0.1:8000";
const frontend_base_url = "http://127.0.0.1:5500/templates";

var token = localStorage.getItem("access")

// 로그인 //
async function handleLogin() {
  const loginData = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };
  const response = await fetch(`${backend_base_url}/users/api/token/`, {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(loginData),
  });

  response_json = await response.json();

  if (response.status == 200) {
    localStorage.setItem("access", response_json.access);
    localStorage.setItem("refresh", response_json.refresh);

    const base64Url = response_json.access.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    localStorage.setItem("payload", jsonPayload);
    window.location.replace(`${frontend_base_url}/index.html`);
  } else {
    console.log(response.status);
  }
}

// // login.html --------------------------------------------------------------------------->
// // 로그인 //
// async function handleLogin() {
//   const LoginData = {
//     username: document.getElementById("username").value,
//     password: document.getElementById("password").value,
//   };
//   console.log(username, password);

//   const response = await fetch(`${backend_base_url}/users/api/token/`, {
//     headers: {
//       Accept: "application/json",
//       "content-type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(LoginData),
//   });

//   response_json = await response.json();

//   if (response.status == 200) {
//     localStorage.setItem("access", response_json.access);
//     localStorage.setItem("refresh", response_json.refresh);

//     const base64Url = response_json.access.split(".")[1];
//     const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
//     const jsonPayload = decodeURIComponent(
//       atob(base64)
//         .split("")
//         .map(function (c) {
//           return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
//         })
//         .join("")
//     );

//     localStorage.setItem("payload", jsonPayload);

//     window.location.replace(`${frontend_base_url}/index.html`);
//   } else {
//     alert("잘못된 로그인입니다.", response.status);
//   }
// }

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

// // signup.html --------------------------------------------------------------------------->
// // 회원가입 //
// async function handleSignup() {
//   const SignupData = {
//     username: document.getElementById("username").value,
//     password: document.getElementById("password").value,
//   };

//   const response = await fetch(`${backend_base_url}/users/sign-up/`, {
//     headers: {
//       Accept: "application/json",
//       "content-type": "application/json",
//     },
//     method: "POST",
//     body: JSON.stringify(SignupData),
//   });

//   response_json = await response.json();

//   if (response.status == 201) {
//     window.location.replace(`${frontend_base_url}/login.html`);
//   } else {
//     // 공백에 대한 alert 추가 필요 //
//     alert("이미 사용 중인 아이디입니다.");
//   }
// }

// 공통 --------------------------------------------------------------------------->
// 로그아웃 //
function handleLogout() {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("payload");

  window.location.replace(`${frontend_base_url}/login.html`);
}

// index.html --------------------------------------------------------------------------->
// 웹툰 리스트 //
async function getWebtoons() {
  const response = await fetch(`${backend_base_url}/webtoon/`, {
    method: "GET",
  });

  response_json = await response.json();
  return response_json;
}

// 웹툰 디테일 페이지 연결 //
function webtoonDetail(webtoon_id) {
  const url = `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`;
  location.href = url;
}

// webtoon_detail.html --------------------------------------------------------------------------->
// 웹툰 디테일 //
async function getWebtoonsDetail(webtoon_id) {
  const response = await fetch(`${backend_base_url}/webtoon/${webtoon_id}`, {
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 추천 웹툰 리스트 //
async function getRecommend() {
  const response = await fetch(
    `${backend_base_url}/webtoon/${webtoon_id}/practice`,
    {
      method: "GET",
    }
  );

  response_json = await response.json();
  return response_json;
}

// 웹툰 리뷰 리스트 가져오기 //
async function getWebtoonReview(webtoon_id) {
  const response = await fetch(
    `${backend_base_url}/webtoon/${webtoon_id}/review`,
    {
      method: "GET",
    }
  );
  response_json = await response.json();
  return response_json;
}

// 웹툰 리뷰 작성하기 //
async function CreateWebtoonReview(comment, my_score) {
  const response = await fetch(
    `${backend_base_url}/webtoon/${webtoon_id}/review/`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: JSON.stringify({
        webtoon: webtoon_id,
        comment: comment,
        my_score: my_score,
      }),
    }
  );

  response_json = await response.json();
  console.log(response_json);

  if (response.status == 200) {
    window.location.replace(
      `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`
    );
  } else {
    alert(response.status);
  }
}

// 웹툰 리뷰 수정하기 //
async function handleUpdateWebtoonreview(review_id) {
  const input_comment = document.getElementById("input_comment").value;
  const input_score = document.getElementById("input_score").value;

  const response = await fetch(
    `${backend_base_url}/webtoon/${webtoon_id}/review/${review_id}/`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "PUT",
      body: JSON.stringify({
        webtoon: webtoon_id,
        comment: input_comment,
        my_score: input_score,
      }),
    }
  );
  response_json = await response.json();
  console.log(response_json);

  if (response.status == 200) {
    window.location.replace(
      `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`
    );
  } else {
    alert(response.status);
  }

  response_json = await response.json();
  console.log(response_json);

  if (response.status == 200) {
    window.location.replace(
      `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`
    );
  } else {
    alert(response.status);
  }
}

// 웹툰 리뷰 삭제하기 //
async function handleDeleteWebtoonreview(review_id) {
  const response = await fetch(
    `${backend_base_url}/webtoon/${webtoon_id}/review/${review_id}/`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "DELETE",
    }
  );

  if (response.status == 204) {
    window.location.replace(
      `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`
    );
  } else {
    alert(response.status);
  }
}

// 웹툰 디테일 페이지 연결 //
function webtoonDetail(webtoon_id) {
  const url = `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`;
  location.href = url;
}

// webtoon_search.html --------------------------------------------------------------------------->
// 검색한 웹툰 //
async function getWebtoonsSearch() {
  const response = await fetch(
    `${backend_base_url}/webtoon/search?` +
      new URLSearchParams(window.location.search),
    {
      method: "GET",
    }
  );
  console.log(response);

  response_json = await response.json();
  return response_json;
}

// 웹툰 검색 페이지 연결 //
function webtoonSearch() {
  const word = document.getElementById("inputSearch").value;
  const url = `${frontend_base_url}/webtoon_search.html?search=${word}`;
  location.href = url;
}

// myreview.html --------------------------------------------------------------------------->
// 나의 리뷰 리스트 보여주기 //
async function getMyReview() {
  const response = await fetch(`${backend_base_url}/webtoon/myreview`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });
  response_json = await response.json();
  return response_json;
}

// 나의 리뷰 삭제하기 //
async function handleDeleteMyreview(myreview_id) {
  const response = await fetch(
    `${backend_base_url}/webtoon/myreview/${myreview_id}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "DELETE",
    }
  );

  if (response.status == 204) {
    window.location.replace(`${frontend_base_url}/myreview.html`);
  } else {
    alert(response.status);
  }
}

// 유저 정보 가져오기 --------------------------------------------------------------------------->
// 로그인한 유저 이름 가져오기 //
async function getName(user_id) {
  const response = await fetch(`${backend_base_url}/users/mypage/${user_id}`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("access"),
    },
    method: "GET",
  });

  if (response.status == 200) {
    response_json = await response.json();
    console.log(response_json);
    return response_json.username;
  } else {
    return null;
  }
}
