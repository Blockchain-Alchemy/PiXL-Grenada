export type ItemType = {
  name: string,
  imageSrc: string,
  alt: string,
  id?: number,
  unityCardIdentifier?:number,
}

export interface Metadata {
  token_id: number;
  decimals: number;
  name?: string;
  symbol?: string;
  displayUri?: string;
}

export interface TokenInfo {
  tokenId: number;
  metadata: Metadata;
  amount: number;
}