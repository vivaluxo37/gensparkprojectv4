# 📋 Broker Logo Upload Guide

This guide will help you integrate the broker logos from your Google Drive into the website.

## 🎯 Step-by-Step Process

### Step 1: Download Logos from Google Drive

From your Google Drive link: https://drive.google.com/drive/folders/11B_ItvH9y0cUMqDmHTyr43gKVNow-Sff

Download all logos and rename them according to this mapping:

```
Expected Filename → Broker Name
├── ig-markets.png → IG Markets
├── pepperstone.png → Pepperstone  
├── ic-markets.png → IC Markets
├── xm.png → XM Group
├── oanda.png → OANDA
├── plus500.png → Plus500
├── fp-markets.png → FP Markets
├── exness.png → Exness
├── hotforex.png → HotForex
├── fxtm.png → FXTM
├── avatrade.png → AvaTrade
├── fxpro.png → FxPro
├── thinkmarkets.png → ThinkMarkets
├── admirals.png → Admirals
├── forex-com.png → Forex.com
├── cmc-markets.png → CMC Markets
├── city-index.png → City Index
├── saxo-bank.png → Saxo Bank
├── interactive-brokers.png → Interactive Brokers
├── charles-schwab.png → Charles Schwab
├── td-ameritrade.png → TD Ameritrade
├── etrade.png → E*TRADE
├── fbs.png → FBS
├── tickmill.png → Tickmill
├── xtb.png → XTB
├── libertex.png → Libertex
├── iq-option.png → IQ Option
├── octafx.png → OctaFX
├── instaforex.png → InstaForex
├── alpari.png → Alpari
└── roboforex.png → RoboForex
```

### Step 2: Upload to Server Directory

Upload all the renamed logo files to:
```bash
/home/user/webapp/public/static/images/brokers/
```

### Step 3: Update Database

Run the SQL update script to link logos to brokers:

```bash
cd /home/user/webapp
npx wrangler d1 execute brokeranalysis-production --local --file logo-update.sql
```

### Step 4: Rebuild and Restart

```bash
cd /home/user/webapp
npm run build
pm2 restart brokeranalysis
```

### Step 5: Verify Implementation

Visit these URLs to verify logos are loading:
- `/brokers` - Main brokers directory
- `/countries` - Countries with broker listings  
- `/review/pepperstone` - Individual broker review
- `/review/ig-markets` - Another broker review

## 🔧 Logo Requirements

- **Format**: PNG preferred (supports transparency)
- **Size**: Recommended 200x100px (will auto-scale)
- **Quality**: High resolution for retina displays
- **Background**: Transparent or white background preferred

## 🚀 Enhanced Logo System Features

The website now includes:

✅ **Automatic Fallback System**: If a logo fails to load, shows broker initials
✅ **Lazy Loading**: Logos load only when visible for better performance  
✅ **Responsive Sizing**: Logos automatically scale for different screen sizes
✅ **Error Handling**: Graceful degradation for missing logos
✅ **SEO Optimized**: Proper alt tags and structured data

## 🔍 Troubleshooting

### If logos don't appear:
1. Check file permissions: `chmod 644 /home/user/webapp/public/static/images/brokers/*.png`
2. Verify filenames match exactly (case-sensitive)
3. Check browser developer console for 404 errors
4. Confirm database updates were applied

### Manual Database Update:
If you need to update specific brokers:

```sql
UPDATE brokers SET logo_url = '/static/images/brokers/FILENAME.png' 
WHERE slug = 'broker-slug' OR name LIKE '%Broker Name%';
```

## 📊 Current Status

The logo system is ready and integrated throughout:
- ✅ Broker directory pages
- ✅ Country-specific pages  
- ✅ Individual broker reviews
- ✅ Comparison tools
- ✅ Search results

Once you upload the logos, they will automatically appear across all pages of the website with professional fallback handling for the best user experience.