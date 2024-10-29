import { Link } from "react-router-dom";
import Container from "../../ui/Container";
import TextLogo from "../../ui/TextLogo";

const Header = () => {
  return (
    <header className="h-20 grid place-items-center w-full bg-primary/5 sticky top-0 z-50 backdrop-blur-sm">
      <Container>
        <nav className="flex items-center justify-between">
          <TextLogo />

          <menu>
            <ul className="flex items-center gap-5">
              <li>
                <Link
                  to="/sign-in"
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Sign In
                </Link>
              </li>
              <li>
                <Link
                  to="/sign-up"
                  className="border border-primary text-primary px-4 py-2 rounded"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </menu>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
