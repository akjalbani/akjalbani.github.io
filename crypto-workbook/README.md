# 🔐 CryptoLab - Cryptography Fundamentals Workbook

An interactive web-based workbook for learning cryptography fundamentals, including encoding schemes and XOR operations.

![CryptoLab Preview](preview.png)

## 🚀 Live Demo

Visit the live site: `https://[your-username].github.io/crypto-workbook/`

## 📚 What's Included

### 8 Progressive Challenges

| # | Challenge | Difficulty | Topic |
|---|-----------|------------|-------|
| 01 | ASCII Conversion | Easy | Convert integers to ASCII characters |
| 02 | Hexadecimal | Easy | Decode hex strings to readable text |
| 03 | Base64 Encoding | Easy | Transform binary data to Base64 |
| 04 | Bytes & Big Integers | Medium | Convert between messages and large integers |
| 05 | XOR Basics | Medium | Learn fundamental XOR operations |
| 06 | XOR Properties | Hard | Use associative/commutative properties |
| 07 | Single Byte XOR | Hard | Brute force single-byte XOR cipher |
| 08 | Repeating Key XOR | Hard | Known plaintext attack on repeating XOR |

### Features

- 🎨 Cyberpunk/hacker aesthetic design
- 💻 Interactive code examples with copy functionality
- 📖 Detailed explanations and step-by-step solutions
- 📱 Fully responsive design
- 🔍 Quick reference tables for Python functions and XOR properties
- ✅ Complete solutions for all challenges

## 🛠️ Setup for GitHub Pages

### Option 1: Quick Setup

1. Fork this repository
2. Go to Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/ (root)` folder
5. Save and wait for deployment

### Option 2: Manual Setup

1. Create a new repository named `crypto-workbook`
2. Clone it locally:
   ```bash
   git clone https://github.com/[your-username]/crypto-workbook.git
   cd crypto-workbook
   ```
3. Copy all files from this project into the repository
4. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
5. Enable GitHub Pages in repository settings

## 📁 Project Structure

```
crypto-workbook/
├── index.html              # Main landing page
├── css/
│   ├── style.css          # Main stylesheet
│   └── challenge.css      # Challenge page styles
├── js/
│   └── main.js            # JavaScript functionality
├── challenges/
│   ├── ascii.html         # Challenge 1
│   ├── hex.html           # Challenge 2
│   ├── base64.html        # Challenge 3
│   ├── bigint.html        # Challenge 4
│   ├── xor-basics.html    # Challenge 5
│   ├── xor-properties.html# Challenge 6
│   ├── single-byte-xor.html # Challenge 7
│   └── repeating-xor.html # Challenge 8
└── README.md
```

## 🎯 Learning Objectives

After completing this workbook, students will be able to:

- Convert between ASCII, hexadecimal, and Base64 encodings
- Use Python's encoding/decoding functions
- Understand XOR operations and their properties
- Perform known plaintext attacks
- Break simple XOR-based ciphers

## 🧪 All Challenge Flags

| Challenge | Flag |
|-----------|------|
| 01 | `crypto{ASCII_pr1nt4bl3}` |
| 02 | `crypto{You_will_be_working_with_hex_strings_a_lot}` |
| 03 | `crypto{base64_is_part_of_ascii_armor}` |
| 04 | `crypto{3nc0d1ng_4ll_7h3_w4y_d0wn}` |
| 05 | `crypto{aloha}` |
| 06 | `crypto{x0r_i5_ass0c1at1v3}` |
| 07 | `crypto{0x10_15_my_f4v0ur173_by73}` |
| 08 | `crypto{1f_y0u_Kn0w_En0uGH_y0u_Kn0w_1t_4ll}` |

## 📝 Python Quick Reference

```python
# ASCII
chr(65)          # → 'A'
ord('A')         # → 65

# Hexadecimal
hex(255)         # → '0xff'
bytes.fromhex('41')  # → b'A'
b'A'.hex()       # → '41'

# Base64
import base64
base64.b64encode(b'Hi')  # → b'SGk='
base64.b64decode('SGk=') # → b'Hi'

# Big Integers (PyCryptodome)
from Crypto.Util.number import long_to_bytes, bytes_to_long
long_to_bytes(65)   # → b'A'
bytes_to_long(b'A') # → 65

# XOR
a ^ b  # XOR operator in Python
```

## 🤝 Contributing

Feel free to submit issues and pull requests to improve the workbook!

## 📄 License

MIT License - feel free to use for educational purposes.

---

Built with ❤️ for students learning cryptography fundamentals.
