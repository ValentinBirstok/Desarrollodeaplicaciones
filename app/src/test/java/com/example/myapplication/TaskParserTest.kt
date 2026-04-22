package com.example.myapplication

import org.junit.Assert.assertEquals
import org.junit.Test

class TaskParserTest {

    @Test
    fun task_seCreaCorrectamente() {
        val task = Task("Leer", "1")

        assertEquals("Leer", task.task)
        assertEquals("1", task.id)
    }
}