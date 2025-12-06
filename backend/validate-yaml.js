// validate-yaml.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 Validating render.yaml file...\n');

// Check if render.yaml exists
const yamlPath = path.join(__dirname, 'render.yaml');
if (!fs.existsSync(yamlPath)) {
  console.error('❌ ERROR: render.yaml file not found!');
  console.log('   Current directory:', __dirname);
  console.log('   Looking for:', yamlPath);
  console.log('\n💡 Creating a template render.yaml file...');
  
  // Create template render.yaml
  const template = `services:
  - type: web
    name: hotel-manangement
    env: node
    region: ohio
    buildCommand: npm install
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 4000
      - key: MONGODB_URI
        sync: false
      - key: JWT_SECRET
        sync: false
      - key: CORS_ORIGIN
        value: https://food-frontend.vercel.app,https://food-admin.vercel.app,http://localhost:5174,http://localhost:5173`;
  
  fs.writeFileSync(yamlPath, template);
  console.log('✅ Created render.yaml template at:', yamlPath);
  process.exit(0);
}

console.log('✅ Found render.yaml at:', yamlPath);

// Read the file
try {
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');
  console.log('\n📄 File contents:');
  console.log('='.repeat(60));
  console.log(yamlContent);
  console.log('='.repeat(60));
  
  // Basic validation
  const lines = yamlContent.split('\n');
  console.log(`\n📊 Statistics:`);
  console.log(`   Total lines: ${lines.length}`);
  console.log(`   File size: ${yamlContent.length} bytes`);
  
  // Check for common issues
  let issues = [];
  
  // 1. Check for tabs
  lines.forEach((line, index) => {
    if (line.includes('\t')) {
      issues.push(`Line ${index + 1}: Contains TAB character (use spaces)`);
    }
  });
  
  // 2. Check required keywords
  const requiredKeywords = [
    'services:',
    'type:',
    'name:',
    'env:',
    'buildCommand:',
    'startCommand:'
  ];
  
  requiredKeywords.forEach(keyword => {
    if (!yamlContent.includes(keyword)) {
      issues.push(`Missing required keyword: "${keyword}"`);
    }
  });
  
  // 3. Check indentation (basic)
  const indentationIssues = lines.filter(line => {
    return line.trim() && 
           !line.trim().startsWith('#') && 
           line.includes('  ') && 
           !line.startsWith('  ');
  });
  
  if (indentationIssues.length > 0) {
    issues.push(`Inconsistent indentation detected`);
  }
  
  // 4. Try to parse YAML
  try {
    // Try to load js-yaml dynamically
    const yamlModule = await import('js-yaml');
    const yaml = yamlModule.default;
    const parsed = yaml.load(yamlContent);
    
    console.log('\n✅ YAML parsed successfully!');
    
    // Validate structure
    if (parsed.services && Array.isArray(parsed.services)) {
      const service = parsed.services[0];
      console.log('\n📋 Service Configuration:');
      console.log(`   Type: ${service.type || 'MISSING'}`);
      console.log(`   Name: ${service.name || 'MISSING'}`);
      console.log(`   Env: ${service.env || 'MISSING'}`);
      console.log(`   Region: ${service.region || 'Not specified'}`);
      console.log(`   Build Command: ${service.buildCommand || 'MISSING'}`);
      console.log(`   Start Command: ${service.startCommand || 'MISSING'}`);
      
      if (service.envVars && Array.isArray(service.envVars)) {
        console.log(`\n🔑 Environment Variables (${service.envVars.length}):`);
        service.envVars.forEach((envVar, index) => {
          const value = envVar.sync === false ? '[SYNC: FALSE]' : envVar.value;
          console.log(`   ${index + 1}. ${envVar.key} = ${value}`);
        });
      } else {
        issues.push('Missing or invalid envVars section');
      }
    } else {
      issues.push('Missing services section or not an array');
    }
    
  } catch (parseError) {
    issues.push(`YAML Parse Error: ${parseError.message}`);
  }
  
  // Display results
  if (issues.length === 0) {
    console.log('\n🎉 SUCCESS: All validation checks passed!');
    console.log('\n✅ Your render.yaml is ready for deployment to Render.com');
  } else {
    console.error('\n❌ VALIDATION ISSUES FOUND:');
    issues.forEach((issue, index) => {
      console.log(`   ${index + 1}. ${issue}`);
    });
    
    console.log('\n💡 QUICK FIXES:');
    console.log('   1. Use ONLY spaces for indentation (NO TABS)');
    console.log('   2. Ensure proper structure:');
    console.log('      services:');
    console.log('        - type: web');
    console.log('          name: your-app-name');
    console.log('          env: node');
    console.log('          buildCommand: npm install');
    console.log('          startCommand: npm start');
    console.log('   3. Each list item must start with "-"');
    console.log('   4. All keys must end with ":"');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('   1. Fix any issues above');
  console.log('   2. Commit to GitHub: git add . && git commit -m "Add render.yaml"');
  console.log('   3. Push: git push origin main');
  console.log('   4. Go to render.com and create new web service');
  
} catch (error) {
  console.error('❌ Error reading/validating file:', error.message);
}