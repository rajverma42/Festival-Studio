package com.festivalstudio.app.ui.statusmaker

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Paint
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.festivalstudio.app.utils.MediaSaver

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun StatusMakerScreen(
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current

    val presetGradients = listOf(
        listOf(0xFF831843, 0xFFBE185D, 0xFFF43F5E), // Royal Rose
        listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF38BDF8), // Ocean Blue
        listOf(0xFF064E3B, 0xFF059669, 0xFF10B981), // Emerald Festive
        listOf(0xFF701A75, 0xFF9333EA, 0xFFC084FC), // Mystic Violet
        listOf(0xFF7C2D12, 0xFFEA580C, 0xFFFBBF24)  // Golden Sunset
    )

    var selectedGradientIndex by remember { mutableStateOf(0) }
    var quoteText by remember { mutableStateOf("May the divine light of celebrations fill your home with laughter, health, and limitless abundance! 🌸✨") }
    var authorName by remember { mutableStateOf("Warm Wishes") }
    var isSaving by remember { mutableStateOf(false) }
    var resultNotice by remember { mutableStateOf<String?>(null) }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("9:16 WhatsApp Status Maker") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .verticalScroll(rememberScrollState())
                .padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Live 9:16 Portrait Canvas Preview
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(340.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(
                        Brush.verticalGradient(presetGradients[selectedGradientIndex].map { Color(it) })
                    )
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.Center
                ) {
                    Text(
                        text = "“",
                        fontSize = 44.sp,
                        color = Color.White.copy(alpha = 0.5f),
                        fontWeight = FontWeight.Bold
                    )
                    Text(
                        text = quoteText,
                        color = Color.White,
                        fontSize = 17.sp,
                        fontWeight = FontWeight.SemiBold,
                        textAlign = TextAlign.Center,
                        lineHeight = 24.sp
                    )
                    Spacer(modifier = Modifier.height(16.dp))
                    Text(
                        text = "— $authorName —",
                        color = Color.White.copy(alpha = 0.85f),
                        fontSize = 13.sp,
                        fontWeight = FontWeight.Medium
                    )
                }
            }

            // Gradient Palette Selector
            Text("Select Background Theme", fontWeight = FontWeight.Bold)
            LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
                itemsIndexed(presetGradients) { index, gradient ->
                    Box(
                        modifier = Modifier
                            .size(44.dp)
                            .clip(RoundedCornerShape(8.dp))
                            .background(Brush.linearGradient(gradient.map { Color(it) }))
                            .clip(RoundedCornerShape(8.dp))
                    ) {
                        RadioButton(
                            selected = index == selectedGradientIndex,
                            onClick = { selectedGradientIndex = index },
                            modifier = Modifier.align(Alignment.Center)
                        )
                    }
                }
            }

            // Text Inputs
            OutlinedTextField(
                value = quoteText,
                onValueChange = { quoteText = it },
                label = { Text("Status Greeting / Quote") },
                maxLines = 4,
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = authorName,
                onValueChange = { authorName = it },
                label = { Text("Your Signature / Sender") },
                modifier = Modifier.fillMaxWidth()
            )

            // Save & Share Buttons
            Button(
                onClick = {
                    isSaving = true
                    try {
                        val bitmap = generateStatusBitmap(
                            quote = quoteText,
                            author = authorName,
                            gradientColors = presetGradients[selectedGradientIndex]
                        )
                        val uri = MediaSaver.saveBitmapToGallery(context, bitmap, "FestivalStatus")
                        resultNotice = if (uri != null) "✓ 9:16 Status Saved to Pictures Gallery!" else "Error saving status"
                    } catch (e: Exception) {
                        resultNotice = "Error: ${e.message}"
                    } finally {
                        isSaving = false
                    }
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (isSaving) "Saving..." else "💾 Save 9:16 Portrait Status")
            }

            if (resultNotice != null) {
                Text(
                    text = resultNotice!!,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
            }
        }
    }
}

private fun generateStatusBitmap(
    quote: String,
    author: String,
    gradientColors: List<Long>
): Bitmap {
    val width = 1080
    val height = 1920
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)

    val colors = gradientColors.map { it.toInt() }.toIntArray()
    val shader = android.graphics.LinearGradient(
        0f, 0f, 0f, height.toFloat(),
        colors, null, android.graphics.Shader.TileMode.CLAMP
    )
    val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply { this.shader = shader }
    canvas.drawRect(0f, 0f, width.toFloat(), height.toFloat(), paint)

    val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.WHITE
        textAlign = Paint.Align.CENTER
        textSize = 52f
        isFakeBoldText = true
    }

    canvas.drawText(quote.take(120), width / 2f, height * 0.48f, textPaint)

    textPaint.textSize = 38f
    textPaint.isFakeBoldText = false
    canvas.drawText("— $author —", width / 2f, height * 0.58f, textPaint)

    return bitmap
}
