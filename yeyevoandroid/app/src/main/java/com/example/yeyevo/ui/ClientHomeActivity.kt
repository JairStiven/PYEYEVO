package com.example.yeyevo.ui


import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.widget.*
import androidx.appcompat.app.AppCompatActivity
import androidx.lifecycle.lifecycleScope
import com.bumptech.glide.Glide
import com.example.yeyevo.R
import com.example.yeyevo.data.api.retrofitClient
import com.example.yeyevo.data.model.product
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ClientHomeActivity : AppCompatActivity() {

    private lateinit var layoutCategorias: LinearLayout

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_client_home)

        layoutCategorias = findViewById(R.id.layoutCategorias)
        cargarProductos()
    }

    private fun cargarProductos() {
        lifecycleScope.launch(Dispatchers.IO) {
            try {
                val response = retrofitClient.instance.getProducts()  // Suspend function
                if (response.isSuccessful) {
                    val productos = response.body() ?: emptyList()
                    val productosPorCategoria = productos.groupBy { it.categoria_id }

                    withContext(Dispatchers.Main) {
                        layoutCategorias.removeAllViews()

                        for ((categoriaId, productosDeCategoria) in productosPorCategoria) {
                            val titulo = TextView(this@ClientHomeActivity).apply {
                                text = "Categoría: $categoriaId"
                                textSize = 20f
                                setPadding(0, 20, 0, 10)
                            }
                            layoutCategorias.addView(titulo)

                            for (producto in productosDeCategoria) {
                                val view = LayoutInflater.from(this@ClientHomeActivity)
                                    .inflate(R.layout.item_producto_card, layoutCategorias, false)

                                val imagen = view.findViewById<ImageView>(R.id.imgProducto)
                                val nombre = view.findViewById<TextView>(R.id.txtNombre)
                                val precio = view.findViewById<TextView>(R.id.txtPrecio)
                                val btnDetalles = view.findViewById<Button>(R.id.btnVerDetalles)

                                Glide.with(this@ClientHomeActivity)
                                    .load(producto.imagen)
                                    .into(imagen)

                                nombre.text = producto.nombre
                                precio.text = "Precio: $${producto.precio}"

                                btnDetalles.setOnClickListener {
                                    val intent = Intent(this@ClientHomeActivity, DetalleProductoActivity::class.java)
                                    intent.putExtra("producto", producto)
                                    startActivity(intent)
                                }

                                layoutCategorias.addView(view)
                            }
                        }
                    }
                } else {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ClientHomeActivity, "Error: ${response.code()}", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ClientHomeActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}