import IComponent from "./icomponent";

export interface ISearchAttributes {
    keywordMaxLen:number;
    isLatestKeyword:boolean;
}

export interface ISearch extends IComponent {}