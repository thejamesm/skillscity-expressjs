function fetchAndDisplayUsers() {
    fetch('http://localhost:3000/users')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the received data directly
            displayUsers(data); // Call the displayUsers function to render the data on the page
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function populateEditForm(id, username, email) {
    document.getElementById('updateId').value = id;
    document.getElementById('updateUsername').value = username;
    document.getElementById('updateEmail').value = email;
    document.getElementById('updateUser').classList.remove('hidden');
}

function editUser() {
    fetch('http://localhost:3000/editUser', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: document.getElementById('updateId').value,
                username: document.getElementById('updateUsername').value,
                email: document.getElementById('updateEmail').value
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    document.getElementById('updateUser').classList.add('hidden');
}

function deleteUser(id) {
    fetch(`http://localhost:3000/deleteUser/${id}`, {method: 'DELETE'})
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayUsers(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

function displayUsers(users) {
    const userDataDiv = document.getElementById('userData');
    userDataDiv.innerHTML = ''; // Clear previous data

    const userList = document.createElement('ul');
    
    // Iterate through each user and create list items to display their data
    users.forEach(user => {
        const listItem = document.createElement('li');
        const editButton = document.createElement('button');
        const delButton = document.createElement('button');
        const userText = ` ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`;
        editButton.setAttribute("onclick", `populateEditForm(${user.id}, '${user.username}', '${user.email}')`);
        editButton.textContent = "✏️";
        delButton.setAttribute("onclick", `deleteUser(${user.id})`);
        delButton.textContent = "🗑️";
        listItem.append(editButton)
        listItem.append(delButton)
        listItem.append(userText);
        userList.appendChild(listItem);
    });

    
    // Append the list of users to the userDataDiv
    userDataDiv.appendChild(userList);
}