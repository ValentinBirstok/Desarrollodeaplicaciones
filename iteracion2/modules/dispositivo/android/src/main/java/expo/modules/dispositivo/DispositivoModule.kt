package expo.modules.dispositivo

import android.os.Build
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class DispositivoModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("Dispositivo")

    Function("getModelo") {
      Build.MODEL
    }

    Function("getFabricante") {
      Build.MANUFACTURER
    }

    Function("getVersionAndroid") {
      "Android ${Build.VERSION.RELEASE} (API ${Build.VERSION.SDK_INT})"
    }

    Function("saludar") { nombre: String ->
      "¡Hola, $nombre! Este mensaje viene de código Kotlin nativo en Android."
    }
  }
}
