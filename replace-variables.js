const fs = require('fs');
const path = require('path');

// Use the current directory since the script and CSS files are in the same folder
const directoryPath = __dirname;

// Function to get the only CSS file in the directory
function getCSSFile(directory) {
  const files = fs.readdirSync(directory);
  const cssFiles = files.filter(file => path.extname(file) === '.css');

  if (cssFiles.length === 0) {
    throw new Error('No CSS file found.');
  } else if (cssFiles.length > 1) {
    throw new Error('Multiple CSS files found.');
  }

  return cssFiles[0];
}

const cssFile = getCSSFile(directoryPath);
const filePath = path.join(directoryPath, cssFile);

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Replacements for colors
  let result = data.replace(/#ffffff/gi, 'hsla(var(--white-hsl), 1)');
  result = result.replace(/#FCF5EB/gi, 'hsla(var(--lightAccent-hsl), 1)');
  result = result.replace(/#DD9833/gi, 'hsla(var(--accent-hsl), 1)');
  result = result.replace(/#616E30/gi, 'hsla(var(--darkAccent-hsl), 1)');
  result = result.replace(/#000000/gi, 'hsla(var(--black-hsl), 1)');

  // Replacements for media queries
  result = result.replace(/@media @mobile/gi, '@media only screen and (max-width: 750px)');
  result = result.replace(/@media @tablet/gi, '@media only screen and (min-width:751px) and (max-width:1200px)');
  result = result.replace(/@media @tablet-strict/gi, '@media only screen and (min-width: 751px) and (max-width: 949px)');
  result = result.replace(/@media @tablet-desktop/gi, '@media only screen and (min-width: 751px)');
  result = result.replace(/@media @desktop/gi, '@media only screen and (min-width: 950px)');
  result = result.replace(/@media @desktop-strict/gi, '@media only screen and (min-width: 950px) and (max-width: 1199px)');
  result = result.replace(/@media @desktop-xl/gi, '@media only screen and (min-width: 1200px)');
  result = result.replace(/@media @awkward/gi, '@media only screen and (max-width:1350px) and (min-width:1000px)');

  // Replacements for font variables
  result = result.replace(/@header/gi, 'var(--heading-font-font-family)');
  result = result.replace(/@body/gi, 'var(--body-font-font-family)');

  fs.writeFile(filePath, result, 'utf8', (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`CSS variables have been replaced successfully in ${cssFile}!`);
  });
});
