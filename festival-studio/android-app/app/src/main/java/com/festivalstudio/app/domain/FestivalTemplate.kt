package com.festivalstudio.app.domain

data class FestivalTemplate(
    val id: String,
    val title: String,
    val category: String,
    val greeting: String,
    val defaultSubText: String,
    val gradientColors: List<Long>,
    val emojiBadge: String
)

object FestivalRepository {
    val templates = listOf(
        FestivalTemplate(
            id = "diwali-1",
            title = "Happy Diwali",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔"
        ),
        FestivalTemplate(
            id = "holi-1",
            title = "Happy Holi",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨"
        ),
        FestivalTemplate(
            id = "navratri-1",
            title = "Navratri Utsav",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨"
        ),
        FestivalTemplate(
            id = "eid-1",
            title = "Eid Mubarak",
            category = "Eid",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙"
        ),
        FestivalTemplate(
            id = "raksha-1",
            title = "Raksha Bandhan",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵"
        ),
        FestivalTemplate(
            id = "ganesh-1",
            title = "Ganesh Chaturthi",
            category = "Ganeshotsav",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️"
        ),
        FestivalTemplate(
            id = "newyear-1",
            title = "Happy New Year",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆"
        )
    )

    val categories = listOf("All", "Diwali", "Holi", "Navratri", "Eid", "Raksha Bandhan", "Ganeshotsav", "New Year")
}
