param (
    [string]$packageName = "My Package",
    # When Recursive is set to $FALSE for an item, only that specific item will be included in the package.
    # When Recursive is set to $TRUE for an item, the item and all its descendants will be included in the package. 
    [PSCustomObject[]]$ItemsToBeDeployed = @(
        @{ Recursive = $FALSE; Source = "130EE53B-8AE8-4241-8F30-E01B110B4965" },
        @{ Recursive = $FALSE; Source = "1038B676-B70E-44E3-9A97-50A694480F8A" } 
    )
)

$ErrorActionPreference = "Stop"

$Package = New-Package -Name $packageName
$Package.Sources.Clear()
$Package.Metadata.Author = "Suresh"
$Package.Metadata.Publisher = "Suresh"
$Package.Metadata.Version = Get-Date -Format FileDateTimeUniversal
$Package.Metadata.Readme = 'This will install a Sitecore Package generated using PowerShell'

foreach ($Item in $ItemsToBeDeployed) {
    $item = Get-Item -Path "master:/$($Item.Source)"
    if ($Item.Recursive) {
        $Source = $item | New-ItemSource -Name "N/A" -InstallMode Overwrite
        $Package.Sources.Add($Source)
    } else {
        $Source = $item | New-ExplicitItemSource -Name "N/A" -InstallMode Overwrite
        $Package.Sources.Add($Source)
    }
}

# Save and Download Package
$packageFilePath = "$( $package.Name ) - $( $package.Metadata.Version ).zip"
Export-Package -Project $Package -Path $packageFilePath -Zip
Download-File "$SitecorePackageFolder\$( $package.Name ) - $( $package.Metadata.Version ).zip"

Write-Output "Package created successfully at $packageFilePath"
Write-Output "You can download the package from the file system."
