import { NativeModule, requireNativeModule } from 'expo';

declare class DispositivoModule extends NativeModule<{}> {
  getModelo(): string;
  getFabricante(): string;
  getVersionAndroid(): string;
  saludar(nombre: string): string;
}

export default requireNativeModule<DispositivoModule>('Dispositivo');
