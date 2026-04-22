package com.example.myapplication


import androidx.compose.ui.test.assertIsDisplayed
import androidx.compose.ui.test.junit4.createComposeRule
import androidx.compose.ui.test.onNodeWithText
import androidx.navigation.compose.rememberNavController
import org.junit.Rule
import org.junit.Test

class MainScreenTest {

    @get:Rule
    val composeTestRule = createComposeRule()

    @Test
    fun menu_muestraBotonesPrincipales() {
        composeTestRule.setContent {
            Menu(navController = rememberNavController())
        }

        composeTestRule.onNodeWithText("Acerca de").assertIsDisplayed()
        composeTestRule.onNodeWithText("CRUD Backend").assertIsDisplayed()
        composeTestRule.onNodeWithText("CRUD Local").assertIsDisplayed()
    }
}