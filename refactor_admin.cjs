const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'src', 'Admin-BKPSDM'),
  path.join(__dirname, 'src', 'Admin-Komunitas')
];

function refactorFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Check if AdminSidebar exists
  if (!content.includes('const AdminSidebar =')) {
    return;
  }

  // Remove AdminSidebar block
  // It starts with `const AdminSidebar =` and ends with `};` right before `const Header` or `const Dashboard`
  const sidebarRegex = /const AdminSidebar = [\s\S]*?(?=\n(?:const Header =|const Admin|const Detail|const Laporan|const Katalog|const Pusat|const Bank|const Pelatihan|const Community|const User|const Course|const Monitoring))/;
  content = content.replace(sidebarRegex, '');

  // Remove Header block
  const headerRegex = /const Header = [\s\S]*?(?=\n(?:const Admin|const Detail|const Laporan|const Katalog|const Pusat|const Bank|const Pelatihan|const Community|const User|const Course|const Monitoring))/;
  content = content.replace(headerRegex, '');

  // Add imports right after the last import statement
  const imports = `import AdminSidebar from '../components/AdminSidebar';\nimport Header from '../components/AdminHeader';\n`;
  
  // Find last import
  const importLines = content.match(/import .*?;/g);
  if (importLines && importLines.length > 0) {
    const lastImport = importLines[importLines.length - 1];
    content = content.replace(lastImport, lastImport + '\n' + imports);
  } else {
    content = imports + content;
  }

  // Also rename Header to AdminHeader everywhere in the file if needed, 
  // but it's easier to just import AdminHeader as Header as I did in the import statement
  content = content.replace(/import Header from '\.\.\/components\/AdminHeader';/, "import Header from '../components/AdminHeader';");

  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Refactored:', filePath);
}

dirs.forEach(dir => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    if (file.endsWith('.jsx')) {
      refactorFile(path.join(dir, file));
    }
  });
});
