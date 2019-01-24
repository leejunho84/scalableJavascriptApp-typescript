import Sandbox from './sandbox';

let sandbox = new Sandbox();
let body = document.getElementsByTagName('body')[0];
sandbox.moduleEventInjection(body.innerHTML);
