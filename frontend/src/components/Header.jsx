import React from 'react'
import {Nav, Navbar, Dropdown, Container, NavDropdown, NavItem} from 'react-bootstrap'
import {LinkContainer} from 'react-router-bootstrap'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {
  faCubes,
  faShoppingCart,
  faSignInAlt,
  faSignOutAlt,
  faUserEdit,
  faUsers,
  faListAlt, faList,
} from '@fortawesome/free-solid-svg-icons'
import {faShopify} from '@fortawesome/free-brands-svg-icons'
import {useDispatch, useSelector} from 'react-redux'
import {userLogout} from '../redux/actions/userActions'


const Header = () => {
  const dispatch = useDispatch()
  const {userInfo} = useSelector(({userLoginReducer}) => userLoginReducer)

  const logoutHandler = () => {
    dispatch(userLogout())
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="#home">React-Shop</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <LinkContainer to="/shop">
              <Nav.Link><FontAwesomeIcon icon={faShopify}/> ShopList</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav>
            {userInfo &&
            <LinkContainer to="/cart" className='mr-2'>
              <Nav.Link>
                <FontAwesomeIcon icon={faShoppingCart}/>
                <sup>
                  <small className='badge bg-primary rounded-circle text-white'>15</small>
                </sup>
              </Nav.Link>
            </LinkContainer>
            }
            {userInfo && userInfo.name ?
              <NavDropdown className='dropDownMenu bg-dark' id='username' title={`Hello, ${userInfo.name}`}>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item><FontAwesomeIcon icon={faUserEdit}/> My Profile</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/my-orders'>
                  <NavDropdown.Item><FontAwesomeIcon icon={faListAlt}/> My Orders</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/my-products'>
                  <NavDropdown.Item><FontAwesomeIcon icon={faCubes}/> My Products</NavDropdown.Item>
                </LinkContainer>
                <Dropdown.Divider/>
                <LinkContainer to=''>
                  <NavDropdown.Item onClick={logoutHandler}><FontAwesomeIcon
                    icon={faSignOutAlt}/> Logout</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
              :
              <LinkContainer to="/login">
                <NavItem as='li'><Nav.Link href='/login'><FontAwesomeIcon icon={faSignInAlt}/> Login</Nav.Link></NavItem>
              </LinkContainer>
            }
            {userInfo && userInfo.isAdmin &&
            <NavDropdown className='dropDownMenu bg-dark' id='username' title='DASHBOARD'>
              <LinkContainer to='/admin/all-users'>
                <NavDropdown.Item><FontAwesomeIcon icon={faUsers}/> All Users</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/all-orders'>
                <NavDropdown.Item><FontAwesomeIcon icon={faListAlt}/> All Orders</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/all-products'>
                <NavDropdown.Item><FontAwesomeIcon icon={faCubes}/> All Products</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/admin/all-categories'>
                <NavDropdown.Item><FontAwesomeIcon icon={faList}/> All Categories</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
            }
            {!userInfo &&
            <LinkContainer to="/register">
              <Nav.Link><FontAwesomeIcon icon={faSignInAlt}/> Register</Nav.Link>
            </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header