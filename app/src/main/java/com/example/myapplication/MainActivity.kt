package com.example.myapplication

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.material.icons.filled.Edit
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.unit.sp
import android.os.Bundle
import android.util.Log
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.Edit
import androidx.compose.material3.Button
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.example.myapplication.ui.theme.MyApplicationTheme
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import org.json.JSONArray
import java.security.SecureRandom
import java.security.cert.X509Certificate
import javax.net.ssl.HostnameVerifier
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager

class MainActivity : ComponentActivity() {

    lateinit var db: AppDatabase

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        db = AppDatabase.getInstance(this)

        enableEdgeToEdge()
        setContent {
            MyApplicationTheme {
                val navController = rememberNavController()

                NavHost(navController = navController, startDestination = "menu") {
                    composable("menu") { Menu(navController) }
                    composable("about") { AboutScreen(navController) }
                    composable("crud") { Lista(navController, "CRUD de tareas") }
                    composable("local") { ListaLocal(navController, "CRUD local", db) }
                }
            }
        }
    }
}

@Composable
fun Greeting(name: String, modifier: Modifier = Modifier) {
    Text(
        text = "Hello $name!",
        modifier = modifier
    )
}

@Preview(showBackground = true)
@Composable
fun GreetingPreview() {
    MyApplicationTheme {
        Greeting("Android")
    }
}

@SuppressLint("UnusedMaterial3ScaffoldPaddingParameter")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun Menu(navController: NavHostController) {
    var expanded by remember { mutableStateOf(false) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Mi TPO") },
                actions = {
                    IconButton(onClick = { expanded = true }) {
                        Icon(Icons.Filled.Menu, contentDescription = "Menú")
                    }

                    Box {
                        DropdownMenu(
                            expanded = expanded,
                            onDismissRequest = { expanded = false }
                        ) {
                            DropdownMenuItem(
                                text = { Text("Acerca de") },
                                onClick = {
                                    expanded = false
                                    navController.navigate("about")
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("CRUD Backend") },
                                onClick = {
                                    expanded = false
                                    navController.navigate("crud")
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("CRUD Local") },
                                onClick = {
                                    expanded = false
                                    navController.navigate("local")
                                }
                            )
                        }
                    }
                }
            )
        },
        content = {
            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(24.dp),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Text("Trabajo Práctico Integrador", fontSize = 24.sp)
                Spacer(modifier = Modifier.height(12.dp))
                Text("Desarrollo de Aplicaciones 1")
                Spacer(modifier = Modifier.height(12.dp))
                Text("Podés usar el menú de arriba o los botones de abajo")
                Spacer(modifier = Modifier.height(32.dp))

                Button(
                    onClick = { navController.navigate("about") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Acerca de")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = { navController.navigate("crud") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("CRUD Backend")
                }

                Spacer(modifier = Modifier.height(16.dp))

                Button(
                    onClick = { navController.navigate("local") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("CRUD Local")
                }
            }
        }
    )
}
@Composable
fun AboutScreen(navController: NavHostController) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(24.dp),
        horizontalAlignment = Alignment.CenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Text("Acerca de", fontSize = 24.sp)
        Spacer(modifier = Modifier.height(16.dp))

        Text("Materia: Desarrollo de Aplicaciones 1")
        Spacer(modifier = Modifier.height(8.dp))
        Text("Aplicación: Gestor de Tareas")
        Spacer(modifier = Modifier.height(16.dp))

        Text("Integrantes:")
        Spacer(modifier = Modifier.height(8.dp))
        Text("Birstok Valentin")
        Text("Aguirre Juan Ignacio")
        Text("Fiordalisi Faustino")
        Text("Stinga Mateo")
        Text("Vazquez Bautista")

        Spacer(modifier = Modifier.height(24.dp))

        Button(onClick = { navController.navigate("menu") }) {
            Text("Volver al menú")
        }
    }
}

