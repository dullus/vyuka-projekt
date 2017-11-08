import $ from 'jquery';

class Ajax {

    constructor(dataType = 'JSON') {
        this.dataType = dataType;
    }

    setDataType(dataType) {
        this.dataType = dataType;
    }

    _ajax(type, url, data) {
        return new Promise((resolve, reject) => {
            var opts = {
                type: type,
                dataType: this.dataType,
                success: resolve,
                error: function(jqXHR) {
                    reject(jqXHR.responseJSON);
                }
            };
            opts.data = data;
            return $.ajax(url, opts);
        });
    }

    get(url, data) {
        return this._ajax('GET', url, data);
    }

    post(url, data) {
        return this._ajax('POST', url, data);
    }

    put(url, data) {
        return this._ajax('PUT', url, data);
    }

    patch(url, data) {
        return this._ajax('PATCH', url, data);
    }

    delete(url, data) {
        return this._ajax('DELETE', url, data);
    }

    upload(url, fileData) {
        let formData = new FormData();
        formData.append('picture', fileData, fileData.name);
        return new Promise((resolve, reject) => {
            var opts = {
                type: 'POST',
                data: formData,
                async: true,
                cache: false,
                contentType: false,
                enctype: 'multipart/form-data',
                processData: false,
                success: resolve,
                error: function(jqXHR) {
                    reject(jqXHR.responseJSON);
                }
            };
            return $.ajax(url, opts);
        });
    }
};

export let ajax = new Ajax();
