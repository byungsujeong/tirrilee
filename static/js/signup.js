$(function(){

    /* 가입 진행 여부 판단하는 flag */
    var flag_id = 0;
    var flag_pw = 0;
    var flag_name = 0;
    var flag_email = 0;
    var flag_email1 = 0;
    var flag_email2 = 0;
    var flag_email3 = 0;
    var flag_type = 0;

    <!-- id check -->
    $("#member_id").focusout(function(){
        var member_id = $("#member_id").val()
        var pattern_id = /[^(a-zA-Z0-9)]/;
        if(member_id==""){
            $("#idCheck").html("<font color = red>필수 정보입니다.</font>");
            flag_id = 0;
        } else if(member_id.length < 5 || pattern_id.test(member_id)){
            $("#idCheck").html("<font color = red>아이디는 5자 이상 영문,숫자로 입력해야합니다.</font>");
            flag_id = 0;
        }else{
            $.ajax({
                url : "overlapCheck",
                data : {
                    member_id : member_id
                },
                success : function(result){
                    if(result=="1"){
                        $("#idCheck").html("<font color = red>중복된 아이디 입니다.</font>");
                        flag_id = 0;
                    }else{
                        $("#idCheck").html("<font color = green>사용가능한 아이디 입니다.</font>");
                        flag_id = 1;
                    }
                }
            })
        }
    }) <!-- id check end -->

    <!-- pw check -->
    $("#member_pw").focusout(function(){
        var member_pw = $("#member_pw").val()
        <!-- 문자, 숫자, 특수문자 포함 8글자 이상 형식 -->
        var pattern_pw = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@&$%^&*-]).{8,}$/;
        if(member_pw==""){
            $("#pwCheck").html("<font color = red>필수 정보입니다.</font>");
            var flag_pw = 0;
        } else if(false == pattern_pw.test(member_pw)){
            $("#pwCheck").html("<font color = red>비밀번호는 8자 이상 문자/숫자/특수문자를 포함해야 합니다.</font>");
            var flag_pw = 0;
        }else{
            $("#pwCheck").html("<font color = green>사용가능한 비밀번호 입니다.</font>");
            var flag_pw = 1;
        }
    })<!-- pw check end -->

    <!-- name check -->
    $("#member_name").focusout(function(){
        var member_name = $("#member_name").val()
        if(member_name==""){
            $("#nameCheck").html("<font color = red>필수 정보입니다.</font>");
            var flag_name = 0;
        }else{
            $("#nameCheck").html("<font color = green></font>");
            var flag_name = 1;
        }
    })<!-- name check end -->

    <!-- email1 check -->
    $("#member_email1").focusout(function(){
        var member_email1 = $("#member_email1").val()
        <!-- 영문 대소문자 및 숫자 형식 -->
        var pattern_email_id = /[^(a-zA-Z0-9)]/;
        if(member_email1==""){
            $("#emailCheck").html("<font color = red>필수 정보입니다.</font>");
            var flag_email1 = 0;
        }else if(true == pattern_email_id.test(member_email1)){
            $("#emailCheck").html("<font color = red>옳바르지 않은 형식입니다.</font>");
            var flag_email1 = 0;
        }else{
            $("#emailCheck").html("<font color = green></font>");
            flag_email1 = 1;
        }
    })<!-- email1 check end -->

    <!-- email2 check -->
    $("#member_email2").change(function(){
        var member_email2 = $("#member_email2").val()
        if(member_email2=="etc"){
            /* 셀렉박스에서 기타 선택 시 도메인을 별도로 입력하는 input 태그 생성 */
            $("#etc").html('<input type="text" id="member_email3" placeholder="도메인을 입력하세요.">');
            flag_email2 = 0;
        }else{
            /* 셀렉박스에서 기타에서 다시 다른 option 선택 시 input 태그 삭제 */
            $("#etc").empty();
            flag_email2 = 1;
        }
    })<!-- email2 check end -->

    <!-- email3 check -->
    $(document).on('focusout', '#member_email3', function(){
        var member_email3 = $("#member_email3").val()
        <!-- 도메인 형식 -->
        var pattern_domain = /^[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(member_email3==""){
            $("#emailCheck").html("<font color = red>필수 정보입니다.</font>");
            var flag_email3 = 0;
        }else if(false == pattern_domain.test(member_email3)){
            $("#emailCheck").html("<font color = red>옳바르지 않은 형식입니다.</font>");
            var flag_email3 = 0;
        }else{
            $("#emailCheck").html("<font color = green></font>");
            flag_email3 = 1;
        }
    })<!-- email3 check end -->

    <!-- type check -->
    $("input[name='member_type']").click(function(){
        $("#typeCheck").html("<font color = green></font>");
        flag_type = 1;
    })<!-- type check end -->

    /* 회원가입 클릭 시 필수정보 및 입력형식 재확인 */
    $("#join").click(function(){
        <!-- email flag 변환 -->
        if(flag_email1==1 && flag_email2==1){
            flag_email = 1;
        }else if(flag_email1==1 && flag_email3==1){
            flag_email = 1;
        }
        var member_id = $("#member_id").val()
        var member_pw = $("#member_pw").val()
        var member_name = $("#member_name").val()
        if($("#member_email2").val()=="etc"){
            var member_email = $("#member_email1").val() + "@" + $("#member_email3").val()
        }else{
            var member_email = $("#member_email1").val() + "@" + $("#member_email2").val()
        }
        var member_type = $("input[name='member_type']:checked").val()

        <!-- id check -->
        var pattern_id = /[^(a-zA-Z0-9)]/;
        if(member_id==""){
            $("#idCheck").html("<font color = red>필수 정보입니다.</font>");
            flag_id = 0
        } else if(member_id.length < 5 || pattern_id.test(member_id)){
            $("#idCheck").html("<font color = red>아이디는 5자 이상 영문,숫자로 입력해야합니다.</font>");
            flag_id = 0
        }else{
            $.ajax({
                url : "overlapCheck",
                data : {
                    member_id : member_id
                },
                success : function(result){
                    if(result=="1"){
                        $("#idCheck").html("<font color = red>중복된 아이디 입니다.</font>");
                        flag_id = 0
                    }else{
                        $("#idCheck").html("<font color = green>사용가능한 아이디 입니다.</font>");
                        flag_id = 1
                    }
                }
            })
        }<!-- id check end -->

        <!-- pw check -->
        var pattern_pw = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@&$%^&*-]).{8,}$/;
        if(member_pw==""){
            $("#pwCheck").html("<font color = red>필수 정보입니다.</font>");
            flag_pw = 0;
        } else if(false == pattern_pw.test(member_pw)){
            $("#pwCheck").html("<font color = red>비밀번호는 8자 이상 문자/숫자/특수문자를 포함해야 합니다.</font>");
            flag_pw = 0;
        }else{
            $("#pwCheck").html("<font color = green>사용가능한 비밀번호 입니다.</font>");
            flag_pw = 1;
        }<!-- pw check end -->

        <!-- name check -->
        if(member_name==""){
            $("#nameCheck").html("<font color = red>필수 정보입니다.</font>");
            flag_name = 0;
        }else{
            $("#nameCheck").html("<font color = green></font>");
            flag_name = 1;
        }<!-- name check end -->

        <!-- email check -->
        var pattern_email = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
        if(member_email == "@null"){
            $("#emailCheck").html("<font color = red>필수 정보입니다.</font>");
            flag_email = 0;
        }else if(pattern_email.test(member_email) == false){
            $("#emailCheck").html("<font color = red>옳바르지 않은 형식입니다.</font>");
            flag_email = 0;
        }else{
            $("#emailCheck").html("<font color = green></font>");
            flag_email = 1;
        }<!-- email check end -->

        <!-- type check -->
        if(member_type==null){
            $("#typeCheck").html("<font color = red>가입유형을 선택해주세요.</font>");
            flag_type = 0;
        }else{
            $("#typeCheck").html("<font color = green></font>");
            flag_type = 1;
        }<!-- type check end -->

        if(flag_id==1 && flag_pw==1 && flag_name==1 && flag_email==1 && flag_type==1){
            /* CSRF토큰 가져오기 */
            function getCookie(name) {
                var cookieValue = null;
                if (document.cookie && document.cookie !== '') {
                    var cookies = document.cookie.split(';');
                    for (var i = 0; i < cookies.length; i++) {
                        var cookie = jQuery.trim(cookies[i]);
                        // Does this cookie string begin with the name we want?
                        if (cookie.substring(0, name.length + 1) === (name + '=')) {
                            cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                            break;
                        }
                    }
                }
                return cookieValue;
            }
            var csrftoken = getCookie('csrftoken');

            /* 헤더 설정 */
            function csrfSafeMethod(method) {
                // these HTTP methods do not require CSRF protection
                return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
            }
            $.ajaxSetup({
                beforeSend: function(xhr, settings) {
                    if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                        xhr.setRequestHeader("X-CSRFToken", csrftoken);
                    }
                }
            });

            /* ajax 통신으로 insert 수행 후 result가 1로 반환 될 경우 알림과 함께 메인 페이지로 이동 */
            $.ajax({
                url : "join",
                type : "POST",
                data : {
                    member_id : member_id,
                    member_pw : member_pw,
                    member_name : member_name,
                    member_email : member_email,
                    member_type : member_type
                },
                success : function(result){
                    if(result == 1){
                        alert("가입이 완료 되었습니다.")
                        location.href = "/";
                    }else{
                        return false;
                    }
                }
            })
        }

    })

})