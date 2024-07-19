# Versioning with Git in VSCode

This guide will help you push files and add tags to your GitHub repository using the Visual Studio Code (VSCode) UI.

## Steps to Push Files and Add Tags

### 1. Make Changes to Your Files

1. Open your project in VSCode.
2. Edit your files as needed (e.g., `cafe-cozy.js`).

### 2. Commit Changes

1. Click on the **Source Control** button in the Activity Bar on the side of VSCode.
2. You will see a list of changed files. Write a commit message in the text box at the top.
3. Click the checkmark icon (✔) to commit your changes.

### 3. Push Changes

1. After committing your changes, click the ellipsis (...) menu in the Source Control view.
2. Select **Push** to push the changes to your remote repository on GitHub.

### 4. Add a Tag

1. Open the **Terminal** in VSCode (View > Terminal).
2. Create a new tag using the following command:


git tag v0.2.0
git push origin v0.2.0
