#!/bin/bash
# Fix Font Awesome paths after build
sed -i 's|url(../webfonts/|url(/static/webfonts/|g' dist/static/fontawesome.css
echo "✅ Fixed Font Awesome webfont paths"