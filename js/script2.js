// 스크롤 탑
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 오늘 날짜 구하기
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const date = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
}

// 팝업 닫기
function closePopup() {
  $('#popup').hide();
}

// 오늘 하루 보지 않기
function closeToday() {
  const today = getTodayString();
  localStorage.setItem('popupClosedDate', today);
  closePopup();
}

$(document).ready(function () {

  // 팝업
  const closedDate = localStorage.getItem('popupClosedDate');
  const today = getTodayString();
  if (closedDate !== today) {
    $('#popup').show();
  }

  // GNB 호버
  $('.gnb > li').hover(
    function () { $(this).addClass('active'); },
    function () { $(this).removeClass('active'); }
  );

  // AOS
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
  });

  // 매거진 더보기
  const $posts = $('.post');
  let visibleCount = 3;

  // 처음 3개만 보이게
  $posts.each(function (index) {
    if (index < visibleCount) {
      $(this).show();
    }
  });

  // 더보기 클릭 → 1개씩 추가
  $('#loadMore').on('click', function () {
    visibleCount += 1;
    $posts.each(function (index) {
      if (index < visibleCount) {
        $(this).show();
      }
    });

    if (visibleCount >= $posts.length) {
      $('#loadMore').hide();
    }
  });

});