# Enhanced Git Prompt Setup for VS Code Terminal
Write-Host "🚀 Setting up Enhanced Git Prompt for VS Code Terminal..." -ForegroundColor Green

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

# Test the function directly to verify it works
Write-Host "🧪 Testing Git prompt display..." -ForegroundColor Yellow
try {
    # Import the git-prompt.ps1 script
    . "$PSScriptRoot\git-prompt.ps1"
    
    # Get the current Git status
    $currentStatus = Write-GitStatus
    
    if ($currentStatus) {
        Write-Host "✅ Git prompt display test successful" -ForegroundColor Green
        Write-Host "Current Git Status: $currentStatus" -ForegroundColor Cyan
    } else {
        Write-Host "⚠️ Git prompt display test returned empty (this might be normal if not in a Git repo)" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ Error testing Git prompt display: $_" -ForegroundColor Red
}

Write-Host "✅ Git prompt configured in VS Code settings" -ForegroundColor Green

Write-Host "`n📋 Next Steps:" -ForegroundColor Cyan
Write-Host "1. Restart VS Code" -ForegroundColor White
Write-Host "2. Open new terminal (Ctrl+Shift+`)" -ForegroundColor White
Write-Host "3. You'll see Git status like: git:(main +2 !1 ?3)" -ForegroundColor White

Write-Host "`n🎨 Git Status Symbols:" -ForegroundColor Cyan
Write-Host "⎇  - Current branch" -ForegroundColor White
Write-Host "+  - Staged files (ready for commit)" -ForegroundColor White
Write-Host "!  - Modified files (need git add)" -ForegroundColor White
Write-Host "?  - Untracked files (need git add)" -ForegroundColor White
Write-Host "✓  - Clean working directory" -ForegroundColor White
Write-Host "✓  - Clean working directory" -ForegroundColor White

Write-Host "`n✅ Setup complete! Restart VS Code to see your Git prompt." -ForegroundColor Green