// import node module libraries
import { Menu } from 'react-feather';
import Link from 'next/link';
import {
	Nav,
	Navbar,
	Form
} from 'react-bootstrap';

// import sub components


const NavbarTop = (props) => {
	const theme = {
		blue: "#134E97", // Dodger Blue
		white: "#F1F1F1", // Pure white
		orange: "#F57B35", // Classic orange
	  };
	return (
		<Navbar expanded="lg" className="navbar-classic navbar navbar-expand-lg" style={{backgroundColor:theme.white}}>
			<div className='d-flex justify-content-between w-100'>
				<div className="d-flex align-items-center">
					<Link
						href="#"
						id="nav-toggle"
						className="nav-icon me-2 icon-xs"
						onClick={() => props.data.SidebarToggleMenu(!props.data.showMenu)}>
						<Menu size="18px" />
					</Link>
					<div className="ms-lg-3 d-none d-md-none d-lg-block">
						{/* Search Form */}
						<Form className="d-flex align-items-center">
							<Form.Control type="search" placeholder="Search" />
						</Form>
					</div>
				</div>
				{/* Quick Menu */}
				<Nav className="navbar-right-wrap ms-2 d-flex nav-top-wrap">
  <img src="/images/logo1.png" alt="Logo" style={{ height: '55px' }} />
</Nav>
			</div>
		</Navbar>
	);
};

export default NavbarTop;
