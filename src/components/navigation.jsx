

export const Navigation = (props) => {
  return (
    <nav id='menu' className='navbar navbar-default navbar-fixed-top'>
      <div className='container'>
        <div className='navbar-header'>
          <button
            type='button'
            className='navbar-toggle collapsed'
            data-toggle='collapse'
            data-target='#bs-example-navbar-collapse-1'
          >
            {' '}
            <span className='sr-only'>Toggle navigation</span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
            <span className='icon-bar'></span>{' '}
          </button>
          <a className='navbar-brand page-scroll' href='/'>
            V SCANNER
          </a>{' '}
        </div>

        <div
          className='collapse navbar-collapse'
          id='bs-example-navbar-collapse-1'
        >
          <ul className='nav navbar-nav navbar-right'>
            <li>
              <a href='/' className='page-scroll'>
                Trang chủ
              </a>
            </li>
            <li>
              <a href='/#about' className='page-scroll'>
                Giới thiệu
              </a>
            </li>
            <li>
              <a href='/#services' className='page-scroll'>
                Dịch vụ
              </a>
            </li>
            <li>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <a href='/signin' className='btn btn-custom-signup btn-lg page-scroll'>
                    Đăng nhập
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
