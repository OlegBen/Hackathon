export const MicroEvent = function () {
};

MicroEvent.prototype = {
    // @ts-ignore
    bind: function (event:any, fct:any) {
        this._events = this._events || {};
        this._events[event] = this._events[event] || [];
        this._events[event].push(fct);
    },
    // @ts-ignore
    unbind: function (event:any, fct:any) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        this._events[event].splice(this._events[event].indexOf(fct), 1);
    },
    // @ts-ignore
    trigger: function (event:any) {
        this._events = this._events || {};
        if (event in this._events === false) return;
        for (let i = 0; i < this._events[event].length; i++) {
            this._events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
        }
    }
};

MicroEvent.mixin = function (destObject: any) {
    const props = ['bind', 'unbind', 'trigger'];
    for (let i = 0; i < props.length; i++) {
        if (typeof destObject === 'function') {
            destObject.prototype[props[i]] = MicroEvent.prototype[props[i]];
        } else {
            destObject[props[i]] = MicroEvent.prototype[props[i]];
        }
    }
    return destObject;
};

