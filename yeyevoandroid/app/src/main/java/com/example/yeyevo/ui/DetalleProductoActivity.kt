package com.example.yeyevo.ui

import android.os.Bundle
import android.widget.ImageView
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.bumptech.glide.Glide
import com.example.yeyevo.R
import com.example.yeyevo.data.model.product
import java.io.Serializable

class DetalleProductoActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_detalle_producto)

        val producto = intent.getSerializableExtra("producto") as? product

        val imagen = findViewById<ImageView>(R.id.imgDetalleProducto)
        val nombre = findViewById<TextView>(R.id.txtDetalleNombre)
        val descripcion = findViewById<TextView>(R.id.txtDetalleDescripcion)
        val precio = findViewById<TextView>(R.id.txtDetallePrecio)
        val stock = findViewById<TextView>(R.id.txtDetalleStock)

        if (producto != null) {
            Glide.with(this).load(producto.imagen).into(imagen)
            nombre.text = producto.nombre
            descripcion.text = producto.descripcion
            precio.text = "Precio: $${producto.precio}"
            stock.text = "Stock disponible: ${producto.stock}"
        } else {
            nombre.text = "Producto no disponible"
        }
    }
}