import IComponent from "./icomponent";

export interface ITextFieldAttributes {
    required:string;
    regex:string;
    regexMsg:string;
}

export interface ITextField extends IComponent{
    value:string;
    validate:boolean;
    errorValue:string;
}

export interface IChangeEventArguments {
    value:string
}

export interface IFocusInEventArguments {
    value:string
}

export interface IFocusOutEventArguments {
    value:string
}
