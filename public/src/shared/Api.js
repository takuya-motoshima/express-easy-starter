import $ from 'jquery';

export default class {
  constructor() {
    this.baseUrl = this.resource;
    this.jqXHR = null;
    this.handles = {
      beforeSend: () => {},
      sendProgress: () => {},
      sendCompleted: () => {}
    };
  }

  abort() {
    if (this.jqXHR) {
      // console.log('Abort sending');
      this.jqXHR.abort();
    }
    return this;
  }

  on(event, handle) {
    this.handles[event] = handle;
    return this;
  }

  get resource() {
    return 'Resource name';
  }

  get(id) {
    return this.request({ path: id });
  }

  post(data) {
    return this.request({ type: 'POST', data });
  }

  put(id, data, path = null) {
    // console.log(`PUT ID: ${id}`);
    path = path ? `${path.replace(/^\/|\/$/g, '')}/${id}` : id;
    return this.request({ type: 'PUT', path, data });
  }

  delete(id) {
    return this.request({ type: 'DELETE', path: id });
  }

  query(data) {
    return this.request({ data });
  }

  request({ type = 'GET', path = null, data = null } = {}) {
    return new Promise((resolve, reject) => {
      let url = this.baseUrl;
      if (path) {
        url += `/${path.toString().replace(/^\//, '')}`;
      }
      // console.log(`Send to ${type} ${url}`);
      let option = {
        type,
        data,
        crossDomain: true,
        xhr: () => {
          const xhr = new XMLHttpRequest();
          let befored = false;
          xhr.upload.addEventListener('progress', event => {
            if (event.lengthComputable) {
              if (!befored) {
                this.handles.beforeSend(event.total);
                befored = true;
              }
              this.handles.sendProgress(event.loaded, event.total);
              // const progress = Math.round(100 * event.loaded / event.total);
              // if (progress === 100) {
              //   this.handles.sendCompleted();
              // }
            }
          });
          return xhr;
        },
        // xhrFields: {
        //   withCredentials: true
        // },
        // beforeSend: (xhr, settings) => {
        //   xhr.url = settings.url;
        // }
      };
      if (data && data.constructor == FormData) {
        Object.assign(option, { processData: false, contentType: false })
        // option = { ...option, processData: false, contentType: false };
      }
      this.jqXHR = $.ajax(url, option);
      this.jqXHR
        .then(response => {
          this.handles.sendCompleted(response);
          resolve(response);
        })
        .catch((jqXHR, textStatus, errorThrown) => {
          reject(new Error(`${jqXHR.status} ${errorThrown}`));
        });
      // return this.jqXHR;
    });
  }
}