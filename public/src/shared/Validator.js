import $ from 'jquery';
import 'parsleyjs';
import 'parsleyjs/dist/i18n/ja.js';

export default class {
  constructor(form) {
    if (!(form instanceof $)) {
      this.$form = $(form);
      this.form = form;
    } else {
      this.$form = form;
      this.form = form.get(0);
    }
    this.handles = {
      submit: () => {},
      correctfield: () => {}
    };
    this.parsleyForm = this.$form.parsley({
      inputs: 'input,textarea,select,input[type=hidden],:hidden',
      excluded: 'input[type=button],input[type=submit],input[type=reset],[disabled]',
      errorsContainer: parsleyField => {
        let $errorsContainer = parsleyField.$element.closest('.form-group');
        return $errorsContainer;
      }
    });
    // Triggered when after a form validation succeeds and before the form is actually submitted.Return `false` to interrupt submission.
    this.$form.on('submit', event => {
      event.preventDefault();
      if (this.isValid()) {
        this.handles.submit(event);
      }
    });
    this.parsleyForm.on('field:success', ({ element }) => {
      this.handles.correctfield(element);
    });
  }

  on(event, handle) {
    this.handles[event] = handle;
    return this;
  }

  excludeFieldValidation(name, exclude) {
    this.$form.find(`[name="${name}"]:first`).attr('data-parsley-excluded', exclude ? 'true' : 'false');
    return this;
  }

  isValid() {
    return this.parsleyForm.isValid();
  }

  reset() {
    this.$form.get(0).reset();
    this.parsleyForm.reset();
    return this;
  }

  field(nameAttr) {
    return this.$form.find(`[name=${nameAttr}]`).parsley();
  }
}