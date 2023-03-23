const submitBtn = document.getElementById('submit')
const editBtn = document.getElementById('edit')
const form = document.getElementById('form')
const table = document.getElementById('table')
const tbody = document.getElementById('tbody')
const prenomInput = document.getElementById('prenom')
const nomInput = document.getElementById('nom')
const emailInput = document.getElementById('email')
const telephoneInput = document.getElementById('telephone')
const hidden = document.getElementById('hidden')
let users = JSON.parse(localStorage.getItem('users')) || []
addUser(users)
form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (hidden.value) {
        const usersCopy = [...users]
        const selectedUser = users.find(user => user.id === Number(hidden.value))
        const userIndex = users.indexOf(selectedUser)
        selectedUser.prenom = prenomInput.value
        selectedUser.nom = nomInput.value
        selectedUser.email = emailInput.value
        selectedUser.telephone = telephoneInput.value
        usersCopy[userIndex] = selectedUser
        users = usersCopy
        addUser(users)
        localStorage.setItem('users', JSON.stringify(users))
        submitBtn.style.display = 'block'
        editBtn.style.display = 'none'
        form.reset()
        hidden.value = ''
        return
    }
    const newUser = {
        id: Math.random(),
        prenom: prenomInput.value,
        nom: nomInput.value,
        email: emailInput.value,
        telephone: telephoneInput.value
    }
    users.push(newUser)
    addUser(users)
    localStorage.setItem('users', JSON.stringify(users))
    form.reset()
    hidden.value = ''
})
function addUser(users) {
    tbody.innerHTML = ''
    const displayUsers = users?.map(user => (
        `<tr>
            <td>${user.prenom}</td>
            <td>${user.nom}</td>
            <td>${user.email}</td>
            <td>${user.telephone}</td>
            <td style="cursor: pointer" onclick="edit(${user.id})"><button class="btn border bg-light">Modifier</button></td>
            <td style="cursor: pointer" onclick="deleteUser(${user.id})" id=${user.id}><button class="btn border bg-dark text-light">Supprimer</button></td>
        </tr>`
    ))
    displayUsers?.forEach(user => {
        tbody.innerHTML += user
    })
}
function edit(id) {
    submitBtn.style.display = 'none'
    editBtn.style.display = 'block'
    let selectedUser = users.find(user => user.id === id)
    prenomInput.value = selectedUser.prenom
    nomInput.value = selectedUser.nom
    emailInput.value = selectedUser.email
    telephoneInput.value = selectedUser.telephone
    hidden.value = selectedUser.id
}
function deleteUser(id) {
    users = users?.filter(user => user.id !== id)
    addUser(users)
    localStorage.setItem('users', JSON.stringify(users))
}