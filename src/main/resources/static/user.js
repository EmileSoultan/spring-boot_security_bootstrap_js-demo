async function loadUserPage() {
  fetch('/api/user')
  .then(response => response.json())
  .then(data => {
    $('#navEmail').append(data.email);
    let role = data.roles.map(role=>role.name + " ");
    $('#navRole').append(role);

    let user = `$(
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.surname}</td>
                <td>${data.email}</td>
                <td>${data.roles.map(role=>role.name)}</td>)`;
    $('#tbody-user').append(user);
  })

  .catch((error) => {
    alert(error);
  })
}

$(async function () {
  await loadUserPage();
});