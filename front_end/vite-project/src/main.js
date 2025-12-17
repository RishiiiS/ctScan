import './style.css'

const app = document.querySelector('#app')

// --- State Management ---
const state = {
  partnered: false,
  user: null, // { name, email, ... }
  location: null, // 'Pune', etc.
  serviceType: null, // 'online' | 'offline'
  appointment: null, // { companyName, companySize, eventType, date, timeSlot }
  currentView: 'home'
}

// --- API Configuration ---
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5001/api'

// --- Persistence Helpers (Token only in localStorage) ---
const saveToken = (token) => {
  localStorage.setItem('cr_token', token)
}

const getToken = () => {
  return localStorage.getItem('cr_token')
}

const clearToken = () => {
  localStorage.removeItem('cr_token')
}

const loadState = async () => {
  const token = getToken()
  if (token) {
    try {
      const res = await fetch(`${API_BASE}/users/profile`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      if (data.success) {
        state.user = data.data
        state.location = data.data.location
        if (state.location) {
          state.currentView = 'booking'
        } else {
          state.currentView = 'location'
        }
      } else {
        clearToken()
      }
    } catch (e) {
      clearToken()
    }
  }
  render()
}

// --- Router/Navigation ---
const navigate = (view) => {
  state.currentView = view
  render()
}

// --- Views ---

// 1. Home Page
const renderHome = () => {
  const userGreeting = state.user ? `<span style="color: var(--accent-orange);">Hi, ${state.user.name.split(' ')[0]}</span> <a href="#" onclick="window.logout()" class="btn-ghost">Logout</a>` : `<a href="#" onclick="window.navigate('signup')" class="btn-ghost">Sign Up</a>`
  const getStartedTarget = state.user ? (state.location ? 'booking' : 'location') : 'signup'
  
  return `
    <!-- Navigation -->
    <nav style="padding: 1.5rem 3rem; position: fixed; top: 0; left: 0; right: 0; z-index: 100; background: rgba(0, 0, 0, 0.9); backdrop-filter: blur(20px); border-bottom: 1px solid var(--border-color);">
      <div class="flex justify-between items-center" style="max-width: 1400px; margin: 0 auto;">
        <div style="font-family: var(--font-display); font-weight: 700; font-size: 1.5rem; letter-spacing: -0.02em;">
          <span style="color: var(--accent-orange);">Connect</span><span style="color: var(--text-primary);">Remote</span>
        </div>
        <div class="flex items-center gap-lg">
          <a href="#" onclick="window.navigate('home')" class="btn-ghost">Home</a>
          <a href="#" onclick="window.navigate('about')" class="btn-ghost">About</a>
          ${userGreeting}
          <button id="partner-btn" class="btn btn-primary" style="padding: 0.75rem 1.5rem;">
            ${state.partnered ? 'PARTNERED ✓' : 'PARTNER WITH US'}
          </button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <main style="min-height: 100vh; display: flex; flex-direction: column; justify-content: center; padding: 8rem 2rem 4rem;">
      <div class="container animate-fade-in-up" style="max-width: 1000px; margin: 0 auto;">
        <div class="text-center">
          <span class="tag" style="margin-bottom: 2rem; display: inline-block;">FOR MODERN TEAMS</span>
          
          <h1 style="font-family: var(--font-display); font-size: clamp(3rem, 8vw, 6rem); font-weight: 700; line-height: 1.05; margin-bottom: 2rem; letter-spacing: -0.03em;">
            BRIDGE THE GAP<br>
            <span class="gradient-text">BETWEEN REMOTE</span><br>
            & ONSITE
          </h1>
          
          <p style="font-size: 1.25rem; color: var(--text-secondary); max-width: 600px; margin: 0 auto 3rem; line-height: 1.7;">
            Reimagine workplace coordination. We create human connection and seamless collaboration for distributed teams worldwide.
          </p>
          
          <div class="flex gap-md justify-center" style="flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="window.navigate('${getStartedTarget}')">
              GET STARTED →
            </button>
            <button class="btn btn-outline" onclick="window.navigate('about')">
              LEARN MORE
            </button>
          </div>
        </div>
      </div>
    </main>

    <!-- Stats Section -->
    <section style="padding: 6rem 2rem; border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
      <div class="container">
        <div class="flex justify-center gap-xl" style="flex-wrap: wrap;">
          <div class="stat-item">
            <div class="stat-number">500+</div>
            <div class="stat-label">Companies</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">50K+</div>
            <div class="stat-label">Employees Connected</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">98%</div>
            <div class="stat-label">Satisfaction Rate</div>
          </div>
          <div class="stat-item">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Global Support</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section style="padding: 8rem 2rem;">
      <div class="container">
        <div class="text-center" style="margin-bottom: 4rem;">
          <span class="tag" style="margin-bottom: 1rem; display: inline-block;">WHY US</span>
          <h2 style="font-family: var(--font-display); font-size: 3rem; font-weight: 700;">BUILT FOR THE FUTURE OF WORK</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1px; background: var(--border-color);">
          <div class="feature-item" style="background: var(--bg-primary);">
            <div class="feature-icon">🌐</div>
            <h3 style="margin-bottom: 0.5rem; font-family: var(--font-display);">Virtual Events</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">High-fidelity virtual team building sessions that feel authentic.</p>
          </div>
          <div class="feature-item" style="background: var(--bg-primary);">
            <div class="feature-icon">🏢</div>
            <h3 style="margin-bottom: 0.5rem; font-family: var(--font-display);">Onsite Coordination</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Coordinate in-person meetups at co-working spaces across India.</p>
          </div>
          <div class="feature-item" style="background: var(--bg-primary);">
            <div class="feature-icon">🤝</div>
            <h3 style="margin-bottom: 0.5rem; font-family: var(--font-display);">Human Connection</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Foster real relationships that transcend screens and distance.</p>
          </div>
          <div class="feature-item" style="background: var(--bg-primary);">
            <div class="feature-icon">📊</div>
            <h3 style="margin-bottom: 0.5rem; font-family: var(--font-display);">Analytics</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Measure engagement and team satisfaction with smart insights.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section style="padding: 8rem 2rem; background: var(--bg-secondary);">
      <div class="container text-center">
        <h2 style="font-family: var(--font-display); font-size: 2.5rem; font-weight: 700; margin-bottom: 1.5rem;">
          READY TO <span class="gradient-text">TRANSFORM</span> YOUR TEAM?
        </h2>
        <p style="color: var(--text-secondary); margin-bottom: 2rem; max-width: 500px; margin-left: auto; margin-right: auto;">
          Join 500+ companies already building stronger teams with ConnectRemote.
        </p>
        <button class="btn btn-primary" onclick="window.navigate('${getStartedTarget}')" style="padding: 1.25rem 3rem;">
          START FREE TRIAL →
        </button>
      </div>
    </section>
  `
}

// 1.5. About / Learn More Page
const renderAbout = () => {
  const getStartedTarget = state.user ? (state.location ? 'booking' : 'location') : 'signup'
  
  return `
    <div style="min-height: 100vh; padding: 8rem 2rem;">
      <div class="container animate-fade-in" style="max-width: 900px; margin: 0 auto;">
        
        <div class="text-center" style="margin-bottom: 4rem;">
          <span class="tag" style="margin-bottom: 1.5rem; display: inline-block;">OUR STORY</span>
          <h1 style="font-family: var(--font-display); font-size: 3.5rem; font-weight: 700; margin-bottom: 1.5rem;">
            ABOUT <span class="gradient-text">CONNECTREMOTE</span>
          </h1>
        </div>
        
        <div class="card" style="margin-bottom: 3rem;">
          <p style="font-size: 1.25rem; line-height: 1.8; margin-bottom: 1.5rem; color: var(--text-primary);">
            <strong style="color: var(--accent-orange);">ConnectRemote</strong> is dedicated to solving the isolation crisis in distributed teams.
          </p>
          <p style="color: var(--text-secondary); line-height: 1.8; margin-bottom: 1.5rem;">
            We believe that while work can happen anywhere, human connection requires intention. Our platform seamlessly bridges the physical and digital divide by coordinating onsite meetups and high-fidelity virtual bonding sessions.
          </p>
          <p style="color: var(--text-secondary); line-height: 1.8;">
            Whether you are a fully remote startup or a hybrid enterprise, we help your employees feel seen, heard, and connected.
          </p>
        </div>
        
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: var(--border-color); margin-bottom: 3rem;">
          <div class="stat-item" style="background: var(--bg-primary);">
            <div class="stat-number">2025</div>
            <div class="stat-label">Founded</div>
          </div>
          <div class="stat-item" style="background: var(--bg-primary);">
            <div class="stat-number">5</div>
            <div class="stat-label">Cities</div>
          </div>
          <div class="stat-item" style="background: var(--bg-primary);">
            <div class="stat-number">∞</div>
            <div class="stat-label">Possibilities</div>
          </div>
        </div>
        
        <div class="flex justify-center gap-md">
          <button class="btn btn-primary" onclick="window.navigate('${getStartedTarget}')">JOIN THE REVOLUTION →</button>
          <button class="btn btn-outline" onclick="window.navigate('home')">← BACK HOME</button>
        </div>
      </div>
    </div>
  `
}

// 2. Signup Page
const renderSignup = () => {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem;">
      <div class="card animate-fade-in" style="width: 100%; max-width: 480px;">
        <div class="text-center" style="margin-bottom: 2rem;">
          <span class="tag" style="margin-bottom: 1rem; display: inline-block;">GET STARTED</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem;">CREATE ACCOUNT</h2>
        </div>
        
        <form id="signup-form">
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary);">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" required>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary);">Email Address</label>
            <input type="email" name="email" placeholder="john@company.com" required>
          </div>
          <div style="margin-bottom: 1.5rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-secondary);">Password</label>
            <input type="password" name="password" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">SIGN UP →</button>
        </form>
        
        <div class="text-center" style="margin-top: 2rem;">
          <a href="#" onclick="window.navigate('home')" style="font-size: 0.875rem; color: var(--text-muted);">← Back to Home</a>
        </div>
      </div>
    </div>
  `
}

// 3. Location Selection
const renderLocation = () => {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem;">
      <div class="card animate-fade-in" style="width: 100%; max-width: 500px;">
        <div class="text-center" style="margin-bottom: 2rem;">
          <span class="tag" style="margin-bottom: 1rem; display: inline-block;">STEP 2</span>
          <h2 style="font-family: var(--font-display); font-size: 2rem; margin-bottom: 0.5rem;">SELECT LOCATION</h2>
          <p style="color: var(--text-secondary);">Choose your city for the best service experience</p>
        </div>
        
        <form id="location-form">
          <select name="location" required>
            <option value="" disabled selected>Select your city...</option>
            <option value="Pune">🏙️ Pune</option>
            <option value="Mumbai">🌆 Mumbai</option>
            <option value="Bangalore">🏛️ Bangalore</option>
            <option value="Delhi">🏰 Delhi</option>
            <option value="Hyderabad">🕌 Hyderabad</option>
          </select>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">CONTINUE →</button>
        </form>
        
        <div class="text-center" style="margin-top: 2rem;">
          <a href="#" onclick="window.navigate('signup')" style="font-size: 0.875rem; color: var(--text-muted);">← Back</a>
        </div>
      </div>
    </div>
  `
}

