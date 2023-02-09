import './ThemeSwitcher.css'

function ThemeSwitcher({className, theme, toggleTheme}){

    const icon = theme === "light" ? "☀️" : "🌙";
    return(
        <span className={`${className} theme__switcher`}>
            <button
                type="button" 
                className="theme__switcher-toggle"
                onClick={toggleTheme}
            >
                <span className="theme__switcher-switch"></span>
                <i className="theme__switcher-icon">{icon}</i>
            </button>
        </span>
    );
}
export default ThemeSwitcher;