const ResetPassword = () => {
  return (
    <form className="reset-password-section" action="" autoComplete="off">
      <div className="reset-password-background">
        <h6 className="reset-password-title">Sign-in</h6>
        <p className="reset-password-paragraph">
          email importent for security. put email, and code will be sent
        </p>
        <div className="reset-password-email">
          <div className="reset-password-email-wraper">
            <div className="reset-password-mail-icon"></div>
            <input
              autoComplete="off"
              className="reset-password-email"
              type="email"
              name="email"
              id="email"
              placeholder="email"
            />
          </div>
        </div>
        <div className="reset-password-submit-wraper">
          <input className="reset-password-submit" type="submit" value="send" />
        </div>
      </div>
    </form>
  );
};

export default ResetPassword;
