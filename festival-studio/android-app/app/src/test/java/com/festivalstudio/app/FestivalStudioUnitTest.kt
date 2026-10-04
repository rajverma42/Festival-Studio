package com.festivalstudio.app

import com.festivalstudio.app.domain.FestivalRepository
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNotNull
import org.junit.Assert.assertTrue
import org.junit.Test

class FestivalStudioUnitTest {

    @Test
    fun festivalTemplates_areNotEmpty() {
        val templates = FestivalRepository.templates
        assertTrue("Template list must not be empty", templates.isNotEmpty())
        assertTrue("Should have at least 500 templates (50 per festival)", templates.size >= 500)
    }

    @Test
    fun festivalTemplate_has50TemplatesPerFestival() {
        val diwaliTemplates = FestivalRepository.templates.filter { it.category == "Diwali" }
        assertEquals("Diwali should have 50 templates", 50, diwaliTemplates.size)
        val holiTemplates = FestivalRepository.templates.filter { it.category == "Holi" }
        assertEquals("Holi should have 50 templates", 50, holiTemplates.size)
    }

    @Test
    fun festivalTemplate_hasValidData() {
        val diwali = FestivalRepository.templates.firstOrNull { it.id == "diwali-1" }
        assertNotNull("Diwali template must exist", diwali)
        assertEquals("Diwali", diwali?.category)
        assertTrue(diwali!!.greeting.isNotEmpty())
        assertTrue(diwali.gradientColors.size >= 2)
    }

    @Test
    fun festivalCategories_containPrimaryFestivals() {
        val cats = FestivalRepository.categories
        assertTrue(cats.contains("All"))
        assertTrue(cats.contains("Diwali"))
        assertTrue(cats.contains("Holi"))
        assertTrue(cats.contains("Navratri"))
    }
}
