package com.festivalstudio.app.domain

data class FestivalTemplate(
    val id: String,
    val title: String,
    val category: String,
    val greeting: String,
    val defaultSubText: String,
    val gradientColors: List<Long>,
    val emojiBadge: String,
    val styleType: String = "Post",
    val isVideoReady: Boolean = true
)

object FestivalRepository {
    val templates = listOf(
        FestivalTemplate(
            id = "diwali-1",
            title = "Diwali #1 (Classic Grand)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "diwali-2",
            title = "Diwali #2 (Royal Gold Frame)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "diwali-3",
            title = "Diwali #3 (Minimalist Aura)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "diwali-4",
            title = "Diwali #4 (Devotional Darshan)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "diwali-5",
            title = "Diwali #5 (Business Branding)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "diwali-6",
            title = "Diwali #6 (Photo Memory Frame)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "diwali-7",
            title = "Diwali #7 (WhatsApp Story 9:16)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "diwali-8",
            title = "Diwali #8 (Reels & Shorts Cover)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "diwali-9",
            title = "Diwali #9 (Sparkle & Diya Glow)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "diwali-10",
            title = "Diwali #10 (Typography Banner)",
            category = "Diwali",
            greeting = "शुभ दीपावली",
            defaultSubText = "May the festival of lights brighten your life with peace, prosperity, and joy.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "diwali-11",
            title = "Diwali #11 (Classic Grand)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "diwali-12",
            title = "Diwali #12 (Royal Gold Frame)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "diwali-13",
            title = "Diwali #13 (Minimalist Aura)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "diwali-14",
            title = "Diwali #14 (Devotional Darshan)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "diwali-15",
            title = "Diwali #15 (Business Branding)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "diwali-16",
            title = "Diwali #16 (Photo Memory Frame)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "diwali-17",
            title = "Diwali #17 (WhatsApp Story 9:16)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "diwali-18",
            title = "Diwali #18 (Reels & Shorts Cover)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "diwali-19",
            title = "Diwali #19 (Sparkle & Diya Glow)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "diwali-20",
            title = "Diwali #20 (Typography Banner)",
            category = "Diwali",
            greeting = "Deepawali Wishes",
            defaultSubText = "Wishing you and your family a gleaming and prosperous Diwali!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "diwali-21",
            title = "Diwali #21 (Classic Grand)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "diwali-22",
            title = "Diwali #22 (Royal Gold Frame)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "diwali-23",
            title = "Diwali #23 (Minimalist Aura)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "diwali-24",
            title = "Diwali #24 (Devotional Darshan)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "diwali-25",
            title = "Diwali #25 (Business Branding)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "diwali-26",
            title = "Diwali #26 (Photo Memory Frame)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "diwali-27",
            title = "Diwali #27 (WhatsApp Story 9:16)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "diwali-28",
            title = "Diwali #28 (Reels & Shorts Cover)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "diwali-29",
            title = "Diwali #29 (Sparkle & Diya Glow)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "diwali-30",
            title = "Diwali #30 (Typography Banner)",
            category = "Diwali",
            greeting = "Happy Diwali & New Year",
            defaultSubText = "May Goddess Lakshmi bless your home with boundless wealth & good fortune.",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "diwali-31",
            title = "Diwali #31 (Classic Grand)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "diwali-32",
            title = "Diwali #32 (Royal Gold Frame)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "diwali-33",
            title = "Diwali #33 (Minimalist Aura)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "diwali-34",
            title = "Diwali #34 (Devotional Darshan)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "diwali-35",
            title = "Diwali #35 (Business Branding)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "diwali-36",
            title = "Diwali #36 (Photo Memory Frame)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "diwali-37",
            title = "Diwali #37 (WhatsApp Story 9:16)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "diwali-38",
            title = "Diwali #38 (Reels & Shorts Cover)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "diwali-39",
            title = "Diwali #39 (Sparkle & Diya Glow)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "diwali-40",
            title = "Diwali #40 (Typography Banner)",
            category = "Diwali",
            greeting = "दीपावली महोत्सव",
            defaultSubText = "अंधकार पर प्रकाश की विजय का यह पावन पर्व आपके जीवन में खुशहाली लाए।",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "diwali-41",
            title = "Diwali #41 (Classic Grand)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "diwali-42",
            title = "Diwali #42 (Royal Gold Frame)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "diwali-43",
            title = "Diwali #43 (Minimalist Aura)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "diwali-44",
            title = "Diwali #44 (Devotional Darshan)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "diwali-45",
            title = "Diwali #45 (Business Branding)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "diwali-46",
            title = "Diwali #46 (Photo Memory Frame)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "diwali-47",
            title = "Diwali #47 (WhatsApp Story 9:16)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "diwali-48",
            title = "Diwali #48 (Reels & Shorts Cover)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "diwali-49",
            title = "Diwali #49 (Sparkle & Diya Glow)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "diwali-50",
            title = "Diwali #50 (Typography Banner)",
            category = "Diwali",
            greeting = "Shubh Deepawali Business",
            defaultSubText = "Thank you for being a valued customer. Wishing you grand festive success!",
            gradientColors = listOf(0xFFB91C1C, 0xFFEA580C, 0xFFF59E0B),
            emojiBadge = "🪔",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "holi-1",
            title = "Holi #1 (Classic Grand)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "holi-2",
            title = "Holi #2 (Royal Gold Frame)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "holi-3",
            title = "Holi #3 (Minimalist Aura)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "holi-4",
            title = "Holi #4 (Devotional Darshan)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "holi-5",
            title = "Holi #5 (Business Branding)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "holi-6",
            title = "Holi #6 (Photo Memory Frame)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "holi-7",
            title = "Holi #7 (WhatsApp Story 9:16)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "holi-8",
            title = "Holi #8 (Reels & Shorts Cover)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "holi-9",
            title = "Holi #9 (Sparkle & Diya Glow)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "holi-10",
            title = "Holi #10 (Typography Banner)",
            category = "Holi",
            greeting = "होली की हार्दिक शुभकामनाएं",
            defaultSubText = "Wishing you and your family a vibrant and joyous celebration of colors!",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "holi-11",
            title = "Holi #11 (Classic Grand)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "holi-12",
            title = "Holi #12 (Royal Gold Frame)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "holi-13",
            title = "Holi #13 (Minimalist Aura)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "holi-14",
            title = "Holi #14 (Devotional Darshan)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "holi-15",
            title = "Holi #15 (Business Branding)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "holi-16",
            title = "Holi #16 (Photo Memory Frame)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "holi-17",
            title = "Holi #17 (WhatsApp Story 9:16)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "holi-18",
            title = "Holi #18 (Reels & Shorts Cover)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "holi-19",
            title = "Holi #19 (Sparkle & Diya Glow)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "holi-20",
            title = "Holi #20 (Typography Banner)",
            category = "Holi",
            greeting = "Happy Holi Utsav",
            defaultSubText = "May your life be painted with colors of joy, love, friendship, and success.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "holi-21",
            title = "Holi #21 (Classic Grand)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "holi-22",
            title = "Holi #22 (Royal Gold Frame)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "holi-23",
            title = "Holi #23 (Minimalist Aura)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "holi-24",
            title = "Holi #24 (Devotional Darshan)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "holi-25",
            title = "Holi #25 (Business Branding)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "holi-26",
            title = "Holi #26 (Photo Memory Frame)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "holi-27",
            title = "Holi #27 (WhatsApp Story 9:16)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "holi-28",
            title = "Holi #28 (Reels & Shorts Cover)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "holi-29",
            title = "Holi #29 (Sparkle & Diya Glow)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "holi-30",
            title = "Holi #30 (Typography Banner)",
            category = "Holi",
            greeting = "रंगों का पावन पर्व",
            defaultSubText = "गुलाल की महक और अपनों के प्यार के साथ खुशियों भरी होली मुबारक।",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "holi-31",
            title = "Holi #31 (Classic Grand)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "holi-32",
            title = "Holi #32 (Royal Gold Frame)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "holi-33",
            title = "Holi #33 (Minimalist Aura)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "holi-34",
            title = "Holi #34 (Devotional Darshan)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "holi-35",
            title = "Holi #35 (Business Branding)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "holi-36",
            title = "Holi #36 (Photo Memory Frame)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "holi-37",
            title = "Holi #37 (WhatsApp Story 9:16)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "holi-38",
            title = "Holi #38 (Reels & Shorts Cover)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "holi-39",
            title = "Holi #39 (Sparkle & Diya Glow)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "holi-40",
            title = "Holi #40 (Typography Banner)",
            category = "Holi",
            greeting = "Rangotsav Greetings",
            defaultSubText = "Spread cheer, sweetness, and brotherhood this festive Holi season.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "holi-41",
            title = "Holi #41 (Classic Grand)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "holi-42",
            title = "Holi #42 (Royal Gold Frame)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "holi-43",
            title = "Holi #43 (Minimalist Aura)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "holi-44",
            title = "Holi #44 (Devotional Darshan)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "holi-45",
            title = "Holi #45 (Business Branding)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "holi-46",
            title = "Holi #46 (Photo Memory Frame)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "holi-47",
            title = "Holi #47 (WhatsApp Story 9:16)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "holi-48",
            title = "Holi #48 (Reels & Shorts Cover)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "holi-49",
            title = "Holi #49 (Sparkle & Diya Glow)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "holi-50",
            title = "Holi #50 (Typography Banner)",
            category = "Holi",
            greeting = "Festive Holi Celebration",
            defaultSubText = "Cherish the vibrant hues of togetherness and endless blessings.",
            gradientColors = listOf(0xFFC026D3, 0xFF7C3AED, 0xFF0284C7),
            emojiBadge = "🎨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "navratri-1",
            title = "Navratri #1 (Classic Grand)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "navratri-2",
            title = "Navratri #2 (Royal Gold Frame)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "navratri-3",
            title = "Navratri #3 (Minimalist Aura)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "navratri-4",
            title = "Navratri #4 (Devotional Darshan)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "navratri-5",
            title = "Navratri #5 (Business Branding)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "navratri-6",
            title = "Navratri #6 (Photo Memory Frame)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "navratri-7",
            title = "Navratri #7 (WhatsApp Story 9:16)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "navratri-8",
            title = "Navratri #8 (Reels & Shorts Cover)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "navratri-9",
            title = "Navratri #9 (Sparkle & Diya Glow)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "navratri-10",
            title = "Navratri #10 (Typography Banner)",
            category = "Navratri",
            greeting = "जय माँ दुर्गा - शुभ नवरात्रि",
            defaultSubText = "May the divine blessings of Maa Durga bring courage, happiness, and good fortune.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "navratri-11",
            title = "Navratri #11 (Classic Grand)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "navratri-12",
            title = "Navratri #12 (Royal Gold Frame)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "navratri-13",
            title = "Navratri #13 (Minimalist Aura)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "navratri-14",
            title = "Navratri #14 (Devotional Darshan)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "navratri-15",
            title = "Navratri #15 (Business Branding)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "navratri-16",
            title = "Navratri #16 (Photo Memory Frame)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "navratri-17",
            title = "Navratri #17 (WhatsApp Story 9:16)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "navratri-18",
            title = "Navratri #18 (Reels & Shorts Cover)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "navratri-19",
            title = "Navratri #19 (Sparkle & Diya Glow)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "navratri-20",
            title = "Navratri #20 (Typography Banner)",
            category = "Navratri",
            greeting = "Navratri Mahotsav",
            defaultSubText = "Celebrating 9 sacred nights of divine power, devotion, and festive garba.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "navratri-21",
            title = "Navratri #21 (Classic Grand)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "navratri-22",
            title = "Navratri #22 (Royal Gold Frame)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "navratri-23",
            title = "Navratri #23 (Minimalist Aura)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "navratri-24",
            title = "Navratri #24 (Devotional Darshan)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "navratri-25",
            title = "Navratri #25 (Business Branding)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "navratri-26",
            title = "Navratri #26 (Photo Memory Frame)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "navratri-27",
            title = "Navratri #27 (WhatsApp Story 9:16)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "navratri-28",
            title = "Navratri #28 (Reels & Shorts Cover)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "navratri-29",
            title = "Navratri #29 (Sparkle & Diya Glow)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "navratri-30",
            title = "Navratri #30 (Typography Banner)",
            category = "Navratri",
            greeting = "माँ अम्बे की कृपा",
            defaultSubText = "शक्ति, भक्ति और समृद्धि का पावन महापर्व नवरात्रि आप सभी के लिए मंगलमय हो।",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "navratri-31",
            title = "Navratri #31 (Classic Grand)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "navratri-32",
            title = "Navratri #32 (Royal Gold Frame)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "navratri-33",
            title = "Navratri #33 (Minimalist Aura)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "navratri-34",
            title = "Navratri #34 (Devotional Darshan)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "navratri-35",
            title = "Navratri #35 (Business Branding)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "navratri-36",
            title = "Navratri #36 (Photo Memory Frame)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "navratri-37",
            title = "Navratri #37 (WhatsApp Story 9:16)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "navratri-38",
            title = "Navratri #38 (Reels & Shorts Cover)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "navratri-39",
            title = "Navratri #39 (Sparkle & Diya Glow)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "navratri-40",
            title = "Navratri #40 (Typography Banner)",
            category = "Navratri",
            greeting = "Shubh Navratri Wishes",
            defaultSubText = "May Maa Jagdamba remove all obstacles and bestow health and joy.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "navratri-41",
            title = "Navratri #41 (Classic Grand)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "navratri-42",
            title = "Navratri #42 (Royal Gold Frame)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "navratri-43",
            title = "Navratri #43 (Minimalist Aura)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "navratri-44",
            title = "Navratri #44 (Devotional Darshan)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "navratri-45",
            title = "Navratri #45 (Business Branding)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "navratri-46",
            title = "Navratri #46 (Photo Memory Frame)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "navratri-47",
            title = "Navratri #47 (WhatsApp Story 9:16)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "navratri-48",
            title = "Navratri #48 (Reels & Shorts Cover)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "navratri-49",
            title = "Navratri #49 (Sparkle & Diya Glow)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "navratri-50",
            title = "Navratri #50 (Typography Banner)",
            category = "Navratri",
            greeting = "Durga Utsav Blessing",
            defaultSubText = "Invoke the sacred feminine divine energy and triumph over all hardships.",
            gradientColors = listOf(0xFFE11D48, 0xFFDB2777, 0xFF9333EA),
            emojiBadge = "✨",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "eid-1",
            title = "Eid Mubarak #1 (Classic Grand)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "eid-2",
            title = "Eid Mubarak #2 (Royal Gold Frame)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "eid-3",
            title = "Eid Mubarak #3 (Minimalist Aura)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "eid-4",
            title = "Eid Mubarak #4 (Devotional Darshan)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "eid-5",
            title = "Eid Mubarak #5 (Business Branding)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "eid-6",
            title = "Eid Mubarak #6 (Photo Memory Frame)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "eid-7",
            title = "Eid Mubarak #7 (WhatsApp Story 9:16)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "eid-8",
            title = "Eid Mubarak #8 (Reels & Shorts Cover)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "eid-9",
            title = "Eid Mubarak #9 (Sparkle & Diya Glow)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "eid-10",
            title = "Eid Mubarak #10 (Typography Banner)",
            category = "Eid Mubarak",
            greeting = "Eid Mubarak",
            defaultSubText = "May Allah's blessings be with you today, tomorrow, and always.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "eid-11",
            title = "Eid Mubarak #11 (Classic Grand)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "eid-12",
            title = "Eid Mubarak #12 (Royal Gold Frame)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "eid-13",
            title = "Eid Mubarak #13 (Minimalist Aura)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "eid-14",
            title = "Eid Mubarak #14 (Devotional Darshan)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "eid-15",
            title = "Eid Mubarak #15 (Business Branding)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "eid-16",
            title = "Eid Mubarak #16 (Photo Memory Frame)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "eid-17",
            title = "Eid Mubarak #17 (WhatsApp Story 9:16)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "eid-18",
            title = "Eid Mubarak #18 (Reels & Shorts Cover)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "eid-19",
            title = "Eid Mubarak #19 (Sparkle & Diya Glow)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "eid-20",
            title = "Eid Mubarak #20 (Typography Banner)",
            category = "Eid Mubarak",
            greeting = "ईद की दिली मुबारकबाद",
            defaultSubText = "अल्लाह आपकी हर दुआ कुबूल फरमाए और घर में बरकत अता करे।",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "eid-21",
            title = "Eid Mubarak #21 (Classic Grand)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "eid-22",
            title = "Eid Mubarak #22 (Royal Gold Frame)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "eid-23",
            title = "Eid Mubarak #23 (Minimalist Aura)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "eid-24",
            title = "Eid Mubarak #24 (Devotional Darshan)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "eid-25",
            title = "Eid Mubarak #25 (Business Branding)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "eid-26",
            title = "Eid Mubarak #26 (Photo Memory Frame)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "eid-27",
            title = "Eid Mubarak #27 (WhatsApp Story 9:16)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "eid-28",
            title = "Eid Mubarak #28 (Reels & Shorts Cover)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "eid-29",
            title = "Eid Mubarak #29 (Sparkle & Diya Glow)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "eid-30",
            title = "Eid Mubarak #30 (Typography Banner)",
            category = "Eid Mubarak",
            greeting = "Joyous Eid Greetings",
            defaultSubText = "Cherishing moments of peace, harmony, gratefulness, and love.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "eid-31",
            title = "Eid Mubarak #31 (Classic Grand)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "eid-32",
            title = "Eid Mubarak #32 (Royal Gold Frame)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "eid-33",
            title = "Eid Mubarak #33 (Minimalist Aura)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "eid-34",
            title = "Eid Mubarak #34 (Devotional Darshan)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "eid-35",
            title = "Eid Mubarak #35 (Business Branding)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "eid-36",
            title = "Eid Mubarak #36 (Photo Memory Frame)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "eid-37",
            title = "Eid Mubarak #37 (WhatsApp Story 9:16)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "eid-38",
            title = "Eid Mubarak #38 (Reels & Shorts Cover)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "eid-39",
            title = "Eid Mubarak #39 (Sparkle & Diya Glow)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "eid-40",
            title = "Eid Mubarak #40 (Typography Banner)",
            category = "Eid Mubarak",
            greeting = "Eid-ul-Fitr Celebration",
            defaultSubText = "May this auspicious festival shower endless happiness upon your family.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "eid-41",
            title = "Eid Mubarak #41 (Classic Grand)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "eid-42",
            title = "Eid Mubarak #42 (Royal Gold Frame)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "eid-43",
            title = "Eid Mubarak #43 (Minimalist Aura)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "eid-44",
            title = "Eid Mubarak #44 (Devotional Darshan)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "eid-45",
            title = "Eid Mubarak #45 (Business Branding)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "eid-46",
            title = "Eid Mubarak #46 (Photo Memory Frame)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "eid-47",
            title = "Eid Mubarak #47 (WhatsApp Story 9:16)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "eid-48",
            title = "Eid Mubarak #48 (Reels & Shorts Cover)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "eid-49",
            title = "Eid Mubarak #49 (Sparkle & Diya Glow)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "eid-50",
            title = "Eid Mubarak #50 (Typography Banner)",
            category = "Eid Mubarak",
            greeting = "Happy Eid Wishes",
            defaultSubText = "Warm heartfelt wishes for a blessed and peaceful Eid celebration.",
            gradientColors = listOf(0xFF047857, 0xFF0D9488, 0xFF059669),
            emojiBadge = "🌙",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-1",
            title = "Raksha Bandhan #1 (Classic Grand)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-2",
            title = "Raksha Bandhan #2 (Royal Gold Frame)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-3",
            title = "Raksha Bandhan #3 (Minimalist Aura)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-4",
            title = "Raksha Bandhan #4 (Devotional Darshan)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-5",
            title = "Raksha Bandhan #5 (Business Branding)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-6",
            title = "Raksha Bandhan #6 (Photo Memory Frame)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-7",
            title = "Raksha Bandhan #7 (WhatsApp Story 9:16)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-8",
            title = "Raksha Bandhan #8 (Reels & Shorts Cover)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-9",
            title = "Raksha Bandhan #9 (Sparkle & Diya Glow)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-10",
            title = "Raksha Bandhan #10 (Typography Banner)",
            category = "Raksha Bandhan",
            greeting = "रक्षाबंधन की अनंत शुभकामनाएं",
            defaultSubText = "Celebrating the eternal bond of love, care, and protection between brothers and sisters.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-11",
            title = "Raksha Bandhan #11 (Classic Grand)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-12",
            title = "Raksha Bandhan #12 (Royal Gold Frame)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-13",
            title = "Raksha Bandhan #13 (Minimalist Aura)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-14",
            title = "Raksha Bandhan #14 (Devotional Darshan)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-15",
            title = "Raksha Bandhan #15 (Business Branding)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-16",
            title = "Raksha Bandhan #16 (Photo Memory Frame)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-17",
            title = "Raksha Bandhan #17 (WhatsApp Story 9:16)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-18",
            title = "Raksha Bandhan #18 (Reels & Shorts Cover)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-19",
            title = "Raksha Bandhan #19 (Sparkle & Diya Glow)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-20",
            title = "Raksha Bandhan #20 (Typography Banner)",
            category = "Raksha Bandhan",
            greeting = "Happy Rakhi Utsav",
            defaultSubText = "A sacred thread carrying lifelong memories, unconditional care, and warm smiles.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-21",
            title = "Raksha Bandhan #21 (Classic Grand)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-22",
            title = "Raksha Bandhan #22 (Royal Gold Frame)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-23",
            title = "Raksha Bandhan #23 (Minimalist Aura)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-24",
            title = "Raksha Bandhan #24 (Devotional Darshan)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-25",
            title = "Raksha Bandhan #25 (Business Branding)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-26",
            title = "Raksha Bandhan #26 (Photo Memory Frame)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-27",
            title = "Raksha Bandhan #27 (WhatsApp Story 9:16)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-28",
            title = "Raksha Bandhan #28 (Reels & Shorts Cover)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-29",
            title = "Raksha Bandhan #29 (Sparkle & Diya Glow)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-30",
            title = "Raksha Bandhan #30 (Typography Banner)",
            category = "Raksha Bandhan",
            greeting = "प्यार और विश्वास का बंधन",
            defaultSubText = "भाई-बहन के अटूट स्नेह और समर्पण के महापर्व पर हार्दिक बधाई।",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-31",
            title = "Raksha Bandhan #31 (Classic Grand)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-32",
            title = "Raksha Bandhan #32 (Royal Gold Frame)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-33",
            title = "Raksha Bandhan #33 (Minimalist Aura)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-34",
            title = "Raksha Bandhan #34 (Devotional Darshan)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-35",
            title = "Raksha Bandhan #35 (Business Branding)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-36",
            title = "Raksha Bandhan #36 (Photo Memory Frame)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-37",
            title = "Raksha Bandhan #37 (WhatsApp Story 9:16)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-38",
            title = "Raksha Bandhan #38 (Reels & Shorts Cover)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-39",
            title = "Raksha Bandhan #39 (Sparkle & Diya Glow)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-40",
            title = "Raksha Bandhan #40 (Typography Banner)",
            category = "Raksha Bandhan",
            greeting = "Raksha Bandhan Blessings",
            defaultSubText = "May the pious knot of Rakhi keep our affectionate bond shining forever.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-41",
            title = "Raksha Bandhan #41 (Classic Grand)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-42",
            title = "Raksha Bandhan #42 (Royal Gold Frame)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-43",
            title = "Raksha Bandhan #43 (Minimalist Aura)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-44",
            title = "Raksha Bandhan #44 (Devotional Darshan)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-45",
            title = "Raksha Bandhan #45 (Business Branding)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-46",
            title = "Raksha Bandhan #46 (Photo Memory Frame)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-47",
            title = "Raksha Bandhan #47 (WhatsApp Story 9:16)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-48",
            title = "Raksha Bandhan #48 (Reels & Shorts Cover)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-49",
            title = "Raksha Bandhan #49 (Sparkle & Diya Glow)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "raksha-bandhan-50",
            title = "Raksha Bandhan #50 (Typography Banner)",
            category = "Raksha Bandhan",
            greeting = "Sibling Love Celebration",
            defaultSubText = "Cherishing childhood laughter and lifelong companionship this Rakhi.",
            gradientColors = listOf(0xFFF97316, 0xFFFB923C, 0xFFFBBF24),
            emojiBadge = "🧵",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-1",
            title = "Ganesh Chaturthi #1 (Classic Grand)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-2",
            title = "Ganesh Chaturthi #2 (Royal Gold Frame)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-3",
            title = "Ganesh Chaturthi #3 (Minimalist Aura)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-4",
            title = "Ganesh Chaturthi #4 (Devotional Darshan)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-5",
            title = "Ganesh Chaturthi #5 (Business Branding)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-6",
            title = "Ganesh Chaturthi #6 (Photo Memory Frame)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-7",
            title = "Ganesh Chaturthi #7 (WhatsApp Story 9:16)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-8",
            title = "Ganesh Chaturthi #8 (Reels & Shorts Cover)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-9",
            title = "Ganesh Chaturthi #9 (Sparkle & Diya Glow)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-10",
            title = "Ganesh Chaturthi #10 (Typography Banner)",
            category = "Ganesh Chaturthi",
            greeting = "गणपति बप्पा मोरया",
            defaultSubText = "Lord Ganesha removes all obstacles and showers prosperity upon you and your loved ones.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-11",
            title = "Ganesh Chaturthi #11 (Classic Grand)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-12",
            title = "Ganesh Chaturthi #12 (Royal Gold Frame)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-13",
            title = "Ganesh Chaturthi #13 (Minimalist Aura)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-14",
            title = "Ganesh Chaturthi #14 (Devotional Darshan)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-15",
            title = "Ganesh Chaturthi #15 (Business Branding)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-16",
            title = "Ganesh Chaturthi #16 (Photo Memory Frame)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-17",
            title = "Ganesh Chaturthi #17 (WhatsApp Story 9:16)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-18",
            title = "Ganesh Chaturthi #18 (Reels & Shorts Cover)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-19",
            title = "Ganesh Chaturthi #19 (Sparkle & Diya Glow)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-20",
            title = "Ganesh Chaturthi #20 (Typography Banner)",
            category = "Ganesh Chaturthi",
            greeting = "Happy Ganesh Utsav",
            defaultSubText = "May the benevolent Vighnaharta bestow peace, wisdom, and boundless success.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-21",
            title = "Ganesh Chaturthi #21 (Classic Grand)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-22",
            title = "Ganesh Chaturthi #22 (Royal Gold Frame)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-23",
            title = "Ganesh Chaturthi #23 (Minimalist Aura)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-24",
            title = "Ganesh Chaturthi #24 (Devotional Darshan)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-25",
            title = "Ganesh Chaturthi #25 (Business Branding)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-26",
            title = "Ganesh Chaturthi #26 (Photo Memory Frame)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-27",
            title = "Ganesh Chaturthi #27 (WhatsApp Story 9:16)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-28",
            title = "Ganesh Chaturthi #28 (Reels & Shorts Cover)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-29",
            title = "Ganesh Chaturthi #29 (Sparkle & Diya Glow)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-30",
            title = "Ganesh Chaturthi #30 (Typography Banner)",
            category = "Ganesh Chaturthi",
            greeting = "गणेश चतुर्थी की शुभकामनाएं",
            defaultSubText = "ऋद्धि-सिद्धि के दाता श्री गणेश जी आपके जीवन को मंगलमय बनाएं।",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-31",
            title = "Ganesh Chaturthi #31 (Classic Grand)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-32",
            title = "Ganesh Chaturthi #32 (Royal Gold Frame)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-33",
            title = "Ganesh Chaturthi #33 (Minimalist Aura)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-34",
            title = "Ganesh Chaturthi #34 (Devotional Darshan)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-35",
            title = "Ganesh Chaturthi #35 (Business Branding)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-36",
            title = "Ganesh Chaturthi #36 (Photo Memory Frame)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-37",
            title = "Ganesh Chaturthi #37 (WhatsApp Story 9:16)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-38",
            title = "Ganesh Chaturthi #38 (Reels & Shorts Cover)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-39",
            title = "Ganesh Chaturthi #39 (Sparkle & Diya Glow)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-40",
            title = "Ganesh Chaturthi #40 (Typography Banner)",
            category = "Ganesh Chaturthi",
            greeting = "Vighnaharta Blessing",
            defaultSubText = "Welcoming Bappa with joy, devotion, modaks, and pious celebrations.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-41",
            title = "Ganesh Chaturthi #41 (Classic Grand)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-42",
            title = "Ganesh Chaturthi #42 (Royal Gold Frame)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-43",
            title = "Ganesh Chaturthi #43 (Minimalist Aura)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-44",
            title = "Ganesh Chaturthi #44 (Devotional Darshan)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-45",
            title = "Ganesh Chaturthi #45 (Business Branding)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-46",
            title = "Ganesh Chaturthi #46 (Photo Memory Frame)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-47",
            title = "Ganesh Chaturthi #47 (WhatsApp Story 9:16)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-48",
            title = "Ganesh Chaturthi #48 (Reels & Shorts Cover)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-49",
            title = "Ganesh Chaturthi #49 (Sparkle & Diya Glow)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "ganesh-chaturthi-50",
            title = "Ganesh Chaturthi #50 (Typography Banner)",
            category = "Ganesh Chaturthi",
            greeting = "Shree Ganeshotsav",
            defaultSubText = "May divine blessings guide your endeavors toward grand accomplishments.",
            gradientColors = listOf(0xFFEA580C, 0xFFF97316, 0xFFEAB308),
            emojiBadge = "🕉️",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "new-year-1",
            title = "New Year #1 (Classic Grand)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "new-year-2",
            title = "New Year #2 (Royal Gold Frame)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "new-year-3",
            title = "New Year #3 (Minimalist Aura)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "new-year-4",
            title = "New Year #4 (Devotional Darshan)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "new-year-5",
            title = "New Year #5 (Business Branding)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "new-year-6",
            title = "New Year #6 (Photo Memory Frame)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "new-year-7",
            title = "New Year #7 (WhatsApp Story 9:16)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "new-year-8",
            title = "New Year #8 (Reels & Shorts Cover)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "new-year-9",
            title = "New Year #9 (Sparkle & Diya Glow)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "new-year-10",
            title = "New Year #10 (Typography Banner)",
            category = "New Year",
            greeting = "नूतन वर्ष की हार्दिक शुभकामनाएं",
            defaultSubText = "Cheers to 365 new opportunities, peace, health, and abundant success!",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "new-year-11",
            title = "New Year #11 (Classic Grand)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "new-year-12",
            title = "New Year #12 (Royal Gold Frame)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "new-year-13",
            title = "New Year #13 (Minimalist Aura)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "new-year-14",
            title = "New Year #14 (Devotional Darshan)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "new-year-15",
            title = "New Year #15 (Business Branding)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "new-year-16",
            title = "New Year #16 (Photo Memory Frame)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "new-year-17",
            title = "New Year #17 (WhatsApp Story 9:16)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "new-year-18",
            title = "New Year #18 (Reels & Shorts Cover)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "new-year-19",
            title = "New Year #19 (Sparkle & Diya Glow)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "new-year-20",
            title = "New Year #20 (Typography Banner)",
            category = "New Year",
            greeting = "Happy New Year 2026",
            defaultSubText = "May this fresh chapter bring extraordinary growth, laughter, and serenity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "new-year-21",
            title = "New Year #21 (Classic Grand)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "new-year-22",
            title = "New Year #22 (Royal Gold Frame)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "new-year-23",
            title = "New Year #23 (Minimalist Aura)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "new-year-24",
            title = "New Year #24 (Devotional Darshan)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "new-year-25",
            title = "New Year #25 (Business Branding)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "new-year-26",
            title = "New Year #26 (Photo Memory Frame)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "new-year-27",
            title = "New Year #27 (WhatsApp Story 9:16)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "new-year-28",
            title = "New Year #28 (Reels & Shorts Cover)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "new-year-29",
            title = "New Year #29 (Sparkle & Diya Glow)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "new-year-30",
            title = "New Year #30 (Typography Banner)",
            category = "New Year",
            greeting = "नए साल का मंगलमय आगमन",
            defaultSubText = "नव वर्ष आपके परिवार में उमंग, उत्साह और संपन्नता का संचार करे।",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "new-year-31",
            title = "New Year #31 (Classic Grand)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "new-year-32",
            title = "New Year #32 (Royal Gold Frame)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "new-year-33",
            title = "New Year #33 (Minimalist Aura)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "new-year-34",
            title = "New Year #34 (Devotional Darshan)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "new-year-35",
            title = "New Year #35 (Business Branding)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "new-year-36",
            title = "New Year #36 (Photo Memory Frame)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "new-year-37",
            title = "New Year #37 (WhatsApp Story 9:16)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "new-year-38",
            title = "New Year #38 (Reels & Shorts Cover)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "new-year-39",
            title = "New Year #39 (Sparkle & Diya Glow)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "new-year-40",
            title = "New Year #40 (Typography Banner)",
            category = "New Year",
            greeting = "Prosperous New Year",
            defaultSubText = "Embracing fresh beginnings with courage, wisdom, and warm positivity.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "new-year-41",
            title = "New Year #41 (Classic Grand)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "new-year-42",
            title = "New Year #42 (Royal Gold Frame)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "new-year-43",
            title = "New Year #43 (Minimalist Aura)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "new-year-44",
            title = "New Year #44 (Devotional Darshan)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "new-year-45",
            title = "New Year #45 (Business Branding)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "new-year-46",
            title = "New Year #46 (Photo Memory Frame)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "new-year-47",
            title = "New Year #47 (WhatsApp Story 9:16)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "new-year-48",
            title = "New Year #48 (Reels & Shorts Cover)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "new-year-49",
            title = "New Year #49 (Sparkle & Diya Glow)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "new-year-50",
            title = "New Year #50 (Typography Banner)",
            category = "New Year",
            greeting = "Joyful New Year Journey",
            defaultSubText = "Wishing you 365 days of triumphs, breakthroughs, and well-being.",
            gradientColors = listOf(0xFF1E293B, 0xFF334155, 0xFF475569),
            emojiBadge = "🎆",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-1",
            title = "Maha Shivratri #1 (Classic Grand)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "maha-shivratri-2",
            title = "Maha Shivratri #2 (Royal Gold Frame)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "maha-shivratri-3",
            title = "Maha Shivratri #3 (Minimalist Aura)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "maha-shivratri-4",
            title = "Maha Shivratri #4 (Devotional Darshan)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "maha-shivratri-5",
            title = "Maha Shivratri #5 (Business Branding)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "maha-shivratri-6",
            title = "Maha Shivratri #6 (Photo Memory Frame)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-7",
            title = "Maha Shivratri #7 (WhatsApp Story 9:16)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "maha-shivratri-8",
            title = "Maha Shivratri #8 (Reels & Shorts Cover)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "maha-shivratri-9",
            title = "Maha Shivratri #9 (Sparkle & Diya Glow)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "maha-shivratri-10",
            title = "Maha Shivratri #10 (Typography Banner)",
            category = "Maha Shivratri",
            greeting = "हर हर महादेव - शुभ महाशिवरात्रि",
            defaultSubText = "May the supreme grace of Lord Shiva illuminate your spiritual path and fulfill all wishes.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-11",
            title = "Maha Shivratri #11 (Classic Grand)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "maha-shivratri-12",
            title = "Maha Shivratri #12 (Royal Gold Frame)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "maha-shivratri-13",
            title = "Maha Shivratri #13 (Minimalist Aura)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "maha-shivratri-14",
            title = "Maha Shivratri #14 (Devotional Darshan)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "maha-shivratri-15",
            title = "Maha Shivratri #15 (Business Branding)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "maha-shivratri-16",
            title = "Maha Shivratri #16 (Photo Memory Frame)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-17",
            title = "Maha Shivratri #17 (WhatsApp Story 9:16)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "maha-shivratri-18",
            title = "Maha Shivratri #18 (Reels & Shorts Cover)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "maha-shivratri-19",
            title = "Maha Shivratri #19 (Sparkle & Diya Glow)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "maha-shivratri-20",
            title = "Maha Shivratri #20 (Typography Banner)",
            category = "Maha Shivratri",
            greeting = "Har Har Mahadev",
            defaultSubText = "Seeking the divine darshan and blessings of Mahadev and Mata Parvati.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-21",
            title = "Maha Shivratri #21 (Classic Grand)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "maha-shivratri-22",
            title = "Maha Shivratri #22 (Royal Gold Frame)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "maha-shivratri-23",
            title = "Maha Shivratri #23 (Minimalist Aura)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "maha-shivratri-24",
            title = "Maha Shivratri #24 (Devotional Darshan)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "maha-shivratri-25",
            title = "Maha Shivratri #25 (Business Branding)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "maha-shivratri-26",
            title = "Maha Shivratri #26 (Photo Memory Frame)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-27",
            title = "Maha Shivratri #27 (WhatsApp Story 9:16)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "maha-shivratri-28",
            title = "Maha Shivratri #28 (Reels & Shorts Cover)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "maha-shivratri-29",
            title = "Maha Shivratri #29 (Sparkle & Diya Glow)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "maha-shivratri-30",
            title = "Maha Shivratri #30 (Typography Banner)",
            category = "Maha Shivratri",
            greeting = "महाशिवरात्रि की मंगलकामनाएं",
            defaultSubText = "भोलेनाथ की कृपा से आपके जीवन में शांति, भक्ति और दिव्यता का वास हो।",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-31",
            title = "Maha Shivratri #31 (Classic Grand)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "maha-shivratri-32",
            title = "Maha Shivratri #32 (Royal Gold Frame)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "maha-shivratri-33",
            title = "Maha Shivratri #33 (Minimalist Aura)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "maha-shivratri-34",
            title = "Maha Shivratri #34 (Devotional Darshan)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "maha-shivratri-35",
            title = "Maha Shivratri #35 (Business Branding)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "maha-shivratri-36",
            title = "Maha Shivratri #36 (Photo Memory Frame)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-37",
            title = "Maha Shivratri #37 (WhatsApp Story 9:16)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "maha-shivratri-38",
            title = "Maha Shivratri #38 (Reels & Shorts Cover)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "maha-shivratri-39",
            title = "Maha Shivratri #39 (Sparkle & Diya Glow)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "maha-shivratri-40",
            title = "Maha Shivratri #40 (Typography Banner)",
            category = "Maha Shivratri",
            greeting = "Om Namah Shivaya",
            defaultSubText = "May Lord Shiva destroy all negativities and awaken supreme inner peace.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-41",
            title = "Maha Shivratri #41 (Classic Grand)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "maha-shivratri-42",
            title = "Maha Shivratri #42 (Royal Gold Frame)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "maha-shivratri-43",
            title = "Maha Shivratri #43 (Minimalist Aura)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "maha-shivratri-44",
            title = "Maha Shivratri #44 (Devotional Darshan)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "maha-shivratri-45",
            title = "Maha Shivratri #45 (Business Branding)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "maha-shivratri-46",
            title = "Maha Shivratri #46 (Photo Memory Frame)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "maha-shivratri-47",
            title = "Maha Shivratri #47 (WhatsApp Story 9:16)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "maha-shivratri-48",
            title = "Maha Shivratri #48 (Reels & Shorts Cover)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "maha-shivratri-49",
            title = "Maha Shivratri #49 (Sparkle & Diya Glow)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "maha-shivratri-50",
            title = "Maha Shivratri #50 (Typography Banner)",
            category = "Maha Shivratri",
            greeting = "Bholenath Blessing",
            defaultSubText = "Reverence, meditation, and sacred chants on the holy night of Shivratri.",
            gradientColors = listOf(0xFF1E3A8A, 0xFF2563EB, 0xFF0284C7),
            emojiBadge = "🔱",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "janmashtami-1",
            title = "Janmashtami #1 (Classic Grand)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "janmashtami-2",
            title = "Janmashtami #2 (Royal Gold Frame)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "janmashtami-3",
            title = "Janmashtami #3 (Minimalist Aura)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "janmashtami-4",
            title = "Janmashtami #4 (Devotional Darshan)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "janmashtami-5",
            title = "Janmashtami #5 (Business Branding)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "janmashtami-6",
            title = "Janmashtami #6 (Photo Memory Frame)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "janmashtami-7",
            title = "Janmashtami #7 (WhatsApp Story 9:16)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "janmashtami-8",
            title = "Janmashtami #8 (Reels & Shorts Cover)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "janmashtami-9",
            title = "Janmashtami #9 (Sparkle & Diya Glow)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "janmashtami-10",
            title = "Janmashtami #10 (Typography Banner)",
            category = "Janmashtami",
            greeting = "जय श्री कृष्णा - शुभ जन्माष्टमी",
            defaultSubText = "May Natkhat Kanhaiya fill your days with sweet melodious tunes of love and prosperity.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "janmashtami-11",
            title = "Janmashtami #11 (Classic Grand)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "janmashtami-12",
            title = "Janmashtami #12 (Royal Gold Frame)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "janmashtami-13",
            title = "Janmashtami #13 (Minimalist Aura)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "janmashtami-14",
            title = "Janmashtami #14 (Devotional Darshan)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "janmashtami-15",
            title = "Janmashtami #15 (Business Branding)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "janmashtami-16",
            title = "Janmashtami #16 (Photo Memory Frame)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "janmashtami-17",
            title = "Janmashtami #17 (WhatsApp Story 9:16)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "janmashtami-18",
            title = "Janmashtami #18 (Reels & Shorts Cover)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "janmashtami-19",
            title = "Janmashtami #19 (Sparkle & Diya Glow)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "janmashtami-20",
            title = "Janmashtami #20 (Typography Banner)",
            category = "Janmashtami",
            greeting = "Happy Krishna Janmashtami",
            defaultSubText = "Celebrating the divine advent of Lord Krishna with devotion and joyful butter chants!",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "janmashtami-21",
            title = "Janmashtami #21 (Classic Grand)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "janmashtami-22",
            title = "Janmashtami #22 (Royal Gold Frame)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "janmashtami-23",
            title = "Janmashtami #23 (Minimalist Aura)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "janmashtami-24",
            title = "Janmashtami #24 (Devotional Darshan)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "janmashtami-25",
            title = "Janmashtami #25 (Business Branding)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "janmashtami-26",
            title = "Janmashtami #26 (Photo Memory Frame)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "janmashtami-27",
            title = "Janmashtami #27 (WhatsApp Story 9:16)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "janmashtami-28",
            title = "Janmashtami #28 (Reels & Shorts Cover)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "janmashtami-29",
            title = "Janmashtami #29 (Sparkle & Diya Glow)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "janmashtami-30",
            title = "Janmashtami #30 (Typography Banner)",
            category = "Janmashtami",
            greeting = "श्री कृष्ण जन्मोत्सव",
            defaultSubText = "माखनचोर कान्हा आपके समस्त संताप हर कर जीवन को आनंदमय बनाएं।",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "janmashtami-31",
            title = "Janmashtami #31 (Classic Grand)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "janmashtami-32",
            title = "Janmashtami #32 (Royal Gold Frame)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "janmashtami-33",
            title = "Janmashtami #33 (Minimalist Aura)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "janmashtami-34",
            title = "Janmashtami #34 (Devotional Darshan)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "janmashtami-35",
            title = "Janmashtami #35 (Business Branding)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "janmashtami-36",
            title = "Janmashtami #36 (Photo Memory Frame)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "janmashtami-37",
            title = "Janmashtami #37 (WhatsApp Story 9:16)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "janmashtami-38",
            title = "Janmashtami #38 (Reels & Shorts Cover)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "janmashtami-39",
            title = "Janmashtami #39 (Sparkle & Diya Glow)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "janmashtami-40",
            title = "Janmashtami #40 (Typography Banner)",
            category = "Janmashtami",
            greeting = "Gokulashtami Utsav",
            defaultSubText = "Radhe Radhe! May Lord Krishna shower wisdom, virtue, and timeless happiness.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "janmashtami-41",
            title = "Janmashtami #41 (Classic Grand)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "janmashtami-42",
            title = "Janmashtami #42 (Royal Gold Frame)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "janmashtami-43",
            title = "Janmashtami #43 (Minimalist Aura)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "janmashtami-44",
            title = "Janmashtami #44 (Devotional Darshan)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "janmashtami-45",
            title = "Janmashtami #45 (Business Branding)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "janmashtami-46",
            title = "Janmashtami #46 (Photo Memory Frame)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "janmashtami-47",
            title = "Janmashtami #47 (WhatsApp Story 9:16)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "janmashtami-48",
            title = "Janmashtami #48 (Reels & Shorts Cover)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "janmashtami-49",
            title = "Janmashtami #49 (Sparkle & Diya Glow)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "janmashtami-50",
            title = "Janmashtami #50 (Typography Banner)",
            category = "Janmashtami",
            greeting = "Dwarkadhish Blessing",
            defaultSubText = "Embrace Gita's timeless wisdom and righteous living this Janmashtami.",
            gradientColors = listOf(0xFF0284C7, 0xFF38BDF8, 0xFFEAB308),
            emojiBadge = "🪈",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-1",
            title = "Makar Sankranti #1 (Classic Grand)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "makar-sankranti-2",
            title = "Makar Sankranti #2 (Royal Gold Frame)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "makar-sankranti-3",
            title = "Makar Sankranti #3 (Minimalist Aura)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "makar-sankranti-4",
            title = "Makar Sankranti #4 (Devotional Darshan)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "makar-sankranti-5",
            title = "Makar Sankranti #5 (Business Branding)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "makar-sankranti-6",
            title = "Makar Sankranti #6 (Photo Memory Frame)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-7",
            title = "Makar Sankranti #7 (WhatsApp Story 9:16)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "makar-sankranti-8",
            title = "Makar Sankranti #8 (Reels & Shorts Cover)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "makar-sankranti-9",
            title = "Makar Sankranti #9 (Sparkle & Diya Glow)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "makar-sankranti-10",
            title = "Makar Sankranti #10 (Typography Banner)",
            category = "Makar Sankranti",
            greeting = "मकर संक्रांति की हार्दिक शुभकामनाएं",
            defaultSubText = "May the sun's auspicious northward journey bring high-flying dreams and sweet tilgul moments.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-11",
            title = "Makar Sankranti #11 (Classic Grand)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "makar-sankranti-12",
            title = "Makar Sankranti #12 (Royal Gold Frame)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "makar-sankranti-13",
            title = "Makar Sankranti #13 (Minimalist Aura)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "makar-sankranti-14",
            title = "Makar Sankranti #14 (Devotional Darshan)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "makar-sankranti-15",
            title = "Makar Sankranti #15 (Business Branding)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "makar-sankranti-16",
            title = "Makar Sankranti #16 (Photo Memory Frame)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-17",
            title = "Makar Sankranti #17 (WhatsApp Story 9:16)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "makar-sankranti-18",
            title = "Makar Sankranti #18 (Reels & Shorts Cover)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "makar-sankranti-19",
            title = "Makar Sankranti #19 (Sparkle & Diya Glow)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "makar-sankranti-20",
            title = "Makar Sankranti #20 (Typography Banner)",
            category = "Makar Sankranti",
            greeting = "Happy Makar Sankranti",
            defaultSubText = "Kites in the sky, til-laddoo sweetness, and warm sunshine greetings!",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-21",
            title = "Makar Sankranti #21 (Classic Grand)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "makar-sankranti-22",
            title = "Makar Sankranti #22 (Royal Gold Frame)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "makar-sankranti-23",
            title = "Makar Sankranti #23 (Minimalist Aura)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "makar-sankranti-24",
            title = "Makar Sankranti #24 (Devotional Darshan)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "makar-sankranti-25",
            title = "Makar Sankranti #25 (Business Branding)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "makar-sankranti-26",
            title = "Makar Sankranti #26 (Photo Memory Frame)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-27",
            title = "Makar Sankranti #27 (WhatsApp Story 9:16)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "makar-sankranti-28",
            title = "Makar Sankranti #28 (Reels & Shorts Cover)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "makar-sankranti-29",
            title = "Makar Sankranti #29 (Sparkle & Diya Glow)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "makar-sankranti-30",
            title = "Makar Sankranti #30 (Typography Banner)",
            category = "Makar Sankranti",
            greeting = "सूर्य उपासना का पावन पर्व",
            defaultSubText = "पतंगों की तरह आपके जीवन की उड़ान भी सदैव नई ऊंचाइयों को छूती रहे।",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-31",
            title = "Makar Sankranti #31 (Classic Grand)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "makar-sankranti-32",
            title = "Makar Sankranti #32 (Royal Gold Frame)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "makar-sankranti-33",
            title = "Makar Sankranti #33 (Minimalist Aura)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "makar-sankranti-34",
            title = "Makar Sankranti #34 (Devotional Darshan)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "makar-sankranti-35",
            title = "Makar Sankranti #35 (Business Branding)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "makar-sankranti-36",
            title = "Makar Sankranti #36 (Photo Memory Frame)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-37",
            title = "Makar Sankranti #37 (WhatsApp Story 9:16)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "makar-sankranti-38",
            title = "Makar Sankranti #38 (Reels & Shorts Cover)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "makar-sankranti-39",
            title = "Makar Sankranti #39 (Sparkle & Diya Glow)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "makar-sankranti-40",
            title = "Makar Sankranti #40 (Typography Banner)",
            category = "Makar Sankranti",
            greeting = "Uttarayan Mahotsav",
            defaultSubText = "Celebrating the harvest of happiness, golden crops, and family harmony.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Typo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-41",
            title = "Makar Sankranti #41 (Classic Grand)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Classic"
        ),
        FestivalTemplate(
            id = "makar-sankranti-42",
            title = "Makar Sankranti #42 (Royal Gold Frame)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Royal"
        ),
        FestivalTemplate(
            id = "makar-sankranti-43",
            title = "Makar Sankranti #43 (Minimalist Aura)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Modern"
        ),
        FestivalTemplate(
            id = "makar-sankranti-44",
            title = "Makar Sankranti #44 (Devotional Darshan)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Bhakti"
        ),
        FestivalTemplate(
            id = "makar-sankranti-45",
            title = "Makar Sankranti #45 (Business Branding)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Business"
        ),
        FestivalTemplate(
            id = "makar-sankranti-46",
            title = "Makar Sankranti #46 (Photo Memory Frame)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Photo"
        ),
        FestivalTemplate(
            id = "makar-sankranti-47",
            title = "Makar Sankranti #47 (WhatsApp Story 9:16)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Status"
        ),
        FestivalTemplate(
            id = "makar-sankranti-48",
            title = "Makar Sankranti #48 (Reels & Shorts Cover)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Story"
        ),
        FestivalTemplate(
            id = "makar-sankranti-49",
            title = "Makar Sankranti #49 (Sparkle & Diya Glow)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Glow"
        ),
        FestivalTemplate(
            id = "makar-sankranti-50",
            title = "Makar Sankranti #50 (Typography Banner)",
            category = "Makar Sankranti",
            greeting = "Sun God's Divine Grace",
            defaultSubText = "May Lord Surya brighten every corner of your path with boundless energy.",
            gradientColors = listOf(0xFFD97706, 0xFFF59E0B, 0xFFFBBF24),
            emojiBadge = "🪁",
            styleType = "Typo"
        ),
    )

    val categories = listOf(
        "All", "Diwali", "Holi", "Navratri", "Eid Mubarak",
        "Raksha Bandhan", "Ganesh Chaturthi", "New Year",
        "Maha Shivratri", "Janmashtami", "Makar Sankranti"
    )
}
