package com.festivalstudio.app.navigation

sealed class Screen(val route: String, val title: String, val icon: String) {
    object Home : Screen("home", "Home", "🏠")
    object PostMaker : Screen("post_maker", "Post Maker", "🖼️")
    object GifMaker : Screen("gif_maker", "GIF Maker", "🎬")
    object StatusMaker : Screen("status_maker", "Status Maker", "📱")
    object Settings : Screen("settings", "Settings", "⚙️")
}
