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
        assertTrue("Should have at least 5 default festive templates", templates.size >= 5)
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
