document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("signupForm").addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const username = document.getElementById("Name").value;


        try {
            const response = await fetch("http://localhost:3000/api/auth/signup",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body : JSON.stringify({username,email,password})
            });


            const result = await response.json();
            

            if (response.ok) {
                alert(result.message); 
                //location.assign("/api/auth/signin")
                
            } else {
                alert("Signup failed: " + result.message); 
            }


        } catch (error) {
            console.error("Error:", error);
            alert("Something went wrong. Please try again.");
        }
    });
});
