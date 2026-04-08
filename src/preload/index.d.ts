export interface CustomElectronAPI {
  generatePdf: (html: string, title?: string) => Promise<Uint8Array>;
  process: {
    versions: NodeJS.ProcessVersions;
  };
}

declare global {
  interface Window {
    electron: CustomElectronAPI;
  }
}