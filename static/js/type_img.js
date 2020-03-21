/* 라디오 버튼 이미지 변경 */
$(function(){
    $("input[type=radio]").change(function(){
        if($("input[type=radio]:checked").val()=="book"){
            $("#book").empty()
            $("#book").html("<img src='/static/img/book_checked.png' srcset='/static/img/book_checked@2x.png 2x, /static/img/book_checked@3x.png 3x' class='book'>");
            $("input[type=radio]:checked").parent().parent().removeClass('radio_btn').addClass('radio_btn_checked');
            $("input[type=radio]:checked").parent().parent().parent().removeClass('radio_text').addClass('radio_text_checked');
            $("#graphic").empty()
            $("#graphic").html('<img src="/static/img/graphic-tablet.png" srcset="/static/img/graphic-tablet@2x.png 2x, img/graphic-tablet@3x.png 3x" class="graphic-tablet">')
            $("input:radio[value='graphic']").parent().parent().removeClass('radio_btn_checked').addClass('radio_btn');
            $("input:radio[value='graphic']").parent().parent().parent().removeClass('radio_text_checked').addClass('radio_text');
        }else if($("input[type=radio]:checked").val()=="graphic"){
            $("#graphic").empty()
            $("#graphic").html('<img src="/static/img/graphic_checked.png" srcset="/static/img/graphic_checked@2x.png 2x, /static/img/graphic_checked@3x.png 3x" class="graphic-tablet">')
            $("input[type=radio]:checked").parent().parent().removeClass('radio_btn').addClass('radio_btn_checked');
            $("input[type=radio]:checked").parent().parent().parent().removeClass('radio_text').addClass('radio_text_checked');
            $("#book").empty()
            $("#book").html('<img src="/static/img/book.png" srcset="/static/img/book@2x.png 2x, /static/img/book@3x.png 3x" class="book">')
            $("input:radio[value='book']").parent().parent().removeClass('radio_btn_checked').addClass('radio_btn');
            $("input:radio[value='book']").parent().parent().parent().removeClass('radio_text_checked').addClass('radio_text');
        }
    })
})