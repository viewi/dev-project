import { array_merge } from "../functions/array_merge";

class Response {
    url = null;
    status = null;
    statusText = null;
    headers = null;
    body = null;
    constructor(url, status, statusText, headers, body) {
        var $this = this;
        headers = typeof headers !== 'undefined' ? headers : [];
        body = typeof body !== 'undefined' ? body : null;
        $this.url = url;
        $this.status = status;
        $this.statusText = statusText;
        $this.headers = headers;
        $this.body = body;
    }

    withUrl(url) {
        var $this = this;
        var clone = $this.clone($this);
        clone.url = url;
        return clone;
    }

    withStatus(status) {
        var $this = this;
        var clone = $this.clone($this);
        clone.status = status;
        return clone;
    }

    withStatusText(statusText) {
        var $this = this;
        var clone = $this.clone($this);
        clone.statusText = statusText;
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

    ok() {
        var $this = this;
        return $this.status >= 200 && $this.status < 300;
    }

    clone() {
        var $this = this;
        var clone = new Response($this.url, $this.status, $this.statusText, $this.headers, $this.body);
        return clone;
    }
}

export { Response }