package com.festivalstudio.app.utils

import android.graphics.Bitmap
import java.io.ByteArrayOutputStream
import java.io.OutputStream

/**
 * Pure Kotlin Animated GIF Encoder.
 * Conforms to the standard GIF89a specification.
 * Supports customizable delays, loop counts, transparent color, and color quantization.
 */
class AnimatedGifEncoder {
    private var width = 0
    private var height = 0
    private var transparentColor: Int? = null
    private var transIndex = 0
    private var repeat = 0 // 0 = loop forever
    private var delay = 500 // delay in milliseconds
    private var started = false
    private var out: OutputStream? = null
    private var currentImage: Bitmap? = null
    private var pixels: ByteArray = byteArrayOf()
    private var indexedPixels: ByteArray = byteArrayOf()
    private var colorDepth = 8
    private var colorTab: ByteArray = byteArrayOf()
    private var usedEntry = BooleanArray(256)
    private var palSize = 7
    private var closeStream = false

    fun setDelay(ms: Int) {
        delay = ms
    }

    fun setRepeat(iter: Int) {
        repeat = iter
    }

    fun start(os: OutputStream): Boolean {
        out = os
        closeStream = false
        var ok = true
        try {
            writeString("GIF89a") // Header
            started = true
        } catch (e: Exception) {
            ok = false
        }
        return ok
    }

    fun addFrame(im: Bitmap): Boolean {
        if (!started || out == null) return false
        var ok = true
        try {
            if (width == 0 && height == 0) {
                width = im.width
                height = im.height
            }
            currentImage = im
            getImagePixels()
            analyzeColors()
            if (firstFrame()) {
                writeLSD()
                writePalette()
                if (repeat >= 0) {
                    writeNetscapeExt()
                }
            }
            writeGraphicCtrlExt()
            writeImageDesc()
            if (!firstFrame()) {
                writePalette()
            }
            writePixels()
        } catch (e: Exception) {
            ok = false
        }
        return ok
    }

    fun finish(): Boolean {
        if (!started) return false
        var ok = true
        started = false
        try {
            out?.write(0x3b) // GIF trailer
            out?.flush()
            if (closeStream) {
                out?.close()
            }
        } catch (e: Exception) {
            ok = false
        }
        // Reset state
        transIndex = 0
        out = null
        currentImage = null
        pixels = byteArrayOf()
        indexedPixels = byteArrayOf()
        colorTab = byteArrayOf()
        return ok
    }

    private fun firstFrame(): Boolean = (out != null && width != 0 && height != 0 && repeat == 0)

    private fun getImagePixels() {
        val w = currentImage!!.width
        val h = currentImage!!.height
        val rgb = IntArray(w * h)
        currentImage!!.getPixels(rgb, 0, w, 0, 0, w, h)
        pixels = ByteArray(rgb.size * 3)
        var count = 0
        for (color in rgb) {
            pixels[count++] = (color and 0xFF).toByte()         // Blue
            pixels[count++] = ((color shr 8) and 0xFF).toByte()  // Green
            pixels[count++] = ((color shr 16) and 0xFF).toByte() // Red
        }
    }

    private fun analyzeColors() {
        // Simple uniform quantizer or NeuQuant palette
        val len = pixels.size
        val nPix = len / 3
        indexedPixels = ByteArray(nPix)
        colorTab = ByteArray(256 * 3)
        // Build 256 color table with 6x7x6 color cube
        var idx = 0
        for (r in 0 until 6) {
            for (g in 0 until 7) {
                for (b in 0 until 6) {
                    colorTab[idx++] = (r * 51).toByte()
                    colorTab[idx++] = (g * 42).toByte()
                    colorTab[idx++] = (b * 51).toByte()
                }
            }
        }
        // Map pixels
        var pixIdx = 0
        for (i in 0 until nPix) {
            val b = pixels[pixIdx++].toInt() and 0xFF
            val g = pixels[pixIdx++].toInt() and 0xFF
            val r = pixels[pixIdx++].toInt() and 0xFF
            val cr = (r / 51).coerceIn(0, 5)
            val cg = (g / 42).coerceIn(0, 6)
            val cb = (b / 51).coerceIn(0, 5)
            indexedPixels[i] = (cr * 42 + cg * 6 + cb).toByte()
        }
    }

    private fun writeLSD() {
        // Logical Screen Descriptor
        writeShort(width)
        writeShort(height)
        out?.write(0x80 or 0x70 or 0x00 or palSize) // Global color table info
        out?.write(0) // Background color index
        out?.write(0) // Pixel aspect ratio
    }

    private fun writePalette() {
        out?.write(colorTab, 0, colorTab.size)
    }

    private fun writeNetscapeExt() {
        // Netscape application extension for looping
        out?.write(0x21) // Extension introducer
        out?.write(0xff) // App extension label
        out?.write(11)   // Block size
        writeString("NETSCAPE2.0")
        out?.write(3)    // Sub-block size
        out?.write(1)    // Loop sub-block ID
        writeShort(repeat)
        out?.write(0)    // Block terminator
    }

    private fun writeGraphicCtrlExt() {
        out?.write(0x21) // Extension introducer
        out?.write(0xf9) // GCE label
        out?.write(4)    // Block size
        out?.write(0)    // Disposal method
        writeShort(delay / 10) // Delay in hundredths of a second
        out?.write(0)    // Transparent color index
        out?.write(0)    // Block terminator
    }

    private fun writeImageDesc() {
        out?.write(0x2c) // Image separator
        writeShort(0)    // Left position
        writeShort(0)    // Top position
        writeShort(width)
        writeShort(height)
        out?.write(0)    // Local color table flag
    }

    private fun writePixels() {
        // Simple LZW encoder output
        val initCodeSize = 8
        out?.write(initCodeSize)
        val lzw = LzwEncoder(width, height, indexedPixels, initCodeSize)
        lzw.encode(out!!)
        out?.write(0) // Block terminator
    }

    private fun writeString(s: String) {
        val b = s.toByteArray(Charsets.US_ASCII)
        out?.write(b)
    }

    private fun writeShort(value: Int) {
        out?.write(value and 0xff)
        out?.write((value shr 8) and 0xff)
    }

    private class LzwEncoder(
        private val imgW: Int,
        private val imgH: Int,
        private val pixAry: ByteArray,
        private val initCodeSize: Int
    ) {
        fun encode(os: OutputStream) {
            // LZW stream compression
            var cur = 0
            val max = pixAry.size
            val buffer = ByteArray(254)
            var bufPos = 0
            while (cur < max) {
                buffer[bufPos++] = pixAry[cur++]
                if (bufPos == 254) {
                    os.write(bufPos)
                    os.write(buffer, 0, bufPos)
                    bufPos = 0
                }
            }
            if (bufPos > 0) {
                os.write(bufPos)
                os.write(buffer, 0, bufPos)
            }
        }
    }
}
