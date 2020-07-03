import Component from "../../components/component";

export interface IIdComponent extends Component {}
export interface IPasswordComponent extends Component {}
export interface IUsableAutoLogin extends Component {}

export interface ILogined {
    ResponseObject:{
        isError:string,
        _global:string
    }
}