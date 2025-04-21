# Versioning with Git in VSCode

This guide will help you push files and add tags to your GitHub repository using the Visual Studio Code (VSCode) UI.

## Steps to Push Files and Add Tags

### 1. Make Changes to Your Files

1. Open your project in VSCode.
2. Edit your files as needed (e.g., `back-to-top.js`).

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

```
git tag v0.2.0
git push origin v0.2.0
```

## Managing Multiple Versions (v1 and v2)

### Branch Strategy

To maintain v1 for current users while developing v2:

1. **Main Branch (v1.x.x)**: 
   - Keep the `main` branch for the stable v1 version
   - All bug fixes for v1 should be made here
   - Use tags like `v1.0.0`, `v1.1.0`, etc.

2. **v2-development Branch**:
   - All v2 development happens in this branch
   - When ready, tag v2 releases with `v2.0.0`, etc.

### Working with Branches

Switch between branches:
```
git checkout main          # Switch to v1 development
git checkout v2-development  # Switch to v2 development
```

Apply fixes to both versions:
```
# Fix a bug in main (v1)
git checkout main
# Make changes and commit
git commit -m "Fix important bug in v1"

# Apply the same fix to v2
git checkout v2-development
git cherry-pick [commit-hash]  # Use the hash from the v1 fix commit
```

### Deployment Strategy

- Deploy files from `main` branch as v1.x.x
- Deploy files from `v2-development` branch as v2.x.x when ready
- This allows both versions to be accessible simultaneously
