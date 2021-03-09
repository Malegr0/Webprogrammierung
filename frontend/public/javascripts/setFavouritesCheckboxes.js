async function getFavouriteArray() {
  let response = await fetch("/getFavoritesForUser");
  let data = await response.json();
  return data;
}
getFavouriteArray().then((data) => {
  for (let i = 0; i < 9; i++) {
    document.getElementById("favoritCheck" + i).checked = data[i];
  }
});
