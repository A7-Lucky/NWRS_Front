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

// 검색 페이지 보여주기 //
async function loadWebtoonSearch() {
  webtoons = await getWebtoonsSearch();

  const thumbnail_url = document.getElementById("thumbnail_url");
  webtoons.forEach((webtoon) => {
    // 사진 버전 //
    const imgTag = document.createElement("img");
    imgTag.src = webtoon.thumbnail_url;
    imgTag.setAttribute("id", webtoon.id);
    imgTag.setAttribute("onclick", "webtoonDetail(this.id)");
    thumbnail_url.appendChild(imgTag);
    // 사진 + 글 버전 //
    const title = document.createElement("span");
    title.innerText = webtoon.title;
    title.setAttribute("id", webtoon.id);
    title.setAttribute("onclick", "webtoonDetail(this.id)");
    thumbnail_url.appendChild(title);
  });
}
loadWebtoonSearch();
