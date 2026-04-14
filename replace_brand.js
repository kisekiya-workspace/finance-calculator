const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

const replacements = [
    { search: /Sociials ToolBox/g, replace: 'Toolioz' },
    { search: /Sociials \/ ToolBox/g, replace: 'Toolioz' },
    { search: /Sociials \/ <span className=\{styles\.accent\}>ToolBox<\/span>/g, replace: 'Toolioz' },
    { search: /Sociials <span className=\{styles\.logoAccent\}>ToolBox<\/span>/g, replace: 'Toolioz' },
    { search: /Sociials \/ FinanceCalc/g, replace: 'Toolioz / FinanceCalc' },
    { search: /sociials\.online/g, replace: 'toolioz.online' },
    { search: /@SociialsCorp/g, replace: '@TooliozCorp' },
    { search: /support@sociials\.online/g, replace: 'support@toolioz.online' },
    { search: /Sociials/g, replace: 'Toolioz' },
    { search: /sociials/ig, replace: 'toolioz' } // catch remaining lowercase sociials
];

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    for (const { search, replace } of replacements) {
        content = content.replace(search, replace);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            traverseDirectory(fullPath);
        } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
            replaceInFile(fullPath);
        }
    }
}

traverseDirectory(directoryPath);
console.log('Brand replacement complete.');
