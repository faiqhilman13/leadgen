# Stagewise Toolbar - AI-Powered UI Editing

## How to Enable the Toolbar
```bash
# Create or modify .env.local file
echo VITE_STAGEWISE_ENABLED=true > .env.local
# Start the development server
npm run dev
```

## How to Disable the Toolbar
```bash
# Set to false in .env.local
echo VITE_STAGEWISE_ENABLED=false > .env.local
# OR delete the file
rm .env.local  # For Linux/Mac
# Remove-Item .env.local  # For Windows
```

## Features
- Select UI elements directly in the browser
- Add comments and feedback
- Let AI agents make changes based on your selections
- Bridge the gap between visual design and code implementation

## How It Works
1. With the toolbar enabled, you'll see a Stagewise panel in your browser
2. Select elements on your page
3. Add comments or requests
4. The AI agent in your code editor will receive the context and make changes

## Technical Details
- Only appears in development mode
- Not included in production builds
- Uses React-specific plugins for better component understanding 