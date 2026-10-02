package com.festivalstudio.app.ui.postmaker

import android.graphics.Bitmap
import android.graphics.Canvas
import android.graphics.Paint
import android.graphics.RectF
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Share
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.toArgb
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.festivalstudio.app.domain.FestivalRepository
import com.festivalstudio.app.utils.MediaSaver

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun PostMakerScreen(
    initialTemplateId: String? = null,
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val templates = FestivalRepository.templates
    val initialIndex = templates.indexOfFirst { it.id == initialTemplateId }.let { if (it >= 0) it else 0 }
    var selectedTemplateIndex by remember { mutableStateOf(initialIndex) }
    val currentTemplate = templates[selectedTemplateIndex]

    var userGreeting by remember { mutableStateOf(currentTemplate.greeting) }
    var userSubtext by remember { mutableStateOf(currentTemplate.defaultSubText) }
    var senderName by remember { mutableStateOf("") }
    var selectedPhotoUri by remember { mutableStateOf<Uri?>(null) }
    var isSaving by remember { mutableStateOf(false) }
    var statusMessage by remember { mutableStateOf<String?>(null) }

    val photoPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickVisualMedia()
    ) { uri ->
        if (uri != null) {
            selectedPhotoUri = uri
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Festival Post Maker") },
                navigationIcon = {
                    IconButton(onClick = onNavigateBack) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Back")
                    }
                },
                actions = {
                    IconButton(onClick = {
                        val bitmap = generatePostBitmap(
                            title = userGreeting,
                            subtext = userSubtext,
                            sender = senderName,
                            gradientColors = currentTemplate.gradientColors,
                            badge = currentTemplate.emojiBadge
                        )
                        val uri = MediaSaver.saveBitmapToGallery(context, bitmap, "FestivalPost")
                        if (uri != null) {
                            MediaSaver.shareMedia(context, uri, "image/png", "$userGreeting\n\n$userSubtext")
                        }
                    }) {
                        Icon(Icons.Default.Share, contentDescription = "Share")
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
            // Live Preview Canvas Area (1:1 Square)
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(1f)
                    .clip(RoundedCornerShape(16.dp))
                    .background(
                        Brush.linearGradient(currentTemplate.gradientColors.map { Color(it) })
                    )
                    .padding(24.dp),
                contentAlignment = Alignment.Center
            ) {
                Column(
                    horizontalAlignment = Alignment.CenterHorizontally,
                    verticalArrangement = Arrangement.SpaceBetween,
                    modifier = Modifier.fillMaxSize()
                ) {
                    // Top festival badge
                    Box(
                        modifier = Modifier
                            .size(54.dp)
                            .clip(CircleShape)
                            .background(Color.White.copy(alpha = 0.2f)),
                        contentAlignment = Alignment.Center
                    ) {
                        Text(currentTemplate.emojiBadge, fontSize = 28.sp)
                    }

                    // Main Greeting Texts
                    Column(
                        horizontalAlignment = Alignment.CenterHorizontally,
                        modifier = Modifier.padding(horizontal = 8.dp)
                    ) {
                        Text(
                            text = userGreeting.ifBlank { "Happy Festival" },
                            fontSize = 22.sp,
                            fontWeight = FontWeight.Bold,
                            color = Color.White,
                            textAlign = TextAlign.Center
                        )
                        Spacer(modifier = Modifier.height(8.dp))
                        Text(
                            text = userSubtext,
                            fontSize = 13.sp,
                            color = Color.White.copy(alpha = 0.9f),
                            textAlign = TextAlign.Center,
                            lineHeight = 18.sp
                        )
                    }

                    // Bottom Signature / Sender
                    if (senderName.isNotBlank()) {
                        Surface(
                            shape = RoundedCornerShape(20.dp),
                            color = Color.Black.copy(alpha = 0.35f)
                        ) {
                            Text(
                                text = "— $senderName —",
                                color = Color.White,
                                fontSize = 13.sp,
                                fontWeight = FontWeight.SemiBold,
                                modifier = Modifier.padding(horizontal = 14.dp, vertical = 6.dp)
                            )
                        }
                    } else {
                        Spacer(modifier = Modifier.height(10.dp))
                    }
                }
            }

            // Template Selector Row
            Text("Select Occasion / Festival", fontWeight = FontWeight.Bold)
            LazyRow(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                items(templates.indices.toList()) { index ->
                    val t = templates[index]
                    val isSelected = index == selectedTemplateIndex
                    OutlinedButton(
                        onClick = {
                            selectedTemplateIndex = index
                            userGreeting = t.greeting
                            userSubtext = t.defaultSubText
                        },
                        colors = ButtonDefaults.outlinedButtonColors(
                            containerColor = if (isSelected) MaterialTheme.colorScheme.primaryContainer else MaterialTheme.colorScheme.surface
                        ),
                        border = ButtonDefaults.outlinedButtonBorder.copy(
                            width = if (isSelected) 2.dp else 1.dp
                        )
                    ) {
                        Text("${t.emojiBadge} ${t.category}")
                    }
                }
            }

            // Editable Input Fields
            OutlinedTextField(
                value = userGreeting,
                onValueChange = { userGreeting = it },
                label = { Text("Festival Greeting Headline") },
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = userSubtext,
                onValueChange = { userSubtext = it },
                label = { Text("Wish / Blessing Message") },
                maxLines = 3,
                modifier = Modifier.fillMaxWidth()
            )

            OutlinedTextField(
                value = senderName,
                onValueChange = { senderName = it },
                label = { Text("Your Name / Business Signature") },
                placeholder = { Text("e.g. Ramesh & Family") },
                modifier = Modifier.fillMaxWidth()
            )

            // Optional Photo / Logo Attachment
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.spacedBy(8.dp),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Button(
                    onClick = {
                        photoPickerLauncher.launch(
                            PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)
                        )
                    },
                    modifier = Modifier.weight(1f)
                ) {
                    Text(if (selectedPhotoUri != null) "Change Photo" else "Add Your Photo")
                }
                if (selectedPhotoUri != null) {
                    TextButton(onClick = { selectedPhotoUri = null }) {
                        Text("Remove")
                    }
                }
            }

            // Action Buttons
            Button(
                onClick = {
                    isSaving = true
                    try {
                        val bitmap = generatePostBitmap(
                            title = userGreeting,
                            subtext = userSubtext,
                            sender = senderName,
                            gradientColors = currentTemplate.gradientColors,
                            badge = currentTemplate.emojiBadge
                        )
                        val uri = MediaSaver.saveBitmapToGallery(context, bitmap, "FestivalStudio_Post")
                        statusMessage = if (uri != null) "✓ Saved to Gallery!" else "Error saving image"
                    } catch (e: Exception) {
                        statusMessage = "Save failed: ${e.message}"
                    } finally {
                        isSaving = false
                    }
                },
                modifier = Modifier.fillMaxWidth(),
                shape = RoundedCornerShape(10.dp)
            ) {
                Text(if (isSaving) "Saving..." else "💾 Save HD Image to Gallery", fontSize = 15.sp)
            }

            if (statusMessage != null) {
                Text(
                    text = statusMessage!!,
                    color = MaterialTheme.colorScheme.primary,
                    fontWeight = FontWeight.SemiBold,
                    modifier = Modifier.align(Alignment.CenterHorizontally)
                )
            }
        }
    }
}

private fun generatePostBitmap(
    title: String,
    subtext: String,
    sender: String,
    gradientColors: List<Long>,
    badge: String
): Bitmap {
    val size = 1080
    val bitmap = Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)

    // Background Gradient
    val colors = gradientColors.map { it.toInt() }.toIntArray()
    val shader = android.graphics.LinearGradient(
        0f, 0f, size.toFloat(), size.toFloat(),
        colors, null, android.graphics.Shader.TileMode.CLAMP
    )
    val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        this.shader = shader
    }
    canvas.drawRect(0f, 0f, size.toFloat(), size.toFloat(), paint)

    // Center Texts
    val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
        color = android.graphics.Color.WHITE
        textAlign = Paint.Align.CENTER
        textSize = 58f
        isFakeBoldText = true
    }
    canvas.drawText(title, size / 2f, size * 0.42f, textPaint)

    textPaint.textSize = 34f
    textPaint.isFakeBoldText = false
    canvas.drawText(subtext.take(60), size / 2f, size * 0.52f, textPaint)

    if (sender.isNotBlank()) {
        textPaint.textSize = 36f
        textPaint.isFakeBoldText = true
        canvas.drawText("— $sender —", size / 2f, size * 0.82f, textPaint)
    }

    return bitmap
}
