# Enhanced Git Prompt for VS Code

A beautiful and informative Git prompt that displays comprehensive Git status information directly in your VS Code terminal.

## ✨ Features

- **Branch Information**: Shows current branch name
- **Ahead/Behind Status**: Displays commits ahead/behind remote
- **File Status**: Shows modified, staged, untracked, deleted, and renamed files
- **Stash Status**: Indicates if you have stashed changes
- **Clean Indicator**: Shows when working directory is clean
- **Color Coded**: Different colors for different types of changes
- **VS Code Integration**: Optimized for VS Code's integrated terminal

## 🚀 Quick Setup

1. **Run the setup script**:
   ```powershell
   .\setup-git-prompt.ps1
   ```

2. **Restart VS Code** to apply the new terminal settings

3. **Open a new terminal** (Ctrl+Shift+`) and enjoy your enhanced Git prompt!

## 📋 Manual Setup

If you prefer manual setup:

1. **Copy the files** to your project:
   - `git-prompt.ps1` - Main Git prompt script
   - `.vscode/settings.json` - VS Code terminal configuration
   - `.gitprompt` - Git prompt configuration (optional)

2. **Restart VS Code** to load the new settings

3. **Test the prompt** by opening a new terminal

## 🎨 Git Status Symbols

| Symbol | Meaning | Color |
|--------|---------|-------|
| `⎇` | Current branch | Green |
| `↑` | Commits ahead of remote | Yellow |
| `↓` | Commits behind remote | Red |
| `+` | Staged files | Green |
| `!` | Modified files | Yellow |
| `?` | Untracked files | White |
| `✖` | Deleted files | Red |
| `➜` | Renamed files | Cyan |
| `≡` | Stashed changes | Blue |
| `✓` | Clean working directory | Green |

## 📝 Example Output

```
PS C:\Users\YourName\Projects\my-project git:(⎇ main ↑2 !3 ?1)> 
```

This shows:
- Current branch: `main`
- 2 commits ahead of remote: `↑2`
- 3 modified files: `!3`
- 1 untracked file: `?1`

## ⚙️ Customization

### Colors
Edit `.gitprompt` to customize colors:
```bash
# Git Status Colors
GIT_PROMPT_COLORS="
  branch='\033[1;32m'      # Green
  ahead='\033[1;33m'       # Yellow
  behind='\033[1;31m'      # Red
  # ... more colors
"
```

### Symbols
Change the symbols in `.gitprompt`:
```bash
# Git Status Symbols
GIT_PROMPT_SYMBOLS="
  branch='🌿'              # Tree branch
  ahead='⬆️'              # Up arrow
  behind='⬇️'             # Down arrow
  # ... more symbols
"
```

### VS Code Terminal Colors
Customize terminal colors in `.vscode/settings.json`:
```json
{
  "workbench.colorCustomizations": {
    "terminal.background": "#0d1117",
    "terminal.foreground": "#c9d1d9",
    "terminal.ansiGreen": "#7ee787"
  }
}
```

## 🔧 Troubleshooting

### Prompt not showing
1. Make sure you're in a Git repository
2. Restart VS Code completely
3. Open a new terminal (Ctrl+Shift+`)
4. Check if PowerShell execution policy allows scripts

### Colors not working
1. Ensure your terminal supports ANSI colors
2. Check VS Code terminal settings
3. Try a different font (Cascadia Code recommended)

### Performance issues
1. The prompt runs Git commands on each prompt
2. For large repositories, consider disabling some features
3. Use `git status --porcelain` for faster status checking

## 📚 Advanced Usage

### Custom Functions
Add custom functions to `git-prompt.ps1`:
```powershell
function Get-GitBranch {
    git branch --show-current 2>$null
}

function Get-GitStatus {
    git status --porcelain 2>$null
}
```

### Integration with Other Tools
The prompt works well with:
- Git aliases
- Git hooks
- VS Code Git extensions
- PowerShell modules

## 🤝 Contributing

Feel free to customize and improve this Git prompt! Some ideas:
- Add more status indicators
- Improve performance for large repositories
- Add support for other shells (bash, zsh)
- Create themes for different color schemes

## 📄 License

This project is open source. Feel free to use and modify as needed.

## 🙏 Acknowledgments

- Inspired by Oh My Posh and other Git prompt tools
- Designed specifically for VS Code integration
- Uses PowerShell best practices for performance

---

**Happy coding! 🎉** 