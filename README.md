### 0.Getting Started
기본적으로 Typescript + vue이고, 파일빌더로는 rollup을 사용하여 systemJs로 파일간 의존성을 관리합니다.
```
> npm install
> npm run server
```

### 1.시작하며
이전 자바스크립트 구조([대규모 웹어플리케이션 개발을 위한 자바스크립트 구조](https://github.com/leejunho84/scalableJavascriptApp))를 개발자의 의도를 명확하게 기술하고 코드의 가독성을 높이며 컴파일전 버그를 미리 예측하기 위해 Typescript로 재개발하였습니다. 또한 그간 ES5로 개발된 것을 ES6이상 상위 버전으로 개발하고 core, sandbox, module, component를 다시 정의하고 모듈 및 컴포넌트의 확장을 어떻게 하는지에 대해 기술하도록 하겠습니다.

### 2.Atomic design pattern
현 구조는 Atomic design pattern 지향하고 있습니다. Atomic design이란 엘리먼트 요소를 아주 작은단위까지 분할하여 재사용을 높게 하기위한 방법론입니다. 예를 들어 `Input, Button, Label`(Atoms) 나누어 개발을 하고 이들을 조합하여 큰덩어리의(search) 컴포넌트(Molecules)를 개발하게 되는 것이다. 이 방법론은 `Atoms, Molecules, Organisms, Templates, Pages` 5가지 단계로 구분이 되며, 각 단계별이 어떻게 정의 되는지 자세한 사항은 [Atomic design pattern](http://bradfrost.com/blog/post/atomic-web-design/)을 참고하시면 됩니다.

### 3.core
core는 어플리케이션에서 모듈과 컴포넌트의 생명주기를 관할하고, 여러가지 Utils을 재공한다. core는 페이지에 로드가 완료되었을떄 body태그의 innerHtml를 가져와 data-module-* 과 data-component-* 이 2가지를 찾아 *에 해당하는 name으로 스크립트 파일을 동적로딩(systemJs)한다. 그리곤 context를 주입고 정의된 기능을 실행한다.

### 4.sandbox(mediator)
sandbox는 중재자 역할을 한다. 모듈간의 참조를 

### 5.module
moduled의 규칙 
1.Only call your own methods or property on the sandbox
    샌드박스(중재자)를 통해 자신의 메소드 또는 프로퍼티만 호출한다.
2.Dont access DOM elements outside of your context
    자신의 컨텍스트 밖의 돔요소에 접근하면 안된다.
3.Dont access non-native global objects
    비전역객제에 접근하지 마라.
4.Anything else you need, ask the sandbox
    필요한것이 있다면 샌드박스에 물어보라.
5.Dont create global objects
    전역객체를 생성하지 마라
6.Dont directly reference other modules
    직접 다른모듈의 참조하지 마라.

### 6. component
### 7. 추가된 기능