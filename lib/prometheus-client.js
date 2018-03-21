const qs = require('qs');
const fetch = require('node-fetch');
const { parse } = require('url');

class Client {
    constructor() {
        this._endpoint = null;
    }
    /**
     * init data for starting
     * @param {object} options 
     * @param {string} options.endpoint connection http://{prometheus server ip}:port
     */
    init(options) {
        this._endpoint = options.endpoint;
    }

    /**
     * instant query at a single point in time
     * @param {object} options 
     * @param {string} options.query Prometheus expression query string
     * @param {rfc3339 | unix_timestamp} options.time Evaluation timestamp. Optional. (default: current server time)
     * @api public
     */
    async query(opts) {
        return this._fetch('/query', opts);
    }

    /**
     * expression query over a range of time
     * @param {object} options 
     * @param {string} options.query Prometheus expression query string
     * @param {rfc3339 | unix_timestamp} options.start Start timestamp.
     * @param {rfc3339 | unix_timestamp} options.end End timestamp.
     * @param {duration} options.step Query resolution step width.
     * @api public
     */
    async range(opts) {
        return this._fetch('/query_range', opts);
    }

    _fetch(path, opts) {
        let url = this._url(path);
        const query = qs.stringify(opts);
        url = `${url}?${query}`;
        return fetch(url)
            .then(res => res.json())
            .catch((e) => {
                throw (e);
            });
    }

    _url(...args) {
        const {
            port,
            protocol,
            hostname,
            pathname
        } = parse(this._endpoint);

        const api = `${protocol}//${hostname}:${port}`;
        const path = `${pathname}${args.join('/')}`.replace(/\/+/, '/');
        return api + path;
    }
}

module.exports = new Client();
