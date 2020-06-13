const form = $('#form');
const password = form.find('#password');
const newPassword = form.find('#newPassword');
const confirmPassword = form.find('#confirmPassword');
const id = form.find('#id').val();
const parsleyForm = form.parsley({ excluded: '[disabled]' });

form.on('submit', async event => {
  event.preventDefault();
  const res = await $.ajax({
    type: 'PUT',
    url: `/api/user/${id}`,
    data: Object.fromEntries(new FormData(form.get(0)).entries())
  });
  if (res.error && res.error === 'wrongPassword') {
    return void password.parsley().addError('incorrect', { message: 'Current password is wrong.' });
  }
  alert('Saved the user profile.');
});

parsleyForm.on('field:validate', event => {
  const element = $(event.element);
  if (element.attr('name') === 'password') {
    element.parsley().removeError('incorrect');
  }
});

$('[name="changePassword"]').on('change',  event => {
  if ($(event.currentTarget).prop('checked')) {
    password.prop('disabled', false);
    newPassword.prop('disabled', false);
    confirmPassword.prop('disabled', false);
  } else {
    password.prop('disabled', true).val('').parsley('reset');
    newPassword.prop('disabled', true).val('').parsley('reset');
    confirmPassword.prop('disabled', true).val('').parsley('reset');
  }
});

