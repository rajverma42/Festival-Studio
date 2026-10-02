package com.festivalstudio.app.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.graphics.Color

val Saffron = Color(0xFFFF7700)
val DeepRose = Color(0xFFE11D48)
val WarmGold = Color(0xFFF59E0B)
val DarkBg = Color(0xFF120E0C)
val DarkSurface = Color(0xFF1E1714)
val LightBg = Color(0xFFFBF7F4)
val LightSurface = Color(0xFFFFFFFF)

private val DarkColorScheme = darkColorScheme(
    primary = Saffron,
    secondary = WarmGold,
    tertiary = DeepRose,
    background = DarkBg,
    surface = DarkSurface,
    onPrimary = Color.White,
    onBackground = Color(0xFFF6EFEA),
    onSurface = Color(0xFFF6EFEA)
)

private val LightColorScheme = lightColorScheme(
    primary = Saffron,
    secondary = DeepRose,
    tertiary = WarmGold,
    background = LightBg,
    surface = LightSurface,
    onPrimary = Color.White,
    onBackground = Color(0xFF221A16),
    onSurface = Color(0xFF221A16)
)

@Composable
fun FestivalStudioTheme(
    darkTheme: Boolean = isSystemInDarkTheme(),
    content: @Composable () -> Unit
) {
    val colorScheme = if (darkTheme) DarkColorScheme else LightColorScheme
    MaterialTheme(
        colorScheme = colorScheme,
        content = content
    )
}
