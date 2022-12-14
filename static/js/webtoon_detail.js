// 로그인한 사용자 액세스 정보 추적 //
function parseJwt(token) {
  var base64Url = localStorage.getItem("access").split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

// 디테일 페이지 보여주기 //
const urlParams = new URLSearchParams(window.location.search);
const webtoon_id = urlParams.get("id");

async function loadWebtoonDetail(webtoon_id) {
  const webtoon = await getWebtoonsDetail(webtoon_id);

  const title = document.getElementById("title");
  const day = document.getElementById("day");
  const story = document.getElementById("story");
  const webtoon_url = (document.getElementById("webtoon_url").onclick =
    function () {
      let URL = webtoon.webtoon_url;
      webtoon_url = window.open(URL);
    });
  const thumbnail_url = document.getElementById("thumbnail_url");
  let imgTag = document.createElement("img");
  imgTag.src = webtoon.thumbnail_url;
  thumbnail_url.appendChild(imgTag);

  const genre = document.getElementById("genre");

  title.innerText = webtoon.title;
  day.innerText = "[ 연재 요일 ]\n" + webtoon.day + "요일";
  genre.innerText = "[ 장르 ]\n" + webtoon.genre[0]["name"];
  story.innerText = "[ 줄거리 ]\n" + webtoon.story;
}
loadWebtoonDetail(webtoon_id);

// 추천 웹툰 리스트 보여주기 //
async function loadRecommend() {
  webtoons = await getRecommend();

  const webtoon_list = document.getElementById("recommends");
  webtoons.forEach((webtoon) => {
    const newWebtoon = document.createElement("li");
    newWebtoon.innerText = webtoon.title;
    newWebtoon.setAttribute("id", webtoon.id);
    newWebtoon.setAttribute("onclick", "webtoonDetail(this.id)");
    webtoon_list.appendChild(newWebtoon);
  });
}
loadRecommend();

// 웹툰 리뷰 리스트 보여주기 //
async function loadWebtoonReview(webtoon_id) {
  reviews = await getWebtoonReview(webtoon_id);
  const author_list = document.getElementById("author");
  const comment_list = document.getElementById("comment");
  const score_list = document.getElementById("score");
  const update_button_list = document.getElementById("update_button");
  const delete_button_list = document.getElementById("delete_button");

  reviews.forEach((review) => {
    const newAuthor = document.createElement("li");
    const newComment = document.createElement("li");
    const newScore = document.createElement("li");
    newAuthor.setAttribute("id", review.id);
    newComment.setAttribute("id", review.id);
    newScore.setAttribute("id", review.id);
    newAuthor.innerText = "작성자 : " + review.user;
    newComment.innerText = "댓글 : " + review.comment;
    newScore.innerText = "평점 : " + review.my_score;
    author_list.appendChild(newAuthor);
    comment_list.appendChild(newComment);
    score_list.appendChild(newScore);

    const update_review_button = document.createElement("button");
    const delete_review_button = document.createElement("button");

    update_review_button.innerText = "수정";
    delete_review_button.innerText = "삭제";
    update_review_button.setAttribute("id", review.id);
    delete_review_button.setAttribute("id", review.id);
    update_review_button.setAttribute(
      "onclick",
      "UpdateWebtoonreview(this.id)"
    );
    delete_review_button.setAttribute(
      "onclick",
      "DeleteWebtoonreview(this.id)"
    );
    update_button_list.appendChild(update_review_button);
    delete_button_list.appendChild(delete_review_button);
  });
}

loadWebtoonReview(webtoon_id);

// 웹툰 리뷰 작성하기 //
function handleWebtoonReviewCreate() {
  const comment = document.getElementById("review_comment").value;
  const my_score = document.getElementById("my_score").value;
  console.log(comment)
  CreateWebtoonReview(comment, my_score);
}

//웹툰 리뷰 수정하기 //
async function UpdateWebtoonreview(review_id) {
  const update_review_list = document.getElementById("update_box");

  // comment.style.visibility = "hidden"
  // score.style.visibility = "hidden"

  const input_comment = document.createElement("textarea");
  input_comment.setAttribute("id", "input_comment");
  input_comment.innerText = "댓글을 수정해 주세요!";
  update_review_list.appendChild(input_comment);

  const input_score = document.createElement("textarea");
  input_score.setAttribute("id", "input_score");
  input_score.innerText = "평점을 수정해 주세요!";
  update_review_list.appendChild(input_score);

  const update_review_button = document.createElement("button");
  update_review_button.innerText = "수정";
  update_review_button.setAttribute("id", review_id);
  update_review_button.setAttribute(
    "onclick",
    "handleUpdateWebtoonreview(this.id)"
  );
  update_review_list.appendChild(update_review_button);
}

// 웹툰 리뷰 삭제하기 //
async function DeleteWebtoonreview(review_id) {
  await handleDeleteWebtoonreview(review_id);
}
