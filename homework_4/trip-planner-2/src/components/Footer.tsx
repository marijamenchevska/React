import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
    return (
        <footer className="h-8 text-slate-50 text-xxs flex justify-center items-center space-x-1">
            <span>Copyright &copy; 2024, Marija Menchevska</span>
            <a href="https://github.com/marijamenchevska" target="_blank"><FontAwesomeIcon icon={faGithub} /></a>
            <a href="https://mk.linkedin.com/in/marija-menchevska" target="_blank"><FontAwesomeIcon icon={faLinkedin} /></a>
        </footer>
    )
}