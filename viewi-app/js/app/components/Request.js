import { array_merge } from "../functions/array_merge";

class Request {
    url = null;
    method = null;
    headers = null;
    body = null;
    constructor(url, method, headers, body) {
        var $this = this;
        method = typeof method !== 'undefined' ? method : "get";
        headers = typeof headers !== 'undefined' ? headers : [];
        body = typeof body !== 'undefined' ? body : null;
        $this.url = url;
        $this.method = method;
        $this.headers = headers;
        $this.body = body;
    }

    withMethod(method) {
        var $this = this;
        var clone = $this.clone($this);
        clone.method = method;
        return clone;
    }

    withUrl(url) {
        var $this = this;
        var clone = $this.clone($this);
        clone.url = url;
        return clone;
    }

    withHeaders(headers) {
        var $this = this;
        var clone = $this.clone($this);
        clone.headers = array_merge(clone.headers, headers);
        return clone;
    }

    withHeader(name, value) {
        var $this = this;
        var clone = $this.clone($this);
        clone.headers[name] = value;
        return clone;
    }

    withBody(body) {
        var $this = this;
        body = typeof body !== 'undefined' ? body : null;
        var clone = $this.clone($this);
        clone.body = body;
        return clone;
    }

    clone() {
        var $this = this;
        var clone = new Request($this.url, $this.method, $this.headers, $this.body);
        return clone;
    }
}

export { Request }