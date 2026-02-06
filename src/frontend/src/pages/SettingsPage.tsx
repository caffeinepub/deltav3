import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useTheme } from '../theme/ThemeProvider';
import { Palette, RotateCcw } from 'lucide-react';

export default function SettingsPage() {
  const { primaryColor, setPrimaryColor, resetTheme } = useTheme();

  const presetColors = [
    { name: 'Purple', value: '#8b5cf6' },
    { name: 'Blue', value: '#3b82f6' },
    { name: 'Green', value: '#10b981' },
    { name: 'Red', value: '#ef4444' },
    { name: 'Orange', value: '#f97316' },
    { name: 'Pink', value: '#ec4899' },
    { name: 'Cyan', value: '#06b6d4' },
    { name: 'Yellow', value: '#eab308' },
  ];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Customize your DeltaV3 experience</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Theme Customization
          </CardTitle>
          <CardDescription>
            Change the primary accent color used throughout the application
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-3">
            <Label htmlFor="color-picker">Primary Accent Color</Label>
            <div className="flex gap-3">
              <Input
                id="color-picker"
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="h-12 w-24 cursor-pointer"
              />
              <Input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                placeholder="#8b5cf6"
                className="flex-1 font-mono"
              />
              <Button variant="outline" size="icon" onClick={resetTheme} title="Reset to default">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label>Preset Colors</Label>
            <div className="grid grid-cols-4 gap-3">
              {presetColors.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => setPrimaryColor(preset.value)}
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border p-3 transition-all hover:border-primary hover:shadow-md"
                  title={preset.name}
                >
                  <div
                    className="h-10 w-10 rounded-full border-2 border-background shadow-md ring-2 ring-border transition-all group-hover:ring-primary"
                    style={{ backgroundColor: preset.value }}
                  />
                  <span className="text-xs font-medium">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-muted/50 p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Note:</strong> Your theme preferences are saved locally on this device and will
              persist across sessions. No account or login required.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Privacy</CardTitle>
          <CardDescription>Your search history is never stored</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            DeltaV3 does not store your search queries or history. All searches are performed directly
            through DuckDuckGo, and no data is saved on our servers or in your browser beyond theme
            preferences.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
