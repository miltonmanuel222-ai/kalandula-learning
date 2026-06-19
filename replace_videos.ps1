$content = Get-Content 'd:\Kalandula Learning\src\services\mockDb.ts' -Raw
$content = $content.Replace('ErjWNvP6mko', 'S9uPNppGsGo')
$content = $content.Replace('FcsY1YPBwzQ', 'vEwqndwKpdc')
Set-Content 'd:\Kalandula Learning\src\services\mockDb.ts' -Value $content
