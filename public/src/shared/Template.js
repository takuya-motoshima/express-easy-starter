import $ from 'jquery';
import _ from 'lodash';

export default class {
  static create(template) {
    let compiler;
    if (typeof (template) === 'string') {
      compiler = _.template(template);
    } else if (template instanceof HTMLScriptElement) {
      const $template = $(template);
      compiler = _.template($template.html());
      $template.remove();
    } else {
      throw new Error('The target parameter must be an HTMLScriptElement or an element ID');
    }
    return compiler;
  }
}

