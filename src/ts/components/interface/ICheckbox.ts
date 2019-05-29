import IComponent from "./icomponent";

export interface ICheckbox extends IComponent {
    value:boolean;
    validate():boolean;
}

export interface ICheckboxChangeEventArguments {
    checked:boolean;
}