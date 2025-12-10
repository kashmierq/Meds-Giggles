function signup() {

    let email = document.getElementById("Email").value;
    console.log("You enter:" + " " + email);

    if (email === "kashmierquinones@gmail.com") { 
        console.log("Your email is correct!");
    } else {
        console.log("Your email is incorrect!");
    }

    let password = document.getElementById("Password").value;
    console.log("You enter:" + " " + password);

    if (password === "mamamo") {
     console.log("Your password is correct!")   
    } else {
        console.log("You password is incorrect!");
    } 

    if (email === "kashmierquinones@gmail.com" && password === "mamamo") {
        console.log("Your email and password are correct!");
    } else {
         console.log("Your email and password are incorrect! Please change.");
    }
    
}
