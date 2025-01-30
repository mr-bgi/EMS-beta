document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    let email = document.querySelector('#email').value.trim();
    let password = document.querySelector('#password').value.trim();
    let messageBox = document.getElementById("message");

    console.log(email, password);

    let emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    let passwordRegex = /^[A-Za-z\d]{8,}$/;

    if (!emailRegex.test(email)) {
        console.log('Invalid email address');
        document.getElementById('email').style.borderColor = "#DC3545";
        return;
    } else {
        document.getElementById('email').style.borderColor = "#c4b6e0";
    }

    if (!passwordRegex.test(password)) {
        console.log('Invalid password');
        document.getElementById('password').style.borderColor = "#DC3545";
        return;
    } else {
        document.getElementById('password').style.borderColor = "#c4b6e0";
    }

  
    let formData = new FormData();
    formData.append("email",email)
    formData.append("password",password)

    try {
        let response = await fetch("http://localhost:3000/api/auth/login", {
            method: "POST",
            body:formData,
            credentials: "include"
        });

        let text = await response.text();
        console.log("Raw response:", text);
        
        let data;
        try {
            data = JSON.parse(text);
        } catch (err) {
            console.error("Failed to parse JSON", err);
            return;
        }

        if (response.ok) {
            alert('Login successful!');
            window.location.href = "/table-datatable-basic";
        } else {
            messageBox.innerHTML = `<span style='color:red;'>${data.message || "Invalid email or password"}</span>`;
        }
    } catch (error) {
        messageBox.innerHTML = "<span style='color:red;'>An error occurred. Please try again.</span>";
        console.error("Error:", error);
    }
});
