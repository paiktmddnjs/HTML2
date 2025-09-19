//js의 함수 정의 -> function 함수명(매개변수...){
//                      실행코드...
//                  }

function test1(){
    console.log("test1 함수 실행");
}

//자바스크립트는 함수를 변수에 할당할 수 있음.
//입급객체, 1종객체/변수 -> 변수에 담을 수 있다, 함수의 인자로 전달이 가능, 함수 결과로 반환할 수 있다.
//js에서 함수는 1종객체이기때문에 위에 모든게 가능하다.
//js에서 함수의 이름이 필수는 아니다. 다만 호출을 위해서는 함수의 이름이 필요하기 떄문에 필요시 작성한다.
const test3 = function(){
    console.log("test2 함수 실행");
}

test1();
test3();
test1();

// js는 오버로딩을 지원하지않는다. 매개변수의 갯수가 달라도 동일한 메서드로 인식한다.
let test4 = function(name){
    //js의 함수는 기본적으로 arguments객체를 가지고있음 -> 전달받은 모든 인자값이 들어있는 배열
    console.log(arguments)
    console.log("test4 함수 실행")
    console.log(name);
}

test4();
test4("최지원");
test4("최지원", 55);
test4("최지원", 55, "경기도 광명시", ' 철산2동');

let test5 = () => 200;
window.console.log(test5());