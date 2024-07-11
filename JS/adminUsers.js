const apiUrl = 'http://localhost:3000'; 

function fetchUsers() {
    fetch(`${apiUrl}/usuarios`)
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById('user-list');
            userList.innerHTML = '';

            if (data.length === 0) {
                const noUsersMessage = document.createElement('div');
                noUsersMessage.className = 'no-users';
                noUsersMessage.textContent = 'No hay usuarios registrados';
                userList.appendChild(noUsersMessage);
                userList.classList.add('user-list-container'); // Añade la clase para centrar el mensaje
            } else {
                userList.classList.remove('user-list-container'); // Remueve la clase cuando hay usuarios
                data.forEach(user => {
                    const li = document.createElement('li');
                    li.className = 'user-item';
                    li.innerHTML = `
                        <div class="user-details">
                            <strong>Nombre de usuario: ${user.nombreUsuario}</strong>
                            <span>Contraseña: ${user.contraseña}</span>
                            <span>Email: ${user.email}</span>
                        </div>
                        <div class="user-buttons">
                            <button class="update-button" onclick="editUser(${user.idUsuario})">Actualizar</button>
                            <button class="delete-button" onclick="deleteUser(${user.idUsuario})"><span class="delete-icon">X</span></button>
                        </div>
                    `;
                    userList.appendChild(li);
                });
            }
        });
}

function editUser(id) {
    console.log(`editUser called with id: ${id}`);
    const newUsername = prompt('Ingrese el nuevo nombre:');
    const newPassword = prompt('Ingrese la nueva contraseña:');
    const newEmail = prompt('Ingrese el nuevo email:');

    fetch(`${apiUrl}/usuarios/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombreUsuario: newUsername, contraseña: newPassword, email: newEmail })
    })
    .then(response => response.json())
    .then(() => fetchUsers()); // Se vuelve a ejecutar fetchUsers para actualizar la lista de usuarios en la interfaz
}

function deleteUser(id) {
    console.log(`deleteUser called with id: ${id}`);
    fetch(`${apiUrl}/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(() => fetchUsers()); // Se vuelve a ejecutar fetchUsers para actualizar la lista de usuarios en la interfaz
}

// Cargar la lista de usuarios cuando se carga la página
document.addEventListener('DOMContentLoaded', fetchUsers);