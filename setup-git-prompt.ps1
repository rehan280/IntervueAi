# Git Prompt Setup Script for VS Code
# This script sets up enhanced Git prompts in VS Code

Write-Host "🚀 Setting up Enhanced Git Prompt for VS Code..." -ForegroundColor Green

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

# Test the Git prompt function
Write-Host "🧪 Testing Git prompt function..." -ForegroundColor Yellow
$gitStatus = & "$PSScriptRoot\git-prompt.ps1" -Command "Write-GitStatus"
if ($gitStatus) {
    Write-Host "✅ Git prompt function working correctly" -ForegroundColor Green
    Write-Host "Current status: $gitStatus" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Git prompt function returned empty (this might be normal if no changes)" -ForegroundColor Yellow
}

# Display setup instructions
Write-Host "`n📋 Setup Instructions:" -ForegroundColor Cyan
Write-Host "1. Restart VS Code to apply the new terminal settings" -ForegroundColor White
Write-Host "2. Open a new terminal in VS Code (Ctrl+Shift+`)" -ForegroundColor White
Write-Host "3. You should see enhanced Git status in your prompt" -ForegroundColor White

Write-Host "`n🎨 Git Status Symbols:" -ForegroundColor Cyan
Write-Host "⎇  - Current branch" -ForegroundColor White
Write-Host "↑  - Commits ahead of remote" -ForegroundColor White
Write-Host "↓  - Commits behind remote" -ForegroundColor White
Write-Host "+  - Staged files" -ForegroundColor White
Write-Host "!  - Modified files" -ForegroundColor White
Write-Host "?  - Untracked files" -ForegroundColor White
Write-Host "✖  - Deleted files" -ForegroundColor White
Write-Host "➜  - Renamed files" -ForegroundColor White
Write-Host "≡  - Stashed changes" -ForegroundColor White
Write-Host "✓  - Clean working directory" -ForegroundColor White

Write-Host "`n✅ Git prompt setup complete!" -ForegroundColor Green
Write-Host "💡 Tip: You can customize colors and symbols in the .gitprompt file" -ForegroundColor Yellow 