import React from 'react'

const Navbar = ({logout,res}) => {
  return (
    <>
      <nav className="navbar navbar-light  fixed-top " id='navbar'>
            <div className="container-fluid">
                <a className="navbar-brand" href="#" id='name'>Flower</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbar"
                    aria-controls="offcanvasNavbar" 
                    >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="offcanvas offcanvas-end"
                    id="offcanvasNavbar"
                    aria-labelledby="offcanvasNavbarLabel" >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                            Offcanvas
                        </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                            <li className="nav-item">
                                <a
                                    className="nav-link active"
                                    aria-current="page"
                                    href="#"
                                    >Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Link</a>
                            </li>
                        </ul>
                      
                    </div>
                    <button className='px-5 py-2 m-2 bg-danger border rounded-2 text-light' onClick={logout}>logout</button>
                </div>
                 
            </div>
           
        </nav>
    </>
  )
}

export default Navbar
