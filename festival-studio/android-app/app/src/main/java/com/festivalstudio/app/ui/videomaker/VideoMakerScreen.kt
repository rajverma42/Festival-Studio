package com.festivalstudio.app.ui.videomaker

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Paint
import android.net.Uri
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.PlayArrow
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
import com.festivalstudio.app.domain.FestivalRepository
import com.festivalstudio.app.domain.FestivalTemplate
import com.festivalstudio.app.utils.AnimatedGifEncoder
import com.festivalstudio.app.utils.MediaSaver
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun VideoMakerScreen(
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    val categories = remember { FestivalRepository.categories.filter { it != "All" } }
    var selectedCategory by remember { mutableStateOf(categories[0]) }

    val categoryTemplates = remember(selectedCategory) {
        FestivalRepository.templates.filter { it.category == selectedCategory }
    }
    var selectedTemplateIndex by remember { mutableStateOf(0) }
    val currentTemplate = categoryTemplates.getOrElse(selectedTemplateIndex) { categoryTemplates[0] }

    var userGreeting by remember { mutableStateOf(currentTemplate.greeting) }
    var userSubtext by remember { mutableStateOf(currentTemplate.defaultSubText) }
    var senderName by remember { mutableStateOf("") }
    var effectStyle by remember { mutableStateOf("Sparkle Zoom & Pan") }
    var durationSeconds by remember { mutableStateOf(3f) }
    var isRendering by remember { mutableStateOf(false) }
    var progressText by remember { mutableStateOf<String?>(null) }
    var savedUri by remember { mutableStateOf<Uri?>(null) }

    val effects = listOf("Sparkle Zoom & Pan", "Festive Glow Pulse", "Confetti Rise", "Cinematic Shimmer")

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Festival Video Story Maker 🎥") },
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
            // Live Video Story Canvas Preview (9:16 Portrait)
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(340.dp)
                    .clip(RoundedCornerShape(16.dp))
                    .background(
                        Brush.verticalGradient(currentTemplate.gradientColors.map { Color(it) })
                    )
                    .padding(20.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxSize()
                ) {
                    Surface(
                        shape = RoundedCornerShape(20.dp),
                        color = Color.Black.copy(alpha = 0.35f)
                    ) {
                        Row(
                            verticalAlignment = Alignment.CenterVertically,
                            modifier = Modifier.padding(horizontal = 12.dp, vertical = 6.dp)
                        ) {
                            Text(currentTemplate.emojiBadge, fontSize = 16.sp)
                            Spacer(modifier = Modifier.width(6.dp))
                            Text(
                                "🎬 Video Reel (${durationSeconds.toInt()}s • $effectStyle)",
                                color = Color.White,
                                fontSize = 12.sp,
                                fontWeight = FontWeight.Bold
                            )
                        }
                    }

                    Column(horizontalAlignment = Alignment.CenterHorizontally) {
                        Text(
                            text = userGreeting.ifBlank { currentTemplate.greeting },
                            color = Color.White,
                            fontSize = 24.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(10.dp))
                        Text(
                            text = userSubtext.ifBlank { currentTemplate.defaultSubText },
                            color = Color.White.copy(alpha = 0.9f),
                            fontSize = 14.sp,
                            textAlign = TextAlign.Center,
                            lineHeight = 20.sp
                        )
                    }

                    if (senderName.isNotBlank()) {
                        Surface(
                            shape = RoundedCornerShape(16.dp),
                            color = Color.Black.copy(alpha = 0.4f)
                        ) {
                            Text(
                                text = "— $senderName —",
                                color = Color.White,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold,
                                modifier = Modifier.padding(horizontal = 16.dp, vertical = 6.dp)
                            )
                        }
                    } else {
                        Spacer(modifier = Modifier.height(8.dp))
                    }
                }
            }

            // Festival Selector
            Text("Select Festival", fontWeight = FontWeight.Bold)
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                itemsIndexed(categories) { _, cat ->
                    val isSelected = cat == selectedCategory
                    FilterChip(
                        selected = isSelected,
                        onClick = {
                            selectedCategory = cat
                            selectedTemplateIndex = 0
                            val first = FestivalRepository.templates.firstOrNull { it.category == cat }
                            if (first != null) {
                                userGreeting = first.greeting
                                userSubtext = first.defaultSubText
                            }
                        },
                        label = { Text(cat) }
                    )
                }
            }

            // 50 Templates Carousel for the festival
            Text(
                "Select Video Story Template (${categoryTemplates.size} Templates Available)",
                fontWeight = FontWeight.Bold
            )
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                itemsIndexed(categoryTemplates) { index, tpl ->
                    val isSelected = index == selectedTemplateIndex
                    OutlinedButton(
                        onClick = {
                            selectedTemplateIndex = index
                            userGreeting = tpl.greeting
                            userSubtext = tpl.defaultSubText
                        },
                        colors = ButtonDefaults.outlinedButtonColors(
                            containerColor = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
                        ),
                        border = ButtonDefaults.outlinedButtonBorder.copy(
                            width = if (isSelected) 2.dp else 1.dp
                        )
                    ) {
                        Text(tpl.title.replace(tpl.category, "").trim())
                    }
                }
            }

            // Inputs
            OutlinedTextField(
                value = userGreeting,
                onValueChange = { userGreeting = it },
                label = { Text("Video Headline / Blessing") },
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = userSubtext,
                onValueChange = { userSubtext = it },
                label = { Text("Sub-Message / Wish") },
                maxLines = 3,
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = senderName,
                onValueChange = { senderName = it },
                label = { Text("Your Signature / Business Name") },
                placeholder = { Text("e.g. Verma Family & Associates") },
                modifier = Modifier.fillMaxWidth()
            )

            // Motion Effect & Duration
            Text("Animation & Motion Effect", fontWeight = FontWeight.Bold)
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                itemsIndexed(effects) { _, eff ->
                    FilterChip(
                        selected = eff == effectStyle,
                        onClick = { effectStyle = eff },
                        label = { Text(eff) }
                    )
                }
            }

            // Duration Slider
            Text(
                "Duration: ${durationSeconds.toInt()} Seconds",
                fontWeight = FontWeight.SemiBold
            )
            Slider(
                value = durationSeconds,
                onValueChange = { durationSeconds = it },
                valueRange = 2f..6f,
                steps = 3
            )

            // Export Video Animation Button
            Button(
                onClick = {
                    isRendering = true
                    progressText = "Rendering high-frame video loop..."

                    coroutineScope.launch {
                        val resultBytes = withContext(Dispatchers.IO) {
                            try {
                                val bos = ByteArrayOutputStream()
                                val encoder = AnimatedGifEncoder()
                                encoder.start(bos)
                                val fps = 10
                                val totalFrames = (durationSeconds * fps).toInt()
                                encoder.setDelay(1000 / fps)
                                encoder.setRepeat(0)

                                val w = 480
                                val h = 854 // 9:16 vertical video ratio

                                for (frame in 0 until totalFrames) {
                                    val progress = frame.toFloat() / totalFrames
                                    val bmp = Bitmap.createBitmap(w, h, Bitmap.Config.ARGB_8888)
                                    val canvas = Canvas(bmp)

                                    // Gradient background with gentle scale/pan
                                    val colors = currentTemplate.gradientColors.map { it.toInt() }.toIntArray()
                                    val shader = android.graphics.LinearGradient(
                                        0f, 0f, 0f, h.toFloat() * (1f + 0.1f * progress),
                                        colors, null, android.graphics.Shader.TileMode.CLAMP
                                    )
                                    val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply { this.shader = shader }
                                    canvas.drawRect(0f, 0f, w.toFloat(), h.toFloat(), paint)

                                    // Dynamic Animated Text
                                    val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
                                        color = android.graphics.Color.WHITE
                                        textAlign = Paint.Align.CENTER
                                        textSize = 36f
                                        isFakeBoldText = true
                                    }
                                    canvas.drawText(
                                        userGreeting.ifBlank { currentTemplate.greeting },
                                        w / 2f,
                                        h * 0.44f - (15f * kotlin.math.sin(progress * Math.PI.toFloat())),
                                        textPaint
                                    )

                                    textPaint.textSize = 22f
                                    textPaint.isFakeBoldText = false
                                    canvas.drawText(
                                        (userSubtext.ifBlank { currentTemplate.defaultSubText }).take(45),
                                        w / 2f,
                                        h * 0.52f,
                                        textPaint
                                    )

                                    if (senderName.isNotBlank()) {
                                        textPaint.textSize = 24f
                                        textPaint.isFakeBoldText = true
                                        canvas.drawText("— $senderName —", w / 2f, h * 0.78f, textPaint)
                                    }

                                    encoder.addFrame(bmp)
                                    bmp.recycle()
                                }
                                encoder.finish()
                                bos.toByteArray()
                            } catch (e: Exception) {
                                null
                            }
                        }

                        if (resultBytes != null && resultBytes.isNotEmpty()) {
                            val uri = MediaSaver.saveGifToGallery(context, resultBytes, "FestivalVideo_${currentTemplate.category}")
                            savedUri = uri
                            progressText = "✓ Video Story rendered and saved to Gallery!"
                        } else {
                            progressText = "Render failed. Try a shorter duration."
                        }
                        isRendering = false
                    }
                },
                enabled = !isRendering,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (isRendering) "Rendering Video Story..." else "🎥 Generate & Export Video Reel")
            }

            if (isRendering) {
                LinearProgressIndicator(modifier = Modifier.fillMaxWidth())
            }

            if (progressText != null) {
                Text(
                    text = progressText!!,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold
                )
            }

            if (savedUri != null) {
                Button(
                    onClick = {
                        MediaSaver.shareMedia(context, savedUri!!, "image/gif", "Sharing festive video story made with Festival Studio")
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
                ) {
                    Text("📤 Share Video Story to WhatsApp / Reels")
                }
            }
        }
    }
}
