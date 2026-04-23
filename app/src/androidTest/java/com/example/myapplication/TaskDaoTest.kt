package com.example.myapplication

import android.content.Context
import androidx.room.Room
import androidx.test.core.app.ApplicationProvider
import androidx.test.ext.junit.runners.AndroidJUnit4
import kotlinx.coroutines.test.runTest
import org.junit.After
import org.junit.Assert.*
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class TaskDaoTest {

    private lateinit var db: AppDatabase
    private lateinit var dao: TaskDao

    @Before
    fun setup() {
        val context = ApplicationProvider.getApplicationContext<Context>()
        db = Room.inMemoryDatabaseBuilder(context, AppDatabase::class.java)
            .allowMainThreadQueries()
            .build()
        dao = db.taskDao()
    }

    @After
    fun teardown() {
        db.close()
    }

    @Test
    fun getAll_baseDatosVacia_devuelveListaVacia() = runTest {
        val tasks = dao.getAll()
        assertTrue(tasks.isEmpty())
    }

    @Test
    fun insert_guardaCorrectamente() = runTest {
        dao.insert(TaskEntity(task = "Tarea de prueba"))
        val tasks = dao.getAll()
        assertEquals(1, tasks.size)
        assertEquals("Tarea de prueba", tasks[0].task)
    }

    @Test
    fun insert_variasYGetAll_devuelveTodas() = runTest {
        dao.insert(TaskEntity(task = "Tarea 1"))
        dao.insert(TaskEntity(task = "Tarea 2"))
        dao.insert(TaskEntity(task = "Tarea 3"))
        val tasks = dao.getAll()
        assertEquals(3, tasks.size)
    }

    @Test
    fun delete_eliminaCorrectamente() = runTest {
        dao.insert(TaskEntity(task = "Tarea a eliminar"))
        val insertada = dao.getAll()[0]
        dao.delete(insertada)
        val tasks = dao.getAll()
        assertTrue(tasks.isEmpty())
    }

    @Test
    fun delete_soloEliminaLaCorrecta() = runTest {
        dao.insert(TaskEntity(task = "Tarea 1"))
        dao.insert(TaskEntity(task = "Tarea 2"))
        val todas = dao.getAll()
        dao.delete(todas[0])
        val restantes = dao.getAll()
        assertEquals(1, restantes.size)
        assertEquals("Tarea 2", restantes[0].task)
    }

    @Test
    fun update_modificaTextoCorrectamente() = runTest {
        dao.insert(TaskEntity(task = "Texto original"))
        val insertada = dao.getAll()[0]
        dao.update(insertada.copy(task = "Texto modificado"))
        val actualizada = dao.getAll()[0]
        assertEquals("Texto modificado", actualizada.task)
    }

    @Test
    fun update_mantieneElMismoId() = runTest {
        dao.insert(TaskEntity(task = "Tarea"))
        val insertada = dao.getAll()[0]
        dao.update(insertada.copy(task = "Tarea editada"))
        val actualizada = dao.getAll()[0]
        assertEquals(insertada.id, actualizada.id)
    }
}
