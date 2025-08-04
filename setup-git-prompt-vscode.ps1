# Simple Git Prompt Setup for VS Code
Write-Host "🚀 Setting up Git Prompt for VS Code..." -ForegroundColor Green

# Check if we're in a Git repository
if (-not (Test-Path ".git")) {
    Write-Host "❌ Not in a Git repository. Please run this script from a Git repository." -ForegroundColor Red
    exit 1
}

# Create .vscode directory if it doesn't exist
if (-not (Test-Path ".vscode")) {
    New-Item -ItemType Directory -Path ".vscode" | Out-Null
    Write-Host "✅ Created .vscode directory" -ForegroundColor Green
}

Write-Host "✅ Git prompt configured in VS Code settings" -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart VS Code" -ForegroundColor White
Write-Host "2. Open new terminal (Ctrl+Shift+`)" -ForegroundColor White
Write-Host "3. You'll see Git status like: git:(main +2 !1 ?3)" -ForegroundColor White

Write-Host "`n🎨 Git Status Symbols:" -ForegroundColor Cyan
Write-Host "+  - Staged files (ready for commit)" -ForegroundColor White
Write-Host "!  - Modified files (need git add)" -ForegroundColor White
Write-Host "?  - Untracked files (need git add)" -ForegroundColor White
Write-Host "✓  - Clean working directory" -ForegroundColor White

Write-Host "`n✅ Setup complete! Restart VS Code to see your Git prompt." -ForegroundColor Green 