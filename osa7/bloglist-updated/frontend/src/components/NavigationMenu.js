import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../reducers/credentialReducer'
import { Navbar, Nav } from 'react-bootstrap'
import React from 'react'

const NavigationMenu = () => {
  const credential = useSelector(state => state.credential)
  const dispatch = useDispatch()

  const padding = {
    padding: '5px'
  }

  if (!credential) {
    return null
  }
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light" style={{marginBottom:'20px'}}>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="m-auto">
            <Nav.Item>
              <Nav.Link as="span">
                <Link style={padding} to="/blogs">Blogs</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link as="span">
                <Link style={padding} to="/users">Users</Link>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="link-1" onClick={() => dispatch(logout())} as="span">
              <Link to="/" style={padding}>Logout</Link>
            </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link disabled as="span">
                <b>{credential.username}</b> is logged in
            </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div >
  )
}

export default NavigationMenu