package com.example.myapplication

import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update

@Dao
interface TaskDao {
    @Query("SELECT * FROM tasks")
    suspend fun getAll(): List<TaskEntity>

    @Insert
    suspend fun insert(task: TaskEntity)

    @Delete
    suspend fun delete(task: TaskEntity)

    @Update
    suspend fun update(task: TaskEntity)
}