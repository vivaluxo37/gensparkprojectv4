#!/bin/bash

# Create placeholder SVG logos for brokers

LOGOS_DIR="dist/static/logos"
mkdir -p "$LOGOS_DIR"

# Function to create SVG logo
create_logo() {
    local name="$1"
    local filename="$2"
    local color="$3"
    local initial="${name:0:1}"
    
    cat > "$LOGOS_DIR/$filename" << EOF
<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <rect width="100" height="100" fill="$color" rx="10"/>
  <text x="50" y="65" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white">$initial</text>
</svg>
EOF
}

# Create logos for each broker
create_logo "TastyFX" "tastyfx.png" "#FF6B6B"
create_logo "Forex.com" "forex-com.png" "#4ECDC4"
create_logo "OANDA" "oanda.png" "#45B7D1"
create_logo "Interactive Brokers" "ib.png" "#96CEB4"
create_logo "Charles Schwab" "schwab.png" "#FFEAA7"
create_logo "XM Group" "xm.png" "#DDA0DD"
create_logo "eToro" "etoro.png" "#98D8C8"
create_logo "Plus500" "plus500.png" "#F7DC6F"
create_logo "AvaTrade" "avatrade.png" "#F8B500"
create_logo "Pepperstone" "pepperstone.png" "#C70039"
create_logo "IC Markets" "icmarkets.png" "#581845"
create_logo "FP Markets" "fpmarkets.png" "#21618C"

# Convert SVG to PNG-like format (actually keep as SVG but with .png extension for compatibility)
for svg in $LOGOS_DIR/*.png; do
    mv "$svg" "${svg%.png}.svg"
    cp "${svg%.png}.svg" "$svg"
done

echo "✅ Created placeholder logos for all brokers"
ls -la "$LOGOS_DIR/"