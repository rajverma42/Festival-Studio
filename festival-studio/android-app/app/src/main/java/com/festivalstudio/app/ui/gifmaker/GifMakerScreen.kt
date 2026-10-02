package com.festivalstudio.app.ui.gifmaker

import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.activity.compose.rememberLauncherForActivityResult
import androidx.activity.result.PickVisualMediaRequest
import androidx.activity.result.contract.ActivityResultContracts
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.itemsIndexed
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.festivalstudio.app.utils.AnimatedGifEncoder
import com.festivalstudio.app.utils.MediaSaver
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import java.io.ByteArrayOutputStream

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun GifMakerScreen(
    onNavigateBack: () -> Unit
) {
    val context = LocalContext.current
    val coroutineScope = rememberCoroutineScope()

    val selectedImages = remember { mutableStateListOf<Uri>() }
    var frameDelayMs by remember { mutableStateOf(500f) }
    var isProcessing by remember { mutableStateOf(false) }
    var progressText by remember { mutableStateOf<String?>(null) }
    var generatedGifBytes by remember { mutableStateOf<ByteArray?>(null) }
    var savedUri by remember { mutableStateOf<Uri?>(null) }

    val multiplePhotoPickerLauncher = rememberLauncherForActivityResult(
        contract = ActivityResultContracts.PickMultipleVisualMedia()
    ) { uris ->
        if (uris.isNotEmpty()) {
            selectedImages.addAll(uris)
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Native GIF Maker") },
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
            // Header Instruction Card
            Card(
                shape = RoundedCornerShape(12.dp),
                colors = CardDefaults.cardColors(containerColor = MaterialTheme.colorScheme.surfaceVariant)
            ) {
                Column(modifier = Modifier.padding(16.dp)) {
                    Text(
                        text = "🎬 Create Animated GIF Loops",
                        fontWeight = FontWeight.Bold,
                        fontSize = 16.sp
                    )
                    Spacer(modifier = Modifier.height(4.dp))
                    Text(
                        text = "Select 2 or more festival photos to turn them into an animated greeting loop.",
                        style = MaterialTheme.typography.bodyMedium,
                        color = Color.Gray
                    )
                }
            }

            // Image Picker Button
            Button(
                onClick = {
                    multiplePhotoPickerLauncher.launch(
                        PickVisualMediaRequest(ActivityResultContracts.PickVisualMedia.ImageOnly)
                    )
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("➕ Add Festival Photos (${selectedImages.size} selected)")
            }

            // Preview Selected Image Frames
            if (selectedImages.isNotEmpty()) {
                Text("Frame Sequence (${selectedImages.size} frames)", fontWeight = FontWeight.Bold)
                LazyRow(
                    horizontalArrangement = Arrangement.spacedBy(8.dp),
                    modifier = Modifier.fillMaxWidth()
                ) {
                    itemsIndexed(selectedImages) { index, uri ->
                        Box(
                            modifier = Modifier
                                .size(90.dp)
                                .clip(RoundedCornerShape(8.dp))
                                .background(Color.DarkGray)
                        ) {
                            Text(
                                text = "#${index + 1}",
                                color = Color.White,
                                fontSize = 12.sp,
                                modifier = Modifier
                                    .align(Alignment.TopStart)
                                    .padding(4.dp)
                            )
                            IconButton(
                                onClick = { selectedImages.removeAt(index) },
                                modifier = Modifier.align(Alignment.TopEnd)
                            ) {
                                Icon(
                                    Icons.Default.Delete,
                                    contentDescription = "Remove",
                                    tint = Color.Red,
                                    modifier = Modifier.size(18.dp)
                                )
                            }
                        }
                    }
                }

                // Speed / Frame Delay Slider
                Text(
                    text = "Animation Speed: ${frameDelayMs.toInt()} ms per frame",
                    fontWeight = FontWeight.SemiBold
                )
                Slider(
                    value = frameDelayMs,
                    onValueChange = { frameDelayMs = it },
                    valueRange = 100f..1500f,
                    steps = 13
                )
            }

            // Generate Button
            Button(
                onClick = {
                    if (selectedImages.size < 2) return@Button
                    isProcessing = true
                    progressText = "Encoding GIF frames..."

                    coroutineScope.launch {
                        val resultBytes = withContext(Dispatchers.IO) {
                            try {
                                val bos = ByteArrayOutputStream()
                                val encoder = AnimatedGifEncoder()
                                encoder.start(bos)
                                encoder.setDelay(frameDelayMs.toInt())
                                encoder.setRepeat(0) // loop forever

                                for (uri in selectedImages) {
                                    context.contentResolver.openInputStream(uri)?.use { stream ->
                                        val rawBitmap = BitmapFactory.decodeStream(stream)
                                        if (rawBitmap != null) {
                                            // scale down to 400x400 for speed and memory bounds
                                            val scaled = Bitmap.createScaledBitmap(rawBitmap, 400, 400, true)
                                            encoder.addFrame(scaled)
                                        }
                                    }
                                }
                                encoder.finish()
                                bos.toByteArray()
                            } catch (e: Exception) {
                                null
                            }
                        }

                        if (resultBytes != null && resultBytes.isNotEmpty()) {
                            generatedGifBytes = resultBytes
                            val uri = MediaSaver.saveGifToGallery(context, resultBytes, "FestivalStudio_Anim")
                            savedUri = uri
                            progressText = "✓ Animated GIF created & saved to Pictures!"
                        } else {
                            progressText = "Failed to generate GIF. Please try smaller photos."
                        }
                        isProcessing = false
                    }
                },
                enabled = selectedImages.size >= 2 && !isProcessing,
                modifier = Modifier.fillMaxWidth()
            ) {
                Text(if (isProcessing) "Generating GIF..." else "⚡ Generate Animated GIF")
            }

            if (isProcessing) {
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
                        MediaSaver.shareMedia(context, savedUri!!, "image/gif", "Sharing festive GIF created with Festival Studio")
                    },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(containerColor = MaterialTheme.colorScheme.secondary)
                ) {
                    Text("📤 Share GIF via WhatsApp / Social Apps")
                }
            }
        }
    }
}
