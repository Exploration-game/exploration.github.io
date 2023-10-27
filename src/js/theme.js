function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
    console.info("Set theme : " + themeName);
}

(function () {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('dark');
    }
    else if (localStorage.getItem('theme') === 'day') {
        setTheme('day');
    }
    else if (localStorage.getItem('theme') === 'light') {
        setTheme('light');
    }

    else {
        console.info("Default color scheme");
        const systemSettingDark = window.matchMedia("(prefers-color-scheme: dark)");
        if (systemSettingDark) {
            setTheme('dark');
        }
        else {
            setTheme('light');
        }
    }
})();

function changeTheme() {
    if (localStorage.getItem('theme') === 'dark') {
        setTheme('day');
    }
    else if (localStorage.getItem('theme') === 'day') {
        setTheme('light');
    }
    else if (localStorage.getItem('theme') === 'light') {
        setTheme('dark');
    }

    else { setTheme('dark'); }
}