// 4. Booking (Online/Offline)
const renderBooking = () => {
  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem;">
      <div class="animate-fade-in" style="width: 100%; max-width: 900px;">
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="tag" style="margin-bottom: 1rem; display: inline-block;">STEP 3</span>
          <h2 style="font-family: var(--font-display); font-size: 2.5rem;">CHOOSE SERVICE TYPE</h2>
        </div>
        
        <div class="flex gap-lg" style="justify-content: stretch;">
          <!-- Offline Option -->
          <div class="service-card" onclick="window.handleServiceSelect('offline')" 
               style="flex: 1; cursor: pointer; padding: 3rem 2rem; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1.5rem;">🏢</div>
            <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">OFFLINE</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
              Meet in-person at premium co-working spaces across India.
            </p>
            <div style="margin-top: 1.5rem;">
              <span class="tag">RECOMMENDED</span>
            </div>
          </div>

          <!-- Online Option -->
          <div class="service-card" onclick="window.handleServiceSelect('online')" 
               style="flex: 1; cursor: pointer; padding: 3rem 2rem; text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1.5rem;">🌐</div>
            <h3 style="font-family: var(--font-display); font-size: 1.5rem; margin-bottom: 1rem;">ONLINE</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
              Virtual team building & coordination sessions.
            </p>
            <div style="margin-top: 1.5rem;">
              <span class="tag" style="border-color: var(--accent-blue); color: var(--accent-blue);">FLEXIBLE</span>
            </div>
          </div>
        </div>
        
        <div class="text-center" style="margin-top: 2rem;">
          <a href="#" onclick="window.navigate('location')" style="font-size: 0.875rem; color: var(--text-muted);">← Back to Location</a>
        </div>
      </div>
    </div>
  `
}

// 5. Book Appointment Page (for Online Service)
const renderBookAppointment = () => {
  // Generate next 7 days for date picker
  const today = new Date()
  const dates = []
  for (let i = 1; i <= 7; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    dates.push(d)
  }

  const formatDate = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })
  const formatDateValue = (d) => d.toISOString().split('T')[0]

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM']

  return `
    <div style="min-height: 100vh; padding: 4rem 2rem;">
      <div class="animate-fade-in" style="max-width: 900px; margin: 0 auto;">
        
        <!-- Header -->
        <div class="text-center" style="margin-bottom: 3rem;">
          <span class="tag" style="margin-bottom: 1rem; display: inline-block;">BOOK A CALL</span>
          <h1 style="font-family: var(--font-display); font-size: 2.5rem; margin-bottom: 0.5rem;">
            <span class="gradient-text">SCHEDULE</span> APPOINTMENT
          </h1>
          <p style="color: var(--text-secondary); font-size: 1.1rem;">Schedule a call with our team to discuss your event</p>
        </div>

        <form id="appointment-form">
          <div class="flex gap-lg" style="flex-wrap: wrap;">
            
            <!-- Left Column: Company Details -->
            <div class="card" style="flex: 1; min-width: 300px;">
              <h3 style="margin-bottom: 1.5rem; color: var(--accent-orange); font-family: var(--font-display); display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.5rem;">🏢</span> COMPANY DETAILS
              </h3>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Company Name *</label>
                <input type="text" name="companyName" placeholder="Acme Corporation" required>
              </div>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Company Size *</label>
                <select name="companySize" required>
                  <option value="" disabled selected>Select team size...</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>
              
              <div style="margin-bottom: 1rem;">
                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Event Type *</label>
                <select name="eventType" required>
                  <option value="" disabled selected>What are you looking for?</option>
                  <option value="team-building">Team Building Activities</option>
                  <option value="virtual-offsite">Virtual Offsite</option>
                  <option value="icebreakers">Icebreakers & Games</option>
                  <option value="workshops">Workshops & Training</option>
                  <option value="custom">Custom Event</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem; color: var(--text-muted);">Additional Notes</label>
                <textarea name="notes" rows="3" placeholder="Tell us about your team or event requirements..." style="resize: vertical;"></textarea>
              </div>
            </div>

            <!-- Right Column: Date & Time -->
            <div class="card" style="flex: 1; min-width: 300px;">
              <h3 style="margin-bottom: 1.5rem; color: var(--accent-orange); font-family: var(--font-display); display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 1.5rem;">📅</span> SELECT DATE & TIME
              </h3>
              
              <!-- Date Picker -->
              <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.75rem; font-size: 0.875rem; color: var(--text-muted);">Choose a Date *</label>
                <div class="date-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem;">
                  ${dates.map((d, i) => `
                    <label class="date-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="date" value="${formatDateValue(d)}" ${i === 0 ? 'required' : ''} style="display: none;">
                      <div class="date-card" style="padding: 0.75rem 0.5rem; border: 2px solid var(--border-color); border-radius: 0.5rem; text-align: center; transition: all 0.2s;">
                        <div style="font-size: 0.75rem; color: var(--text-muted);">${d.toLocaleDateString('en-IN', { weekday: 'short' })}</div>
                        <div style="font-size: 1.25rem; font-weight: 600;">${d.getDate()}</div>
                        <div style="font-size: 0.7rem; color: var(--text-muted);">${d.toLocaleDateString('en-IN', { month: 'short' })}</div>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
              
              <!-- Time Slots -->
              <div>
                <label style="display: block; margin-bottom: 0.75rem; font-size: 0.875rem; color: var(--text-muted);">Choose a Time Slot *</label>
                <div class="time-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;">
                  ${timeSlots.map((slot, i) => `
                    <label class="time-option" style="display: block; cursor: pointer;">
                      <input type="radio" name="timeSlot" value="${slot}" ${i === 0 ? 'required' : ''} style="display: none;">
                      <div class="time-card" style="padding: 0.75rem; border: 2px solid var(--border-color); border-radius: 0.5rem; text-align: center; transition: all 0.2s; font-size: 0.9rem;">
                        ${slot}
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="text-center" style="margin-top: 2rem;">
            <button type="submit" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.1rem;">
              Confirm Appointment 🚀
            </button>
            <p style="margin-top: 1rem; font-size: 0.875rem; color: var(--text-muted);">You will receive a confirmation email with call details</p>
          </div>
        </form>
        
        <div class="text-center" style="margin-top: 2rem;">
          <a href="#" onclick="window.navigate('booking')" style="font-size: 0.875rem; color: var(--text-muted);">← Back to Service Selection</a>
        </div>
      </div>
    </div>
  `
}

// 6. Success
const renderSuccess = () => {
  const appointmentInfo = state.appointment ? `
    <div class="card" style="margin-top: 2rem; text-align: left; max-width: 400px;">
      <h4 style="margin-bottom: 1rem; color: var(--accent-orange); font-family: var(--font-display);">📋 APPOINTMENT DETAILS</h4>
      <p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong style="color: var(--text-primary);">Company:</strong> ${state.appointment.companyName}</p>
      <p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong style="color: var(--text-primary);">Date:</strong> ${state.appointment.date || state.appointment.bookingDate}</p>
      <p style="margin-bottom: 0.5rem; color: var(--text-secondary);"><strong style="color: var(--text-primary);">Time:</strong> ${state.appointment.timeSlot}</p>
      <p style="color: var(--text-secondary);"><strong style="color: var(--text-primary);">Event:</strong> ${state.appointment.eventType}</p>
    </div>
  ` : ''

  return `
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 4rem 2rem;">
      <div class="animate-fade-in text-center">
        <div style="font-size: 5rem; margin-bottom: 1.5rem;">🎉</div>
        <h1 style="font-family: var(--font-display); font-size: 3rem; margin-bottom: 1rem;">
          <span class="gradient-text">ALL SET!</span>
        </h1>
        <p style="font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.5rem;">
          You have booked an <strong style="color: var(--accent-orange);">${state.serviceType?.toUpperCase()}</strong> service
        </p>
        <p style="font-size: 1.1rem; color: var(--text-secondary);">
          in <strong>${state.location}</strong>
        </p>
        <p style="margin-top: 1.5rem; color: var(--text-muted);">We will be in touch shortly.</p>
        ${appointmentInfo}
        <button class="btn btn-primary" style="margin-top: 2rem;" onclick="window.navigate('home')">← BACK TO HOME</button>
      </div>
    </div>
  `
}

// --- Main Render Function ---
const render = () => {
  let html = ''
  switch (state.currentView) {
    case 'home': html = renderHome(); break;
    case 'about': html = renderAbout(); break;
    case 'signup': html = renderSignup(); break;
    case 'location': html = renderLocation(); break;
    case 'booking': html = renderBooking(); break;
    case 'book-appointment': html = renderBookAppointment(); break;
    case 'success': html = renderSuccess(); break;
    default: html = renderHome();
  }
  app.innerHTML = html
  setupEventListeners()
}

// --- Event Listeners Integration ---
const setupEventListeners = () => {
  // Home: Partner Button
  const partnerBtn = document.getElementById('partner-btn')
  if (partnerBtn) {
    partnerBtn.addEventListener('click', () => {
      state.partnered = !state.partnered
      render() // Re-render to show updated status
    })
  }

  // Signup Form
  const signupForm = document.getElementById('signup-form')
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(signupForm)
      const payload = Object.fromEntries(formData)
      
      try {
        const res = await fetch(`${API_BASE}/users/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })
        const data = await res.json()
        if (data.success) {
          saveToken(data.data.token)
          state.user = data.data
          navigate('location')
        } else {
          alert(data.message || 'Signup failed')
        }
      } catch (err) {
        alert('Error connecting to server')
      }
    })
  }

  // Location Form
  const locForm = document.getElementById('location-form')
  if (locForm) {
    locForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(locForm)
      const location = formData.get('location')
      
      try {
        const res = await fetch(`${API_BASE}/users/location`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify({ location })
        })
        const data = await res.json()
        if (data.success) {
          state.user = data.data
          state.location = data.data.location
          navigate('booking')
        } else {
          alert(data.message || 'Failed to update location')
        }
      } catch (err) {
        alert('Error connecting to server')
      }
    })
  }

  // Appointment Form
  const appointmentForm = document.getElementById('appointment-form')
  if (appointmentForm) {
    // Add interactive styles for date/time cards
    const setupCardSelection = (containerClass) => {
      const cards = document.querySelectorAll(`.${containerClass} input[type="radio"]`)
      cards.forEach(radio => {
        radio.addEventListener('change', () => {
          // Remove selected style from all cards in this group
          document.querySelectorAll(`.${containerClass} .date-card, .${containerClass} .time-card`).forEach(card => {
            card.style.borderColor = 'var(--border-color)'
            card.style.background = 'transparent'
          })
          // Add selected style
          const selectedCard = radio.nextElementSibling
          if (selectedCard) {
            selectedCard.style.borderColor = 'var(--accent-orange)'
            selectedCard.style.background = 'rgba(255, 107, 53, 0.1)'
          }
        })
      })
    }
    setupCardSelection('date-grid')
    setupCardSelection('time-grid')

    appointmentForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(appointmentForm)
      const bookingPayload = {
        companyName: formData.get('companyName'),
        companySize: formData.get('companySize'),
        eventType: formData.get('eventType'),
        date: formData.get('date'),
        timeSlot: formData.get('timeSlot'),
        notes: formData.get('notes'),
        location: state.location,
        serviceType: state.serviceType
      }
      
      try {
        const res = await fetch(`${API_BASE}/bookings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${getToken()}`
          },
          body: JSON.stringify(bookingPayload)
        })
        const data = await res.json()
        if (data.success) {
          state.appointment = data.data
          navigate('success')
        } else {
          alert(data.message || 'Booking failed')
        }
      } catch (err) {
        alert('Error connecting to server')
      }
    })
  }
}

// --- Global Handlers (for onclick in HTML strings) ---
window.navigate = navigate
window.handleServiceSelect = (type) => {
  state.serviceType = type
  if (type === 'online') {
    navigate('book-appointment')
  } else {
    navigate('success')
  }
}
window.logout = () => {
    clearToken()
    state.user = null
    state.location = null
    state.appointment = null
    navigate('home')
}

// Initial Render
loadState()
