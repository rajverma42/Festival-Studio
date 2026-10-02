package com.festivalstudio.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.rememberNavController
import com.festivalstudio.app.navigation.Screen
import com.festivalstudio.app.ui.gifmaker.GifMakerScreen
import com.festivalstudio.app.ui.home.HomeScreen
import com.festivalstudio.app.ui.home.SettingsScreen
import com.festivalstudio.app.ui.postmaker.PostMakerScreen
import com.festivalstudio.app.ui.statusmaker.StatusMakerScreen
import com.festivalstudio.app.ui.theme.FestivalStudioTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            FestivalStudioTheme {
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    FestivalStudioApp()
                }
            }
        }
    }
}

@Composable
fun FestivalStudioApp() {
    val navController = rememberNavController()

    NavHost(
        navController = navController,
        startDestination = Screen.Home.route
    ) {
        composable(Screen.Home.route) {
            HomeScreen(
                onNavigate = { route -> navController.navigate(route) }
            )
        }
        composable(Screen.PostMaker.route) {
            PostMakerScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable(Screen.GifMaker.route) {
            GifMakerScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable(Screen.StatusMaker.route) {
            StatusMakerScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
        composable(Screen.Settings.route) {
            SettingsScreen(
                onNavigateBack = { navController.popBackStack() }
            )
        }
    }
}