@Composable
fun Lista(navController: NavHostController, name: String, modifier: Modifier = Modifier) {
    val tasks = remember { mutableStateListOf<Task>() }
    var textoInput by remember { mutableStateOf("") }
    var editingTaskIndex by remember { mutableStateOf(-1) }
    var editingTaskText by remember { mutableStateOf("") }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(name)

        TextField(
            value = textoInput,
            onValueChange = { textoInput = it },
            label = { Text("Agregue una tarea") }
        )

        Button(
            onClick = {
                addTaskToApi(textoInput, "")
                val aux = Task(textoInput, "")
                tasks.add(aux)
                textoInput = ""
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Agregar a la lista")
        }

        LazyColumn(
            modifier = Modifier.padding(16.dp)
        ) {
            itemsIndexed(tasks) { index, task ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (index == editingTaskIndex) {
                        TextField(
                            value = editingTaskText,
                            onValueChange = { editingTaskText = it },
                            modifier = Modifier.weight(1f)
                        )

                        Button(
                            onClick = {
                                val id = tasks[index].id
                                updateTaskInApi(id, editingTaskText) { success ->
                                    if (success) {
                                        tasks[index] = Task(editingTaskText, id)
                                        editingTaskIndex = -1
                                        editingTaskText = ""
                                    } else {
                                        showError("No se pudo actualizar la tarea")
                                    }
                                }
                            }
                        ) {
                            Text("Guardar")
                        }
                    } else {
                        Text(
                            text = task.task,
                            modifier = Modifier.weight(1f)
                        )

                        IconButton(
                            onClick = {
                                editingTaskIndex = index
                                editingTaskText = task.task
                            }
                        ) {
                            Icon(Icons.Default.Edit, contentDescription = "Editar tarea")
                        }

                        IconButton(
                            onClick = {
                                deleteTaskFromApi(task.id) { success ->
                                    if (success) {
                                        tasks.remove(task)
                                    } else {
                                        showError("No se pudo eliminar la tarea")
                                    }
                                }
                            }
                        ) {
                            Icon(Icons.Default.Delete, contentDescription = "Borrar tarea")
                        }
                    }
                }
            }
        }

        Button(onClick = {
            tasks.clear()
            fetchDataFromApi { newTasks ->
                tasks.addAll(newTasks)
            }
        }) {
            Text("Conectar Backend")
        }

        Button(onClick = { navController.navigate("menu") }) {
            Text("Ir al menú")
        }
    }
}

