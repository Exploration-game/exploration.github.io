function resetLocalStorage() {
    localStorage.clear();
    location.reload();
}

function resetWebSiteStorage() {
    localStorage.removeItem("theme");
    location.reload();
}