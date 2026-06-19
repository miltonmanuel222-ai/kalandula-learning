$file = 'd:\Kalandula Learning\src\services\mockDb.ts'
$content = Get-Content $file -Raw

# Match contentUrl that does not contain 'http'
$content = [System.Text.RegularExpressions.Regex]::Replace($content, "contentUrl:\s*'((?!http)[^']*)'", "contentUrl: 'https://www.youtube.com/watch?v=FcsY1YPBwzQ'")

Set-Content $file $content
