const backend_base_url = 'http://127.0.0.1:8000'
const frontend_base_url = 'http://127.0.0.1:5500/templates'

// 로그인한 사용자 액세스 정보 추적 //
function parseJwt(token) {
    var base64Url = localStorage.getItem("access").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(
        function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

    return JSON.parse(jsonPayload);
};

// main 화면에 웹툰 리스트 가져오기 //
async function getWebtoons() {
    const response = await fetch(`${backend_base_url}/webtoon/`, {
        method: "GET",
    })

    response_json = await response.json()
    return response_json
}

// 웹툰 리스트 랜덤 출력 //
async function loadWebtoons(){
    webtoons = await getWebtoons()

    const thumbnail_url = document.getElementById("thumbnail_url")
    webtoons.forEach(webtoon => {
        // 사진 버전 //
        const imgTag = document.createElement('img')
        imgTag.src = webtoon.thumbnail_url
        imgTag.setAttribute("id", webtoon.id)
        imgTag.setAttribute("onclick", "webtoonDetail(this.id)")
        thumbnail_url.appendChild(imgTag)
        // 사진 + 글 버전 //
        // const title = document.createElement('div')
        // title.innerText = webtoon.title
        // title.setAttribute("id", webtoon.id)
        // title.setAttribute("onclick", "webtoonDetail(this.id)")
        // thumbnail_url.appendChild(title)
    })
}

loadWebtoons()

// 웹툰 디테일 페이지 연결 //
function webtoonDetail(webtoon_id){
    const url = `${frontend_base_url}/webtoon_detail.html?id=${webtoon_id}`
    location.href = url
}

// 새로고침 //
function pageRefresh(){
    window.location.replace(`${frontend_base_url}/index.html`)
}

// 로그아웃 //
function handleLogout(){
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")

    window.location.replace(`${frontend_base_url}/login.html`)
}