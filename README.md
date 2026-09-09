# PacketScope — PCAP Deep Packet & TLS Handshake Inspector

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-00ff66?style=for-the-badge&logo=vercel)](https://packetscope.vercel.app/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Built With: React + Vite + TS](https://img.shields.io/badge/Built%20With-React%20%7C%20Vite%20%7C%20TS%20%7C%20Tailwind%20v4-10b981?style=for-the-badge)](https://vitejs.dev/)

> **Live Demo:** [https://packetscope.vercel.app/](https://packetscope.vercel.app/)

**PacketScope** is a browser-native Wireshark-style network packet dissector and forensic analysis workstation. It combines real-time oscilloscope signal waveforms, protocol layer tree decoders, and byte-synchronized hex dumps to analyze network protocols and dissect sophisticated cyber attack traces.

---

## Key Features

- **3-Tier Wireshark Master/Detail Layout**:
  - **Tier 1 (Header & Filter)**: Real-time HTML5 canvas audio/packet frequency wave, line rate telemetry, Wireshark display filter input, and PCAP attack presets.
  - **Tier 2 (Packet Stream Table - 42%)**: Live stream table with frame indexing, millisecond delta times, MAC/IP endpoints, color-coded protocol tags, and anomaly alarms.
  - **Tier 3 (Deep Forensic Split - 58%)**:
    - **Protocol Tree Dissector (50%)**: Collapsible decode hierarchy through Frame, Ethernet II, IPv4, TCP, and Application layers (TLS 1.3, HTTP, DNS).
    - **16-Byte Hex Dump & ASCII Mirror (50%)**: Authentic hexadecimal matrix with synchronized offset counter. Hovering over any protocol field highlights the exact byte range in real time!
- **Realistic PCAP Attack Presets**:
  1. **TLS 1.3 Handshake & Downgrade Attack**: ClientHello cipher suites, ServerHello downgrade injection (`TLS_RSA_WITH_RC4_128_SHA`), and Fatal Alert responses.
  2. **Distributed SYN Flood**: TCP half-open connection exhaustion from spoofed sources with sequence number flooding.
  3. **Cleartext Authentication Leak**: HTTP POST transmitting unencrypted Basic Auth credentials (`admin:Keypord123`).
  4. **DNS C2 Tunneling**: High Shannon entropy base64 subdomain queries exfiltrating stolen API tokens via port 53.
- **Wireshark Display Filter Syntax**: Filter traffic dynamically using protocol tokens (`tcp`, `tls`, `http`, `dns`, `anomaly`) or raw IP searches.
- **Instructional Operating Manual**: Integrated "How to Use" guide modal walking users through packet capture forensics.

---

## How to Use

1. **Select an Attack Preset**:
   - Choose a trace preset from the top bar (*TLS 1.3*, *SYN Flood*, *Cleartext*, *DNS Tunneling*).
2. **Filter the Packet Stream**:
   - Type in the filter bar (e.g. `tls`, `http`, `tcp`, `anomaly`) or click a quick filter chip to isolate target frames.
3. **Dissect Protocol Layers**:
   - Click any row in the upper stream table.
   - The lower-left **Frame Dissector** expands into collapsible layer headers with decoded flags, addresses, and payload values.
4. **Inspect Raw Hex Offsets**:
   - Hover your mouse over any protocol field (e.g. *Destination MAC*, *Source IP*, *Cipher Suite*).
   - Watch the lower-right **Packet Bytes** viewer instantly highlight the corresponding byte offsets in radioactive phosphor green.
5. **Freeze Capture**:
   - Click **PAUSE / CAPTURE** in the top bar to halt the waveform and freeze the packet buffer for deep inspection.

---

## Design System

- **Aesthetic**: CRT Wiretap Phosphor / SIGINT Oscilloscope Terminal
- **Palette**: CRT Scanline Black (`#030804`), Radioactive Matrix Phosphor Green (`#00ff66`), Signal Amber (`#ffb703`), Terminal Border (`#13331a`)
- **Typography**: Share Tech Mono (display & headings), Inconsolata (body & telemetry), Ubuntu Mono (hex dump & byte offsets)
- **Layout**: 3-tier Wireshark-inspired forensic cockpit with non-blocking CRT scanline texture overlay

---

## Local Development

```bash
# Clone the repository
git clone https://github.com/nyzxis/packetscope.git
cd packetscope

# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build
```

---

## Author & Portfolio

Developed by **Arfa Danial (nyzxis)** as part of the Cybersecurity & AI Defense Suite.
- Portfolio: [https://nyzxis.vercel.app/](https://nyzxis.vercel.app/)
- GitHub: [@nyzxis](https://github.com/nyzxis)
