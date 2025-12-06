// validate-yaml.js
const fs = require('fs');
const yaml = require('js-yaml');

try {
  const fileContents = fs.readFileSync('render.yaml', 'utf8');
  const data = yaml.load(fileContents);
  
  console.log('✅ YAML is valid!');
  console.log('\nParsed structure:');
  console.log(JSON.stringify(data, null, 2));
  
  // Check required fields
  if (data.services && data.services[0]) {
    const service = data.services[0];
    console.log('\n📋 Service configuration:');
    console.log(`- Type: ${service.type}`);
    console.log(`- Name: ${service.name}`);
    console.log(`- Env: ${service.env}`);
    console.log(`- Build Command: ${service.buildCommand}`);
    console.log(`- Start Command: ${service.startCommand}`);
    
    // Check envVars
    if (service.envVars) {
      console.log('\n🔑 Environment Variables:');
      service.envVars.forEach((env, i) => {
        console.log(`${i + 1}. ${env.key} = ${env.value || '(sync: false)'}`);
      });
    }
  }
  
} catch (e) {
  console.error('❌ YAML Error:', e.message);
  console.log('\n💡 Common fixes:');
  console.log('1. Use spaces (not tabs) for indentation');
  console.log('2. Make sure each list item starts with "-"');
  console.log('3. Ensure all keys have colons');
  console.log('4. Check for missing quotes on strings');
}