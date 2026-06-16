import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ChevronLeft, Mail, Lock, User } from 'lucide-react';
import { authService } from '../services/authService';

/* ─── Inline SVG illustration (woman studying at laptop inside a monitor) ─── */
function StudyIllustration() {
  return (
    <svg viewBox="0 0 480 360" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: 440 }}>
      {/* ── Background blob / desk surface ── */}
      <ellipse cx="240" cy="310" rx="200" ry="28" fill="rgba(0,0,0,0.08)" />

      {/* ── Monitor body ── */}
      <rect x="60" y="60" width="300" height="200" rx="14" ry="14" fill="#1E293B" />
      <rect x="72" y="72" width="276" height="176" rx="8" ry="8" fill="#F8FAFC" />

      {/* ── Monitor screen content (e-learning UI mockup) ── */}
      {/* Header bar inside screen */}
      <rect x="72" y="72" width="276" height="28" rx="8" ry="8" fill="#E2E8F0" />
      <circle cx="90" cy="86" r="5" fill="#EF4444" />
      <circle cx="104" cy="86" r="5" fill="#F59E0B" />
      <circle cx="118" cy="86" r="5" fill="#22C55E" />
      {/* Nav items in screen */}
      <rect x="150" y="82" width="40" height="8" rx="4" fill="#CBD5E1" />
      <rect x="198" y="82" width="40" height="8" rx="4" fill="#CBD5E1" />
      <rect x="246" y="82" width="40" height="8" rx="4" fill="#CBD5E1" />

      {/* Video / content area inside screen */}
      <rect x="80" y="108" width="170" height="130" rx="6" fill="#E8F4FE" />
      {/* Play icon */}
      <circle cx="165" cy="173" r="22" fill="rgba(255,107,53,0.15)" />
      <polygon points="158,164 158,182 180,173" fill="#FF6B35" />

      {/* Sidebar panel inside screen */}
      <rect x="258" y="108" width="82" height="130" rx="6" fill="#F1F5F9" />
      <rect x="266" y="118" width="66" height="8" rx="4" fill="#CBD5E1" />
      {/* Avatar circle */}
      <circle cx="290" cy="148" r="14" fill="#E2E8F0" />
      <circle cx="290" cy="141" r="6" fill="#94A3B8" />
      <path d="M277,158 Q290,152 303,158" fill="#94A3B8" />
      {/* Progress bar */}
      <rect x="266" y="170" width="66" height="5" rx="3" fill="#E2E8F0" />
      <rect x="266" y="170" width="45" height="5" rx="3" fill="#FF6B35" />
      {/* Dots at bottom */}
      <circle cx="272" cy="200" r="3" fill="#FF6B35" />
      <circle cx="282" cy="200" r="3" fill="#CBD5E1" />
      <circle cx="292" cy="200" r="3" fill="#CBD5E1" />
      <circle cx="302" cy="200" r="3" fill="#CBD5E1" />

      {/* ── Monitor stand ── */}
      <rect x="218" y="260" width="44" height="22" rx="4" fill="#334155" />
      <rect x="190" y="278" width="100" height="8" rx="4" fill="#475569" />

      {/* ── Desk surface ── */}
      <rect x="40" y="286" width="400" height="12" rx="6" fill="#475569" />

      {/* ── Woman figure (sitting, using laptop) ── */}
      {/* Body / torso */}
      <ellipse cx="390" cy="252" rx="26" ry="34" fill="#FF6B35" />
      {/* Shirt detail */}
      <ellipse cx="390" cy="248" rx="18" ry="24" fill="#E85D2A" />

      {/* Head */}
      <circle cx="390" cy="200" r="26" fill="#8B5E3C" />
      {/* Hair — natural afro */}
      <ellipse cx="390" cy="186" rx="28" ry="24" fill="#1a0a00" />
      <ellipse cx="370" cy="195" rx="10" ry="14" fill="#1a0a00" />
      <ellipse cx="410" cy="195" rx="10" ry="14" fill="#1a0a00" />
      <ellipse cx="390" cy="180" rx="22" ry="18" fill="#1a0a00" />
      {/* Face details */}
      <ellipse cx="382" cy="204" rx="3.5" ry="4" fill="#6B4226" />
      <ellipse cx="398" cy="204" rx="3.5" ry="4" fill="#6B4226" />
      {/* Smile */}
      <path d="M383,214 Q390,220 397,214" stroke="#6B4226" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      {/* Ear */}
      <ellipse cx="364" cy="205" rx="5" ry="7" fill="#8B5E3C" />
      {/* Earring */}
      <circle cx="364" cy="213" r="2.5" fill="#FF6B35" />

      {/* Left arm (reaching to laptop) */}
      <path d="M370,240 Q348,260 332,275" stroke="#8B5E3C" strokeWidth="12" fill="none" strokeLinecap="round"/>
      {/* Right arm */}
      <path d="M410,240 Q428,256 435,270" stroke="#8B5E3C" strokeWidth="12" fill="none" strokeLinecap="round"/>

      {/* Laptop on lap/desk */}
      <rect x="315" y="268" width="120" height="72" rx="8" fill="#1E293B" />
      <rect x="322" y="274" width="106" height="60" rx="5" fill="#E8F4FE" />
      {/* Laptop screen mini UI */}
      <rect x="328" y="280" width="50" height="6" rx="3" fill="#CBD5E1" />
      <rect x="328" y="290" width="90" height="5" rx="3" fill="#E2E8F0" />
      <rect x="328" y="299" width="70" height="5" rx="3" fill="#E2E8F0" />
      <rect x="328" y="308" width="40" height="10" rx="5" fill="#FF6B35" />
      {/* Laptop keyboard strip */}
      <rect x="310" y="340" width="130" height="6" rx="3" fill="#334155" />

      {/* Legs */}
      <ellipse cx="375" cy="305" rx="14" ry="12" fill="#2D1B0E" />
      <ellipse cx="405" cy="305" rx="14" ry="12" fill="#2D1B0E" />
      {/* Shoes */}
      <ellipse cx="368" cy="318" rx="16" ry="7" fill="#FF6B35" />
      <ellipse cx="408" cy="318" rx="14" ry="6" fill="#1a0a00" />

      {/* ── Stool ── */}
      <rect x="372" y="318" width="8" height="28" rx="2" fill="#8B6914" />
      <rect x="400" y="318" width="8" height="28" rx="2" fill="#8B6914" />
      <ellipse cx="390" cy="318" rx="26" ry="7" fill="#A07818" />

      {/* ── Decorative plant left ── */}
      <rect x="48" y="270" width="10" height="30" rx="3" fill="#5B4200" />
      <ellipse cx="53" cy="252" rx="20" ry="24" fill="#2D6A4F" />
      <ellipse cx="38" cy="260" rx="12" ry="16" fill="#40916C" />
      <ellipse cx="68" cy="258" rx="12" ry="16" fill="#40916C" />
      <ellipse cx="53" cy="240" rx="10" ry="18" fill="#52B788" />

      {/* ── Decorative plant right (small) ── */}
      <rect x="450" y="285" width="6" height="20" rx="2" fill="#5B4200" />
      <ellipse cx="453" cy="272" rx="12" ry="14" fill="#40916C" />
      <ellipse cx="445" cy="278" rx="7" ry="10" fill="#52B788" />
      <ellipse cx="461" cy="278" rx="7" ry="10" fill="#2D6A4F" />

      {/* ── Speech bubble with lock icon ── */}
      <rect x="408" y="165" width="44" height="34" rx="10" fill="white" opacity="0.92"/>
      <polygon points="420,199 430,199 425,210" fill="white" opacity="0.92"/>
      {/* Lock icon inside bubble */}
      <rect x="418" y="174" width="14" height="10" rx="3" fill="#FF6B35" />
      <path d="M421,174 Q425,166 429,174" stroke="#FF6B35" strokeWidth="2.5" fill="none" />
      <circle cx="425" cy="180" r="2" fill="white" />

      {/* ── Floating geometric shapes / sparkles top right (gray/white tones) ── */}
      <rect x="440" y="70" width="8" height="8" fill="rgba(255,255,255,0.6)" transform="rotate(45 444 74)" />
      <rect x="42" y="50" width="6" height="6" fill="rgba(255,255,255,0.4)" transform="rotate(45 45 53)" />
      <rect x="460" y="195" width="5" height="5" fill="rgba(255,255,255,0.35)" transform="rotate(45 462.5 197.5)" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════
   Main Login component
