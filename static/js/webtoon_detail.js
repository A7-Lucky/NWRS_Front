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

// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const webtoon_id = urlParams.get('id');

async function loadWebtoonDetail(webtoon_id){
    const webtoon = await getWebtoonsDetail(webtoon_id);

    const title = document.getElementById("title")
    const day = document.getElementById("day")
    const story = document.getElementById("story")
    const webtoon_url = document.getElementById("webtoon_url").onclick = function(){
        let URL = webtoon.webtoon_url
        webtoon_url = window.open(URL)
    }
    const thumbnail_url = document.getElementById("thumbnail_url")
        let imgTag = document.createElement('img')
        imgTag.src = webtoon.thumbnail_url
        thumbnail_url.appendChild(imgTag)

    const genre = document.getElementById("genre")

    title.innerText = webtoon.title
    day.innerText = "[ 연재 요일 ]\n" + webtoon.day + "요일"
    genre.innerText = "[ 장르 ]\n" + webtoon.genre[0]["name"]
    story.innerText = "[ 줄거리 ]\n" + webtoon.story
}
loadWebtoonDetail(webtoon_id)

// 추천 웹툰 리스트 보여주기 //
async function loadRecommend(){
    webtoons = await getRecommend()

    const webtoon_list = document.getElementById("recommends")
    webtoons.forEach(webtoon => {
        const newWebtoon = document.createElement("li");
        newWebtoon.innerText = webtoon.title
        newWebtoon.setAttribute("id", webtoon.id)
        newWebtoon.setAttribute("onclick", "webtoonDetail(this.id)")
        webtoon_list.appendChild(newWebtoon)
    })
}
loadRecommend()

// 웹툰 리뷰 리스트 보여주기 //
async function loadWebtoonReview(webtoon_id){
    reviews = await getWebtoonReview(webtoon_id)
    const review_list = document.getElementById("reviews")

    reviews.forEach(review => {
        const newReview = document.createElement("li");
        newReview.setAttribute("id", review.id)
        newReview.innerText = "작성자 : " + review.user + " / 댓글 : " + review.comment + " / 평점 : " + review.my_score
        review_list.appendChild(newReview)
    })
}

loadWebtoonReview(webtoon_id)

// 웹툰 리뷰 작성하기 //
function handleWebtoonReviewCreate(){
    const comment = document.getElementById("comment").value
    const my_score = document.getElementById("my_score").value
    
    CreateWebtoonReview(comment, my_score)
}