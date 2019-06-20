### 0.Getting Started
기본적으로 Typescript + vue이고, 파일빌더로는 rollup을 사용하여 systemJs로 파일간 의존성을 관리합니다.
```
> npm install
> npm run server

> http://localhost:5000/components
```

### 1.시작하며
이전 자바스크립트 구조([대규모 웹어플리케이션 개발을 위한 자바스크립트 구조](https://github.com/leejunho84/scalableJavascriptApp))를 개발자의 의도를 명확하게 기술하고 코드의 가독성을 높이며 컴파일전 버그를 미리 예측하기 위해 Typescript로 재설계하였습니다. 또한 그간 ES5로 개발된 것을 ES6이상 상위 버전으로 개발하고 core, sandbox, module, component를 다시 정의하고 모듈 및 컴포넌트의 확장을 어떻게 하는지에 대해 기술하도록 하겠습니다.

### 2.Atomic design pattern
현 구조는 Atomic design pattern 지향하고 있습니다. Atomic design이란 엘리먼트 요소를 아주 작은단위까지 분할하여 그 분할된 요소들을 조합해 어플리케이션을 개발하는 방법론입니다. 예를 들어 `Input, Button, Label`(Atoms) 나누어 개발을 하고 이들을 조합하여 큰덩어리의(search) 컴포넌트(Molecules)를 개발하게 되는 것입니다. 이 방법론은 `Atoms, Molecules, Organisms, Templates, Pages` 5가지 단계로 구분이 됩니다. 각 단계별 자세한 사항은 [Atomic design pattern](http://bradfrost.com/blog/post/atomic-web-design/)을 참고하시면 됩니다. 아래의 이미지는 searchComponent를 표현한것입니다.

![Alt text](/diagram/search_diagram.png "search component")

### 3.구조

#### core
core는 어플리케이션에서 모듈과 컴포넌트의 생명주기를 관할하고 흔히 쓰일수 있는 여러가지 Utils을 제공합니다. location.href 값을 key, value로 변환해서 반환해주거나, form요소 및 container요소 내에 있는 input요소들을 serialize하는 기능도 포함되어 있습니다. 그중에 가장 중요한 기능중에 하나로 페이지 로드가 완료되었을떄 body태그의 innerHtml를 가져와 data-module-* 과 data-component-*를 찾아 *에 해당하는 스크립트 파일을 동적로딩(systemJs)합니다. 그리곤 context를 주입하고 정의된 기능을 실행합니다.

#### sandbox(mediator)
sandbox는 중재자 역할을 합니다. 일관된 인터페이스를 보장하고 모듈간 통신을 관할합니다. 모듈과 컴포넌트는 sandbox를 상속하고 있어 항상 sandbox에 요청하고 sandbox은 그에 해당하는 응답을 해줍니다. 그래서 모듈과 컴포넌트의 변경없이 sandbox의 확장만으로 여러 어플리케이션 개발이 가능합니다. messageProperty나 libs의 변경으로 이를 참조하는 모듈과 컴포넌트 변경을 안하고 sandbox의 확장 및 수정 만으로 된다는 것입니다.

#### module & component
모듈은 페이지내에 1번만 존재할수 있습니다. 왜냐하면 모듈은 다른모듈에 직접적인 참조가 아닌 중재자(sandbox)를 통해 느슨하게 참조되어 있는데 해당 모듈을 찾기 위해선 페이지내 유일한 key가 필요했습니다. 그러나 key의 중복이 있을경우에는 명확하게 원하는 모듈을 찾을수없기에 이러한 규칙을 정한것이였습니다. 그리고 컴포넌트는 여러번 존재할 수 있지만 이벤트만 보내는 하위 컴포넌트일 경우에 해당 이벤트를 받아 다른 처리를 하는 상위 컴포넌트가 있어야 합니다. 따라서 단일기능으로서 독립적인 컴포넌트 외에 컴포넌트의 사용은 불필한 메모리를 잡는 것이기에 사용금지를 권고합니다.
모듈과 컴포넌트는 상속된 상위 클래스의 constructor실행될때 moduleWillMount와 componentWillMount에 자신의 context에서 `data-component-*`를 찾아 해당객체를 arguments로 넘겨줍니다.
![Alt text](/diagram/category_diagram.png "catagory module")
```javascript

- data-module-category -
public moduleWillMount(...args:any[]){
    const [categoryItem_0, categoryItem_1, ...] = args;
    ...
}

- data-component-categoryItem -
public componentDidMount(...args:any[]){
    const [gallery, button] = args;
    ...
}
```
위 이미지에 표현했듯이 `data-module-category`는 [data-component-categoryItem]을 가지고 있고 `data-component-categoryItem`은 [data-component-gallery, data-component-selectbox]을 가지고 있습니다. 그리고 나머지 `data-component-indicator`는 `data-component-gallery`에 귀속됩니다. 여기서 중요한점은 자신의 context 내에서 컴포넌트만 찾는다는 점입니다.
```
<div class="row" data-module-category>
    <div class="col-sm-6 col-md-4">
        <div class="thumbnail" data-component-categoryitem={}>
            <div class="gallery-container" data-component-gallery={}>
                <div class="img-container">
                    <img src="..." alt="...">
                    ...
                </div>
                <div class="indicator" data-component-indicator="">
                    <i class="active"></i>
                </div>
            </div>
            <div class="caption">
                <h3>Thumbnail label</h3>
                <p>...</p>
                <div class="select-container" data-component-selectbox="">
                    <select>
                        <option value="">Dropdown</option>
                        <option value="addcart">장바구니 담기</option>
                        <option value="direct">바로구매</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</div>
```

### 4.모듈(상위컴포넌트)과 컴포넌트의 데이터 및 이벤트흐름
모듈과 컴포넌트는 데이터와 이벤트관계로 설계되어 있습니다. 모듈은 컴포넌트에 데이터를 주기도하고 컴포넌트에서 받은 이벤트를 다른 컴포넌트에 전달하는 역할도 합니다. 즉 모듈은 자신에 위치하에 있는 컴포넌트의 생명주기를 관리합니다. 컴포넌트는 모듈에서 데이터를 받아 화면을 구성하기도하며 모듈에게 자신의 이벤트를 보낼 수도 있습니다. 그렇다면 데이터와 이벤트의 흐름을 어떻게 전달하고 전달받는지 아래의 예제를 통해 설명을 하겠습니다.
![Alt text](/diagram/event-cycle.png "event cycle");
```javascript
export default class Component extends Sandbox {
    public addEvent(type:string, handler:Function):void
    public fireEvent(type:string, target:EventTarget|null, params?:any):void
} 
```
모든 컴포넌트는 Component를 상속하고 있습니다. Component에는 addEvent와 fireEvent method가 정의되어 있습니다. addEvent는 수신부 fireEvent는 송신부로 설계되어 있습니다. 
```javascript
//Gallery Component
export default class Gallery extends Component {
	...
	componentDidMount(...components:any[]){
        const _this = this;
	    const [indicator] = components;

        // 'selected' 라는 사용자정의 이벤트를 구독하는 부분
		indicator.addEvent('selected', function(this:HTMLElement, args:IIndicatorSelectedEvent){
            //받은 args.index값을 가지고 다른 컴포넌트의 상태를 변경 로직
        });
    }
...

//Indicator Component
export default class Indicator extends Component{
    ...
    componentDidMount(){
        ...
        // 'selected'로 {index:number}값을 포함하여 이벤트를 보낸다.
        _this.fireEvent('selected', this.$el, {index:index});
        ...
    }
...
```

### 5.모듈 및 컴포넌트의 확장
상속받은 클래스의 method를 override하여 확장하는 전략입니다. 기존 로직그대로 화면변경이(vue 컴포넌트 변경, dom변경, 이벤트변경) 있을시 유용하게 사용될 수 있습니다.
```javascript
import Quantity from "./quantity";

export default class QuantitySelect extends Quantity {
	constructor(context:HTMLElement){
		super(context);

		this.selector = '[data-component-quantity-selectbox]';
		this.attrName = 'data-component-quantity-selectbox';
	}

	componentDidMount(...components:any[]):void{
        //변경될 로직 개발
        //mobile first 개발 -> pc는 mobile를 상속하여 다르게 동작될수 있게 개발가능
	}
}

```

### 6.추가된 기능
- typescript로 개발되었고 es6 상위 버전으로 개발이 가능합니다.
- 비동기로 자바스크립트를 가져옵니다. file format이 systemJs 형태로 빌드되어 저장됩니다.
- vue도 포함되어있어 vue로 개발이 가능합니다.