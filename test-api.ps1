# test-api.ps1 - Test script for Fortune API

# Configuration
$API_KEY = $env:NEXT_PUBLIC_GEMINI_API_KEY
$API_URL = "http://localhost:3000/api/fortune"

Write-Host "🎊 Gieo Quẻ Tết - API Test Script" -ForegroundColor Yellow
Write-Host "=================================" -ForegroundColor Yellow
Write-Host ""

# Check if API key is set
if ([string]::IsNullOrEmpty($API_KEY)) {
    Write-Host "❌ Error: NEXT_PUBLIC_GEMINI_API_KEY environment variable not set!" -ForegroundColor Red
    Write-Host "Please set it in .env.local first" -ForegroundColor Red
    exit 1
}

Write-Host "✓ API Key found (${API_KEY.Substring(0,10)}...)" -ForegroundColor Green
Write-Host ""

# Check if dev server is running
Write-Host "Checking if dev server is running on $API_URL..." -ForegroundColor Cyan
try {
    $response = Invoke-WebRequest -Uri $API_URL -Method Options -ErrorAction SilentlyContinue
    Write-Host "✓ Dev server is running!" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Warning: Make sure 'npm run dev' is running in another terminal!" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Sending test request to API..." -ForegroundColor Cyan

# Prepare request body
$body = @{
    message = "Hãy gieo quẻ cho tôi một quẻ tết may mắn. Tôi muốn biết số phận và nhận lời khuyên của Bác Hồ."
} | ConvertTo-Json

# Send request
try {
    Write-Host "POST $API_URL" -ForegroundColor Cyan
    Write-Host "Body: $body" -ForegroundColor Gray
    Write-Host ""
    
    $response = Invoke-RestMethod -Uri $API_URL -Method Post -Body $body -ContentType "application/json" -TimeoutSec 60
    
    Write-Host "✅ Success! Received response:" -ForegroundColor Green
    Write-Host ""
    
    # Display response
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    Write-Host ""
    Write-Host "✓ API is working correctly!" -ForegroundColor Green
    
} catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
    Write-Host ""
    Write-Host "Troubleshooting:" -ForegroundColor Yellow
    Write-Host "1. Make sure 'npm run dev' is running" -ForegroundColor Gray
    Write-Host "2. Check if API_KEY is set in .env.local" -ForegroundColor Gray
    Write-Host "3. Check network connectivity" -ForegroundColor Gray
    Write-Host "4. Try again in a few seconds" -ForegroundColor Gray
    exit 1
}
