// Q&A 질문박스(한 번에 하나씩만)
$(function () {

    // .answer 박스 숨기기
    $(".answer").hide();

    // .question 박스를 클릭하면,
    $(".question").click(function () {

        // 다른 열려있는 answer 박스 닫기
        // .not() : 특정 요소를 제외
        // $(this).next() : 현재 클릭된 요소 기준으로 바로 다음 형제 요소 선택
        // 지금 클릭한 요소의 다음 요소는 제외한다는 뜻
        $(".answer").not($(this).next()).slideUp();

        // 다른 question 박스의 아이콘을 원래대로
        // .not(this) : 클릭한 question 박스를 제외하고 나머지만 선택
        $(".question").not(this).children().children('img').removeClass('turn');

        // 현재 클릭한 박스 토글
        $(this).next().slideToggle();
        $(this).children().children('img').toggleClass('turn');
    });
});