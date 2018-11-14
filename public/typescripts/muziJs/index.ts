import {Dispatcher} from './dispatcher'
import {MicroEvent} from './microEvents'

const AppDispatcher = new Dispatcher();


// @ts-ignore
window.MuziJs = class MuziJs {
    private store: { [key: string]: any } = {};

    constructor(obj: any) {
        if (obj.onChanged) this.onChanged = obj.onChanged;
        if (obj.onCreate) this.onCreate = obj.onCreate;

        this.loadCookieData();

        MicroEvent.mixin(this.store);


        this.registerDispatcher();
        this.componentDidMount();
        this.onCreate();
        this.onChanged();
    }

    private dispatcherEvents: { name: string, func: Function }[] = [];
    private registerDispatcher = () => {
        AppDispatcher.register((payload: any) => {
            for (let i = 0; i < this.dispatcherEvents.length; i++)
                if (this.dispatcherEvents[i].name === payload.eventName) {
                    this.dispatcherEvents[i].func(payload.response);
                    break;
                }
            this.deleteCookie("MuziJs");
            this.setCookie("MuziJs", this.store, {});
            this.store.trigger('change');
            return true;
        });
    };
    addDispatcherEvent = (name: string, func: Function) => {
        this.dispatcherEvents.push({name, func});
    };

    private loadCookieData(){
        const cookie = this.getCookie("MuziJs");
        cookie._events.change = [];
        if (cookie && typeof cookie === 'object')
            this.store = cookie;
    }


    private componentDidMount = () => {
        this.store.bind('change', this.listChanged);
    };
    // @ts-ignore
    private componentWillUnmount = () => {
        this.store.unbind('change', this.listChanged);
    };


    static send = (eventName: string, response: any) => {
        AppDispatcher.dispatch({eventName: eventName, response: response});
    };


    private listChanged = () => {
        this.onChanged();
    };

    private onChanged = () => {
        console.error("Please Declare `onChanged()` in MuziJs Object");
    };

    private onCreate = () => {
    };

    private setCookie = (name: string, value: any, options: any) => {
        value = JSON.stringify(value);
        options = options || {};

        let expires = options.expires;

        if (typeof expires == "number" && expires) {
            const d = new Date();
            d.setTime(d.getTime() + expires * 1000);
            expires = options.expires = d;
        }
        if (expires && expires.toUTCString) {
            options.expires = expires.toUTCString();
        }

        value = encodeURIComponent(value);

        let updatedCookie = name + "=" + value;

        for (let propName in options) {
            updatedCookie += "; " + propName;
            const propValue = options[propName];
            if (propValue !== true) {
                updatedCookie += "=" + propValue;
            }
        }

        document.cookie = updatedCookie;
    };

    private deleteCookie = (name: string) => {
        this.setCookie(name, "", {
            expires: -1
        })
    };

    private getCookie = (name: string) => {
        const matches = document.cookie.match(new RegExp(
            "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? JSON.parse(decodeURIComponent(matches[1])) : undefined;
    };
};



