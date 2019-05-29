import IComponent from "./icomponent";

export interface ISelectbox extends IComponent {}

export interface ISelectboxAttributes {}

export interface ISelectOption {
    label:string,
    value:string,
    selected:string,
    disabled:string
}