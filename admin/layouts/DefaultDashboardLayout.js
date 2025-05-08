// import node module libraries
import { useState } from 'react';

// import sub components
import NavbarVertical from './navbars/NavbarVertical';
import NavbarTop from './navbars/NavbarTop';
import { Row, Col } from 'react-bootstrap';

const DefaultDashboardLayout = (props) => {
	const theme = {
		blue: "#134E97",
		white: "#F1F1F1",
		orange: "#F57B35",
	  };
	
	const [showMenu, setShowMenu] = useState(true);
	const ToggleMenu = () => {
		return setShowMenu(!showMenu);
	};	
	return (		
		<div id="db-wrapper" className={`${showMenu ? '' : 'toggled'}`} style={{backgroundColor:theme.blue}}>
			<div className="navbar-vertical navbar" style={{backgroundColor:theme.orange,borderColor:theme.orange}}>
				<NavbarVertical
				
				/>
			</div>
			<div id="page-content">
				<div className="header">
					<NavbarTop
						data={{
							showMenu: showMenu,
							SidebarToggleMenu: ToggleMenu
						}}
					/>
				</div>
				{props.children}
				<div className='px-6 border-top py-3' style={{backgroundColor:theme.white}}> 
					<Row>
						<Col sm={6} className='text-center text-sm-start mb-2 mb-sm-0'>
							<p className='m-0'>Designed by <a href='https://www.ceevtech.com' target='_blank' style={{color:theme.blue}}>Ceevtech</a></p></Col>
						
					</Row>
				</div>
			</div>
		</div>
	);
};
export default DefaultDashboardLayout;
