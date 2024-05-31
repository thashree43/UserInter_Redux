import { Card, Container, Button } from 'react-bootstrap'

const Hero = () => {
  return (
    <div className='py-5'>
      <Container className='d-flex justify-content-center'>
        <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
          <h1 className='text-center mb-4'>User Authentication</h1>
          <p className='text-center mb-4'>
            Its a User Authentication,
            <br />
            BY using react-redux (Redux toolkit), react-Bootstrap, react-icons, HTML, CSS
          </p>
          <div className='d-flex'>
            <Button variant='primary' href='/login' className='me-3'>
              Log In
            </Button>
            <Button variant='secondary' href='/register'>
              Sign Up
            </Button>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default Hero
