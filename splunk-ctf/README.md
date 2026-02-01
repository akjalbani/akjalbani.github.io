# SPLUNK SENTINEL - Threat Detection CTF Academy

A cyberpunk-themed, interactive learning platform for teaching Splunk Enterprise threat detection through Capture The Flag challenges.

## 🚀 Deployment to GitHub Pages

### Option 1: Quick Deploy
1. Create a new repository on GitHub (e.g., `splunk-ctf`)
2. Upload all files from this package to the repository
3. Go to **Settings** → **Pages**
4. Under "Source", select **Deploy from a branch**
5. Select **main** branch and **/ (root)** folder
6. Click **Save**
7. Your site will be live at: `https://YOUR-USERNAME.github.io/splunk-ctf/`

### Option 2: Using Git CLI
```bash
# Clone your empty repository
git clone https://github.com/YOUR-USERNAME/splunk-ctf.git
cd splunk-ctf

# Copy all files from this package
# Then commit and push
git add .
git commit -m "Initial CTF platform deployment"
git push origin main
```

## 📁 File Structure

```
splunk-ctf/
├── index.html              # Main landing page
├── README.md               # This file
├── assets/
│   └── styles.css          # Shared CSS styles
├── challenges/
│   ├── index.html          # Challenge listing page
│   ├── challenge1.html     # Operation First Search
│   ├── challenge2.html     # The Failed Login Mystery
│   ├── challenge3.html     # Web Shell Hunter
│   ├── challenge4.html     # PowerShell Empire
│   ├── challenge5.html     # Data Exfiltration
│   ├── challenge6.html     # Lateral Movement
│   ├── challenge7.html     # Credential Theft
│   └── challenge8.html     # Persistence Hunter
└── data/
    ├── challenge1_access.log
    ├── challenge2_windows.log
    ├── challenge3_apache.log
    ├── challenge4_powershell.log
    ├── challenge5_network.log
    ├── challenge6_lateral.log
    ├── challenge7_sysmon.log
    └── challenge8_persistence.log
```

## 🎯 Challenges Overview

| # | Challenge | Difficulty | Points | MITRE ATT&CK |
|---|-----------|------------|--------|--------------|
| 1 | Operation First Search | Easy | 100 | - |
| 2 | The Failed Login Mystery | Easy | 150 | T1110 |
| 3 | Web Shell Hunter | Medium | 200 | T1505.003 |
| 4 | PowerShell Empire | Medium | 250 | T1059.001 |
| 5 | Data Exfiltration | Medium | 300 | T1048 |
| 6 | Lateral Movement | Hard | 400 | T1021 |
| 7 | Credential Theft | Hard | 450 | T1003 |
| 8 | Persistence Hunter | Hard | 500 | T1547 |

**Total Points Available: 2,350**

## 📚 Learning Objectives

Each challenge teaches specific Splunk and threat hunting skills:

- **SPL Fundamentals**: search, stats, table, sort, where
- **Log Analysis**: Windows Events, Apache logs, Sysmon
- **Detection Techniques**: Brute force, web shells, encoded commands
- **Advanced Hunting**: Correlation, timeline analysis, MITRE mapping

## 🔧 Using with Splunk

To use the sample data with a real Splunk instance:

1. Download the log files from the `/data/` directory
2. In Splunk, go to **Settings** → **Add Data**
3. Select **Upload** and choose the log file
4. Set appropriate sourcetype:
   - `challenge1_access.log` → `access_combined`
   - `challenge2_windows.log` → `WinEventLog:Security`
   - `challenge3_apache.log` → `access_combined`
   - `challenge4_powershell.log` → `WinEventLog:PowerShell`
   - `challenge5_network.log` → `dns_logs`
   - `challenge6_lateral.log` → `WinEventLog:Security`
   - `challenge7_sysmon.log` → `XmlWinEventLog:Microsoft-Windows-Sysmon/Operational`
   - `challenge8_persistence.log` → `XmlWinEventLog:Microsoft-Windows-Sysmon/Operational`

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `assets/styles.css`:
```css
:root {
    --terminal-green: #00ff41;
    --cyber-blue: #00d4ff;
    --cyber-purple: #bf00ff;
    /* ... */
}
```

### Adding New Challenges
1. Copy an existing challenge HTML file
2. Update the content, flag, and solution
3. Add corresponding data file to `/data/`
4. Update `challenges/index.html` to include the new challenge

## 📝 License

This project is provided for educational purposes. Feel free to modify and use for teaching cybersecurity concepts.

## 🛡️ Credits

Created for security professionals, SOC analysts, and students learning threat detection with Splunk Enterprise.

---

**Happy Hunting! 🎯**
