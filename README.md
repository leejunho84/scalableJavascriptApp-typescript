### 0.Getting Started
기본적으로 Typescript + vue이고, 파일빌더로는 rollup을 사용하여 systemJs로 파일간 의존성을 관리합니다.
```
> npm install
> npm run server
```

### 1.시작하며
이전 자바스크립트 구조([대규모 웹어플리케이션 개발을 위한 자바스크립트 구조](https://github.com/leejunho84/scalableJavascriptApp))를 개발자의 의도를 명확하게 기술하고 코드의 가독성을 높이며 컴파일전 버그를 미리 예측하기 위해 Typescript로 재개발하였습니다. 또한 그간 ES5로 개발된 것을 ES6이상 상위 버전으로 개발하고 core, sandbox, module, component를 다시 정의하고 모듈 및 컴포넌트의 확장을 어떻게 하는지에 대해 기술하도록 하겠습니다.

### 2.Atomic design pattern
현 구조는 Atomic design pattern 지향하고 있습니다. Atomic design이란 엘리먼트 요소를 아주 작은단위까지 분할하여 그 분할된 요소들을 조합해 어플리케이션을 개발하는 방법론입니다. 예를 들어 `Input, Button, Label`(Atoms) 나누어 개발을 하고 이들을 조합하여 큰덩어리의(search) 컴포넌트(Molecules)를 개발하게 되는 것입니다. 이 방법론은 `Atoms, Molecules, Organisms, Templates, Pages` 5가지 단계로 구분이 됩니다. 각 단계별 자세한 사항은 [Atomic design pattern](http://bradfrost.com/blog/post/atomic-web-design/)을 참고하시면 됩니다.
![Alt text](/diagram/searchdiagram.png "search component")

### 3.core
core는 어플리케이션에서 모듈과 컴포넌트의 생명주기를 관할하고 흔히 쓰일수 있는 여러가지 Utils을 제공합니다. location.href 값을 key, value로 변환해서 반환해주거나, form요소 및 container요소 내에 있는 input요소들을 serialize하는 기능도 포함되어 있습니다. 그중에 가장 중요한 기능중에 하나로 페이지 로드가 완료되었을떄 body태그의 innerHtml를 가져와 data-module-* 과 data-component-*를 찾아 *에 해당하는 스크립트 파일을 동적로딩(systemJs)합니다. 그리곤 context를 주입하고 정의된 기능을 실행합니다.

### 4.sandbox(mediator)
sandbox는 중재자 역할을 합니다. 일관된 인터페이스를 보장하고 모듈간 통신을 관할합니다. 모듈과 컴포넌트는 sandbox를 상속하고 있어 항상 sandbox에 요청하고 sandbox은 그에 해당하는 응답을 해줍니다. 그래서 모듈과 컴포넌트의 변경없이 sandbox의 확장만으로 여러 어플리케이션 개발이 가능합니다. messageProperty나 libs의 변경으로 이를 참조하는 모듈과 컴포넌트 변경을 안하고 sandbox의 확장 및 수정 만으로 된다는 것입니다.

### 5.module & component
모듈과 컴포넌트를 정의하기전 규칙을 정하였습니다. 모듈은 페이지내에 1번만 존재할수 있고 컴포넌트는 여러번 존재할수는 있지만 모듈이 없다면 실행이 불가능합니다. 왜냐하면 모듈은 다른 모듈을 직접적인 연결이 아닌 중재자(sandbox)를 통해 느슨하게 결합되어 있는데 해당 모듈을 찾을때 쓰일수 있는 유일한 key가 필요했습니다. 그래서 해당 key를 모듈의 이름`data-module-*`로 정하였습니다. 모듈의 constructor가 실행이 되면 모듈의 context내에 `data-component-*` 찾아 import를 하게 되는데 모듈의 moduleWillMount에 import된 컴포넌트를 arguments에 넘겨줍니다. 그래서 moduleWillMount에서 넘겨받은 컴포넌트를 참조할수 있게 되는것 입니다.
![Alt text](/diagram/catalogdiagram.png "catagory module")


### 6. 확장



### 7. 추가된 기능
- typescript로 개발되었고 es6 상위 버전으로 개발이 가능합니다.
- 비동기로 자바스크립트를 가져옵니다. file format이 systemJs형대로 빌드되어 저장됩니다.
- vue도 포함되어있어 vue로 개발이 가능합니다.