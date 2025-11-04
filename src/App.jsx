import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HemoApp.css';

// ===============================================
// COMPONENTE PRINCIPAL APP
// ===============================================
export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
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
  // RENDERIZADO PRINCIPAL (SWITCH)
  // ===============================================
  switch (currentPage) {
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
      return <LoginView />;
  }
}
