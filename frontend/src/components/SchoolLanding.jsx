// Import useState hook from React to add state to function components
import { useState } from 'react'

const SchoolLanding = () => {
  // useState returns an array with 2 elements: the current state value, and a function to update it.
  // Here we track whether the mobile menu is open or not. Default is 'false'.
  const [menuOpen, setMenuOpen] = useState(false)

  // React components must return a single parent element (or a fragment).
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold">
                AC
              </div>
              <span className="text-xl font-bold text-gray-900">AcademyHub</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex gap-8">
              <a href="#home" className="text-gray-700 hover:text-blue-600 transition">Home</a>
              <a href="#about" className="text-gray-700 hover:text-blue-600 transition">About</a>
              <a href="#programs" className="text-gray-700 hover:text-blue-600 transition">Programs</a>
              <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">Contact</a>
            </div>

            <button className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Enroll Now
            </button>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              <a href="#home" className="block text-gray-700 hover:text-blue-600 py-2">Home</a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600 py-2">About</a>
              <a href="#programs" className="block text-gray-700 hover:text-blue-600 py-2">Programs</a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600 py-2">Contact</a>
              <button className="w-full mt-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Enroll Now
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Shaping Future Leaders with Excellence
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Join our community of innovators, creators, and scholars. We combine cutting-edge education with values-based learning to prepare students for success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg">
                Start Your Journey
              </button>
              <button className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition font-semibold text-lg">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl transform rotate-3 blur-xl opacity-20"></div>
            <div className="relative bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl p-8 text-white shadow-2xl">
              <svg className="w-full h-80" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" opacity="0.2" />
              </svg>
              <p className="text-center text-lg font-semibold">Excellence in Education</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">2,500+</div>
            <p className="text-blue-100">Active Students</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">150+</div>
            <p className="text-blue-100">Expert Faculty</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">45+</div>
            <p className="text-blue-100">Academic Programs</p>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold mb-2">98%</div>
            <p className="text-blue-100">Success Rate</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Why Choose AcademyHub?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: '🎓',
              title: 'World-Class Education',
              desc: 'Our curriculum is designed by international experts and updated annually.'
            },
            {
              icon: '👥',
              title: 'Expert Faculty',
              desc: 'Learn from seasoned professionals with real-world industry experience.'
            },
            {
              icon: '🏆',
              title: 'Proven Track Record',
              desc: 'Our alumni are leaders in their fields across the globe.'
            },
            {
              icon: '💻',
              title: 'Modern Facilities',
              desc: 'State-of-the-art labs, libraries, and technology infrastructure.'
            },
            {
              icon: '🌍',
              title: 'Global Community',
              desc: 'Study alongside students from over 80 countries worldwide.'
            },
            {
              icon: '📚',
              title: 'Holistic Development',
              desc: 'We focus on academics, arts, sports, and character building.'
            },
          ].map((item, idx) => (
            <div key={idx} className="p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section */}
      <section id="programs" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">Our Programs</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Primary School', grades: 'Grades 1-5', icon: '📖' },
              { name: 'Secondary', grades: 'Grades 6-8', icon: '📝' },
              { name: 'High School', grades: 'Grades 9-12', icon: '🎯' },
              { name: 'Advanced Studies', grades: 'College Prep', icon: '🚀' },
            ].map((prog, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition cursor-pointer">
                <div className="text-4xl mb-3">{prog.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{prog.name}</h3>
                <p className="text-gray-600">{prog.grades}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">What Our Community Says</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: 'AcademyHub transformed my child\'s academic journey. The teachers are incredibly supportive and the facilities are top-notch.',
              author: 'Sarah Johnson',
              role: 'Parent'
            },
            {
              text: 'The programs here helped me develop not just as a student but as a person. I\'ve made friends from around the world.',
              author: 'Michael Chen',
              role: 'Current Student'
            },
            {
              text: 'AcademyHub\'s education gave me the foundation to succeed in university and my career. Highly recommended!',
              author: 'Emily Williams',
              role: 'Alumna'
            },
          ].map((test, idx) => (
            <div key={idx} className="bg-white p-8 rounded-xl shadow-lg">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{test.text}"</p>
              <div>
                <p className="font-bold text-gray-900">{test.author}</p>
                <p className="text-gray-600 text-sm">{test.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Join Us?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Contact us today to schedule a campus tour or apply for admission.
          </p>
          <div className="grid sm:grid-cols-3 gap-6 mb-8">
            <div>
              <p className="text-lg font-semibold mb-2">📞 Phone</p>
              <p className="text-blue-100">(555) 123-4567</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">📧 Email</p>
              <p className="text-blue-100">admissions@academyhub.edu</p>
            </div>
            <div>
              <p className="text-lg font-semibold mb-2">📍 Location</p>
              <p className="text-blue-100">123 Education Ave, City, State</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition font-bold text-lg">
            Apply Now
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p>&copy; 2024 AcademyHub. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default SchoolLanding
