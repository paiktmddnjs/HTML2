/**
 * Hoisting
 * 
 * JS 엔진이 코드를 실행하기 전에 모든 변수선언과 함수선언을 메모리에 미리 등록해 두는 동작.
 * 그래서 선언이 코드 아래에 있어도 마치 코드의 최상단으로 끌어올려진 것처럼 동작한다.
 * 
 * var 대신 let과 const를 쓰는 이유? : 
 */


/*

* 호이스팅영역 : name1, name2. name3
* TDZ(Temporal Dead Zone) - let/const 변수가 선언되기 전까지 해당 변수를 기록해두는 공간으로 해당영역에 표시된 변수는 아직 
선언시점이 되지 않은 변수로 구분한다.

*/

console.log("선언 전 : ", name1);
var name1 = "jiwon";
console.log("선언 후 : ", name1);

console.log(name2);

//일반변수
let name2 = "sumon";

//일반상수
const name3 = 'jisu';

//const, let은 var와는 다르게 tdz를 이용해서
//마치 호이스팅이 일어나지 않은 것처럼 동작하게 해준다.


hello();

function hello() {

    console.log("안녕하세요.")
}
// 함수의 선언문은 전체 함수가 메모리에 먼저 등록되기 때문에 
// 코드 어디서든 호출이 가능함.

