function dataSubmit() {
  let x = document.getElementById("description").value.trim();
  if (x === "") {
    alert("Description must be filled out");
    return false;
  }
  alert("all the datas have been submitted");
  return true;
}
S