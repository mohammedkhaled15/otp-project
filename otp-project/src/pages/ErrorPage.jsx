import { Link } from 'react-router-dom'

const ErrorPage = () => {
  return (
    <div >
      <h2> 404 Error</h2>
      <p >Page you ask is not there</p>
      <Link to="/">back to login</Link>
    </div>
  )
}

export default ErrorPage