import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HemoApp.css';

// ===============================================
// COMPONENTE PRINCIPAL APP
// ===============================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    role: 'donante'
  });

  // Función de navegación
  const MapsTo = (viewName) => {
    setCurrentPage(viewName);
    if (viewName === 'onboarding') {
      setOnboardingStep(1);
    }
  };

  // ===============================================
  // COMPONENTE HEADER
  // ===============================================
  const Header = () => (
    <header className="hemo-header">
      <div className="container">
        <nav className="d-flex justify-content-between align-items-center">
          <div className="brand">
            <i className="fas fa-heart"></i>
            <span>HemoApp</span>
          </div>
          <div className="d-flex gap-3 align-items-center">
            <button 
              className="btn btn-outline-light"
              onClick={() => MapsTo('solicitud_donacion')}
            >
              Necesito sangre
            </button>
            <button 
              className="btn btn-link text-white text-decoration-none"
              onClick={() => MapsTo('profile')}
            >
              <i className="fas fa-user me-2"></i>
              Mi Perfil
            </button>
            <button 
              className="btn btn-outline-light"
              onClick={() => MapsTo('login')}
            >
              <i className="fas fa-sign-out-alt me-2"></i>
              Salir
            </button>
          </div>
        </nav>
      </div>
    </header>
  );

  // ===============================================
  // COMPONENTE FEATURECARDS (Landing Page)
  // ===============================================
  const FeatureCards = () => (
    <div>
      <Header />
      <div className="container py-5">
        <h1 className="welcome-text">¿Qué quieres ver hoy?</h1>
        
        <div className="row justify-content-center mt-5">
          <div className="col-md-4 mb-4">
            <div className="feature-card" onClick={() => MapsTo('donacion_info')}>
              <div className="icon-circle">
                <i className="fas fa-hand-holding-heart"></i>
              </div>
              <h3>Donar</h3>
              <p>Programa tu próxima donación</p>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="feature-card" onClick={() => MapsTo('mapa')}>
              <div className="icon-circle">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Mapa</h3>
              <p>Centros de donación cercanos</p>
            </div>
          </div>
          
          <div className="col-md-4 mb-4">
            <div className="feature-card" onClick={() => MapsTo('donaciones_history')}>
              <div className="icon-circle">
                <i className="fas fa-history"></i>
              </div>
              <h3>Tus Donaciones</h3>
              <p>Revisa tu historial</p>
            </div>
          </div>
        </div>
        
        <a href="#" className="info-link">
          ¿Qué necesito saber para donar?
          <i className="fas fa-arrow-right"></i>
        </a>
      </div>
    </div>
  );

  // ===============================================
  // VISTA LOGIN
  // ===============================================
  const LoginView = () => (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-header">
          <i className="fas fa-heart"></i>
        </div>
        <h2>Iniciar Sesión</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          setUserData({ ...userData, username: 'Usuario Demo' });
          MapsTo('onboarding');
        }}>
          <div className="mb-3">
            <label className="form-label">Correo Electrónico</label>
            <input 
              type="email" 
              className="form-control" 
              placeholder="tu@email.com"
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              className="form-control" 
              placeholder="••••••••"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary-hemo w-100 mb-3">
            Entrar
          </button>
          <div className="text-center">
            <a href="#" className="text-muted small">¿Olvidaste tu contraseña?</a>
          </div>
          <div className="text-center mt-3">
            <span className="text-muted">¿No tienes cuenta? </span>
            <a href="#" onClick={(e) => { e.preventDefault(); MapsTo('register'); }}>
              Regístrate aquí
            </a>
          </div>
        </form>
      </div>
    </div>
  );

  // ===============================================
  // VISTA REGISTRO
  // ===============================================
  const RegisterView = () => (
    <div className="auth-container">
      <div className="auth-card">
        <div className="icon-header">
          <i className="fas fa-user-plus"></i>
        </div>
        <h2>Crear Cuenta</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          MapsTo('onboarding');
        }}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Apellido</label>
            <input type="text" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" className="form-control" required />
          </div>
          <button type="submit" className="btn btn-accent-hemo w-100 mb-3">
            Crear Cuenta
          </button>
          <div className="text-center">
            <span className="text-muted">¿Ya tienes cuenta? </span>
            <a href="#" onClick={(e) => { e.preventDefault(); MapsTo('login'); }}>
              Inicia sesión
            </a>
          </div>
        </form>
      </div>
    </div>
  );

  // ===============================================
  // VISTA ONBOARDING
  // ===============================================
  const OnboardingView = () => {
    const totalSteps = 5;
    const progressPercent = (onboardingStep / totalSteps) * 100;

    return (
      <div className="auth-container">
        <div className="onboarding-container">
          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <div className="progress-hemo mb-4">
                <div 
                  className="progress-bar" 
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              
              <h3 className="step-title">
                Paso {onboardingStep}: {
                  onboardingStep === 1 ? 'Información Médica' :
                  onboardingStep === 2 ? 'Historial de Donaciones' :
                  onboardingStep === 3 ? 'Condiciones de Salud' :
                  onboardingStep === 4 ? 'Medicamentos' :
                  'Confirmación'
                }
              </h3>

              {onboardingStep === 1 && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Sangre</label>
                    <select className="form-select">
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Peso (kg)</label>
                    <input type="number" className="form-control" placeholder="65" />
                  </div>
                </div>
              )}

              {onboardingStep === 2 && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">¿Has donado sangre antes?</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="donado" id="si" />
                      <label className="form-check-label" htmlFor="si">Sí</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="donado" id="no" />
                      <label className="form-check-label" htmlFor="no">No</label>
                    </div>
                  </div>
                </div>
              )}

              {onboardingStep === 3 && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">¿Tienes tatuajes o piercings recientes?</label>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="tatuajes" />
                      <label className="form-check-label">Sí</label>
                    </div>
                    <div className="form-check">
                      <input className="form-check-input" type="radio" name="tatuajes" />
                      <label className="form-check-label">No</label>
                    </div>
                  </div>
                </div>
              )}

              {onboardingStep === 4 && (
                <div>
                  <div className="mb-3">
                    <label className="form-label">¿Estás tomando algún medicamento?</label>
                    <textarea className="form-control" rows="3" placeholder="Describe aquí..."></textarea>
                  </div>
                </div>
              )}

              {onboardingStep === 5 && (
                <div className="text-center">
                  <i className="fas fa-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                  <h4 className="mt-3">¡Perfil Completo!</h4>
                  <p className="text-muted">Gracias por completar tu información</p>
                </div>
              )}

              <div className="d-flex justify-content-between mt-4">
                <button 
                  className="btn btn-outline-secondary"
                  onClick={() => MapsTo('landing')}
                >
                  Saltar por ahora
                </button>
                <button 
                  className="btn btn-primary-hemo"
                  onClick={() => {
                    if (onboardingStep < totalSteps) {
                      setOnboardingStep(onboardingStep + 1);
                    } else {
                      MapsTo('landing');
                    }
                  }}
                >
                  {onboardingStep === totalSteps ? 'Finalizar' : 'Siguiente'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // ===============================================
  // VISTA SOLICITUD DE DONACIÓN
  // ===============================================
  const SolicitudView = () => (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow-lg border-0">
              <div className="card-body p-4">
                <h2 className="text-center mb-4" style={{ color: 'var(--hemo-brand)' }}>
                  Solicitud de Sangre
                </h2>
                <form>
                  <div className="mb-3">
                    <label className="form-label">Nombre del Paciente</label>
                    <input type="text" className="form-control" required />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Hospital</label>
                    <select className="form-select">
                      <option>Hospital Central de Formosa</option>
                      <option>Hospital de Alta Complejidad (HAC)</option>
                      <option>Centro Provincial de Hemoterapia</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Tipo de Sangre Requerido</label>
                    <select className="form-select">
                      <option>A+</option>
                      <option>A-</option>
                      <option>B+</option>
                      <option>B-</option>
                      <option>AB+</option>
                      <option>AB-</option>
                      <option>O+</option>
                      <option>O-</option>
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Comentarios</label>
                    <textarea className="form-control" rows="3" placeholder="Información adicional..."></textarea>
                  </div>
                  <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-accent-hemo flex-grow-1">
                      Publicar Solicitud
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary"
                      onClick={() => MapsTo('landing')}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // VISTA MAPA
  // ===============================================
  const MapView = () => {
    const centers = [
      {
        id: 1,
        name: 'Centro Provincial de Hemoterapia',
        status: 'urgent',
        statusText: 'Urgencia',
        position: { top: '30%', left: '40%' }
      },
      {
        id: 2,
        name: 'Hospital de Alta Complejidad (HAC)',
        status: 'low',
        statusText: 'Stock Bajo',
        position: { top: '50%', left: '60%' }
      },
      {
        id: 3,
        name: 'Banco de Sangre del Hospital Central',
        status: 'complete',
        statusText: 'Stock Completo',
        position: { top: '65%', left: '35%' }
      }
    ];

    return (
      <div>
        <Header />
        <div className="container py-4">
          <h2 className="text-center mb-4" style={{ color: 'var(--hemo-brand)' }}>
            Centros de Donación - Formosa Capital
          </h2>
          
          <div className="map-container">
            {centers.map(center => (
              <div
                key={center.id}
                className={`map-pin stock-${center.status}`}
                style={center.position}
                onClick={() => setSelectedCenter(center)}
              >
                <i className="fas fa-map-marker-alt"></i>
              </div>
            ))}
            
            {selectedCenter && (
              <div className="map-details-panel">
                <button 
                  className="btn-close float-end"
                  onClick={() => setSelectedCenter(null)}
                ></button>
                <h4>{selectedCenter.name}</h4>
                <span className={`status-badge ${selectedCenter.status}`}>
                  {selectedCenter.statusText}
                </span>
                <p className="mt-3 mb-0">
                  <i className="fas fa-clock me-2"></i>
                  Horario: Activo
                </p>
              </div>
            )}
          </div>
          
          <div className="mt-4 text-center">
            <button className="btn btn-outline-secondary" onClick={() => MapsTo('landing')}>
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    );
  };

  // ===============================================
  // VISTA PERFIL
  // ===============================================
  const ProfileView = () => (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="profile-card">
              <h3>Mi Perfil</h3>
              <div className="stat-item">
                <span className="stat-label">Nombre:</span>
                <span className="stat-value">{userData.username || 'Usuario Demo'}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Tipo de Sangre:</span>
                <span className="stat-value">O+</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Última Donación:</span>
                <span className="stat-value">15 Enero 2025</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Próxima fecha disponible:</span>
                <span className="stat-value">15 Abril 2025</span>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <button className="btn btn-outline-secondary" onClick={() => MapsTo('landing')}>
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // VISTA HISTORIAL DE DONACIONES
  // ===============================================
  const DonacionesHistoryView = () => (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="profile-card">
              <h3>Historial de Donaciones</h3>
              <div className="stat-item">
                <span className="stat-label">Veces donadas:</span>
                <span className="stat-value">8 veces</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Citas faltadas:</span>
                <span className="stat-value">1 vez</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Contribución de componentes:</span>
                <span className="stat-value">24 unidades</span>
              </div>
            </div>
            
            <div className="profile-card mt-4">
              <h3>Últimas Donaciones</h3>
              <div className="list-group">
                <div className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span><i className="fas fa-calendar me-2"></i>15 Enero 2025</span>
                    <span className="badge bg-success">Completa</span>
                  </div>
                  <small className="text-muted">Hospital Central</small>
                </div>
                <div className="list-group-item">
                  <div className="d-flex justify-content-between">
                    <span><i className="fas fa-calendar me-2"></i>20 Octubre 2024</span>
                    <span className="badge bg-success">Completa</span>
                  </div>
                  <small className="text-muted">HAC</small>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <button className="btn btn-outline-secondary" onClick={() => MapsTo('landing')}>
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // VISTA DE INFORMACIÓN DE DONACIÓN
  // ===============================================
  const DonacionInfoView = () => (
    <div>
      <Header />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="profile-card">
              <h3>¿Qué necesito saber para donar?</h3>
              <div className="mt-4">
                <h5><i className="fas fa-check-circle text-success me-2"></i>Requisitos:</h5>
                <ul>
                  <li>Tener entre 18 y 65 años</li>
                  <li>Pesar más de 50 kg</li>
                  <li>Estar en buen estado de salud</li>
                  <li>No haber donado en los últimos 3 meses</li>
                </ul>
                
                <h5 className="mt-4"><i className="fas fa-times-circle text-danger me-2"></i>No puedes donar si:</h5>
                <ul>
                  <li>Tienes tatuajes o piercings recientes (menos de 12 meses)</li>
                  <li>Has tenido fiebre o infecciones en las últimas 2 semanas</li>
                  <li>Estás embarazada o amamantando</li>
                  <li>Has tenido cirugías recientes</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center mt-4">
              <button className="btn btn-accent-hemo me-2" onClick={() => MapsTo('mapa')}>
                Ver Centros de Donación
              </button>
              <button className="btn btn-outline-secondary" onClick={() => MapsTo('landing')}>
                Volver al Inicio
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // ===============================================
  // VISTA LANDING PAGE (HOME)
  // ===============================================
  const HomePage = () => (
    <div>
      {/* Header/Navbar */}
      <nav className="navbar navbar-expand-lg" style={{ 
        background: 'linear-gradient(135deg, #9b1c31 0%, #a51129 100%)',
        padding: '1.2rem 0'
      }}>
        <div className="container">
          <a className="navbar-brand d-flex align-items-center gap-2 text-white" href="#" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            <i className="fas fa-heart"></i>
            <span>Hemo<span style={{ fontWeight: '400' }}>App</span></span>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center gap-3">
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Nosotros</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Servicios</a>
              </li>
              <li className="nav-item">
                <button 
                  className="btn text-white px-4 py-2"
                  style={{ 
                    background: 'linear-gradient(135deg, #dc143c 0%, #ff1744 100%)',
                    border: 'none',
                    borderRadius: '25px',
                    fontWeight: '600'
                  }}
                  onClick={() => MapsTo('login')}
                >
                  Iniciar Sesión
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #9b1c31 0%, #c41e3a 50%, #a51129 100%)',
        position: 'relative',
        overflow: 'hidden',
        minHeight: '600px'
      }}>
        <div style={{
          position: 'absolute',
          right: '-100px',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,20,60,0.4) 0%, rgba(220,20,60,0.1) 70%)',
          filter: 'blur(40px)'
        }}></div>
        
        <div className="container py-5" style={{ position: 'relative', zIndex: 2 }}>
          <div className="row align-items-center">
            <div className="col-lg-6 text-white py-5">
              <h1 style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold',
                lineHeight: '1.2',
                marginBottom: '1.5rem'
              }}>
                CONECTAMOS CON QUIENES MÁS LO NECESITAN
              </h1>
              <p style={{ fontSize: '1.1rem', marginBottom: '2rem', lineHeight: '1.6' }}>
                HemoApp es la plataforma que une donantes de sangre con hospitales e instituciones de salud de manera rápida y segura.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <button 
                  className="btn btn-lg px-4 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #dc143c 0%, #c41e3a 100%)',
                    border: 'none',
                    color: 'white',
                    fontWeight: '600',
                    borderRadius: '30px',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.3)'
                  }}
                  onClick={() => MapsTo('register')}
                >
                  Quiero donar
                </button>
                <button 
                  className="btn btn-lg px-4 py-3"
                  style={{
                    background: 'rgba(255, 182, 193, 0.9)',
                    border: 'none',
                    color: '#721c24',
                    fontWeight: '600',
                    borderRadius: '30px'
                  }}
                  onClick={() => MapsTo('solicitud_donacion')}
                >
                  Necesito recibir una donación
                </button>
              </div>
              <p className="mt-4" style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
                Cada día, miles de personas necesitan sangre para cirugías, emergencias y tratamientos. Sin embargo, la falta de donantes disponibles sigue siendo un gran desafío.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5" style={{ background: 'linear-gradient(180deg, #fff 0%, #ffe0e0 100%)' }}>
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="row g-4">
                <div className="col-6">
                  <div className="text-center">
                    <div style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b1538 0%, #a51129 100%)',
                      border: '8px solid rgba(139, 21, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 8px 20px rgba(139, 21, 56, 0.3)'
                    }}>
                      <i className="fas fa-syringe" style={{ fontSize: '3rem', color: 'white' }}></i>
                    </div>
                    <h6 style={{ color: '#333', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Registro de donantes<br />voluntarios
                    </h6>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <div style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b1538 0%, #a51129 100%)',
                      border: '8px solid rgba(139, 21, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 8px 20px rgba(139, 21, 56, 0.3)'
                    }}>
                      <i className="fas fa-hand-holding-medical" style={{ fontSize: '3rem', color: 'white' }}></i>
                    </div>
                    <h6 style={{ color: '#333', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Solicitudes urgentes de<br />sangre en tiempo real
                    </h6>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <div style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b1538 0%, #a51129 100%)',
                      border: '8px solid rgba(139, 21, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 8px 20px rgba(139, 21, 56, 0.3)'
                    }}>
                      <i className="fas fa-map-marker-alt" style={{ fontSize: '3rem', color: 'white' }}></i>
                    </div>
                    <h6 style={{ color: '#333', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Geolocalización de<br />instituciones cercanas
                    </h6>
                  </div>
                </div>
                <div className="col-6">
                  <div className="text-center">
                    <div style={{
                      width: '150px',
                      height: '150px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #8b1538 0%, #a51129 100%)',
                      border: '8px solid rgba(139, 21, 56, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 1rem',
                      boxShadow: '0 8px 20px rgba(139, 21, 56, 0.3)'
                    }}>
                      <i className="fas fa-ribbon" style={{ fontSize: '3rem', color: 'white' }}></i>
                    </div>
                    <h6 style={{ color: '#333', fontWeight: 'bold', fontSize: '0.9rem' }}>
                      Notificaciones y<br />recordatorios personalizados
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7 ps-lg-5 mt-4 mt-lg-0">
              <h2 style={{ 
                fontSize: '3rem',
                fontWeight: 'bold',
                color: 'white',
                lineHeight: '1.2',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}>
                HemoApp simplifica el proceso de donación conectando donantes, receptores e instituciones en un solo lugar.
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #a51129 0%, #c41e3a 50%, #dc143c 100%)',
        padding: '4rem 0'
      }}>
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-6">
              <div className="text-white">
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ¿Es seguro donar sangre con HemoApp?
                </h3>
                <p style={{ fontSize: '1.1rem' }}>
                  Sí, trabajamos únicamente con bancos de sangre y hospitales certificados
                </p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="text-white">
                <h3 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                  ¿Tiene costo de servicio?
                </h3>
                <p style={{ fontSize: '1.1rem' }}>
                  No, HemoApp es totalmente gratuito para donantes y pacientes
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center mb-4">
            <div className="d-flex align-items-center justify-content-center gap-4 mb-3">
              <div style={{
                width: '100px',
                height: '100px',
                background: 'white',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative'
              }}>
                <i className="fas fa-heart" style={{ fontSize: '3rem', color: '#dc143c' }}></i>
              </div>
            </div>
            <h3 className="text-white mb-3" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
              ¿Cómo me registro?
            </h3>
            <p className="text-white mb-4" style={{ fontSize: '1.1rem' }}>
              Descarga la app, completa tus datos y podrás recibir notificaciones cuando alguien necesite tu ayuda
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        background: 'linear-gradient(180deg, #c41e3a 0%, #ff6b9d 100%)',
        padding: '5rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h2 className="text-white mb-4" style={{ 
            fontSize: '2.5rem',
            fontWeight: 'bold',
            lineHeight: '1.3'
          }}>
            Únete a nuestra comunidad de héroes anónimos<br />
            Doná cerca, salvá lejos.
          </h2>
          <button 
            className="btn btn-lg px-5 py-3"
            style={{
              background: 'linear-gradient(135deg, #5a0f1e 0%, #8b1538 100%)',
              border: 'none',
              color: 'white',
              fontWeight: 'bold',
              fontSize: '1.2rem',
              borderRadius: '35px',
              boxShadow: '0 6px 20px rgba(0,0,0,0.3)'
            }}
            onClick={() => MapsTo('register')}
          >
            Registrarme ahora
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4" style={{ background: '#fff', borderTop: '1px solid #ddd' }}>
        <div className="container">
          <div className="text-center">
            <a href="#" className="text-decoration-none text-dark mx-3">Nosotros</a>
            <span className="text-muted">|</span>
            <a href="#" className="text-decoration-none text-dark mx-3">Servicios</a>
            <span className="text-muted">|</span>
            <a href="#" className="text-decoration-none text-dark mx-3">Preguntas frecuentes</a>
            <span className="text-muted">|</span>
            <a href="#" className="text-decoration-none text-dark mx-3">Términos y condiciones</a>
          </div>
        </div>
      </footer>
    </div>
  );

  // ===============================================
  // RENDERIZADO PRINCIPAL (SWITCH)
  // ===============================================
  switch (currentPage) {
    case 'home':
      return <HomePage />;
    case 'login':
      return <LoginView />;
    case 'register':
      return <RegisterView />;
    case 'onboarding':
      return <OnboardingView />;
    case 'landing':
      return <FeatureCards />;
    case 'solicitud_donacion':
      return <SolicitudView />;
    case 'profile':
      return <ProfileView />;
    case 'donaciones_history':
      return <DonacionesHistoryView />;
    case 'mapa':
      return <MapView />;
    case 'donacion_info':
      return <DonacionInfoView />;
    default:
      return <HomePage />;
  }
}
