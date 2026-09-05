const fs = require('fs');
const cp = require('child_process');

if (fs.existsSync('src')) {
  // Inside frontend directory
  cp.execSync('npm run build', { stdio: 'inherit' });
} else {
  // Inside monorepo root directory
  cp.execSync('cd frontend && npm install && npm run build', { stdio: 'inherit' });
  if (fs.existsSync('frontend/dist')) {
    fs.cpSync('frontend/dist', 'dist', { recursive: true });
  }
}
