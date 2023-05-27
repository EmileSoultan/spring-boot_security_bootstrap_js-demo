const url = '/api/admin'
const rolesFromDB = [{ id: 1, name: 'ADMIN' }, { id: 2, name: 'USER' }]

async function loadUserPage () {
	fetch('/api/user').then(response => response.json()).then(data => {
		$('#navEmail').append(data.email)
		let role = data.roles.map(role => role.name + ' ')
		$('#navRole').append(role)
	}).catch((error) => {
		alert(error)
	})
}

$(async function () {
	await loadUserPage()
})
const table = document.getElementById('tbody-admin')

const modalEdit = new bootstrap.Modal(document.getElementById('modalEdit'))
const formEdit = document.getElementById('formEdit')
const id = document.getElementById('idEdit')
const name = document.getElementById('nameEdit')
const lastname = document.getElementById('lastNameEdit')
const email = document.getElementById('emailEdit')
const password = document.getElementById('passwordEdit')
const roles = document.getElementById('userRoleEdit')

const modalDelete = new bootstrap.Modal(document.getElementById('modalDelete'))
const formDelete = document.getElementById('formDelete')
const idDelete = document.getElementById('idDel')
const nameDelete = document.getElementById('nameDel')
const lastnameDelete = document.getElementById('lastNameDel')
const emailDelete = document.getElementById('emailDel')
const rolesDelete = document.getElementById('userRoleDel')

let result = ''
const showUsers = (users) => {
	const array = Array.from(users)
	array.forEach(user => {
		result += `<tr>
                            <td>${user.id}</td>
                            <td>${user.name}</td>
                            <td>${user.surname}</td>
                            <td>${user.email}</td>
                            <td>${user.roles.map(role => role.name)}</td>
                            <td class="text-center text-white"><a class="btnEdit btn btn-primary">Edit</a></td>
                            <td class="text-center text-white"><a class="btnDelete btn btn-danger">Delete</a></td>
                       </tr>
                    `
	})
	table.innerHTML = result

}

fetch(url).
	then(response => response.json()).
	then(data => showUsers(data)).
	catch(error => console.log(error))

const reloadShowUsers = () => {
	fetch(url).then(response => response.json()).then(data => {
		result = ''
		showUsers(data)
	})
}
const on = (element, event, selector, handler) => {
	element.addEventListener(event, e => {
		if (e.target.closest(selector)) {
			handler(e)
		}
	})
}

const formAddNewUser = document.getElementById('formNewUser')

formAddNewUser.addEventListener('submit', function(event) {
	event.preventDefault();
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			name: formAddNewUser.name.value,
			surname: formAddNewUser.lastName.value,
			email: formAddNewUser.email.value,
			password: formAddNewUser.password.value,
			roles: formAddNewUser.userRole.value === 1 ? [
				{
					'id': 1,
					'value': 'ADMIN',
					'users': null,
					'authority': 'ADMIN',
				},
			] : [
				{
					'id': 2,
					'value': 'USER',
					'users': null,
					'authority': 'USER',
				},
			],
		}),
	}).then(formAddNewUser.reset())
	.then(res => res.json())
	.then(data => showUsers(data))
	.catch(error => console.log(error))
	.then(reloadShowUsers)
	$('.nav-tabs a[href="#nav-admin"]').tab('show')
});

let idForm = 0

on(document, 'click', '.btnEdit', e => {
	const row = e.target.parentNode.parentNode
	idForm = row.firstElementChild.innerHTML
	fetch(url + '/' + idForm, {
		method: 'GET',
	}).
		then(response => response.json()).
		then(data => findUserById(data)).
		catch(error => console.log(error))
	const findUserById = (user) => {
		id.value = user.id
		name.value = user.name
		lastname.value = user.surname
		email.value = user.email
		password.value = user.password
		roles.innerHTML = `
    	<option value = "${rolesFromDB[0].id}">${rolesFromDB[0].name}</option>
    	<option value = "${rolesFromDB[1].id}">${rolesFromDB[1].name}</option>
      `
		Array.from(roles.options).forEach(option => {
			user.roles.map(role => {
				if (role.name === option.text) {
					option.selected = true
				}
			})
		})
		modalEdit.show()
	}

})

formEdit.addEventListener('submit', (e) => {
	e.preventDefault()
	let listRoles = roleArray(document.getElementById('userRoleEdit'))
	fetch(url, {
		method: 'PATCH', headers: {
			'Content-type': 'application/json',
		},

		body: JSON.stringify({
			id: idForm,
			name: name.value,
			surname: lastname.value,
			email: email.value,
			password: password.value,
			roles: listRoles,

		}),
	}).
		then(response => response.json()).
		then(data => showUsers(data)).
		catch(error => console.log(error)).
		then(reloadShowUsers)

	modalEdit.hide()
})

on(document, 'click', '.btnDelete', e => {
	const row = e.target.parentNode.parentNode
	idForm = row.firstElementChild.innerHTML
	fetch(url + '/' + idForm, {
		method: 'GET',
	}).
		then(response => response.json()).
		then(data => findUserById(data)).
		catch(error => console.log(error))
	const findUserById = (user) => {
		idDelete.value = user.id
		nameDelete.value = user.name
		lastnameDelete.value = user.surname
		emailDelete.value = user.email
		rolesDelete.innerHTML = `
    	<option value = "${rolesFromDB[0].id}">${rolesFromDB[0].name}</option>
    	<option value = "${rolesFromDB[1].id}">${rolesFromDB[1].name}</option>
      `
		Array.from(roles.options).forEach(option => {
			user.roles.map(role => {
				if (role.name === option.text) {
					option.selected = true
				}
			})
		})
		modalDelete.show()
	}
})
formDelete.addEventListener('submit', (e) => {
	e.preventDefault()
	fetch(url + '/' + idForm, {
		method: 'DELETE',
	}).
		then(data => showUsers(data)).
		catch(error => console.log(error)).
		then(reloadShowUsers)
	modalDelete.hide()
})

let roleArray = (options) => {
	let array = []
	for (let i = 0; i < options.length; i++) {
		if (options[i].selected) {
			let role = { id: options[i].value }
			array.push(role)
		}
	}
	return array
}


