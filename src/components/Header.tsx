import { FunctionComponent } from "react";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Image } from "react-bootstrap";


type HeaderProps = object

const Header: FunctionComponent<HeaderProps> = () => {
    return ( 
     <Navbar style={{position: 'absolute', top: '0', left: "0", width: '100%'}} expand="lg" className="bg-body-tertiary">
      <Container>
        <Image src="logo.svg"/>
        <Navbar.Brand>Калькулятор совершенных чисел</Navbar.Brand>
      </Container>
    </Navbar>
    );
}
 
export default Header;