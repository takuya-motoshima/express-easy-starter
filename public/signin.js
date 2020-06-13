const form = $('#form');
const parsleyForm = form.parsley();

form.on('submit', async event => {
  event.preventDefault();
  const isSuccess = await $.ajax({
    type: 'POST',
    url: '/api/signin',
    data: Object.fromEntries(new FormData(form.get(0)).entries())
  });
  if (!isSuccess) {
    return void form
      .find('[name="email"]')
      .parsley()
      .addError('incorrect', { message: 'The email address or password is incorrect.' });
  }
  location.href = '/';
});

parsleyForm.on('field:validate', event => {
  const element = $(event.element);
  if (element.attr('name') === 'email') {
    element.parsley().removeError('incorrect');
  }
});