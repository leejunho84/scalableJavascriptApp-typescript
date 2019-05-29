import IModule from "./imodule";
import { SingleAssignmentDisposable } from "rx";

export interface IHeader extends IModule{
    inspectLogin():Promise<any>;
    setItemCount(itemCount:number):void;
    signIn:boolean;
    redirect:boolean;
    redirectUrl:string;
    attributes:{
        isSignIn:string,
        firstName:string,
        phoneNumber:string,
        emailAddress:string
    };
}

export interface IDynamicFormType {
    name:string;
    dataType:string;
}

export interface ILogined {
    logined:boolean;
}