// Quick script to create an admin user
const fetch = require('node-fetch');

async function setupAdmin() {
  try {
    const response = await fetch('http://localhost:3001/api/setup/admin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@leadgen.com',
        password: 'admin123',
        name: 'Admin User'
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@leadgen.com');
      console.log('🔐 Password: admin123');
      console.log('👤 Name: Admin User');
    } else {
      console.log('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.log('💡 Make sure the server is running: npm start');
  }
}

setupAdmin(); 