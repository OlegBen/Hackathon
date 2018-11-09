import {Session} from "inspector";
import express = require('express')
import {Handshake, Socket} from "socket.io";
import {_RequetsSett} from "../middleware/projectSettings";

export interface _EmptyObj {
    [key: string]: any
}


export interface _User {
    id: number
    email:string
}

export interface _AuthorizeData{
    password:string,
    email:string,
    nick?:string,
    password_repeat?:string,
    [key: string]: string | undefined;
}

export interface _Session extends Session {
    user: _User,
    destroy: Function,
    id:string
}

export interface _RequestSession extends express.Request {
    session: _Session
}

export interface _RequestUser extends express.Request, _RequestSession{
    user: _User | null
}

//Errors
export interface _ResponseSendHttpError extends express.Response{
    sendHttpError: Function
}

export class _ErrorStatus extends Error {
    status: number;
    message: string;

    constructor(text: string) {
        super();
        this.message = text;
        this.status = 0
    }
}


//Socket
export interface _Socket extends Socket{
    handshake:_Handshake
}

export interface  _Handshake extends  Handshake{
    user:_User
    session:_Session
    cookies:any
}


export interface _RequestSettUser extends _RequestUser, _RequetsSett{}
