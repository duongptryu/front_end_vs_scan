export const Header = (props) => {
  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a
                  href='/signup'
                  className='btn btn-custom btn-lg page-scroll'
                >

                  Đăng ký ngay
                </a>{' '}
              </div>
              <div className='col-md-8 col-md-offset-2 intro-text'>
                <div>
                {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
