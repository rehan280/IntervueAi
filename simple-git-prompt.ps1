# Simple Git Prompt for VS Code
# Shows basic Git status like git add commands

function Get-GitStatus {
    if (-not (Test-Path ".git")) {
        return ""
    }
    
    $status = git status --porcelain 2>$null
    $branch = git branch --show-current 2>$null
    
    if (-not $branch) {
        return ""
    }
    
    $modified = ($status | Where-Object { $_.StartsWith(" M") }).Count
    $staged = ($status | Where-Object { $_.StartsWith("A ") -or $_.StartsWith("M ") -or $_.StartsWith("D ") }).Count
    $untracked = ($status | Where-Object { $_.StartsWith("??") }).Count
    
    $statusText = ""
    
    if ($staged -gt 0) {
        $statusText += " +$staged"
    }
    if ($modified -gt 0) {
        $statusText += " !$modified"
    }
    if ($untracked -gt 0) {
        $statusText += " ?$untracked"
    }
    
    if ($statusText -eq "") {
        $statusText = " ✓"
    }
    
    return "git:($branch$statusText)"
}

function prompt {
    $path = (Get-Location).Path
    $gitStatus = Get-GitStatus
    
    $prompt = "PS $path"
    if ($gitStatus) {
        $prompt += " $gitStatus"
    }
    $prompt += "> "
    
    return $prompt
} 