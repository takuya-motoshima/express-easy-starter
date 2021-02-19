$('#form').on('submit', async event => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const res = await $.ajax({
    type: 'POST',
    url: '/api/user/login',
    data: Object.fromEntries(formData)
  });
  if (!res) return void alert('Wrong email or password');
  location.href = '/';
});