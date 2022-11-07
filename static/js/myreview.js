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

// 나의 리뷰 리스트 보여주기 //
async function loadMyreviews(){
    myreviews = await getMyReview()
    const myreview_list = document.getElementById("myreviews")

    myreviews.forEach(myreview => {
        console.log(myreview)
        const newMyreview = document.createElement("li");
        newMyreview.setAttribute("id", myreview.id)
        newMyreview.innerText = "작성자 : " + myreview.user + " / 댓글 : " + myreview.comment + " / 평점 : " + myreview.my_score
        myreview_list.appendChild(newMyreview)
    })
}

loadMyreviews()