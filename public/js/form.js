function validateForm() {
    console.log("valiadte form")
    let x = document.forms["myForm"]["password"].value;
    if (x == "") {
        alert("Name must be filled out");
        return false;
    }
}