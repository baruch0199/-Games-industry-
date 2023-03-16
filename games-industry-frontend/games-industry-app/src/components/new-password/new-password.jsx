import { useRef, useEffect } from "react";

const NewPassword = () => {
  const Password = useRef(null);
  const visibleEye = useRef(null);
  const invisibleEye = useRef(null);
  useEffect(() => {
    const passwordRef = Password.current;
    const visibleEyeRef = visibleEye.current;
    const invisibleEyeRef = invisibleEye.current;
    invisibleEyeRef.hidden = true;

    visibleEyeRef.addEventListener("click", () => {
      if (passwordRef.type === "password") {
        passwordRef.type = "text";
        visibleEyeRef.hidden = true;
        invisibleEyeRef.hidden = false;
      }
    });

    invisibleEyeRef.addEventListener("click", () => {
      if (passwordRef.type === "text") {
        passwordRef.type = "password";
        visibleEyeRef.hidden = false;
        invisibleEyeRef.hidden = true;
      }
    });
  }, []);
  return (
    <form className="new-password-section" action="" autoComplete="off">
      <div className="new-password-background">
        <h6 className="new-password-title">new password</h6>

        <div className="new-password-password-wraper">
          <div className="new-password-key"></div>
          <div className="new-password-visible-eye" ref={visibleEye}></div>
          <input
            autoComplete="off"
            className="new-password-password"
            type="password"
            name="password"
            id="password"
            placeholder="password"
            ref={Password}
          />
          <div className="new-password-invisible-eye" ref={invisibleEye}></div>
        </div>
        <div className="new-password-password-wraper">
          <div className="new-password-key"></div>
          <div className="new-password-visible-eye" ref={visibleEye}></div>
          <input
            autoComplete="off"
            className="new-password-password"
            type="password"
            name="password"
            id="confirm-password"
            placeholder="confirm password"
            ref={Password}
          />
          <div className="new-password-invisible-eye" ref={invisibleEye}></div>
        </div>
        <div className="new-password-submit-wraper">
          <input className="new-password-submit" type="submit" value="send" />
        </div>
      </div>
    </form>
  );
};

export default NewPassword;
