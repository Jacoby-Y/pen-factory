function set(target, key, value, receiver) { 
    if (key == "settings") return Reflect.set(target, key, value, receiver);
    let show = value;
    if (data.settings != undefined) {
        for (let i = 0; i < data.settings.length; i++) {
            if (key != data.settings[i].k) continue;
            const obj = data.settings[i];
            const type = obj.type;
            const display = obj.display;

            if (obj.skip == true) return Reflect.set(target, key, value, receiver);
            
            if (type != undefined) {
                if (typeof value == "number") {
                    if (type == "int" && !isInt(value)) {
                        console.warn("Variable is int, but value is float!\nIt will be rounded to int");
                        value = Math.round(value);
                    }
                    else if (type == "bool") {
                        console.warn(`Trying to set bool to a number! Value will not be assigned.\nKey: ${key}, value: ${value}`)
                        return Reflect.set(target, key, data.show[key], receiver);
                    }
                } else if (typeof value == "string") {
                    if (type == "int" || type == "float") {
                        console.warn(`Trying to set ${type} to string! Value will not be assigned.\nKey: ${key}, value: "${value}"`)
                        return Reflect.set(target, key, data.show[key], receiver);
                    } else if (type == "bool") {
                        console.warn(`Trying to set bool to a string! Value will not be assigned.\nKey: ${key}, value: "${value}"`)
                        return Reflect.set(target, key, data.show[key], receiver);
                    }
                } 
            }
            if (display == undefined) {
                // console.log(`key: ${key}, show: ${show}`);
                show = value;
            } else {
                show = display(value);
            }
            break;
        }
    }

    update(key, show);
    return Reflect.set(target, key, value, receiver);
}

let data = new Proxy({}, { set: set });

const update = (k, v)=>{
    for (const elem of document.body.getElementsByTagName("*")) {
        if (!elem.hasAttribute("watch")) continue;
        
        let txt = elem.innerText;
        if (elem.hasAttribute("content")) {
            txt = elem.getAttribute("content");
        } else {
            elem.setAttribute("content", elem.innerText);
        }
        if (!txt.includes("{") || !txt.includes("}")) continue;
        let sub_str = txt.substring( txt.lastIndexOf("{") + 1, txt.lastIndexOf("}") ).trim();
        // if (sub_str[0] == "!") {
        //     sub_str = sub_str.substring(1, sub_str.lenth);
        //     console.log(`key: ${sub_str}, value: ${data[sub_str]}`);
        //     elem.innerText = elem.getAttribute("content").replace(`{!${sub_str}}`, data[sub_str]);
        // }
        if (sub_str != k) continue;

        elem.innerText = elem.getAttribute("content").replace(`{${sub_str}}`, v);
    }
}
const isInt = (num)=>{
    return num == Math.floor(num);
}

const local = {
    clear() {
        localStorage.clear()
        location.reload();
    },
    store() {
        let store = {...data};
        // console.log(`in store: ${data.ink} ${store.ink}`);
        store.settings = undefined;
        localStorage.setItem("data", JSON.stringify(store));
        // console.log(`load store: ${this.load().ink}`);
    },
    load() {
        let store = localStorage.getItem("data");
        if (store == null) {
            // console.error("localStorage has no 'data' key. Set it with 'local_store' function");
            return;
        } 
        let parsed = JSON.parse(store);
        // console.log(`in load: ${parsed.ink}`);
        return new Proxy(parsed, { set: set }); //JSON.parse(store)
    },
    finish() {
        for (const key in data) { 
            if (key == "settings") continue;
            update(key, data[key]);
        };
    },
    can_load() {
        return localStorage.getItem("data") != null;
    }
}