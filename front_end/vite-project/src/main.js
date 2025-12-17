import './style.css'

const app = document.querySelector('#app')

// --- State Management ---
const state = {
  partnered: false,
  user: null, // { name, email, ... }
  location: null, // 'New York', etc.
  serviceType: null, // 'online' | 'offline'
  currentView: 'home'
}

// --- Router/Navigation ---
const navigate = (view) => {
  state.currentView = view
  render()
}

// --- Views ---

// 1. Home Page
const renderHome = () => {
  return `
    <nav class="flex justify-between items-center" style="padding: 1.5rem 2rem; background: rgba(15, 23, 42, 0.8); backdrop-filter: blur(10px); position: sticky; top: 0; z-index: 100;">
      <div class="logo" style="font-weight: 700; font-size: 1.5rem; letter-spacing: -1px; color: var(--primary-color);">
        Connect<span style="color: var(--text-main);">Remote</span>
      </div>
      <div class="flex items-center gap-md">
        <a href="#" onclick="window.navigate('home')">Home</a>
        <a href="#" onclick="window.navigate('signup')">Signup</a>
        <button id="partner-btn" class="btn btn-outline" style="font-size: 0.875rem;">
          ${state.partnered ? 'Partnered ✓' : 'Partner with us'}
        </button>
      </div>
    </nav>

    <main class="container text-center mt-lg animate-fade-in" style="min-height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
      <h1 style="font-size: 4rem; margin-bottom: 1.5rem; line-height: 1.1; font-weight: 800; background: linear-gradient(to right, #00bcd4, #ffffff); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">
        Bridge the Gap Between<br>Remote & Onsite
      </h1>
      <p style="font-size: 1.25rem; color: var(--text-muted); max-width: 600px; margin: 0 auto 3rem;">
        Reimagine workplace coordination. We increase human connection and seamless collaboration for distributed teams.
      </p>
      
      <div class="flex gap-md justify-center">
        <button class="btn btn-primary" onclick="window.navigate('signup')">Get Started</button>
        <button class="btn btn-outline" onclick="window.navigate('about')">Learn More</button>
      </div>
    </main>
    
    <footer class="text-center" style="padding: 4rem 0; color: var(--text-muted); font-size: 0.875rem;">
      <!-- Credits removed -->
    </footer>
  `
}

// 1.5. About / Learn More Page
const renderAbout = () => {
  return `
      <div class="container flex justify-center items-center" style="min-height: 100vh;">
        <div class="card animate-fade-in" style="width: 100%; max-width: 800px;">
          <h2 class="text-center" style="margin-bottom: 2rem; font-size: 2.5rem; color: var(--primary-color);">About Us</h2>
          
          <div class="text-center" style="margin-bottom: 2rem;">
            <p style="font-size: 1.125rem; margin-bottom: 1rem;">
              <strong>ConnectRemote</strong> is dedicated to solving the isolation crisis in distributed teams.
            </p>
            <p style="color: var(--text-muted); margin-bottom: 1rem;">
              We believe that while work can happen anywhere, human connection requires intention. Our platform seamlessly bridges the physical and digital divide by coordinating onsite meetups and high-fidelity virtual bonding sessions.
            </p>
             <p style="color: var(--text-muted);">
              Whether you are a fully remote startup or a hybrid enterprise, we help your employees feel seen, heard, and connected.
            </p>
          </div>
  
          <div class="flex justify-center gap-md">
             <button class="btn btn-primary" onclick="window.navigate('signup')">Join the Revolution</button>
             <button class="btn btn-outline" onclick="window.navigate('home')">Back to Home</button>
          </div>
        </div>
      </div>
    `
}