════════════════════════════════════════════════ */
export default function Login() {
  const [mode, setMode] = useState<'login' | 'register' | 'recover'>('login');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [name, setName]         = useState('');
  const [remember, setRemember] = useState(false);
  
  // States for password recovery flow
  const [recoveryStep, setRecoveryStep] = useState<1 | 2 | 3 | 4>(1); // 1: Email, 2: Code, 3: New Pass, 4: Success
  const [recoveryCode, setRecoveryCode] = useState('');
  const [enteredCode, setEnteredCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { login }  = useAuth();
  const navigate   = useNavigate();

  const isLogin = mode === 'login';
  const isRegister = mode === 'register';
  const isRecover = mode === 'recover';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (isRecover) {
      if (recoveryStep === 1) {
        if (!email) return;
        
        // Seed the test user Milton Manuel if they request it and it doesn't exist
        if (email.toLowerCase() === 'miltonmanuel222@gmail.com') {
          authService.seedTestUser();
        }

        if (!authService.emailExists(email)) {
          setErrorMsg('Este email não está associado a nenhuma conta.');
          return;
        }

        // Generate 6-digit code
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        setRecoveryCode(code);

        // Send real email via EmailJS
        setErrorMsg('A enviar o código de recuperação...');
        authService.sendRecoveryEmail(email, code).then(success => {
          if (success) {
            setErrorMsg('');
            setRecoveryStep(2);
          } else {
            setErrorMsg('Erro ao enviar o email de recuperação. Por favor, verifique a sua ligação ou chaves do serviço.');
          }
        }).catch(err => {
          console.error(err);
          setErrorMsg('Erro de ligação ao processar o envio.');
        });
        return;
      }

      if (recoveryStep === 2) {
        if (enteredCode === recoveryCode) {
          setRecoveryStep(3);
        } else {
          setErrorMsg('O código inserido está incorreto. Por favor, verifique o seu email.');
        }
        return;
      }

      if (recoveryStep === 3) {
        if (newPassword.length < 6) {
          setErrorMsg('A senha deve ter pelo menos 6 caracteres.');
          return;
        }
        if (newPassword !== confirmPassword) {
          setErrorMsg('As senhas não coincidem.');
          return;
        }

        // Save password via AuthService
        authService.updatePassword(email, newPassword);
        setRecoveryStep(4);
        return;
      }
      return;
    }

    if (!email) return;
    
    // Login Validation or Registration
    if (isLogin) {
      const existingUser = authService.validateCredentials(email, password);
      
      if (!existingUser) {
        // If email exists but validation failed, it means password was incorrect
        if (authService.emailExists(email)) {
          setErrorMsg('Senha incorreta. Se se esqueceu da sua senha, clique em "Esqueci-me a senha ?".');
          return;
        } else {
          // Auto-register on login if the user does not exist (maintains original project design)
          const newUser = authService.registerUser(email.split('@')[0], email, password);
          login(newUser.name, email);
          navigate('/');
          return;
        }
      }
      
      login(existingUser.name, email);
      navigate('/');
      return;
    }

    if (isRegister) {
      if (!name) return;
      if (authService.emailExists(email)) {
        setErrorMsg('Este email já está registado.');
        return;
      }

      authService.registerUser(name, email, password);
      login(name, email);
      navigate('/');
      return;
    }
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      fontFamily: 'var(--font-sans)',
    }}>

      {/* ══════════ LEFT PANEL ══════════ */}
      <div
        className="login-left-panel"
        style={{
          flex: '0 0 46%',
          background: 'var(--primary)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          padding: '3rem 3.25rem',
          overflow: 'hidden',
        }}
      >
        {/* Decorative blobs */}
        <div style={{
          position: 'absolute', top: '-100px', right: '-100px',
          width: '320px', height: '320px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '260px', height: '260px', borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)',
          pointerEvents: 'none',
        }} />

        {/* Brand name */}
        <div style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.35rem',
          fontWeight: 700,
          color: 'white',
          letterSpacing: '-0.2px',
          marginBottom: '2.75rem',
          position: 'relative',
          zIndex: 1,
        }}>
          Kalandula<span style={{ opacity: 0.7 }}> Learning</span>
        </div>

        {/* Headline */}
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.8rem',
          fontWeight: 700,
          color: 'white',
          lineHeight: 1.3,
          maxWidth: '360px',
          marginBottom: '1rem',
          position: 'relative',
          zIndex: 1,
        }}>
          Acelere os seus estudos acessando sua conta na nossa plataforma{' '}
          <span style={{
            display: 'inline-block',
            width: '10px',
            height: '10px',
            backgroundColor: '#F59E0B',
            marginLeft: '4px',
            borderRadius: '1px',
            verticalAlign: 'baseline'
          }}></span>
        </h2>

        {/* Subtitle */}
        <p style={{
          color: 'rgba(255,255,255,0.82)',
          fontSize: '0.9rem',
          lineHeight: 1.7,
          maxWidth: '340px',
          position: 'relative',
          zIndex: 1,
        }}>
          Uma Conta{' '}
          <span style={{ color: 'white', fontWeight: 700 }}>Kalandula</span>{' '}
          é o teu passe livre para cursos, comunidade, eventos e muito mais{' '}
          <span style={{
            display: 'inline-block',
            width: '8px',
            height: '8px',
            backgroundColor: 'rgba(255,255,255,0.8)',
            marginLeft: '4px',
            borderRadius: '1px',
            verticalAlign: 'baseline'
          }}></span>
        </p>

        {/* Illustration — pushed to the bottom */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          marginTop: 'auto',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '1.5rem',
        }}>
          <StudyIllustration />
        </div>
      </div>

      {/* ══════════ RIGHT PANEL ══════════ */}
      <div style={{
        flex: 1,
        background: '#EEF0F4',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        minHeight: '100vh',
      }}>

        {/* ── Floating Card ── */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          boxShadow: '0 8px 48px rgba(0,0,0,0.09)',
          padding: '2.75rem 2.5rem',
          width: '100%',
          maxWidth: '440px',
          animation: 'fadeIn 0.4s ease forwards',
        }}>
          {isRecover ? (
            <div style={{ animation: 'fadeIn 0.4s ease forwards' }}>
              {/* Error Message */}
              {errorMsg && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '8px',
                  color: '#EF4444',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  {errorMsg}
                </div>
              )}

              {recoveryStep === 1 && (
                <>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    textAlign: 'center',
                    marginBottom: '0.35rem',
                  }}>
                    Recuperar senha
                  </h1>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    marginBottom: '1.75rem',
                  }}>
                    Insira o email associado à sua conta para receber o código de recuperação.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                      <Mail size={18} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none'
                      }} />
                      <input
                        type="email"
                        className="form-input"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                        style={{ borderRadius: '10px', paddingLeft: '2.6rem' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.9rem',
                        fontSize: '1rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Enviar Código de Recuperação
                    </button>
                  </form>
                </>
              )}

              {recoveryStep === 2 && (
                <>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    textAlign: 'center',
                    marginBottom: '0.35rem',
                  }}>
                    Verificar código
                  </h1>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    marginBottom: '1rem',
                    lineHeight: '1.5'
                  }}>
                    Introduza o código de 6 dígitos de recuperação enviado para <strong>{email}</strong>.
                  </p>


                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                      <input
                        type="text"
                        maxLength={6}
                        className="form-input"
                        placeholder="000000"
                        value={enteredCode}
                        onChange={e => setEnteredCode(e.target.value.replace(/\D/g, ''))}
                        required
                        style={{
                          borderRadius: '10px',
                          textAlign: 'center',
                          fontSize: '1.4rem',
                          letterSpacing: '6px',
                          fontWeight: 700,
                          padding: '0.75rem'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.9rem',
                        fontSize: '1rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Verificar Código
                    </button>
                  </form>
                </>
              )}

              {recoveryStep === 3 && (
                <>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.6rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    textAlign: 'center',
                    marginBottom: '0.35rem',
                  }}>
                    Nova senha
                  </h1>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.86rem',
                    textAlign: 'center',
                    marginBottom: '1.75rem',
                  }}>
                    Crie uma nova senha para a sua conta.
                  </p>

                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '0.8rem', position: 'relative' }}>
                      <Lock size={18} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none'
                      }} />
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Nova senha (min. 6 car.)"
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                        required
                        style={{ borderRadius: '10px', paddingLeft: '2.6rem' }}
                      />
                    </div>

                    <div style={{ marginBottom: '1.2rem', position: 'relative' }}>
                      <Lock size={18} style={{
                        position: 'absolute',
                        left: '1rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'var(--text-muted)',
                        pointerEvents: 'none'
                      }} />
                      <input
                        type="password"
                        className="form-input"
                        placeholder="Confirmar nova senha"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        required
                        style={{ borderRadius: '10px', paddingLeft: '2.6rem' }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{
                        width: '100%',
                        padding: '0.9rem',
                        fontSize: '1rem',
                        borderRadius: '10px',
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 700,
                        letterSpacing: '0.3px',
                      }}
                    >
                      Alterar Senha
                    </button>
                  </form>
                </>
              )}

              {recoveryStep === 4 && (
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(34, 197, 94, 0.1)',
                    color: '#22C55E',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.5rem',
                    boxShadow: '0 4px 12px rgba(34, 197, 94, 0.15)'
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <h1 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--text-main)',
                    marginBottom: '1rem',
                  }}>
                    Senha Alterada!
                  </h1>
                  <p style={{
                    color: 'var(--text-muted)',
                    fontSize: '0.9rem',
                    lineHeight: '1.6',
                    marginBottom: '2rem',
                  }}>
                    A sua senha foi redefinida com sucesso. Pode agora iniciar sessão com a sua nova credencial.
                  </p>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      setRecoveryStep(1);
                      setRecoveryCode('');
                      setEnteredCode('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setErrorMsg('');
                      setMode('login');
                    }}
                    style={{
                      width: '100%',
                      padding: '0.9rem',
                      borderRadius: '10px',
                      fontFamily: 'var(--font-heading)',
                      fontWeight: 700
                    }}
                  >
                    Fazer Login
                  </button>
                </div>
              )}

              {/* Back to Login Switch */}
              {recoveryStep !== 4 && (
                <p style={{
                  marginTop: '1.4rem',
                  textAlign: 'center',
                  fontSize: '0.84rem',
                  color: 'var(--text-muted)',
                }}>
                  <button
                    type="button"
                    onClick={() => {
                      setRecoveryStep(1);
                      setRecoveryCode('');
                      setEnteredCode('');
                      setNewPassword('');
                      setConfirmPassword('');
                      setErrorMsg('');
                      setMode('login');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      padding: 0,
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Voltar para o login
                  </button>
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Title */}
              <h1 style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: 'var(--text-main)',
                textAlign: 'center',
                marginBottom: '0.35rem',
              }}>
                {isLogin ? 'Faça login na sua conta' : 'Crie a sua conta'}
              </h1>
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.86rem',
                textAlign: 'center',
                marginBottom: '1.75rem',
              }}>
                {isLogin
                  ? 'Faça o seu login, e comece já a estudar.'
                  : 'Registe-se e comece a aprender hoje.'}
              </p>

              {/* Error Message */}
              {errorMsg && (
                <div style={{
                  padding: '0.75rem 1rem',
                  background: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  borderRadius: '8px',
                  color: '#EF4444',
                  fontSize: '0.85rem',
                  marginBottom: '1rem',
                  textAlign: 'center',
                  fontWeight: 500
                }}>
                  {errorMsg}
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {isRegister && (
                  <div style={{ marginBottom: '0.8rem', position: 'relative' }}>
                    <User size={18} style={{
                      position: 'absolute',
                      left: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-muted)',
                      pointerEvents: 'none'
                    }} />
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Nome completo"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      required={isRegister}
                      style={{ borderRadius: '10px', paddingLeft: '2.6rem' }}
                    />
                  </div>
                )}

                <div style={{ marginBottom: '0.8rem', position: 'relative' }}>
                  <Mail size={18} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type="email"
                    className="form-input"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    style={{ borderRadius: '10px', paddingLeft: '2.6rem' }}
                  />
                </div>

                <div style={{ marginBottom: '1rem', position: 'relative' }}>
                  <Lock size={18} style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)',
                    pointerEvents: 'none'
                  }} />
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ borderRadius: '10px', paddingLeft: '2.6rem' }}
                  />
                </div>

                {/* Remember me + Forgot password */}
                {isLogin && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '1.3rem',
                  }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      userSelect: 'none',
                    }}>
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={e => setRemember(e.target.checked)}
                        style={{
                          width: '15px',
                          height: '15px',
                          accentColor: 'var(--primary)',
                          cursor: 'pointer',
                        }}
                      />
                      Lembrar-me
                    </label>
                    <button
                      type="button"
                      onClick={() => setMode('recover')}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-muted)',
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        padding: 0,
                        fontFamily: 'var(--font-sans)',
                        transition: 'color 0.15s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--primary)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
                    >
                      Esqueci-me a senha ?
                    </button>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.9rem',
                    fontSize: '1rem',
                    borderRadius: '10px',
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 700,
                    letterSpacing: '0.3px',
                  }}
                >
                  {isLogin ? 'Entrar' : 'Registar'}
                </button>
              </form>

              {/* Switch mode */}
              <p style={{
                marginTop: '1.4rem',
                textAlign: 'center',
                fontSize: '0.84rem',
                color: 'var(--text-muted)',
              }}>
                <>
                  {isLogin ? 'Ainda não tem uma conta ?' : 'Já tem uma conta ?'}{' '}
                  <button
                    type="button"
                    onClick={() => setMode(isLogin ? 'register' : 'login')}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'var(--primary)',
                      fontWeight: 600,
                      fontSize: '0.84rem',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-sans)',
                      padding: 0,
                      transition: 'opacity 0.15s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    {isLogin ? 'Crie uma conta agora' : 'Faça login'}
                  </button>
                </>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
