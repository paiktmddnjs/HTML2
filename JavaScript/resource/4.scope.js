/*
    Scope
    스코프란, 변수와 함수가 접근할 수 있는 유효범위.
    즉, 이 변수/함수가 어디까지 보이고, 어디까지 쓸 수 있는지를 결정함.

    전역스코프 : 코드 어디서든 접근 가능한 영역(전역에서 선언된 변수/함수)
    함수스코프 : 함수 내부에서만 접근 가능한 영역(var 키워드로 선언한 값)
    블록스코프 : {} 블록 내부에서만 접근이 가능한 영역(let, const 키워드로 선언한 값)
    렉시컬스코프 : 선언된 위치 기준으로 스코프를 결정(js는 렉시컬 스코프를 기반으로 함)
*/

var num1 = 20;

function test1(){
    console.log(num1);
}

function test2(){
    var num1 = 40;
    console.log(num1);
}

//test1(); //20(전역 변수 참조);
//test2(); //40(함수 내부 변수 참조);

//함수 내부에 값이 있으면 그 값을 사용, 없다면 전역에서 값을 찾아서 사용.

var num1 = 20;
var num2 = 10;

function test3(){
    var num1 = 40;
    let num2 = 20;
    test4();
    console.log("num1 in test3 : " + num1);
}

function test4(){
    var num2 = 11;
    console.log("num1 in test4 : " + num1);
    console.log("num2 in test4 : " + num2);
}

test3();
console.log("전역 num1 : " + num1);

/*
    test4()는 test3안에서 호출되었지만, test3의 num1/num2를 가져오지 않고
    자신이 선언된 위치에서의 전역스코프변수를 가져옴. -> 렉시컬 스코프

    렉시컬스코프 != 동적스코프
    동적스코프 : 함수가 실행된 위치기준으로 스코프가 결정
*/

var i = 1000;
for(var i=0; i<10; i++){
    console.log(i);
}
console.log("i = " + i);

let j=1000;
for(let j=0;j<10;j++){
    console.log(j);
}

console.log("j = " + j);

//var는 함수 스코프이기때문에 for문내에 새로운 i가 생기지않고 전역에 i를 저장함. for문이 종료되어도 전역 i는 그대로 유지됨.
//let, const는 블록 스코프이기때문에 for문내에 새로운 스코프를 만들고 j를 해당 스코프에 저장해 사용한 뒤 for문이 종료되면 제거됨.
//별개로 전역에 있는 j는 그대로 전역변수로 사용됨.