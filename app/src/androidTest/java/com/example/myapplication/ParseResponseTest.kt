package com.example.myapplication

import androidx.test.ext.junit.runners.AndroidJUnit4
import org.junit.Assert.*
import org.junit.Test
import org.junit.runner.RunWith

@RunWith(AndroidJUnit4::class)
class ParseResponseTest {

    @Test
    fun parseResponse_jsonConDosTareas_devuelveDosElementos() {
        val json = """[{"task":"Comprar pan","id":"1"},{"task":"Estudiar","id":"2"}]"""
        val tasks = parseResponse(json)
        assertEquals(2, tasks.size)
    }

    @Test
    fun parseResponse_jsonValido_mapeaTaskCorrectamente() {
        val json = """[{"task":"Comprar pan","id":"1"}]"""
        val tasks = parseResponse(json)
        assertEquals("Comprar pan", tasks[0].task)
        assertEquals("1", tasks[0].id)
    }

    @Test
    fun parseResponse_jsonVacio_devuelveListaVacia() {
        val json = "[]"
        val tasks = parseResponse(json)
        assertTrue(tasks.isEmpty())
    }

    @Test
    fun parseResponse_unaSolaTarea_devuelveUnElemento() {
        val json = """[{"task":"Una tarea","id":"42"}]"""
        val tasks = parseResponse(json)
        assertEquals(1, tasks.size)
        assertEquals("Una tarea", tasks[0].task)
        assertEquals("42", tasks[0].id)
    }

    @Test
    fun parseResponse_preservaOrdenDeLista() {
        val json = """[{"task":"Primera","id":"1"},{"task":"Segunda","id":"2"},{"task":"Tercera","id":"3"}]"""
        val tasks = parseResponse(json)
        assertEquals("Primera", tasks[0].task)
        assertEquals("Segunda", tasks[1].task)
        assertEquals("Tercera", tasks[2].task)
    }

    @Test(expected = Exception::class)
    fun parseResponse_jsonInvalido_lanzaExcepcion() {
        parseResponse("esto no es json válido")
    }
}
