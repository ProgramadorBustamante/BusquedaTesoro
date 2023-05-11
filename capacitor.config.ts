import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'prueba',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ["profile", "email"],
      serverClientId: "621156080746-h8vve8fsrmq3kmqbis35s17p5t7i2n0r.apps.googleusercontent.com",
      forceCodeForRefreshToken: true,
      androidClientId : "621156080746-b0ff18co4arqqijbo6uohs6ihghv9vld.apps.googleusercontent.com"
    }
  }
};

export default config;