@Composable
fun ListaLocal(navController: NavHostController, name: String, db: AppDatabase) {
    val tasks = remember { mutableStateListOf<TaskEntity>() }
    var textoInput by remember { mutableStateOf("") }
    var editingTaskId by remember { mutableStateOf(0) }
    var editingTaskText by remember { mutableStateOf("") }

    LaunchedEffect(Unit) {
        val localTasks = kotlinx.coroutines.withContext(Dispatchers.IO) {
            db.taskDao().getAll()
        }
        tasks.clear()
        tasks.addAll(localTasks)
    }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Text(name)

        TextField(
            value = textoInput,
            onValueChange = { textoInput = it },
            label = { Text("Agregar tarea local") }
        )

        Button(
            onClick = {
                GlobalScope.launch(Dispatchers.IO) {
                    db.taskDao().insert(TaskEntity(task = textoInput))
                    val updated = db.taskDao().getAll()
                    launch(Dispatchers.Main) {
                        tasks.clear()
                        tasks.addAll(updated)
                        textoInput = ""
                    }
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Guardar en Room")
        }

        LazyColumn(
            modifier = Modifier.padding(16.dp)
        ) {
            itemsIndexed(tasks) { _, task ->
                Row(
                    verticalAlignment = Alignment.CenterVertically,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (task.id == editingTaskId) {
                        TextField(
                            value = editingTaskText,
                            onValueChange = { editingTaskText = it },
                            modifier = Modifier.weight(1f)
                        )

                        Button(
                            onClick = {
                                GlobalScope.launch(Dispatchers.IO) {
                                    db.taskDao().update(
                                        task.copy(task = editingTaskText)
                                    )
                                    val updated = db.taskDao().getAll()
                                    launch(Dispatchers.Main) {
                                        tasks.clear()
                                        tasks.addAll(updated)
                                        editingTaskId = 0
                                        editingTaskText = ""
                                    }
                                }
                            }
                        ) {
                            Text("Guardar")
                        }
                    } else {
                        Text(
                            text = task.task,
                            modifier = Modifier.weight(1f)
                        )

                        IconButton(
                            onClick = {
                                editingTaskId = task.id
                                editingTaskText = task.task
                            }
                        ) {
                            Icon(Icons.Default.Edit, contentDescription = "Editar")
                        }

                        IconButton(
                            onClick = {
                                GlobalScope.launch(Dispatchers.IO) {
                                    db.taskDao().delete(task)
                                    val updated = db.taskDao().getAll()
                                    launch(Dispatchers.Main) {
                                        tasks.clear()
                                        tasks.addAll(updated)
                                    }
                                }
                            }
                        ) {
                            Icon(Icons.Default.Delete, contentDescription = "Borrar")
                        }
                    }
                }
            }
        }

        Button(onClick = { navController.navigate("menu") }) {
            Text("Ir al menú")
        }
    }
}
fun getUnsafeOkHttpClient(): OkHttpClient {
    val trustAllCerts = arrayOf<TrustManager>(object : X509TrustManager {
        override fun checkClientTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
        override fun checkServerTrusted(chain: Array<out X509Certificate>?, authType: String?) {}
        override fun getAcceptedIssuers(): Array<X509Certificate> = arrayOf()
    })
    val sslContext = SSLContext.getInstance("SSL")
    sslContext.init(null, trustAllCerts, SecureRandom())
    val sslSocketFactory = sslContext.socketFactory
    return OkHttpClient.Builder()
        .sslSocketFactory(sslSocketFactory, trustAllCerts[0] as X509TrustManager)
        .hostnameVerifier(HostnameVerifier { _, _ -> true })
        .build()
}

data class Task (
    val task: String,
    val id: String
)

fun parseResponse(responseData: String): List<Task> {
    val jsonArray = JSONArray(responseData)
    val tasks = mutableListOf<Task>()
    for (i in 0 until jsonArray.length()) {
        val jsonObject = jsonArray.getJSONObject(i)
        val task = jsonObject.getString("task")
        val id = jsonObject.getString("id")
        tasks.add(Task(task,id))
    }
    return tasks
}

fun fetchDataFromApi(onTasksFetched: (List<Task>) -> Unit) {
    GlobalScope.launch(Dispatchers.IO) {
        val client = getUnsafeOkHttpClient()
        val request = Request.Builder()
            .url("https://69d8f6c90576c938825a5470.mockapi.io/lista")
            .build()
        val response = client.newCall(request).execute()
        val responseData = response.body?.string()
        launch(Dispatchers.Main) {
            if (responseData != null) {
                val tasks = parseResponse(responseData)
                onTasksFetched(tasks)
            } else {
                showError("No se pudo obtener la respuesta")
            }
        }
    }
}

private fun showError(message: String) {
    Log.d("Error conexion", message)
}

fun deleteTaskFromApi(taskId: String, onResult: (Boolean) -> Unit) {
    GlobalScope.launch(Dispatchers.IO) {
        val client = getUnsafeOkHttpClient()
        val request = Request.Builder()
            .url("https://69d8f6c90576c938825a5470.mockapi.io/lista/$taskId")
            .delete()
            .build()
        val response = client.newCall(request).execute()
        launch(Dispatchers.Main) {
            if (response.isSuccessful) {
                onResult(true)
            } else {
                onResult(false)
            }
        }
    }
}

fun updateTaskInApi(taskId: String, newTaskText: String, onResult: (Boolean) -> Unit) {
    GlobalScope.launch(Dispatchers.IO) {
        val client = getUnsafeOkHttpClient()
        val json = """{"task":"$newTaskText"}"""
        val body = json.toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())

        val request = Request.Builder()
            .url("https://69d8f6c90576c938825a5470.mockapi.io/lista/$taskId")
            .put(body)
            .build()

        val response = client.newCall(request).execute()

        launch(Dispatchers.Main) {
            onResult(response.isSuccessful)
        }
    }
}
fun addTaskToApi(task: String, id: String) {
    GlobalScope.launch(Dispatchers.IO) {
        val client = getUnsafeOkHttpClient()
        val json = """
            {
                "task": "$task",
                "id": "$id"
            }
        """.trimIndent()
        val requestBody = json.toRequestBody("application/json; charset=utf-8".toMediaTypeOrNull())
        val request = Request.Builder()
            .url("https://69d8f6c90576c938825a5470.mockapi.io/lista")
            .post(requestBody)
            .build()
        val response = client.newCall(request).execute()
        val responseData = response.body?.string()
        launch(Dispatchers.Main) {
            if (responseData != null) {
                Log.d("Agregar Tarea", "Respuesta: $responseData")
            } else {
                showError("No se pudo agregar la tarea")
            }
        }
    }
}
















