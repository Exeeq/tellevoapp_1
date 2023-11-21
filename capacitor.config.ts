import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'cl.tellevo.app',
  appName: 'tellevoapp',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
