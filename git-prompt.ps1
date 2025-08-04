# Enhanced Git Prompt for VS Code
# This script provides a rich Git status display in PowerShell

function Write-GitStatus {
    param(
        [string]$Path = (Get-Location)
    )
    
    if (-not (Test-Path (Join-Path $Path ".git"))) {
        return ""
    }
    
    $gitStatus = git status --porcelain 2>$null
    $branch = git branch --show-current 2>$null
    $upstream = git rev-parse --abbrev-ref --symbolic-full-name "@{u}" 2>$null
    
    if (-not $branch) {
        return ""
    }
    
    # Count different types of changes
    $staged = ($gitStatus | Where-Object { $_.StartsWith("A ") -or $_.StartsWith("M ") -or $_.StartsWith("D ") -or $_.StartsWith("R ") }).Count
    $modified = ($gitStatus | Where-Object { $_.StartsWith(" M") -or $_.StartsWith(" T") }).Count
    $untracked = ($gitStatus | Where-Object { $_.StartsWith("??") }).Count
    $deleted = ($gitStatus | Where-Object { $_.StartsWith(" D") }).Count
    $renamed = ($gitStatus | Where-Object { $_.StartsWith("R ") }).Count
    
    # Check for stashed changes
    $stashed = (git stash list 2>$null | Measure-Object).Count
    
    # Check ahead/behind status
    $ahead = 0
    $behind = 0
    if ($upstream) {
        $status = git status --porcelain --branch 2>$null | Select-Object -First 1
        if ($status -match "\[.*ahead (\d+)\]") { $ahead = [int]$matches[1] }
        if ($status -match "\[.*behind (\d+)\]") { $behind = [int]$matches[1] }
    }
    
    # Build status string
    $statusParts = @()
    
    # Branch name
    $statusParts += "⎇ $branch"
    
    # Ahead/Behind indicators
    if ($ahead -gt 0) { $statusParts += "↑$ahead" }
    if ($behind -gt 0) { $statusParts += "↓$behind" }
    
    # File status indicators
    if ($staged -gt 0) { $statusParts += "+$staged" }
    if ($modified -gt 0) { $statusParts += "!$modified" }
    if ($untracked -gt 0) { $statusParts += "?$untracked" }
    if ($deleted -gt 0) { $statusParts += "✖$deleted" }
    if ($renamed -gt 0) { $statusParts += "➜$renamed" }
    if ($stashed -gt 0) { $statusParts += "≡$stashed" }
    
    # Clean indicator
    if ($statusParts.Count -eq 1) {
        $statusParts += "✓"
    }
    
    return "git:(" + ($statusParts -join " ") + ")"
}

function prompt {
    $currentPath = (Get-Location).Path
    $gitStatus = Write-GitStatus
    
    $prompt = ""
    
    # Current directory
    $prompt += "PS "
    $prompt += $currentPath
    
    # Git status
    if ($gitStatus) {
        $prompt += " "
        $prompt += $gitStatus
    }
    
    $prompt += "> "
    
    return $prompt
}

# Export functions for use in other scripts
Export-ModuleMember -Function Write-GitStatus, prompt 