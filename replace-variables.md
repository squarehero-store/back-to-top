# Squarehero Squarespace LESS Variables Replacer

This script is designed for Squarehero templates. It reads the CSS file for a specific template, replaces certain hex color values with HSL-based CSS variables that link to the Squarespace color palette, and writes the modified content back to the file. Additionally, it replaces specified media query and font variables. This allows the styles in your CSS to dynamically change based on the Squarespace settings.

## Setup

1. Ensure you have Node.js installed. If not, download and install it from [nodejs.org](https://nodejs.org/).

2. Place the script and the CSS files in the same directory.

## Usage

1. Open the directory containing your script and CSS files in VS Code.

2. Open a terminal in VS Code by selecting `Terminal > New Terminal` from the top menu.

3. In the terminal, navigate to the directory containing the `replace-variables.js` script (if not already there):

    ```bash
    cd path/to/your/directory
    ```

4. Run the script using Node.js:

    ```bash
    node replace-variables.js
    ```

## Notes

- The script replaces specific hex color values with HSL-based CSS variables linked to the Squarespace color palette. For example:
  - `#FCF4EB` -> `hsla(var(--white-hsl), 1)`
  - `#FCF5EB` -> `hsla(var(--lightAccent-hsl), 1)`
  - `#DD9833` -> `hsla(var(--accent-hsl), 1)`
  - `#616E30` -> `hsla(var(--darkAccent-hsl), 1)`
  - `#353C2E` -> `hsla(var(--black-hsl), 1)`

- The script replaces specific media query variables. For example:
  - `@media @mobile` -> `@media only screen and (max-width: 750px)`
  - `@media @tablet` -> `@media only screen and (min-width:751px) and (max-width:1200px)`
  - `@media @tablet-strict` -> `@media only screen and (min-width: 751px) and (max-width: 949px)`
  - `@media @tablet-desktop` -> `@media only screen and (min-width: 751px)`
  - `@media @desktop` -> `@media only screen and (min-width: 950px)`
  - `@media @desktop-strict` -> `@media only screen and (min-width: 950px) and (max-width: 1199px)`
  - `@media @desktop-xl` -> `@media only screen and (min-width: 1200px)`
  - `@media @awkward` -> `@media only screen and (max-width:1350px) and (min-width:1000px)`

- The script replaces specific font variables. For example:
  - `@header` -> `var(--heading-font-font-family)`
  - `@body` -> `var(--body-font-font-family)`

By linking these variables to the Squarespace settings, any changes made in Squarespace will automatically update the corresponding values in your CSS, ensuring consistency across your website.

## Troubleshooting

- Ensure your CSS files follow the naming convention `template-name.css`.
- Ensure Node.js is installed and properly configured on your machine.
- Check for any typos or errors in the script.

## License

This project is licensed under the MIT License.
