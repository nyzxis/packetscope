export type Protocol = 'TCP' | 'TLS 1.3' | 'DNS' | 'HTTP' | 'ICMP' | 'ARP';

export interface ProtocolField {
  label: string;
  value: string;
  byteRange?: [number, number]; // [startByte, endByte] for hex highlighting
  children?: ProtocolField[];
}

export interface ProtocolLayer {
  name: string;
  summary: string;
  fields: ProtocolField[];
}

export interface Packet {
  id: string;
  number: number;
  timestamp: number; // delta in seconds e.g. 0.000123
  source: string;
  destination: string;
  protocol: Protocol;
  length: number;
  info: string;
  isAnomaly?: boolean;
  threatTag?: string;
  rawHex: string; // space separated hex string e.g. "45 00 00 3c ..."
  layers: ProtocolLayer[];
}

export interface PCAPScenario {
  id: string;
  name: string;
  description: string;
  totalPackets: number;
  threatLevel: 'CRITICAL' | 'ELEVATED' | 'BENIGN';
  primaryVector: string;
  packets: Packet[];
}
