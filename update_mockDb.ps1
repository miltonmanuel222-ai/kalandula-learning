$file = 'd:\Kalandula Learning\src\services\mockDb.ts'
$content = Get-Content $file -Raw

$techVideos = @(
    "https://www.youtube.com/watch?v=ErjWNvP6mko",
    "https://www.youtube.com/watch?v=8mei6uVttho",
    "https://www.youtube.com/watch?v=kM1K9LpX_84",
    "https://www.youtube.com/watch?v=FcsY1YPBwzQ",
    "https://www.youtube.com/watch?v=ZtMzB5CoekE"
)

$designVideos = @(
    "https://www.youtube.com/watch?v=9U151Z9tZJk",
    "https://www.youtube.com/watch?v=5U-EWCAJq-Q",
    "https://www.youtube.com/watch?v=2eR5k9t7Sqk",
    "https://www.youtube.com/watch?v=8V-wN7Qx6E8",
    "https://www.youtube.com/watch?v=oM3nZfE6T_E"
)

$businessVideos = @(
    "https://www.youtube.com/watch?v=k8v5X0k6y_A",
    "https://www.youtube.com/watch?v=aG3m4YnE1H4",
    "https://www.youtube.com/watch?v=1F2bA7Z2E8Y",
    "https://www.youtube.com/watch?v=t-L2C2x_1mU",
    "https://www.youtube.com/watch?v=QyO0w2G_Z04"
)

$scienceVideos = @(
    "https://www.youtube.com/watch?v=7h2Y9rW6gL0",
    "https://www.youtube.com/watch?v=4Ym4A9_Fw5g",
    "https://www.youtube.com/watch?v=1Z2X_a6Z9a8",
    "https://www.youtube.com/watch?v=Z7D8W8VwL7k",
    "https://www.youtube.com/watch?v=5y2sQ8t0uV0"
)

$commVideos = @(
    "https://www.youtube.com/watch?v=6v4Y5U6Z2pA",
    "https://www.youtube.com/watch?v=5x6H7Z8x8y0",
    "https://www.youtube.com/watch?v=6V_c9H7a9x4",
    "https://www.youtube.com/watch?v=9H7X9a6Z8y0",
    "https://www.youtube.com/watch?v=8Y7H7X9a6Z8"
)

$devVideos = @(
    "https://www.youtube.com/watch?v=2x8X6Y7Z9H0",
    "https://www.youtube.com/watch?v=7H8X9Y7Z6a4",
    "https://www.youtube.com/watch?v=6Z8X7Y9H5a4",
    "https://www.youtube.com/watch?v=5Y6Z8X7Y9H4",
    "https://www.youtube.com/watch?v=4X5Y6Z8X7Y9"
)

# Extract all courses
$coursesMatches = [regex]::Matches($content, "(?s)(id:\s*'c\d+'.*?category:\s*'([^']+)'(?:(?!lessons:).)*lessons:\s*\[).*?(\])")

foreach ($match in $coursesMatches) {
    $fullMatch = $match.Groups[0].Value
    $prefix = $match.Groups[1].Value
    $category = $match.Groups[2].Value
    $suffix = $match.Groups[3].Value
    
    $courseIdMatch = [regex]::Match($prefix, "id:\s*'([^']+)'")
    $courseId = $courseIdMatch.Groups[1].Value

    # Select the right video array based on category
    $videos = $techVideos
    if ($category -eq 'design') { $videos = $designVideos }
    if ($category -eq 'negocios') { $videos = $businessVideos }
    if ($category -eq 'ciencias') { $videos = $scienceVideos }
    if ($category -eq 'comunicacao') { $videos = $commVideos }
    if ($category -eq 'desenvolvimento') { $videos = $devVideos }

    $newLessons = "`n"
    for ($i = 0; $i -lt 5; $i++) {
        $l_id = "l" + $courseId.Substring(1) + "_" + ($i + 1)
        $v_url = $videos[$i]
        $title = "Aula " + ($i + 1) + " do curso"
        
        $newLessons += "      { id: '$l_id', courseId: '$courseId', title: '$title', contentUrl: '$v_url', type: 'video', duration: '20 min' },`n"
    }
    $newLessons += "    "

    $replacement = $prefix + $newLessons + $suffix
    $content = $content.Replace($fullMatch, $replacement)
}

Set-Content $file $content
