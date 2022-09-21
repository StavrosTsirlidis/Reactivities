import { makeAutoObservable } from "mobx";


export default class UserStore {
    userActive = false;

    constructor(){
        makeAutoObservable(this);
    }

}