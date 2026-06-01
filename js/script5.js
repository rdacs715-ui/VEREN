// 스크롤 탑
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 팝업창 오늘하루안보기
// 1. 스크롤 탑
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 2. 오늘 날짜 구하기 (YYYY-MM-DD 형식)
function getTodayString() {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const date = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${date}`;
}

// 3. 팝업 닫기 (그냥 닫기)
function closePopup() {
  $('#popup').hide();
}

// 4. 오늘 하루 보지 않기 (로컬 스토리지 저장 후 닫기)
function closeToday() {
  const today = getTodayString();
  localStorage.setItem('popupClosedDate', today);
  closePopup();
}

// 5. 초기 실행
$(document).ready(function () {
  const closedDate = localStorage.getItem('popupClosedDate');
  const today = getTodayString();

  // 저장된 날짜가 오늘과 다를 경우에만 팝업 표시
  if (closedDate !== today) {
    $('#popup').show();
  }

  // AOS 초기화
  AOS.init({
    duration: 1000,  // 전체 애니메이션 속도
    // once: true, // 스크롤 내릴 때 한 번만 실행
    offset: 100, // 화면 하단 기준 발동 거리
  });

  // GNB Hover (필요 시 유지)
  $('.gnb > li').hover(
    function () { $(this).addClass('active'); },
    function () { $(this).removeClass('active'); }
  );
});

// ---------------------------- swiper 슬라이드 ---------------------------- //

// Initialize Swiper
// 로딩 된 후 swiper 실행되도록
window.addEventListener('load', function () {

  // swiper 변수 분리
  const visualSwiper = new Swiper(".visual", {
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
    },
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  // requestAnimationFrame:
  // 브라우저가 화면을 다시 그리기(repaint) 직전에 실행되는 함수
  // → DOM 생성, CSS 적용, 이미지 로딩 등으로 레이아웃 계산이 끝난 '가장 적절한 타이밍'을 잡아줌
  // → setTimeout처럼 임의 시간(ms)이 아니라, 실제 렌더링 흐름에 맞춰 동작해서 더 정확함
  requestAnimationFrame(() => {

    // Swiper 레이아웃을 강제로 다시 계산
    // → 슬라이드 위치, 크기(width/height), translate 값 등을 최신 상태로 업데이트
    // → 초기 실행 시 이미지 로딩이나 부모 요소 높이가 늦게 잡히면
    //    잘못된 위치로 시작했다가 나중에 '툭' 튀는 현상이 발생함

    // 이 코드는 그런 문제를 해결하기 위해
    // "브라우저가 화면을 다 그린 직후"에 Swiper를 다시 정렬시키는 역할을 함
    // → 결과적으로 슬라이드 '움찔(레이아웃 튐)' 현상을 방지
    visualSwiper.update();
  });

  const bestSwiper = new Swiper(".best", {
    slidesPerView: 5,
    spaceBetween: 50,
    //centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 1,
    allowTouchMove: false, // 잡고 넘기기 안 되게
    simulateTouch: false, // 클릭 했을 때 멈추는 걸 방지
    freeMode: true, // 슬라이드가 끊기지 않고 자연스럽게 흐르게
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
    speed: 5000,
  });

  const storeSwiper = new Swiper(".store", {
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    loop: true,
  });

  const withSwiper = new Swiper(".with", {
    slidesPerView: 4,
    spaceBetween: 30,
    loop: true,
    loopAdditionalSlides: 1,
    allowTouchMove: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
});


// ----------------------------- necessities ---------------------------- //


// ==============================
// 1depth (바깥 탭) 함수
// ==============================
function openBoard(evt, boardName) {

  // boards : 모든 탭 콘텐츠 영역 (.board)
  let boards = document.getElementsByClassName("board");

  // 1. 모든 콘텐츠를 일단 다 숨김
  // → 기존에 열려있던 탭 내용 초기화
  for (let i = 0; i < boards.length; i++) {
    boards[i].style.display = "none";
  }


  // tabs : 모든 탭 버튼 (.tablink)
  let tabs = document.getElementsByClassName("tablink");

  // 2. 모든 탭 버튼에서 활성화 클래스(opacity) 제거
  // → 클릭되기 전 상태로 되돌림
  for (let i = 0; i < tabs.length; i++) {

    // " opacity" 문자열을 찾아서 제거
    // 예: "tablink opacity" → "tablink"
    tabs[i].className = tabs[i].className.replace(" opacity", "");
  }


  // 3. 클릭한 탭에 해당하는 콘텐츠만 다시 보여줌
  // boardName = "Board01" 같은 id 값
  document.getElementById(boardName).style.display = "block";

  // 4. 클릭한 탭 버튼에 활성화 클래스 추가
  evt.currentTarget.className += " opacity";
}



// ==============================
// 2depth (안쪽 탭) 함수
// ==============================
function openInnerTab(evt, innerName) {

  // 👉 boards : 안쪽 탭 콘텐츠 (.inner_board)
  let boards = document.getElementsByClassName("inner_board");

  // 1. 안쪽 콘텐츠 전부 숨김
  // → inner 탭도 동일한 방식으로 초기화
  for (let i = 0; i < boards.length; i++) {
    boards[i].style.display = "none";
  }


  // 👉 tabs : 안쪽 탭 버튼 (.inner_tablink)
  let tabs = document.getElementsByClassName("inner_tablink");

  // 2. 모든 안쪽 탭 버튼에서 active 제거
  for (let i = 0; i < tabs.length; i++) {

    // " active" 제거
    tabs[i].className = tabs[i].className.replace(" active", "");
  }


  // 3. 선택한 안쪽 콘텐츠만 보이게
  document.getElementById(innerName).style.display = "block";


  // 4. 클릭한 안쪽 탭 버튼에 active 추가
  evt.currentTarget.className += " active";


  // 5. 페이지 번호 업데이트
  // → 상품 수가 적은 탭은 1페이지만 표시
  const singlePageTabs = ['Inner02', 'Inner03'];
  const numberList = document.querySelector('.number');
  if (numberList) {
    if (singlePageTabs.includes(innerName)) {
      numberList.innerHTML = '<li class="on"><a href="#">1</a></li>';
    } else {
      numberList.innerHTML = '<li class="on"><a href="#">1</a></li><li><a href="#">2</a></li><li><a href="#">3</a></li>';
    }
  }
}

// ==============================
// 페이지 로드시 URL 파라미터로 탭 열기
// ==============================
window.addEventListener("DOMContentLoaded", function () {

  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");

  if (tab) {
    let tabs = document.getElementsByClassName("tablink");

    for (let i = 0; i < tabs.length; i++) {

      let onclickText = tabs[i].getAttribute("onclick");

      if (onclickText && onclickText.includes(tab)) {
        tabs[i].click(); // 기존 함수(openBoard) 실행됨
        break;
      }
    }
  }
});


// 좋아요 하트 버튼 누르면 바뀜
// HTML 문서가 전부 로드된 후 실행
// → DOM 요소(.like-btn)를 안전하게 가져오기 위해 사용
document.addEventListener("DOMContentLoaded", () => {

  // 페이지 안에 있는 모든 좋아요 버튼 선택 (NodeList 형태)
  const likeBtns = document.querySelectorAll(".like-btn");

  // 여러 개 버튼 각각에 클릭 이벤트 등록
  likeBtns.forEach(btn => {
    btn.addEventListener("click", (e) => {

      // 기본 동작 막기
      // → 부모가 <a href="#">일 경우 페이지 이동(맨 위로 이동) 방지
      e.preventDefault();

      // 이벤트 전파 차단
      // → 클릭 이벤트가 부모 <a>까지 전달되는 것 방지
      // → (부모 카드 클릭 시 페이지 이동하는 경우 충돌 방지)
      e.stopPropagation();

      // 현재 버튼에 active 클래스 토글
      // → 있으면 제거, 없으면 추가
      // → CSS에서 heart_on / heart_off 전환됨
      btn.classList.toggle("active");
    });
  });
});


// ==============================
// script.js 맨 아래에 붙여넣기
// 3depth 탭 함수
// ==============================

function openDeepTab(evt, deepName) {

  // 현재 클릭한 버튼의 가장 가까운 .inner_board 안에서만 동작
  // → 여러 inner_board가 동시에 존재할 때 서로 간섭하지 않도록 범위를 한정
  const currentInnerBoard = evt.currentTarget.closest('.inner_board');

  // 1. 해당 inner_board 안의 deep3_board 전부 숨김
  const boards = currentInnerBoard.querySelectorAll('.deep3_board');
  boards.forEach(b => b.style.display = 'none');

  // 2. 해당 inner_board 안의 deep3_tablink 전부 active 제거
  const tabs = currentInnerBoard.querySelectorAll('.deep3_tablink');
  tabs.forEach(t => t.classList.remove('active'));

  // 3. 선택한 deep3_board 표시
  document.getElementById(deepName).style.display = 'block';

  // 4. 클릭한 탭에 active 추가
  evt.currentTarget.classList.add('active');
}