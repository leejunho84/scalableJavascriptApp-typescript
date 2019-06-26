<template>
    <section class="contents">
        <nav class="navbar navbar-inverse navbar-fixed-top" data-module-header="{isSignIn:true,firstName:leejunho,phoneNumber:01089736175,emailAddress:div51jun@gmail.com}">
            <div class="container">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <a class="navbar-brand" href="#">Typescript</a>
                </div>
            </div>
        </nav>
        <div class="container" style="padding:48px;">
            <h3>module & component</h3>
            <div class="row" data-module-category="{}">
                <div class="col-sm-6 col-md-4">
                    <div class="thumbnail" data-component-categoryitem="{}">
                        <div class="gallery-container" data-component-gallery="{}">
                            <div class="img-container">
                                <img class="active" src="/img/number1.png" alt="number1">
                                <img src="/img/number2.png" alt="number2">
                                <img src="/img/number3.png" alt="number3">
                            </div>
                            <div class="indicator" data-component-indicator="{}">
                                <i class="icon-indicator active"></i>
                            </div>
                        </div>
                        <div class="caption">
                            <h3>Thumbnail label</h3>
                            <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
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
                
            <h3>Extend</h3>
            <div class="row">
                <div class="col-md-6">
                    <h4>component-postcodify (기본 주소검색)</h4>
                    <div class="postcodify" data-component-postcodify="{api://api.poesis.kr/post/search.php, required:true}">
                        <div class="input-group" data-component-textfield={required:true}>
                            <input type="text" class="form-control" placeholder="주소를 입력해주세요" aria-describedby="basic-addon2">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button">검색</button>
                            </span>
                        </div>
                        <div class="result-wrap"></div>
                    </div>
                </div>
                <div class="col-md-6">
                    <h4>component-daumpost</h4>
                    <div class="daumpost" data-component-daumpost="{}">
                        <div class="input-group" data-component-textfield="{required:true}">
                            <input type="text" class="form-control" placeholder="주소를 입력해주세요" aria-describedby="basic-addon2">
                            <span class="input-group-btn">
                                <button class="btn btn-default" type="button">검색</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>