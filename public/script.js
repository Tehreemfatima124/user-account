
document.getElementById('signupForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (result.status) {
            window.location.href = '/login.html'; 
        }
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch('/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
        if (result.status) {
            
            window.location.href = '/profile.html'; 
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

document.getElementById('updateForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value; 
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
        const response = await fetch(`/update/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
    }
});


document.getElementById('deleteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('deleteId').value; 

    try {
        const response = await fetch(`/delete/${userId}`, {
            method: 'DELETE',
        });

        const result = await response.json();
        alert(result.message);
    } catch (error) {
        console.error('Error:', error);
    }
});
