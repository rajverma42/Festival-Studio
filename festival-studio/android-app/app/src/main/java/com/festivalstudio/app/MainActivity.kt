package com.festivalstudio.app

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.*
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.NavType
import androidx.navigation.navArgument
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.festivalstudio.app.navigation.Screen
import com.festivalstudio.app.ui.gifmaker.GifMakerScreen
import com.festivalstudio.app.ui.home.HomeScreen
import com.festivalstudio.app.ui.home.SettingsScreen
import com.festivalstudio.app.ui.postmaker.PostMakerScreen
import com.festivalstudio.app.ui.statusmaker.StatusMakerScreen
import com.festivalstudio.app.ui.videomaker.VideoMakerScreen
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
    val navBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = navBackStackEntry?.destination?.route

    val bottomNavItems = listOf(
        Screen.Home,
        Screen.PostMaker,
        Screen.VideoMaker,
        Screen.GifMaker,
        Screen.StatusMaker
    )

    // Show bottom bar on primary destinations
    val showBottomBar = currentRoute in listOf(
        Screen.Home.route,
        Screen.PostMaker.route,
        Screen.VideoMaker.route,
        Screen.GifMaker.route,
        Screen.StatusMaker.route
    )

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar(
                    tonalElevation = 8.dp,
                    containerColor = MaterialTheme.colorScheme.surface
                ) {
                    bottomNavItems.forEach { screen ->
                        val isSelected = when (screen) {
                            Screen.PostMaker -> currentRoute?.startsWith("post_maker") == true
                            else -> currentRoute == screen.route
                        }

                        NavigationBarItem(
                            selected = isSelected,
                            onClick = {
                                val targetRoute = when (screen) {
                                    Screen.PostMaker -> Screen.PostMaker.createRoute("diwali-1")
                                    else -> screen.route
                                }
                                if (currentRoute != targetRoute) {
                                    navController.navigate(targetRoute) {
                                        popUpTo(navController.graph.findStartDestination().id) {
                                            saveState = true
                                        }
                                        launchSingleTop = true
                                        restoreState = true
                                    }
                                }
                            },
                            icon = {
                                Text(screen.icon, fontSize = 20.sp)
                            },
                            label = {
                                Text(
                                    text = screen.title,
                                    fontSize = 11.sp,
                                    fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Normal
                                )
                            },
                            colors = NavigationBarItemDefaults.colors(
                                indicatorColor = MaterialTheme.colorScheme.primaryContainer
                            )
                        )
                    }
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = Screen.Home.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(Screen.Home.route) {
                HomeScreen(
                    onNavigate = { route -> navController.navigate(route) }
                )
            }
            composable(
                route = Screen.PostMaker.route,
                arguments = listOf(navArgument("templateId") {
                    type = NavType.StringType
                    defaultValue = "diwali-1"
                })
            ) { backStackEntry ->
                val templateId = backStackEntry.arguments?.getString("templateId") ?: "diwali-1"
                PostMakerScreen(
                    initialTemplateId = templateId,
                    onNavigateBack = {
                        if (!navController.popBackStack()) {
                            navController.navigate(Screen.Home.route)
                        }
                    }
                )
            }
            composable(Screen.GifMaker.route) {
                GifMakerScreen(
                    onNavigateBack = {
                        if (!navController.popBackStack()) {
                            navController.navigate(Screen.Home.route)
                        }
                    }
                )
            }
            composable(Screen.VideoMaker.route) {
                VideoMakerScreen(
                    onNavigateBack = {
                        if (!navController.popBackStack()) {
                            navController.navigate(Screen.Home.route)
                        }
                    }
                )
            }
            composable(Screen.StatusMaker.route) {
                StatusMakerScreen(
                    onNavigateBack = {
                        if (!navController.popBackStack()) {
                            navController.navigate(Screen.Home.route)
                        }
                    }
                )
            }
            composable(Screen.Settings.route) {
                SettingsScreen(
                    onNavigateBack = { navController.popBackStack() }
                )
            }
        }
    }
}
