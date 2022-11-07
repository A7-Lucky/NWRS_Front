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
    const webtoon_list = document.getElementById("webtoon")
    const comment_list = document.getElementById("comment")
    const score_list = document.getElementById("score")
    const update_button_list = document.getElementById("update_button")
    const delete_button_list = document.getElementById("delete_button")

    myreviews.forEach(myreview => {
        const newWebtoon = document.createElement("li");
        const newComment = document.createElement("li");
        const newScore = document.createElement("li");
        newWebtoon.setAttribute("id", myreview.id)
        newComment.setAttribute("id", myreview.id)
        newScore.setAttribute("id", myreview.id)
        newWebtoon.innerText = "작성자 : " + myreview.webtoon
        newComment.innerText = "댓글 : " + myreview.comment
        newScore.innerText = "평점 : " + myreview.my_score
        webtoon_list.appendChild(newWebtoon)
        comment_list.appendChild(newComment)
        score_list.appendChild(newScore)

        const update_review_button = document.createElement("button");
        const delete_review_button = document.createElement("button");

        update_review_button.innerText = "수정"
        delete_review_button.innerText = "삭제"
        update_review_button.setAttribute("id", myreview.id)
        delete_review_button.setAttribute("id", myreview.id)
        update_review_button.setAttribute("onclick", "UpdateMyreview(this.id)")
        delete_review_button.setAttribute("onclick", "DeleteMyreview(this.id)")
        update_button_list.appendChild(update_review_button)
        delete_button_list.appendChild(delete_review_button)
    })
}

loadMyreviews()

// 나의 리뷰 수정하기 //
async function UpdateMyreview(myreview_id) {
    const update_review_list = document.getElementById("update_box")
    console.log(webtoon_id)

    // comment.style.visibility = "hidden"
    // score.style.visibility = "hidden"

    const input_comment = document.createElement("textarea")
    input_comment.setAttribute("id", "input_comment")
    input_comment.innerText = "댓글을 수정해 주세요!"
    update_review_list.appendChild(input_comment)

    const input_score = document.createElement("textarea")
    input_score.setAttribute("id", "input_score")
    input_score.innerText = "평점을 수정해 주세요!"
    update_review_list.appendChild(input_score)

    const update_review_button = document.createElement("button");
    update_review_button.innerText = "수정"
    update_review_button.setAttribute("id", myreview_id)
    update_review_button.setAttribute("onclick", "handleUpdateMyreview(this.id)")
    update_review_list.appendChild(update_review_button)
}

// 나의 리뷰 삭제하기 //
async function DeleteMyreview(myreview_id) {
    await handleDeleteMyreview(myreview_id)
}