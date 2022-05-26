//스팸 댓글 삭제 코드 남김, 혹시 필요하면 가져다 쓰세요
//주의 : 정상 댓글이 나오면 동작 멈춤, 다시 수동 시작하면 됨
//사용법 : 관리자 페이지 > 댓글 > F12 > console(콘솔) > 이 내용 전체 붙여넣기
//붙여넣기 끝났으면 아래 실행코드 붙여넣으면 삭제 시작됨
//실행 코드 : deleteExecute(20); //삭제 실행 : 숫자는 몇개 삭제할지

function checkLocation2(spamRegExp, replyQuery, tagQuery1, tagQuery2){
	/*
		정규식 참고1 : https://highcode.tistory.com/6
		정규식 참고2 : https://developer.mozilla.org/ko/docs...
	*/
   	try{
		var re = new RegExp(spamRegExp); //삭제 대상 정규식
		var spamReply = document.querySelectorAll(replyQuery)[0].innerText; //삭제 대상
		var regResult = re.exec(spamReply); //내용 검사
		
		if(regResult !== null){ //삭제 대상이 아니면 넘어감
			// 특정 객체 절대 좌표값 확인
			var adtarget = document.querySelectorAll(tagQuery1)[0];
			var adtargetLeft = window.pageXOffset + adtarget.getBoundingClientRect().left;
			var adtargetTop = window.pageYOffset + adtarget.getBoundingClientRect().top;
			
			// 강제 클릭 이벤트 수행 함수 호출
			var evt = document.createEvent("MouseEvents");
			evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, 0, null);
			// console.log(document.elementFromPoint(adtargetLeft, adtargetTop));
			document.elementFromPoint(adtargetLeft, adtargetTop).dispatchEvent(evt);

			window.setTimeout(function(){
				//레이어 클릭
				var adtarget2 = document.querySelectorAll(tagQuery2)[0];
				var adtargetLeft2 = window.pageXOffset + adtarget2.getBoundingClientRect().left;
				var adtargetTop2 = window.pageYOffset + adtarget2.getBoundingClientRect().top;
				
				// 강제 클릭 이벤트 수행 함수 호출
				var evt2 = document.createEvent("MouseEvents");
				evt2.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, 0, null);
				document.elementFromPoint(adtargetLeft2, adtargetTop2).dispatchEvent(evt2);

				console.log("삭제된 내용 : " + spamReply);
			}, 100);

			return true;
		}
		else{
			alert("스팸 댓글이 아닙니다");
			return false;
		}
	}
	catch(error){
		console.error(error);
		alert("문제 발생");
		return false;
	}
};

function deleteExecute(limit){
	try {
		var deleteReply = true;
		var count = 1;
		var deleteSpamReplyInterval = window.setInterval(() => {
			if(deleteReply == false){
				alert("삭제 정지");
				clearInterval(deleteSpamReplyInterval);
				return;
			}
			if(count >= limit){
				alert("삭제 완료");
				clearInterval(deleteSpamReplyInterval);
				return;
			}
				
			console.log("삭제 중 : " + count + "개");

			deleteReply = checkLocation2("파?다?사?워?리", "yt-formatted-string[id=content-text].style-scope", "ytcp-icon-button[id=action-menu-button].style-scope", "tp-yt-paper-item[role=option].style-scope .ytcp-menu-service-item-renderer");
			count++;
		}, 1000);
	}
	catch (error) {
		console.error(error);
		alert("에러 발생");
		clearInterval(deleteSpamReplyInterval);
	}
}