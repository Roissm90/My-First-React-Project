import LinkedinLogo from "../images/logo-linkedin.png";
import GithubLogo from "../images/logo-github.png";
import '../styles/_footer.scss';

function Footer() {
    return(
        <footer className="footer">
            <ul>
                <li><a href="https://github.com/Roissm90" target="_blank" rel="noreferrer"><img src={GithubLogo}></img></a></li>
                <li><a href="https://www.linkedin.com/feed/" target="_blank" rel="noreferrer"><img src={LinkedinLogo}></img></a></li>
            </ul>
        </footer>
    )
}
export default Footer;