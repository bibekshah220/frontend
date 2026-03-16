import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { APP_CONFIG, ROUTES } from "../utils/constants";
import toast from "react-hot-toast";
import "./Auth.css";

// SVG Icons
const Logo = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5L14 4.5V11.5L8 14.5L2 11.5V4.5L8 1.5Z" stroke="white" strokeWidth="1.5" fill="none"/>
    <path d="M8 5L10.5 8L8 11L5.5 8L8 5Z" fill="white"/>
  </svg>
);

const EyeOn = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const EyeOff = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const CheckTick = () => (
  <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <polyline points="2 6 5 9 10 3"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const OkIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

// Password strength calculator
function pwStr(pw) {
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return s;
}

export default function Auth() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, loading: authLoading } = useAuth();

  const isRegisterRoute = location.pathname === ROUTES.REGISTER;
  const [mode, setMode] = useState(isRegisterRoute ? "signup" : "login");
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [rem, setRem] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ fn: "", ln: "", email: "", pw: "", cf: "" });
  const [errs, setErrs] = useState({});

  const str = pwStr(form.pw);
  const strCls = str <= 1 ? "w" : str <= 2 ? "m" : "s";
  const strTxt = ["", "Weak", "Fair", "Good", "Strong"][str];
  const strHint = str < 4 ? `${4 - str} more check${4 - str > 1 ? "s" : ""} to pass` : "Looks great";

  function set(k, v) {
    setForm(f => ({ ...f, [k]: v }));
    if (errs[k]) setErrs(e => ({ ...e, [k]: "" }));
  }

  function validate() {
    const e = {};
    if (mode === "signup") {
      if (!form.fn.trim()) e.fn = "First name is required";
      if (!form.ln.trim()) e.ln = "Last name is required";
    }
    if (!form.email.trim()) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email";
    if (!form.pw) e.pw = "Password is required";
    else if (form.pw.length < 8) e.pw = "Minimum 8 characters";
    if (mode === "signup" && form.pw !== form.cf) e.cf = "Passwords don't match";
    return e;
  }

  async function submit() {
    const e = validate();
    if (Object.keys(e).length) { setErrs(e); return; }

    setLoading(true);
    try {
      if (mode === "login") {
        const result = await login(form.email, form.pw);
        if (result.success) {
          toast.success("Welcome back!");
          navigate(ROUTES.DASHBOARD);
        } else {
          toast.error(result.error);
        }
      } else {
        const name = `${form.fn} ${form.ln}`.trim();
        const result = await register(name, form.email, form.pw);
        if (result.success) {
          toast.success("Account created successfully!");
          navigate(ROUTES.DASHBOARD);
        } else {
          toast.error(result.error);
        }
      }
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function reset(m) {
    setMode(m);
    setDone(false);
    setErrs({});
    setForm({ fn: "", ln: "", email: "", pw: "", cf: "" });
    setShowPw(false);
    setShowCf(false);
    navigate(m === "signup" ? ROUTES.REGISTER : ROUTES.LOGIN, { replace: true });
  }

  const isLoading = loading || authLoading;

  return (
    <div className="auth-page">
      <div className="card">
        {done ? (
          <div className="success-wrap">
            <div className="success-icon"><OkIcon /></div>
            <div className="success-title">
              {mode === "login" ? "Signed in" : "Account created"}
            </div>
            <p className="success-sub">
              {mode === "login"
                ? "Welcome back. You're now signed in."
                : "Your account is ready. Check your email to verify."}
            </p>
            <button className="back-link" onClick={() => setDone(false)}>
              ← Back to sign in
            </button>
          </div>
        ) : (
          <>
            {/* Logo */}
            <div className="logo">
              <div className="logo-mark"><Logo /></div>
              <span className="logo-name">{APP_CONFIG.NAME}</span>
            </div>

            {/* Heading */}
            <div className="heading">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </div>
            <div className="subheading">
              {mode === "login"
                ? `Sign in to continue to ${APP_CONFIG.NAME}.`
                : "Join thousands of educators and learners."}
            </div>

            {/* Social */}
            <div className="social-grid">
              <button className="social-btn" type="button">
                <GoogleIcon /> Google
              </button>
              <button className="social-btn" type="button">
                <FacebookIcon /> Facebook
              </button>
            </div>

            <div className="divider">or</div>

            {/* Name row (signup) */}
            {mode === "signup" && (
              <div className="field-row" style={{ marginBottom: 12 }}>
                <div className="field">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="John"
                    value={form.fn}
                    className={errs.fn ? "invalid" : ""}
                    onChange={e => set("fn", e.target.value)}
                  />
                  {errs.fn && <div className="field-err">{errs.fn}</div>}
                </div>
                <div className="field">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Doe"
                    value={form.ln}
                    className={errs.ln ? "invalid" : ""}
                    onChange={e => set("ln", e.target.value)}
                  />
                  {errs.ln && <div className="field-err">{errs.ln}</div>}
                </div>
              </div>
            )}

            {/* Email */}
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                className={errs.email ? "invalid" : ""}
                onChange={e => set("email", e.target.value)}
              />
              {errs.email && <div className="field-err">{errs.email}</div>}
            </div>

            {/* Password */}
            <div className="field">
              <label>Password</label>
              <div className="input-wrap">
                <input
                  type={showPw ? "text" : "password"}
                  placeholder={mode === "signup" ? "Create a password" : "Enter your password"}
                  className={`has-suffix${errs.pw ? " invalid" : ""}`}
                  value={form.pw}
                  onChange={e => set("pw", e.target.value)}
                />
                <button type="button" className="suffix-btn" onClick={() => setShowPw(v => !v)} tabIndex={-1}>
                  {showPw ? <EyeOff /> : <EyeOn />}
                </button>
              </div>
              {errs.pw && <div className="field-err">{errs.pw}</div>}

              {mode === "signup" && form.pw && (
                <div className="strength">
                  <div className="strength-bars">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className={`bar ${i <= str ? strCls : ""}`} />
                    ))}
                  </div>
                  <div className="strength-meta">
                    <span className={`strength-label ${strCls}`}>{strTxt}</span>
                    <span>{strHint}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm (signup) */}
            {mode === "signup" && (
              <div className="field">
                <label>Confirm password</label>
                <div className="input-wrap">
                  <input
                    type={showCf ? "text" : "password"}
                    placeholder="Repeat your password"
                    className={`has-suffix${errs.cf ? " invalid" : ""}`}
                    value={form.cf}
                    onChange={e => set("cf", e.target.value)}
                  />
                  <button type="button" className="suffix-btn" onClick={() => setShowCf(v => !v)} tabIndex={-1}>
                    {showCf ? <EyeOff /> : <EyeOn />}
                  </button>
                </div>
                {errs.cf && <div className="field-err">{errs.cf}</div>}
              </div>
            )}

            {/* Footer meta */}
            <div className="foot-row">
              <div className="check-wrap" onClick={() => setRem(v => !v)}>
                <div className={`check-box ${rem ? "on" : ""}`}>
                  {rem && <CheckTick />}
                </div>
                <span className="check-label">Remember me</span>
              </div>
              {mode === "login" && (
                <button type="button" className="link-btn">
                  Forgot password?
                </button>
              )}
            </div>

            {/* Submit */}
            <button className="submit" onClick={submit} disabled={isLoading}>
              {isLoading
                ? <><span className="spinner" /> {mode === "login" ? "Signing in…" : "Creating account…"}</>
                : mode === "login" ? "Sign in" : "Create account"
              }
            </button>

            {/* Terms */}
            {mode === "signup" && (
              <p className="terms">
                By creating an account you agree to our{" "}
                <button type="button" onClick={() => navigate(ROUTES.TERMS)}>Terms of Service</button> and{" "}
                <button type="button" onClick={() => navigate(ROUTES.PRIVACY)}>Privacy Policy</button>.
              </p>
            )}

            {/* Switch mode */}
            <div className="switch-row">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <button className="switch-btn" onClick={() => reset(mode === "login" ? "signup" : "login")}>
                {mode === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