// 2. Signup Page
const renderSignup = () => {
  return `
    <div class="container flex justify-center items-center" style="min-height: 100vh;">
      <div class="card animate-fade-in" style="width: 100%; max-width: 480px;">
        <h2 class="text-center" style="margin-bottom: 2rem; font-size: 2rem;">Create Your Account</h2>
        <form id="signup-form">
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Full Name</label>
            <input type="text" name="name" placeholder="John Doe" required>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Email Address</label>
            <input type="email" name="email" placeholder="john@company.com" required>
          </div>
          <div>
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.875rem;">Password</label>
            <input type="password" name="password" placeholder="••••••••" required>
          </div>
          
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Sign Up</button>
        </form>
        <div class="text-center mt-lg">
          <a href="#" onclick="window.navigate('home')" style="font-size: 0.875rem; color: var(--text-muted);">← Back to Home</a>
        </div>
      </div>
    </div>
  `
}

// 3. Location Selection
const renderLocation = () => {
  return `
    <div class="container flex justify-center items-center" style="min-height: 100vh;">
      <div class="card animate-fade-in" style="width: 100%; max-width: 500px; text-center">
        <h2 class="text-center" style="margin-bottom: 1rem;">Where are you located?</h2>
        <p class="text-center" style="color: var(--text-muted); margin-bottom: 2rem;">
          We need your location to connect you with the best onsite services.
        </p>
        
        <form id="location-form">
           <select name="location" required>
            <option value="" disabled selected>Select your city...</option>
            <option value="New York">New York</option>
            <option value="San Francisco">San Francisco</option>
            <option value="London">London</option>
            <option value="Remote">Remote</option>
          </select>
          <button type="submit" class="btn btn-primary" style="width: 100%; margin-top: 1rem;">Continue</button>
        </form>
      </div>
    </div>
  `
}

// 4. Booking (Online/Offline)
const renderBooking = () => {
  return `
    <div class="container flex justify-center items-center" style="min-height: 100vh;">
      <div class="card animate-fade-in" style="width: 100%; max-width: 800px;">
        <h2 class="text-center" style="margin-bottom: 3rem;">CHOOSE SERVICE TYPE</h2>
        
        <div class="flex gap-md" style="justify-content: stretch;">
          <!-- Offline Option -->
          <div class="card service-card" onclick="window.handleServiceSelect('offline')" 
               style="flex: 1; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🏢</div>
            <h3>Offline Service</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9rem;">
              Meet in-person at a coworking space or office hub.
            </p>
          </div>

          <!-- Online Option -->
          <div class="card service-card" onclick="window.handleServiceSelect('online')" 
               style="flex: 1; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; text-align: center;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">🌐</div>
            <h3>Online Service</h3>
            <p style="color: var(--text-muted); margin-top: 0.5rem; font-size: 0.9rem;">
              Virtual team building & coordination session.
            </p>
          </div>
        </div>
      </div>
    </div>
  `
}

// 5. Success
const renderSuccess = () => {
  return `
    <div class="container flex justify-center items-center" style="min-height: 100vh; text-align: center;">
      <div class="animate-fade-in">
        <h1 style="font-size: 3rem; color: var(--primary-color); margin-bottom: 1rem;">All Set! 🎉</h1>
        <p style="font-size: 1.25rem; color: var(--text-main);">
          You have booked an <strong>${state.serviceType}</strong> service in <strong>${state.location}</strong>.
        </p>
        <p style="margin-top: 1rem; color: var(--text-muted);">We will be in touch shortly.</p>
        <button class="btn btn-outline mt-lg" onclick="window.navigate('home')">Back to Home</button>
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
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault()
      // Simulate signup
      const formData = new FormData(signupForm)
      state.user = Object.fromEntries(formData)
      navigate('location')
    })
  }

  // Location Form
  const locForm = document.getElementById('location-form')
  if (locForm) {
    locForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const formData = new FormData(locForm)
      state.location = formData.get('location')
      navigate('booking')
    })
  }
}

// --- Global Handlers (for onclick in HTML strings) ---
window.navigate = navigate
window.handleServiceSelect = (type) => {
  state.serviceType = type
  navigate('success')
}

// Initial Render
render()
