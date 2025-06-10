package com.example.yeyevo.data.model

import java.io.Serializable

data class product(
    val id: Int,
    val nombre: String,
    val descripcion: String,
    val precio: Double,
    val stock: Int,
    val imagen: String,
    val categoria_id: Int
): Serializable