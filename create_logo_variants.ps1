Add-Type -AssemblyName System.Drawing

$src = [System.Drawing.Bitmap]::FromFile((Join-Path (Get-Location) "public\assets\images\store\rajesh_jewellers_emblem_sq.png"))
$w = $src.Width
$h = $src.Height

# Variant 1: Transparent cutout
$transparentBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Variant 2: Deep Noir Medallion with Gold Backing
$noirBmp = New-Object System.Drawing.Bitmap($w, $h, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

for ($y = 0; $y -lt $h; $y++) {
    for ($x = 0; $x -lt $w; $x++) {
        $p = $src.GetPixel($x, $y)
        
        # In the crop, the letters and diamond have bright illuminated white borders (R>220, G>220, B>220)
        # and chrome reflective bodies (R: 120-180, G: 120-170, B: 100-150)
        # The background panel is flat light blue-grey (R: 175-205, G: 185-215, B: 195-225)
        # and drop shadow under letters (R: 80-140, G: 90-150, B: 110-170)
        
        # Let's save a clean circular badge with dark gradient background
        # Distance from center:
        $dx = $x - ($w / 2.0)
        $dy = $y - ($h / 2.0)
        $dist = [Math]::Sqrt($dx * $dx + $dy * $dy)
        $radius = ($w / 2.0) - 2.0
        
        if ($dist -gt $radius) {
            # Outside circle -> fully transparent
            $noirBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            # Inside circle: Let's create a circular medallion of the original illuminated letters
            # with subtle dark gold border at edge
            if ($dist -gt ($radius - 3.0)) {
                # Gold border
                $noirBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(255, 229, 195, 120))
            } else {
                $noirBmp.SetPixel($x, $y, $p)
            }
        }
    }
}

$noirBmp.Save((Join-Path (Get-Location) "public\assets\images\store\rajesh_jewellers_emblem_circle.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$src.Dispose()
$noirBmp.Dispose()
$transparentBmp.Dispose()
Write-Host "Circular badge created!"

