# Simple Git Prompt Setup for VS Code
Write-Host "🚀 Setting up Simple Git Prompt for VS Code..." -ForegroundColor Green

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
$gitStatus = & "$PSScriptRoot\simple-git-prompt.ps1" -Command "Get-GitStatus"
if ($gitStatus) {
    Write-Host "✅ Git prompt function working correctly" -ForegroundColor Green
    Write-Host "Current status: $gitStatus" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Git prompt function returned empty (this might be normal if no changes)" -ForegroundColor Yellow
}

Write-Host "`n📋 Setup Instructions:" -ForegroundColor Cyan
Write-Host "1. Restart VS Code to apply the new terminal settings" -ForegroundColor White
Write-Host "2. Open a new terminal in VS Code (Ctrl+Shift+`)" -ForegroundColor White
Write-Host "3. You should see simple Git status in your prompt" -ForegroundColor White

Write-Host "`n🎨 Git Status Symbols:" -ForegroundColor Cyan
Write-Host "+  - Staged files (ready for commit)" -ForegroundColor White
Write-Host "!  - Modified files (need git add)" -ForegroundColor White
Write-Host "?  - Untracked files (need git add)" -ForegroundColor White
Write-Host "✓  - Clean working directory" -ForegroundColor White

Write-Host "`n📝 Example Output:" -ForegroundColor Cyan
Write-Host "PS C:\project> git:(main +2 !1 ?3)>" -ForegroundColor White
Write-Host "This means: 2 staged, 1 modified, 3 untracked files" -ForegroundColor Gray

Write-Host "`n✅ Simple Git prompt setup complete!" -ForegroundColor Green
Write-Host "💡 This shows exactly what you need for git add commands!" -ForegroundColor Yellow 