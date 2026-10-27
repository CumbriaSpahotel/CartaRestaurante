const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = __dirname;
const versionJsonPath = path.join(rootDir, 'version.json');
const registroPath = path.join(rootDir, 'REGISTRO_VERSIONES.md');

// Arguments: [type: patch|minor|major] [summary] [files]
const args = process.argv.slice(2);
const bumpType = (args[0] && ['patch', 'minor', 'major'].includes(args[0].toLowerCase())) 
  ? args[0].toLowerCase() 
  : 'patch';

const changeSummary = args[1] || 'Mejoras y actualizaciones generales del sistema.';
const affectedFiles = args[2] || '';

// 1. Read or initialize version.json
let versionData = { version: '1.0.0', lastUpdate: '2026-10-27' };
if (fs.existsSync(versionJsonPath)) {
  try {
    versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf8'));
  } catch (err) {
    console.error('Error leyendo version.json:', err);
  }
}

// 2. Calculate new version
const parts = (versionData.version || '1.0.0').split('.').map(n => parseInt(n, 10) || 0);
while (parts.length < 3) parts.push(0);

if (bumpType === 'major') {
  parts[0] += 1;
  parts[1] = 0;
  parts[2] = 0;
} else if (bumpType === 'minor') {
  parts[1] += 1;
  parts[2] = 0;
} else {
  parts[2] += 1;
}

const newVersion = parts.join('.');
const today = new Date().toISOString().slice(0, 10);

// 3. Update version.json
versionData.version = newVersion;
versionData.lastUpdate = today;
fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2) + '\n', 'utf8');

// 4. Update REGISTRO_VERSIONES.md
if (fs.existsSync(registroPath)) {
  let content = fs.readFileSync(registroPath, 'utf8');

  // Update current version and date
  content = content.replace(
    /- \*\*Versión\*\*:\s*`?[^`\r\n]+`?/g,
    `- **Versión**: \`${newVersion}\``
  );
  content = content.replace(
    /- \*\*Última Actualización\*\*:\s*[^\r\n]+/g,
    `- **Última Actualización**: ${today}`
  );

  // Format new entry
  const filesLine = affectedFiles ? `- **Módulos involucrados**: ${affectedFiles}\n` : '';
  const newEntry = `### [v${newVersion}] - ${today}\n${filesLine}- **Cambios**:\n  - ${changeSummary}\n\n`;

  const historyHeaderIndex = content.indexOf('## 📝 Historial de Versiones');
  if (historyHeaderIndex !== -1) {
    const afterHeaderIndex = content.indexOf('\n', historyHeaderIndex) + 1;
    content = content.slice(0, afterHeaderIndex) + '\n' + newEntry + content.slice(afterHeaderIndex);
  } else {
    content += `\n## 📝 Historial de Versiones\n\n${newEntry}`;
  }

  fs.writeFileSync(registroPath, content, 'utf8');
}

console.log(`Versión actualizada exitosamente a v${newVersion} (${today})`);
