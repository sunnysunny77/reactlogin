const Auth = (props) => {
  const { classes, login, onPass, onUser, onSub, user, pass } = props;
  return (
    <div className="Auth-form-container">
      <form onSubmit={onSub} className="Auth-form">
        <div className="Auth-form-content">
          <h1 className="Auth-form-title">Login</h1>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              value={user} onChange={onUser}
              autoComplete="on"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              value={pass} onChange={onPass}
              autoComplete="on"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-secondary">
              Submit
            </button>
          </div>
          <div className={"alert alert-secondary " + classes} role="alert">
            {login}
          </div>
        </div>
      </form>
    </div>
  )
}
export default Auth;
