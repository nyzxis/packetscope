import type { PCAPScenario } from '../types/packet';

export const PCAP_PRESETS: PCAPScenario[] = [
  {
    id: 'tls-mitm-downgrade',
    name: 'TLS 1.3 Handshake & Downgrade Intercept',
    description: 'Active man-in-the-middle proxy injecting illegal renegotiation and forcing weak cipher suites.',
    totalPackets: 6,
    threatLevel: 'CRITICAL',
    primaryVector: 'TLS Downgrade Attack (CVE-2024-MITM)',
    packets: [
      {
        id: 'pkt-1',
        number: 1,
        timestamp: 0.0,
        source: '192.168.1.105',
        destination: '104.244.42.1',
        protocol: 'TCP',
        length: 74,
        info: '52418 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460 SACK_PERM=1',
        rawHex: '00 50 56 c0 00 08 00 0c 29 8a 45 12 08 00 45 00 00 3c b2 a1 40 00 40 06 28 3f c0 a8 01 69 68 f4 2a 01 cc c2 01 bb 9d b4 08 1a 00 00 00 00 a0 02 fa f0 6a 3a 00 00 02 04 05 b4 04 02 08 0a 3f a8 11 02 00 00 00 00 01 03 03 07',
        layers: [
          {
            name: 'Frame 1',
            summary: '74 bytes on wire, 74 bytes captured',
            fields: [
              { label: 'Arrival Time', value: 'Sep 9, 2026 21:04:12.100234' },
              { label: 'Frame Number', value: '1' },
              { label: 'Frame Length', value: '74 bytes (592 bits)' }
            ]
          },
          {
            name: 'Ethernet II',
            summary: 'Src: Vmware_8a:45:12, Dst: Router_c0:00:08',
            fields: [
              { label: 'Destination MAC', value: '00:50:56:c0:00:08', byteRange: [0, 5] },
              { label: 'Source MAC', value: '00:0c:29:8a:45:12', byteRange: [6, 11] },
              { label: 'Type', value: 'IPv4 (0x0800)', byteRange: [12, 13] }
            ]
          },
          {
            name: 'Internet Protocol Version 4',
            summary: 'Src: 192.168.1.105, Dst: 104.244.42.1',
            fields: [
              { label: 'Version', value: '4', byteRange: [14, 14] },
              { label: 'Header Length', value: '20 bytes', byteRange: [14, 14] },
              { label: 'Total Length', value: '60', byteRange: [16, 17] },
              { label: 'Time to Live', value: '64', byteRange: [22, 22] },
              { label: 'Protocol', value: 'TCP (6)', byteRange: [23, 23] },
              { label: 'Source IP', value: '192.168.1.105', byteRange: [26, 29] },
              { label: 'Destination IP', value: '104.244.42.1', byteRange: [30, 33] }
            ]
          },
          {
            name: 'Transmission Control Protocol',
            summary: 'Src Port: 52418, Dst Port: 443, Seq: 0, Flags: [SYN]',
            fields: [
              { label: 'Source Port', value: '52418', byteRange: [34, 35] },
              { label: 'Destination Port', value: '443', byteRange: [36, 37] },
              { label: 'Sequence Number', value: '0', byteRange: [38, 41] },
              { label: 'Flags', value: '0x002 (SYN)', byteRange: [46, 47] }
            ]
          }
        ]
      },
      {
        id: 'pkt-2',
        number: 2,
        timestamp: 0.0124,
        source: '104.244.42.1',
        destination: '192.168.1.105',
        protocol: 'TCP',
        length: 74,
        info: '443 → 52418 [SYN, ACK] Seq=0 Ack=1 Win=65535 Len=0',
        rawHex: '00 0c 29 8a 45 12 00 50 56 c0 00 08 08 00 45 00 00 3c 00 00 40 00 35 06 6b e0 68 f4 2a 01 c0 a8 01 69 01 bb cc c2 77 4f 93 a1 9d b4 08 1b a0 12 ff ff db b2 00 00 02 04 05 b4 01 01 04 02 01 03 03 0a',
        layers: [
          {
            name: 'Frame 2',
            summary: '74 bytes on wire (SYN-ACK Handshake established)',
            fields: [
              { label: 'Arrival Time', value: 'Sep 9, 2026 21:04:12.112634' },
              { label: 'Frame Length', value: '74 bytes' }
            ]
          },
          {
            name: 'Internet Protocol Version 4',
            summary: 'Src: 104.244.42.1, Dst: 192.168.1.105',
            fields: [
              { label: 'Source IP', value: '104.244.42.1', byteRange: [26, 29] },
              { label: 'Destination IP', value: '192.168.1.105', byteRange: [30, 33] }
            ]
          },
          {
            name: 'Transmission Control Protocol',
            summary: 'Src Port: 443, Dst Port: 52418, Flags: [SYN, ACK]',
            fields: [
              { label: 'Flags', value: '0x012 (SYN, ACK)', byteRange: [46, 47] },
              { label: 'Window Size', value: '65535', byteRange: [48, 49] }
            ]
          }
        ]
      },
      {
        id: 'pkt-3',
        number: 3,
        timestamp: 0.0129,
        source: '192.168.1.105',
        destination: '104.244.42.1',
        protocol: 'TCP',
        length: 54,
        info: '52418 → 443 [ACK] Seq=1 Ack=1 Win=64240 Len=0',
        rawHex: '00 50 56 c0 00 08 00 0c 29 8a 45 12 08 00 45 00 00 28 b2 a2 40 00 40 06 28 52 c0 a8 01 69 68 f4 2a 01 cc c2 01 bb 9d b4 08 1b 77 4f 93 a2 50 10 fa f0 ee 2e 00 00',
        layers: [
          {
            name: 'Transmission Control Protocol',
            summary: 'Src Port: 52418, Dst Port: 443, Flags: [ACK]',
            fields: [
              { label: 'Flags', value: '0x010 (ACK)', byteRange: [46, 47] }
            ]
          }
        ]
      },
      {
        id: 'pkt-4',
        number: 4,
        timestamp: 0.0152,
        source: '192.168.1.105',
        destination: '104.244.42.1',
        protocol: 'TLS 1.3',
        length: 517,
        info: 'Client Hello, Supported Ciphers: TLS_AES_256_GCM_SHA384, SNI=api.internal-vault.io',
        rawHex: '00 50 56 c0 00 08 00 0c 29 8a 45 12 08 00 45 00 01 f7 b2 a3 40 00 40 06 26 82 c0 a8 01 69 68 f4 2a 01 cc c2 01 bb 9d b4 08 1b 77 4f 93 a2 50 18 fa f0 ee 84 00 00 16 03 01 01 cd 01 00 01 c9 03 03 9a 1e 38 7b b5 df 20 89 cc 11 fe 9b 18 a2 44 80 fd 19 22 e1 90 77 6c e2 a8 4b 0e 19 82 df 29 00 00 20 13 02 13 03 13 01 c0 2c c0 30 00 9f cc a9 cc a8 01 00 01 60 00 00 00 1a 00 18 00 00 15 61 70 69 2e 69 6e 74 65 72 6e 61 6c 2d 76 61 75 6c 74 2e 69 6f',
        layers: [
          {
            name: 'Transport Layer Security',
            summary: 'TLSv1.3 Record Layer: Handshake Protocol: Client Hello',
            fields: [
              { label: 'Content Type', value: 'Handshake (22)', byteRange: [54, 54] },
              { label: 'Legacy Version', value: 'TLS 1.0 (0x0301)', byteRange: [55, 56] },
              { label: 'Length', value: '461 bytes', byteRange: [57, 58] }
            ]
          },
          {
            name: 'Handshake Protocol: Client Hello',
            summary: 'Handshake Type: Client Hello (1), Length: 457',
            fields: [
              { label: 'Handshake Type', value: 'Client Hello (1)', byteRange: [59, 59] },
              { label: 'Length', value: '457', byteRange: [60, 62] },
              { label: 'Version', value: 'TLS 1.2 (0x0303)', byteRange: [63, 64] },
              { label: 'Cipher Suite', value: 'TLS_AES_256_GCM_SHA384 (0x1302)', byteRange: [98, 99] },
              { label: 'Extension: Server Name', value: 'api.internal-vault.io', byteRange: [120, 145] },
              { label: 'Extension: Supported Versions', value: 'TLS 1.3, TLS 1.2', byteRange: [146, 160] }
            ]
          }
        ]
      },
      {
        id: 'pkt-5',
        number: 5,
        timestamp: 0.0241,
        source: '104.244.42.1',
        destination: '192.168.1.105',
        protocol: 'TLS 1.3',
        length: 122,
        info: '[ANOMALY] Server Hello: FORCED DOWNGRADE TO TLS_RSA_WITH_RC4_128_SHA (INSECURE)',
        isAnomaly: true,
        threatTag: 'FORCED CIPHER DOWNGRADE',
        rawHex: '00 0c 29 8a 45 12 00 50 56 c0 00 08 08 00 45 00 00 6c 00 00 40 00 35 06 6b b0 68 f4 2a 01 c0 a8 01 69 01 bb cc c2 77 4f 93 a2 9d b4 0a 20 50 18 ff ff d1 e2 00 00 16 03 03 00 42 02 00 00 3e 03 01 44 4f 57 4e 47 52 41 44 45 20 41 54 54 41 43 4b 20 49 4e 4a 45 43 54 45 44 20 00 00 05 00 00 16 00 00 00 17 00 00 23 00 00',
        layers: [
          {
            name: 'Handshake Protocol: Server Hello (VULNERABLE)',
            summary: 'Severely Deprecated Cipher Selected by MITM Proxy',
            fields: [
              { label: 'Handshake Type', value: 'Server Hello (2)', byteRange: [59, 59] },
              { label: 'Downgrade Indicator', value: '44 4f 57 4e 47 52 41 44 45 (DOWNGRADE ATTACK)', byteRange: [65, 75] },
              { label: 'Negotiated Cipher Suite', value: 'TLS_RSA_WITH_RC4_128_SHA (0x0005) [BROKEN CRYPTO]', byteRange: [92, 93] },
              { label: 'Risk Assessment', value: 'CRITICAL: RC4 is susceptible to plaintext recovery biases' }
            ]
          }
        ]
      },
      {
        id: 'pkt-6',
        number: 6,
        timestamp: 0.0255,
        source: '192.168.1.105',
        destination: '104.244.42.1',
        protocol: 'TLS 1.3',
        length: 61,
        info: 'Encrypted Alert: Illegal Parameter (47) - Client rejected downgrade attempt',
        rawHex: '00 50 56 c0 00 08 00 0c 29 8a 45 12 08 00 45 00 00 2f b2 a4 40 00 40 06 28 4a c0 a8 01 69 68 f4 2a 01 cc c2 01 bb 9d b4 0a 20 77 4f 93 e4 50 18 fa f0 de 11 00 00 15 03 03 00 02 02 2f',
        layers: [
          {
            name: 'Transport Layer Security',
            summary: 'TLSv1.3 Record Layer: Alert Protocol',
            fields: [
              { label: 'Content Type', value: 'Alert (21)', byteRange: [54, 54] },
              { label: 'Alert Level', value: 'Fatal (2)', byteRange: [59, 59] },
              { label: 'Alert Description', value: 'Illegal Parameter (47)', byteRange: [60, 60] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'syn-flood-burst',
    name: 'Distributed SYN Flood & Port Exhaustion',
    description: 'Rapid spoofed TCP SYN sequence numbers flooding ephemeral port pools.',
    totalPackets: 5,
    threatLevel: 'ELEVATED',
    primaryVector: 'TCP Half-Open SYN Exhaustion',
    packets: [
      {
        id: 'syn-1',
        number: 1,
        timestamp: 0.0001,
        source: '45.155.205.12',
        destination: '192.168.1.1',
        protocol: 'TCP',
        length: 60,
        info: '41234 → 80 [SYN] Seq=10492812 Win=1024 Len=0',
        isAnomaly: true,
        threatTag: 'SYN SPOOF',
        rawHex: '00 1a 2b 3c 4d 5e 00 11 22 33 44 55 08 00 45 00 00 2c a1 b2 00 00 40 06 12 34 2d 9b cd 0c c0 a8 01 01 a1 12 00 50 00 a0 1d 8c 00 00 00 00 60 02 04 00 ab cd 00 00',
        layers: [
          {
            name: 'Transmission Control Protocol',
            summary: 'SYN burst from unroutable botnet block',
            fields: [
              { label: 'Flags', value: '0x002 (SYN)', byteRange: [46, 47] },
              { label: 'Anomaly Flag', value: 'Zero SACK permission + Minimal TCP Window' }
            ]
          }
        ]
      },
      {
        id: 'syn-2',
        number: 2,
        timestamp: 0.0002,
        source: '185.220.101.5',
        destination: '192.168.1.1',
        protocol: 'TCP',
        length: 60,
        info: '41235 → 80 [SYN] Seq=10492813 Win=1024 Len=0',
        isAnomaly: true,
        threatTag: 'SYN SPOOF',
        rawHex: '00 1a 2b 3c 4d 5e 00 11 22 33 44 55 08 00 45 00 00 2c a1 b3 00 00 40 06 12 35 b9 dc 65 05 c0 a8 01 01 a1 13 00 50 00 a0 1d 8d 00 00 00 00 60 02 04 00 ab ce 00 00',
        layers: [
          {
            name: 'Transmission Control Protocol',
            summary: 'Spoofed source Tor exit node',
            fields: [
              { label: 'Source Port', value: '41235' }
            ]
          }
        ]
      },
      {
        id: 'syn-3',
        number: 3,
        timestamp: 0.0003,
        source: '91.240.118.99',
        destination: '192.168.1.1',
        protocol: 'TCP',
        length: 60,
        info: '41236 → 80 [SYN] Seq=10492814 Win=1024 Len=0',
        isAnomaly: true,
        threatTag: 'SYN SPOOF',
        rawHex: '00 1a 2b 3c 4d 5e 00 11 22 33 44 55 08 00 45 00 00 2c a1 b4 00 00 40 06 12 36 5b f0 76 63 c0 a8 01 01 a1 14 00 50 00 a0 1d 8e 00 00 00 00 60 02 04 00 ab cf 00 00',
        layers: [
          {
            name: 'Transmission Control Protocol',
            summary: 'Consecutive incremental sequence burst',
            fields: [{ label: 'Flags', value: '0x002 (SYN)' }]
          }
        ]
      }
    ]
  },
  {
    id: 'cleartext-auth-leak',
    name: 'Cleartext HTTP Basic Auth Credentials Leak',
    description: 'Unencrypted HTTP POST transmitting plaintext base64 administrative credentials.',
    totalPackets: 4,
    threatLevel: 'CRITICAL',
    primaryVector: 'Cleartext Credential Exposure',
    packets: [
      {
        id: 'http-1',
        number: 1,
        timestamp: 0.001,
        source: '192.168.1.50',
        destination: '198.51.100.22',
        protocol: 'HTTP',
        length: 312,
        info: 'POST /api/v1/auth/login HTTP/1.1 (application/x-www-form-urlencoded)',
        isAnomaly: true,
        threatTag: 'CLEARTEXT PASSWORD LEAK',
        rawHex: '00 0a 1b 2c 3d 4e 00 55 66 77 88 99 08 00 45 00 01 2a 3f 10 40 00 40 06 a8 12 c0 a8 01 32 c6 33 64 16 9b a1 00 50 12 34 56 78 87 65 43 21 50 18 10 00 fa 12 00 00 50 4f 53 54 20 2f 61 70 69 2f 76 31 2f 61 75 74 68 2f 6c 6f 67 69 6e 20 48 54 54 50 2f 31 2e 31 0d 0a 48 6f 73 74 3a 20 63 6f 72 65 2e 69 6e 74 65 72 6e 61 6c 0d 0a 41 75 74 68 6f 72 69 7a 61 74 69 6f 6e 3a 20 42 61 73 69 63 20 59 57 52 74 61 57 34 36 53 32 56 35 63 47 39 79 5a 44 45 79 4d 77 3d 3d 0d 0a 0d 0a',
        layers: [
          {
            name: 'Hypertext Transfer Protocol',
            summary: 'POST /api/v1/auth/login HTTP/1.1',
            fields: [
              { label: 'Request Method', value: 'POST', byteRange: [54, 57] },
              { label: 'Request URI', value: '/api/v1/auth/login', byteRange: [59, 78] },
              { label: 'Authorization', value: 'Basic YWRtaW46S2V5cG9yZDEyMw==', byteRange: [100, 140] },
              { label: 'Decoded Secret', value: 'admin:Keypord123 (CLEARTEXT COMPROMISE!)' }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'dns-tunneling-c2',
    name: 'DNS Tunneling & C2 Heartbeat Exfiltration',
    description: 'High-entropy base64 subdomain queries bypassing perimeter firewalls via port 53.',
    totalPackets: 4,
    threatLevel: 'CRITICAL',
    primaryVector: 'Covert Channel Data Exfiltration',
    packets: [
      {
        id: 'dns-1',
        number: 1,
        timestamp: 0.004,
        source: '192.168.1.100',
        destination: '8.8.8.8',
        protocol: 'DNS',
        length: 110,
        info: 'Standard query 0x1a2b TXT dG9rZW49c2stcHJvZC1rZXktOTk0.c2-exfil.darknet.co',
        isAnomaly: true,
        threatTag: 'COVERT DNS EXFIL',
        rawHex: '00 11 22 33 44 55 00 aa bb cc dd ee 08 00 45 00 00 60 41 22 00 00 40 11 f0 12 c0 a8 01 64 08 08 08 08 cb 12 00 35 00 4c 11 22 1a 2b 01 00 00 01 00 00 00 00 00 00 20 64 47 39 72 5a 57 34 39 63 32 6b 74 63 48 4a 76 5a 43 31 72 5a 58 6b 74 4f 54 6b 30 08 63 32 2d 65 78 66 69 6c 07 64 61 72 6b 6e 65 74 02 63 6f 00 00 10 00 01',
        layers: [
          {
            name: 'Domain Name System (query)',
            summary: 'High Shannon Entropy (> 4.8) Tunnel Query',
            fields: [
              { label: 'Transaction ID', value: '0x1a2b', byteRange: [42, 43] },
              { label: 'Flags', value: '0x0100 Standard query', byteRange: [44, 45] },
              { label: 'Queried Host', value: 'dG9rZW49c2stcHJvZC1rZXktOTk0.c2-exfil.darknet.co', byteRange: [54, 98] },
              { label: 'Decoded Payload', value: 'token=sk-prod-key-994 (STOLEN API KEY)' }
            ]
          }
        ]
      }
    ]
  }
];
